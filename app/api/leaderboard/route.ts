// Route: GET /api/leaderboard
import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";

import { db } from "@/src";
import { submissions } from "@/src/db/schema";
import { toGallerySubmission } from "@/lib/gallery-mappers";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const origin = searchParams.get("origin");
	const category = searchParams.get("category");
	const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);

	const conditions = [eq(submissions.status, "approved")];
	if (origin === "local" || origin === "international") {
		conditions.push(eq(submissions.origin, origin));
	}
	if (category === "essay" || category === "photography" || category === "videography") {
		conditions.push(eq(submissions.category, category));
	}

	const rows = await db
		.select()
		.from(submissions)
		.where(and(...conditions))
		.orderBy(desc(submissions.voteCount))
		.limit(limit);

	return NextResponse.json({ leaderboard: rows.map(toGallerySubmission) });
}