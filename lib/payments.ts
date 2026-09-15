import "server-only";

// $5.00 per vote, charged via Flutterwave in USD for every submission
// regardless of origin. Override via env if the price changes.
export const VOTE_PRICE_USD_CENTS = Number(process.env.VOTE_PRICE_USD_CENTS ?? 500);

const FLW_BASE_URL = "https://api.flutterwave.com/v3";

export async function initFlutterwavePayment(opts: {
	email: string;
	name: string;
	amountCents: number;
	currency?: string;
	reference: string;
	redirectUrl: string;
}) {
	const res = await fetch(`${FLW_BASE_URL}/payments`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			tx_ref: opts.reference,
			// Flutterwave amounts are in the currency's MAJOR unit (dollars),
			// unlike Paystack/Stripe which use the minor unit (cents/kobo).
			amount: (opts.amountCents / 100).toFixed(2),
			currency: opts.currency ?? "USD",
			redirect_url: opts.redirectUrl,
			customer: { email: opts.email, name: opts.name },
			customizations: { title: "My Enugu Story — vote" },
		}),
	});

	const data = await res.json();
	if (!res.ok || data.status !== "success") {
		throw new Error(data?.message ?? "Flutterwave initialization failed.");
	}
	return data.data.link as string;
}

export async function verifyFlutterwaveTransaction(transactionId: string) {
	const res = await fetch(`${FLW_BASE_URL}/transactions/${transactionId}/verify`, {
		headers: { Authorization: `Bearer ${process.env.FLW_SECRET_KEY}` },
	});
	const data = await res.json();
	if (!res.ok || data.status !== "success") {
		throw new Error(data?.message ?? "Flutterwave verification failed.");
	}
	return data.data as {
		id: number;
		tx_ref: string;
		amount: number;
		currency: string;
		status: string;
	};
}