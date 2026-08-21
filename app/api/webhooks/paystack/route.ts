// Route: POST /api/webhooks/paystack
import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { eq, sql } from "drizzle-orm";

import { db } from "@/src";
import { votePurchases, votes, submissions } from "@/src/db/schema";

export async function POST(req: NextRequest) {
	const rawBody = await req.text();
	const signature = req.headers.get("x-paystack-signature");
	const expected = createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
		.update(rawBody)
		.digest("hex");

	if (!signature || signature.length !== expected.length) {
		return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
	}
	if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
		return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
	}

	const event = JSON.parse(rawBody);

	if (event.event === "charge.success") {
		await confirmPurchase(event.data.reference);
	}

	// Paystack expects a 200 quickly — always acknowledge even if the
	// reference didn't match anything, so it doesn't keep retrying forever.
	return NextResponse.json({ received: true });
}

async function confirmPurchase(providerReference: string) {
	const [purchase] = await db
		.select()
		.from(votePurchases)
		.where(eq(votePurchases.providerReference, providerReference))
		.limit(1);

	if (!purchase || purchase.status === "success") return;

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
