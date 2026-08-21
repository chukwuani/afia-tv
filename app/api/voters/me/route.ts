import { NextResponse } from "next/server";
import { getCurrentVoter } from "@/lib/voters/auth";

export async function GET() {
	const voter = await getCurrentVoter();
	if (!voter) {
		return NextResponse.json(null, { status: 401 });
	}
	return NextResponse.json({
		id: voter.id,
		email: voter.email,
		hasUsedFreeVote: voter.hasUsedFreeVote,
	});
}