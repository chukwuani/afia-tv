import { AuthPageGuard } from "@/components/auth-page-guard";
import SignUpForm from "@/components/layout/signup-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Sign Up",
	description: "Create a new account",
};

function SignUpPage() {
	return (
		<AuthPageGuard>
			<SignUpForm />
		</AuthPageGuard>
	);
}

export default SignUpPage;
