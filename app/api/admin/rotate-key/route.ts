// Lets an admin who's already authenticated with their current key replace it
// with a fresh, strong one. The old key stops working the instant this
// succeeds — the new key is returned exactly once and never stored anywhere
// retrievable, so the client is responsible for showing it to the admin.
import { NextRequest, NextResponse } from "next/server";
import { getAdminByKey, rotateAdminKey } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
	const currentKey = req.nextUrl.searchParams.get("ak");
	const admin = await getAdminByKey(currentKey);

	if (!admin) {
		return NextResponse.json({ error: "Invalid or missing access key" }, { status: 401 });
	}

	const newKey = await rotateAdminKey(admin.id);

	return NextResponse.json({ success: true, newKey });
}