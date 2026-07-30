export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

export function normalizePhone(phone: string): string {
	const digits = phone.replace(/\D/g, "");
	return digits.slice(-10);
}
