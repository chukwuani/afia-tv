"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import {
	PageHeader,
	PageHeaderDescription,
	PageHeaderHeading,
} from "@/components/layout/page-header";
import TermsContent from "./terms-content";

const READ_TIMEOUT_SECONDS = 60;

export default function TermsGate({ onAgree }: { onAgree: () => void }) {
	const [secondsLeft, setSecondsLeft] = useState(READ_TIMEOUT_SECONDS);

	useEffect(() => {
		if (secondsLeft <= 0) return;
		const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
		return () => clearTimeout(timer);
	}, [secondsLeft]);

	const canContinue = secondsLeft <= 0;

	return (
		<Shell as="article" variant="content">
			<PageHeader>
				<PageHeaderHeading className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] uppercase">
					Terms & Condition
				</PageHeaderHeading>
				<PageHeaderDescription>A few rules for us and you.</PageHeaderDescription>
			</PageHeader>

			<TermsContent />

			<div className="flex items-center justify-between border-t pt-4">
				<p className="text-muted-foreground text-sm">
					Please read the terms above before continuing.
				</p>
				<Button onClick={onAgree} disabled={!canContinue}>
					{canContinue ? "I Agree — Continue" : `Please wait (${secondsLeft}s)`}
				</Button>
			</div>
		</Shell>
	);
}
