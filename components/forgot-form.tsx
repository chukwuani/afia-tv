"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const ForgotPasswordForm = () => {
	const [email, setEmail] = useState("");

	const [isLoading, startTransition] = useTransition();

	const handleForgotPassword = () => {
		startTransition(async () => {
			try {
				const { error } = await supabase.auth.resetPasswordForEmail(email, {
					redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
				});

				if (error) {
					throw error;
				}

				toast.success("Check your email", {
					description: "Good news! We've sent a password reset link",
				});
			} catch (error: any) {
				toast.error("Request Failed", {
					description: "We encountered an issue while trying to send the password reset email",
				});
			}
		});
	};

	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id="email"
					type="email"
					placeholder="m@example.com"
					required
				/>
			</div>

			<Button disabled={isLoading} onClick={handleForgotPassword} type="submit" className="w-full">
				Get Reset link
			</Button>
		</>
	);
};
export default ForgotPasswordForm;
