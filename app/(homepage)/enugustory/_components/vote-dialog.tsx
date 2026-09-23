"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRequestOtp, useConfirmOtp, useCastFreeVote, useBuyVotes } from "@/hooks/use-gallery";
import type { GallerySubmission, Voter } from "@/lib/gallery";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";

type Step = "email" | "otp" | "vote";

// $5.00 per paid vote, charged via Paystack in USD regardless of the entry's origin.
const PRICE_PER_VOTE_USD = 5;

function VoteDialog({
	submission,
	voter,
	open,
	onOpenChange,
}: {
	submission: GallerySubmission;
	voter: Voter | null | undefined;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const [step, setStep] = useState<Step>(voter ? "vote" : "email");
	const [email, setEmail] = useState(voter?.email ?? "");
	const [fullName, setFullName] = useState("");
	const [location, setLocation] = useState("");
	const [verificationId, setVerificationId] = useState("");
	const [code, setCode] = useState("");
	const [quantity, setQuantity] = useState(1);

	const requestOtp = useRequestOtp();
	const confirmOtp = useConfirmOtp();
	const castFreeVote = useCastFreeVote();
	const buyVotes = useBuyVotes();

	const busy =
		requestOtp.isPending || confirmOtp.isPending || castFreeVote.isPending || buyVotes.isPending;

	const resetAndClose = (openState: boolean) => {
		onOpenChange(openState);
		if (!openState && voter) setStep("vote");
	};

	const handleRequestOtp = () => {
		if (!fullName.trim()) {
			toast.error("Enter your full name.");
			return;
		}
		if (!location.trim()) {
			toast.error("Enter your location.");
			return;
		}
		if (!email.includes("@")) {
			toast.error("Enter a valid email address.");
			return;
		}
		requestOtp.mutate(
			{ email, fullName },
			{
				onSuccess: (data) => {
					setVerificationId(data.verificationId);
					setStep("otp");
				},
				onError: (err) => toast.error(err instanceof Error ? err.message : "Something went wrong."),
			},
		);
	};

	const handleConfirmOtp = () => {
		if (code.length < 4) {
			toast.error("Enter the code we sent you.");
			return;
		}
		confirmOtp.mutate(
			{ verificationId, code, fullName, location },
			{
				onSuccess: () => setStep("vote"),
				onError: (err) => toast.error(err instanceof Error ? err.message : "Something went wrong."),
			},
		);
	};

	const handleCastFreeVote = () => {
		castFreeVote.mutate(submission.id, {
			onSuccess: () => {
				toast.success("Your vote is in!");
				resetAndClose(false);
			},
			onError: (err) => toast.error(err instanceof Error ? err.message : "Something went wrong."),
		});
	};

	const handleBuyVotes = () => {
		buyVotes.mutate(
			{ submissionId: submission.id, quantity },
			{
				onSuccess: (data) => {
					window.location.href = data.checkoutUrl;
				},
				onError: (err) => toast.error(err instanceof Error ? err.message : "Something went wrong."),
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={resetAndClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-anton uppercase text-[20px] leading-[140%] tracking-normal font-normal">
						Vote for &ldquo;{submission.entryTitle}&rdquo;
					</DialogTitle>
					<DialogDescription>By {submission.fullName}</DialogDescription>
				</DialogHeader>

				{step === "email" && (
					<div className="space-y-3">
						<div className="space-y-1.5">
							<Label htmlFor="vote-name">Full name</Label>
							<Input
								id="vote-name"
								placeholder="Chukwuani Stephen"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								disabled={busy}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="vote-location">Location</Label>
							<Input
								id="vote-location"
								placeholder="e.g. Enugu, Nigeria"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								disabled={busy}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="vote-email">Email</Label>
							<Input
								id="vote-email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={busy}
							/>
						</div>
						<p className="text-xs text-muted-foreground">
							We&apos;ll send a one-time code — everyone gets one free vote. Your name and location
							will show on the leaderboard if you make the top voters.
						</p>
					</div>
				)}

				{step === "otp" && (
					<div className="space-y-3">
						<Label htmlFor="vote-otp">Enter the code sent to {email}</Label>
						<InputOTP id="vote-otp" maxLength={6} value={code} onChange={setCode}>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					</div>
				)}

				{step === "vote" && voter && (
					<div className="space-y-4">
						{!voter.hasUsedFreeVote ? (
							<p className="text-sm">
								You have a free vote available. Use it here, or buy extra votes below.
							</p>
						) : (
							<p className="text-sm text-muted-foreground">
								You&apos;ve used your free vote. Buy more votes to support this entry again.
							</p>
						)}

						<div className="flex items-center gap-3 rounded-md border p-3">
							<Label htmlFor="vote-qty" className="text-sm">
								Votes to buy
							</Label>
							<Input
								id="vote-qty"
								type="number"
								min={1}
								max={100}
								value={quantity}
								onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
								disabled={busy}
								className="w-20"
							/>
							<span className="ml-auto text-sm font-medium text-brand">
								${(quantity * PRICE_PER_VOTE_USD).toFixed(2)}
							</span>
						</div>
					</div>
				)}

				<DialogFooter className="gap-2 sm:gap-2">
					{step === "email" && (
						<Button
							onClick={handleRequestOtp}
							disabled={busy}
							className="w-full bg-brand hover:bg-brand/90">
							{requestOtp.isPending ? "Sending..." : "Send code"}
						</Button>
					)}
					{step === "otp" && (
						<Button
							onClick={handleConfirmOtp}
							disabled={busy}
							className="w-full bg-brand hover:bg-brand/90">
							{confirmOtp.isPending ? "Verifying..." : "Verify"}
						</Button>
					)}
					{step === "vote" && voter && (
						<div className="flex w-full flex-col gap-2 sm:flex-row">
							{!voter.hasUsedFreeVote && (
								<Button
									onClick={handleCastFreeVote}
									disabled={busy}
									variant="outline"
									className="flex-1">
									{castFreeVote.isPending ? "Casting..." : "Cast free vote"}
								</Button>
							)}
							<Button
								onClick={handleBuyVotes}
								disabled={busy}
								className="flex-1 bg-brand hover:bg-brand/90">
								{buyVotes.isPending
									? "Redirecting..."
									: `Buy ${quantity} vote${quantity > 1 ? "s" : ""}`}
							</Button>
						</div>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default VoteDialog;
