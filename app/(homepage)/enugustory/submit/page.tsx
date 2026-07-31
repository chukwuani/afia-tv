"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import TermsGate from "../_components/terms-gate";
import ContactVerification, { type VerifiedContact } from "../_components/contact-verification";
import SubmissionForm from "../_components/submission-form";

type Step = "terms" | "verify" | "form" | "success";

function SubmitPageInner() {
	const searchParams = useSearchParams();
	const isTestAccess = searchParams.get("test") === "alpha";

	const [step, setStep] = useState<Step>("terms");
	const [contestantId, setContestantId] = useState<number | null>(null);
	const [verifiedContact, setVerifiedContact] = useState<VerifiedContact | null>(null);

	if (!isTestAccess) {
		// Soft-launch gate — this is a visibility check, not real access control.
		// Remove this block entirely once the portal is ready to go public.
		return (
			<div className="flex min-h-screen items-center justify-center px-6 text-center">
				<p className="text-muted-foreground">This page isn&apos;t available yet.</p>
			</div>
		);
	}

	// if (step === "success") {
	// 	return (
	// 		<div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-3 px-6 text-center">
	// 			<h1 className="text-xl font-semibold">Entry Submitted</h1>
	// 			<p className="text-muted-foreground">Thank you! Your contestant ID is:</p>
	// 			<p className="font-mono text-3xl font-bold">{contestantId}</p>
	// 			<p className="text-muted-foreground text-sm">
	// 				Keep this number — it identifies you across any other categories you enter.
	// 			</p>
	// 		</div>
	// 	);
	// }

	return (
		<>
			{step === "terms" && <TermsGate onAgree={() => setStep("verify")} />}
			{step === "verify" && (
				<ContactVerification
					onVerified={(contact) => {
						setVerifiedContact(contact);
						setStep("form");
					}}
				/>
			)}
			{step === "form" && verifiedContact && (
				<SubmissionForm
					verifiedContact={verifiedContact}
					onSuccess={(id) => {
						setContestantId(id);
						// setStep("success");
					}}
				/>
			)}
		</>
	);
}

export default function SubmitPage() {
	// useSearchParams requires a Suspense boundary in the App Router.
	return (
		<Suspense>
			<SubmitPageInner />
		</Suspense>
	);
}