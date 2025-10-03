"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Palette, Users, Cloud, ShieldCheck } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

export default function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			alert("Login successful! (This is a demo)");
			setLoading(false);
		}, 2000);
	};

	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
			<div className="z-10 w-full max-w-6xl">
				<div className="bg-[#ffffff0b] overflow-hidden rounded-[40px] shadow-2xl">
					<div className="grid min-h-[700px] lg:grid-cols-2">
						{/* Left Side */}
						<div className="flex flex-col justify-center p-10">
							<div className="mx-auto w-full">
								<div className="flex mb-10">
									<span className="sr-only">Afia</span>
									<Image
										className="w-[100px] h-15 max-w-none"
										width={100}
										height={40}
										src="/images/afia_logo.svg"
										alt="Afia Logo"
									/>
								</div>

								<div className="space-y-6 mb-6">
									<h1 className="text-3xl font-normal tracking-tight text-brand">
										Access your account
									</h1>
									<p className="mt-6 text-sm font-dm-sans font-light text-muted-foreground max-w-prose text-pretty">
										Access your personalized experience — continue watching, save favorites, and
										stay updated with the latest stories from Southeast Nigeria.
									</p>
								</div>

								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="flex flex-col md:flex-row items-start gap-7 w-full">
										<div className="flex flex-col w-full items-start gap-[11px]">
											<label className="font-epilogue font-medium text-primary text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
												Full Name
											</label>

											<div className="relative w-full">
												<Input
													className="h-11 shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 text-muted-foreground placeholder:text-muted-foreground "
													placeholder="John Doe"
												/>
											</div>
										</div>
									</div>

									{/* Subject Row */}
									<div className="flex flex-col w-full items-start gap-[11px]">
										<label className="font-epilogue font-medium text-primary text-[13.1px] tracking-[-0.14px] leading-[16.8px]">
											Subject
										</label>

										<div className="relative w-full">
											<Input
												className="h-11 w-full shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 font-epilogue text-muted-foreground placeholder:text-muted-foreground "
												placeholder="I would like to..."
											/>
										</div>
									</div>

									<div className="flex items-center justify-between">
										<label className="text-muted-foreground flex items-center text-sm">
											<input
												type="checkbox"
												className="border-border text-primary h-4 w-4 rounded"
											/>
											<span className="ml-2">Remember me</span>
										</label>
										<a href="#" className="text-brand hover:text-brand/80 text-sm">
											Forgot password?
										</a>
									</div>

									<Button className="!py-3 h-auto relative rounded-full z-10 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
										Sign In To Your Account
									</Button>

									<div className="flex items-center justify-center relative text-center text-sm text-stone-500">
										<div className="border-border w-full border-t"></div>

										<span className="relative px-2 w-full z-10">
											Or continue with
										</span>

										<div className="border-border w-full border-t"></div>
									</div>

									<div className="grid grid-cols-1 gap-3">
										<button
											type="button"
											className="bg-[#353438] text-foreground hover:bg-[#353438]/80 flex items-center justify-center rounded-lg px-4 py-3 text-sm">
											<img
												src="https://www.svgrepo.com/show/475656/google-color.svg"
												className="h-5 w-5"
												alt="Google"
											/>
											<span className="ml-2">Google</span>
										</button>
									</div>
								</form>

								<div className="text-muted-foreground mt-8 text-center text-sm">
									Don&apos;t have an account?{" "}
									<a href="/signup" className="text-brand hover:text-brand/80">
										Sign up
									</a>
								</div>
							</div>
						</div>

						{/* Right Side */}
						<div className="hidden lg:flex brand-side relative m-4 rounded-3xl bg-[url('/images/signin-img.png')] bg-cover p-12 text-white" />
					</div>
				</div>
			</div>
		</div>
	);
}
