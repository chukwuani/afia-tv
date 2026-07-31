const TERMII_BASE_URL = "https://api.ng.termii.com";

// Flip this back to true once a Termii sender ID is approved — everything else
// in this file and the /api/verify routes is already wired for it.
export const PHONE_OTP_ENABLED = false;

type SendResult = { pinId: string } | { error: string };

export async function sendPhoneOtp(phone: string): Promise<SendResult> {
	const apiKey = process.env.TERMII_API_KEY;
	const senderId = process.env.TERMII_SENDER_ID;

	if (!apiKey || !senderId) {
		console.error("Termii not configured (missing TERMII_API_KEY or TERMII_SENDER_ID)");
		return { error: "Phone verification is not available right now." };
	}

	try {
		const res = await fetch(`${TERMII_BASE_URL}/api/sms/otp/send`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				api_key: apiKey,
				message_type: "NUMERIC",
				to: phone,
				from: senderId,
				channel: "generic",
				pin_attempts: 5,
				pin_time_to_live: 10, // minutes
				pin_length: 6,
				pin_placeholder: "< 1234 >",
				message_text: "Your My Enugu Story verification code is < 1234 >",
				pin_type: "NUMERIC",
			}),
		});

		const responseData = await res.json();

		if (!res.ok || !responseData.pinId) {
			console.error("Termii send OTP failed:", res.status, responseData);
			return { error: "Could not send the verification SMS. Check your phone number and try again." };
		}

		return { pinId: responseData.pinId };
	} catch (err) {
		console.error("Termii send OTP request error:", err);
		return { error: "Could not send the verification SMS. Please try again." };
	}
}

export async function verifyPhoneOtp(pinId: string, pin: string): Promise<boolean> {
	const apiKey = process.env.TERMII_API_KEY;
	if (!apiKey) return false;

	try {
		const res = await fetch(`${TERMII_BASE_URL}/api/sms/otp/verify`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ api_key: apiKey, pin_id: pinId, pin }),
		});

		const data = await res.json();
		return data.verified === "True" || data.verified === true;
	} catch (err) {
		console.error("Termii verify OTP request error:", err);
		return false;
	}
}