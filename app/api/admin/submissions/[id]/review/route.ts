import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/src/index";
import { submissions } from "@/src/db/schema";
import { getAdminByKey } from "@/lib/adminAuth";

// Next.js 15: route params are async. On Next.js 14, change the signature to
// `{ params }: { params: { id: string } }` and drop the `await`.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const key = req.nextUrl.searchParams.get("ak");
	const admin = await getAdminByKey(key);

	if (!admin) {
		return NextResponse.json({ error: "Invalid or missing access key" }, { status: 401 });
	}

	const body = await req.json().catch(() => null);
	const action = body?.action;

	if (action !== "approve" && action !== "reject") {
		return NextResponse.json({ error: "action must be 'approve' or 'reject'" }, { status: 400 });
	}

	const [updated] = await db
		.update(submissions)
		.set({
			status: action === "approve" ? "approved" : "rejected",
			approvedBy: admin.name,
			reviewedAt: new Date(),
		})
		.where(eq(submissions.id, id))
		.returning();

	if (!updated) {
		return NextResponse.json({ error: "Submission not found" }, { status: 404 });
	}

	return NextResponse.json({ success: true, submission: updated });
}