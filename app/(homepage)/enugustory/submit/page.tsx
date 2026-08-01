"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import TermsGate from "../_components/terms-gate";
import ContactVerification, { type VerifiedContact } from "../_components/contact-verification";
import SubmissionForm from "../_components/submission-form";

type Step = "terms" | "verify" | "form";

function SubmitPageInner() {
	const searchParams = useSearchParams();
	const isTestAccess = searchParams.get("test") === "alpha";

	const [step, setStep] = useState<Step>("terms");
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
			{step === "form" && verifiedContact && <SubmissionForm verifiedContact={verifiedContact} />}
		</>
	);
}

export default function SubmitPage() {
	return (
		<Suspense>
			<SubmitPageInner />
		</Suspense>
	);
}
