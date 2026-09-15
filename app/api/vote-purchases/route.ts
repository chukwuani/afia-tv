import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";

import { db } from "@/src";
import { submissions, votePurchases } from "@/src/db/schema";
import { getCurrentVoter } from "@/lib/voters/auth";
import { VOTE_PRICE_USD_CENTS, initFlutterwavePayment } from "@/lib/payments";

const bodySchema = z.object({
	submissionId: z.string().uuid(),
	quantity: z.number().int().min(1).max(100),
});

export async function POST(req: NextRequest) {
	const voter = await getCurrentVoter();
	if (!voter) {
		return NextResponse.json({ error: "Verify your email first." }, { status: 401 });
	}

	const parsed = bodySchema.safeParse(await req.json());
	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 });
	}
	const { submissionId, quantity } = parsed.data;

	const [submission] = await db
		.select()
		.from(submissions)
		.where(and(eq(submissions.id, submissionId), eq(submissions.status, "approved")))
		.limit(1);
	if (!submission) {
		return NextResponse.json({ error: "Entry not found." }, { status: 404 });
	}

	const reference = randomUUID();
	const appUrl = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "";
	const amountTotal = VOTE_PRICE_USD_CENTS * quantity;

	await db.insert(votePurchases).values({
		voterId: voter.id,
		submissionId,
		provider: "flutterwave",
		providerReference: reference,
		quantity,
		unitAmountCents: VOTE_PRICE_USD_CENTS,
		amountTotalCents: amountTotal,
		currency: "usd",
	});

	const checkoutUrl = await initFlutterwavePayment({
		email: voter.email,
		name: voter.fullName,
		amountCents: amountTotal,
		currency: "USD",
		reference,
		// Flutterwave uses one redirect_url for every outcome (success,
		// cancelled, failed) and appends `status` + `tx_ref` +
		// `transaction_id` query params — there's no separate cancel_url.
		redirectUrl: `${appUrl}/enugustory?vote=complete`,
	});

	return NextResponse.json({ checkoutUrl });
}