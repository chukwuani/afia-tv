import "server-only";

// $5.00 per vote, charged via Paystack (now that it supports USD) for every
// submission regardless of origin. Override via env if the price changes.
export const VOTE_PRICE_USD_CENTS = Number(process.env.VOTE_PRICE_USD_CENTS ?? 500);

export async function initPaystackTransaction(opts: {
	email: string;
	amountCents: number;
	currency?: string;
	reference: string;
	callbackUrl: string;
}) {
	const res = await fetch("https://api.paystack.co/transaction/initialize", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: opts.email,
			// Paystack's `amount` is always in the currency's lowest unit —
			// cents for USD, same as kobo for NGN.
			amount: opts.amountCents,
			currency: opts.currency ?? "USD",
			reference: opts.reference,
			callback_url: opts.callbackUrl,
		}),
	});

	const data = await res.json();
	if (!res.ok || !data.status) {
		console.log({ data });
		throw new Error(data?.message ?? "Paystack initialization failed.");
	}
	return data.data.authorization_url as string;
}
