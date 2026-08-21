// Route: POST /api/webhooks/stripe
import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/src";
import { votePurchases, votes, submissions } from "@/src/db/schema";
import { stripe } from "@/lib/payments";

export async function POST(req: NextRequest) {
	const rawBody = await req.text();
	const signature = req.headers.get("stripe-signature");

	let event;
	try {
		event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch {
		return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as { metadata?: { votePurchaseId?: string } };
		const votePurchaseId = session.metadata?.votePurchaseId;
		if (votePurchaseId) {
			await confirmPurchase(votePurchaseId);
		}
	}

	return NextResponse.json({ received: true });
}

async function confirmPurchase(votePurchaseId: string) {
	const [purchase] = await db
		.select()
		.from(votePurchases)
		.where(eq(votePurchases.id, votePurchaseId))
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
