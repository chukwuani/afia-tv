import { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackBtn from "@/components/back-btn";
import ForgotPasswordForm from "@/components/forgot-form";
import { AuthPageGuard } from "@/components/auth-page-guard";

export const metadata: Metadata = {
	title: "Forgot Password",
	description: "Request a password reset link",
};

const ForgotPassword = () => {
	return (
		<AuthPageGuard>
			<section className="h-screen flex items-center justify-center">
				<Card className="mx-auto max-w-sm z-10 bg-[#ffffff0b] border-0">
					<CardHeader>
						<CardTitle className="text-brand font-anton text-[36px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
							Trouble logging in?
						</CardTitle>
						<CardDescription>
							Enter your email, and we&apos;ll send you a link to get back into your account
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className="grid gap-4">
							<ForgotPasswordForm />

							<BackBtn />
						</div>
					</CardContent>
				</Card>
			</section>
		</AuthPageGuard>
	);
};
export default ForgotPassword;
