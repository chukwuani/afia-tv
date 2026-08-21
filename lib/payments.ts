import "server-only";
import Stripe from "stripe";

// $5.00 per vote, charged via Stripe for every submission regardless of
// origin. Override via env if the price changes.
export const VOTE_PRICE_USD_CENTS = Number(process.env.VOTE_PRICE_USD_CENTS ?? 500);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createStripeCheckout(opts: {
	email: string;
	amountCents: number;
	quantity: number;
	votePurchaseId: string;
	successUrl: string;
	cancelUrl: string;
}) {
	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		customer_email: opts.email,
		line_items: [
			{
				price_data: {
					currency: "usd",
					unit_amount: Math.round(opts.amountCents / opts.quantity),
					product_data: { name: "My Enugu Story — vote" },
				},
				quantity: opts.quantity,
			},
		],
		// Read back in the webhook to know which purchase this session paid for.
		metadata: { votePurchaseId: opts.votePurchaseId },
		success_url: opts.successUrl,
		cancel_url: opts.cancelUrl,
	});

	if (!session.url) throw new Error("Stripe session created without a checkout URL.");
	return session.url;
}