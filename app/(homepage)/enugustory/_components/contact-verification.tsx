"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Stage = "contact" | "code";

export type VerifiedContact = {
	fullName: string;
	email: string;
	phone: string;
	token: string;
};

export default function ContactVerification({
	onVerified,
}: {
	onVerified: (contact: VerifiedContact) => void;
}) {
	const id = useId();
	const [stage, setStage] = useState<Stage>("contact");
	const [isSending, setIsSending] = useState(false);
	const [isConfirming, setIsConfirming] = useState(false);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const [emailVerificationId, setEmailVerificationId] = useState("");
	const [emailCode, setEmailCode] = useState("");

	const sendCode = async () => {
		if (!fullName.trim() || !email.trim() || !phone.trim()) {
			toast.error("Please fill in your name, email, and phone number.");
			return;
		}

		setIsSending(true);
		try {
			const res = await fetch("/api/verify/start", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, email }),
			});
			const result = await res.json();

			if (!res.ok) {
				throw new Error(typeof result?.error === "string" ? result.error : "Could not send code.");
			}

			setEmailVerificationId(result.emailVerificationId);
			setStage("code");
			toast.success("Code sent — check your email.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setIsSending(false);
		}
	};

	const confirmCode = async () => {
		if (!emailCode.trim()) {
			toast.error("Enter the code we emailed you.");
			return;
		}

		setIsConfirming(true);
		try {
			const res = await fetch("/api/verify/confirm", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, emailVerificationId, emailCode }),
			});
			const result = await res.json();

			if (!res.ok) {
				throw new Error(typeof result?.error === "string" ? result.error : "Verification failed.");
			}

			onVerified({ fullName, email, phone, token: result.token });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setIsConfirming(false);
		}
	};

	if (stage === "contact") {
		return (
			<div className="mx-auto max-w-md space-y-4 py-8 px-4">
				<h1 className="text-xl font-semibold">Verify Your Email</h1>
				<p className="text-muted-foreground text-sm">
					Before you can submit an entry, we need to confirm your email address.
				</p>

				<div className="space-y-2">
					<Label htmlFor={`${id}-name`}>Full name</Label>
					<Input
						id={`${id}-name`}
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						placeholder="John Doe"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor={`${id}-email`}>Email</Label>
					<Input
						id={`${id}-email`}
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="m@example.com"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor={`${id}-phone`}>Phone number</Label>
					<Input
						id={`${id}-phone`}
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="080..."
					/>
				</div>

				<Button onClick={sendCode} disabled={isSending} className="w-full">
					{isSending ? "Sending code..." : "Send Verification Code"}
				</Button>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-md space-y-4 py-8 px-4">
			<h1 className="text-xl font-semibold">Enter Your Code</h1>
			<p className="text-muted-foreground text-sm">
				We sent a code to <strong>{email}</strong>. It expires in 10 minutes.
			</p>

			<div className="space-y-2 w-full">
				<Label htmlFor={`${id}-email-code`}>Email code</Label>
				<InputOTP id={`${id}-email-code`} maxLength={6} value={emailCode} onChange={setEmailCode}>
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

			<Button
				onClick={confirmCode}
				disabled={isConfirming || emailCode.length < 6}
				className="w-full">
				{isConfirming ? "Verifying..." : "Verify & Continue"}
			</Button>
			<button
				type="button"
				onClick={sendCode}
				disabled={isSending}
				className="text-muted-foreground w-full text-center text-sm underline">
				{isSending ? "Resending..." : "Didn't get a code? Resend"}
			</button>
		</div>
	);
}
