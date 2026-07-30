import { SendMailClient } from "zeptomail";

const ZEPTOMAIL_API_URL = "https://api.zeptomail.com/v1.1/email";

const client = new SendMailClient({
	url: ZEPTOMAIL_API_URL,
	token: process.env.ZEPTOMAIL_API_KEY!,
});

export async function sendZeptoMail({
	to,
	toName,
	subject,
	html,
}: {
	to: string;
	toName?: string;
	subject: string;
	html: string;
}) {
	const apiKey = process.env.ZEPTOMAIL_API_KEY;
	const fromAddress = process.env.ZEPTOMAIL_FROM_EMAIL;
	const fromName = process.env.ZEPTOMAIL_FROM_NAME || "My Enugu Story";

	if (!apiKey || !fromAddress) {
		console.error(
			"ZeptoMail not configured (missing ZEPTOMAIL_API_KEY or ZEPTOMAIL_FROM_ADDRESS) — skipping email",
		);
		return;
	}

	try {
		const res = await client.sendMail({
			from: {
				address: fromAddress,
				name: fromName,
			},
			to: [{ email_address: { address: to, name: toName || to } }],
			subject,
			htmlbody: html,
		});
	} catch (err) {
		console.error("ZeptoMail request error:", err);
	}
}
