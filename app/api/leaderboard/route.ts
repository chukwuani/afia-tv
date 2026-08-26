import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "@/src";
import { submissions, votes, voters } from "@/src/db/schema";

const TOP_N = 5;

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const origin = searchParams.get("origin");

	// Scoped to origin only — a voter's rank shouldn't shift just because
	// someone's browsing a specific category.
	const conditions = [eq(submissions.status, "approved")];
	if (origin === "local" || origin === "international") {
		conditions.push(eq(submissions.origin, origin));
	}
	const where = and(...conditions);

	const voteCountExpr = sql<number>`count(*)`.mapWith(Number);
	const topVotersRows = await db
		.select({
			voterId: votes.voterId,
			fullName: voters.fullName,
			location: voters.location,
			voteCount: voteCountExpr,
		})
		.from(votes)
		.innerJoin(submissions, eq(votes.submissionId, submissions.id))
		.innerJoin(voters, eq(votes.voterId, voters.id))
		.where(where)
		.groupBy(votes.voterId, voters.fullName, voters.location)
		.orderBy(desc(voteCountExpr))
		.limit(TOP_N);

	return NextResponse.json({ topVoters: topVotersRows });
}