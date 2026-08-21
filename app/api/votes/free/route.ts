// Route: POST /api/votes/free
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";

import { db } from "@/src";
import { submissions, voters, votes } from "@/src/db/schema";
import { getCurrentVoter } from "@/lib/voters/auth";

const bodySchema = z.object({ submissionId: z.string().uuid() });

export async function POST(req: NextRequest) {
	const voter = await getCurrentVoter();

	console.log({ voter });
	if (!voter) {
		return NextResponse.json({ error: "Verify your email first." }, { status: 401 });
	}

	const parsed = bodySchema.safeParse(await req.json());
	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 });
	}

	if (voter.hasUsedFreeVote) {
		return NextResponse.json({ error: "You've already used your free vote." }, { status: 400 });
	}

	const [submission] = await db
		.select()
		.from(submissions)
		.where(and(eq(submissions.id, parsed.data.submissionId), eq(submissions.status, "approved")))
		.limit(1);
	if (!submission) {
		return NextResponse.json({ error: "Entry not found." }, { status: 404 });
	}

	try {
		const [, , [updated]] = await db.batch([
			// The partial unique index on votes(voterId) WHERE source='free' is
			// what actually stops a race between two concurrent requests — the
			// hasUsedFreeVote check above is just a fast path.
			db.insert(votes).values({
				submissionId: submission.id,
				voterId: voter.id,
				source: "free",
			}),

			db.update(voters).set({ hasUsedFreeVote: true }).where(eq(voters.id, voter.id)),

			db
				.update(submissions)
				.set({ voteCount: sql`${submissions.voteCount} + 1` })
				.where(eq(submissions.id, submission.id))
				.returning({ voteCount: submissions.voteCount }),
		]);

		return NextResponse.json({ voteCount: updated.voteCount });
	} catch {
		// Unique violation on the partial index = a concurrent request already
		// used this voter's free vote.
		return NextResponse.json({ error: "You've already used your free vote." }, { status: 400 });
	}
}
