// POST /api/webhooks/flutterwave
import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/src";
import { votePurchases, votes, submissions } from "@/src/db/schema";
import { verifyFlutterwaveTransaction } from "@/lib/payments";

export async function POST(req: NextRequest) {
	// Flutterwave signs webhooks with a static secret hash you set in their
	// dashboard (Settings > Webhooks) — not HMAC over the body like
	// Paystack/Stripe. Compare it directly.
	const signature = req.headers.get("verif-hash");
	if (!signature || signature !== process.env.FLW_SECRET_HASH) {
		return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
	}

	const event = await req.json();

	if (event.event === "charge.completed" && event.data?.status === "successful") {
		await confirmPurchase(event.data.id, event.data.tx_ref);
	}

	return NextResponse.json({ received: true });
}

async function confirmPurchase(transactionId: number, txRef: string) {
	const [purchase] = await db
		.select()
		.from(votePurchases)
		.where(eq(votePurchases.providerReference, txRef))
		.limit(1);

	if (!purchase || purchase.status === "success") return;

	// Flutterwave's own guidance: don't trust the webhook body alone — call
	// their verify endpoint and check amount/currency/reference match before
	// crediting anything. A forged or replayed webhook post can't fake this.
	const verified = await verifyFlutterwaveTransaction(String(transactionId));
	const expectedAmount = purchase.amountTotalCents / 100;
	const amountMatches = Math.abs(verified.amount - expectedAmount) < 0.01;

	if (
		verified.status !== "successful" ||
		verified.tx_ref !== purchase.providerReference ||
		verified.currency.toUpperCase() !== purchase.currency.toUpperCase() ||
		!amountMatches
	) {
		return;
	}

	await db.batch([
		db
			.update(votePurchases)
			.set({ status: "success", confirmedAt: new Date() })
			.where(eq(votePurchases.id, purchase.id)),

		db.insert(votes).values(
			Array.from({ length: purchase.quantity }, () => ({
				submissionId: purchase.submissionId,
				voterId: purchase.voterId,
				source: "paid" as const,
				votePurchaseId: purchase.id,
			})),
		),

		db
			.update(submissions)
			.set({ voteCount: sql`${submissions.voteCount} + ${purchase.quantity}` })
			.where(eq(submissions.id, purchase.submissionId)),
	]);
}
