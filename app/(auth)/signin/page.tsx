import { AuthPageGuard } from "@/components/auth-page-guard";
import SignInForm from "@/components/layout/signin-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

function SignInPage() {
	return (
		<AuthPageGuard>
			<SignInForm />
		</AuthPageGuard>
	);
}

export default SignInPage;
