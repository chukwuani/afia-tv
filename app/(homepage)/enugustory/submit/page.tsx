"use client";

import { Suspense, useState } from "react";
import TermsGate from "../_components/terms-gate";
import ContactVerification, { type VerifiedContact } from "../_components/contact-verification";
import SubmissionForm from "../_components/submission-form";

type Step = "terms" | "verify" | "form";

function SubmitPageInner() {
	const [step, setStep] = useState<Step>("terms");
	const [verifiedContact, setVerifiedContact] = useState<VerifiedContact | null>(null);

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
