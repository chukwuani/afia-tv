import { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordForm from "@/components/reset-form";
import { AuthPageGuard } from "@/components/auth-page-guard";

export const metadata: Metadata = {
	title: "Password Reset",
	description: "Reset your account password",
};

const ResetPassword = () => {
	return (
		<AuthPageGuard>
			<section className="h-screen flex items-center justify-center">
				<Card className="mx-auto max-w-sm z-10 bg-[#ffffff0b] border-0">
					<CardHeader>
						<CardTitle className="text-brand font-anton text-[36px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
							Password Reset
						</CardTitle>
						<CardDescription>
							Enter a new secure password to reset the old one and get back into your account
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className="grid gap-4">
							<ResetPasswordForm />
						</div>
					</CardContent>
				</Card>
			</section>
		</AuthPageGuard>
	);
};
export default ResetPassword;
