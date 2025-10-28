"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ViewPassword from "@/components/view-password";

import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const ResetPasswordForm = () => {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const [isLoading, startTransition] = useTransition();

	const handleResetPassword = () => {
		startTransition(async () => {
			try {
				const { error } = await supabase.auth.updateUser({ password: password });

				if (error) {
					throw error;
				}

				toast.success("Password Reset", {
					description:
						"Your password reset was successful! Please log in with your new credentials.",
				});

				router.push("/signin");
			} catch (error: any) {
				toast.error("Request Failed", {
					description: "We're sorry, but there was an error resetting your password.",
				});
			}
		});
	};

	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="password">New password</Label>

				<section className="flex items-center relative">
					<Input
						className="pr-8"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id="password"
						type={showPassword ? "text" : "password"}
						required
					/>

					<ViewPassword showPassword={showPassword} setShowPassword={setShowPassword} />
				</section>
			</div>

			<Button disabled={isLoading} onClick={handleResetPassword} type="submit" className="w-full">
				Reset Password
			</Button>
		</>
	);
};
export default ResetPasswordForm;
