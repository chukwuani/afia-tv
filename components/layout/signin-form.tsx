"use client";

import Image from "next/image";
import { useTransition } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/validation";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { unknownError } from "@/lib/utils";

type Inputs = z.infer<typeof loginSchema>;

export default function SignInForm() {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	const { register, handleSubmit } = useForm<Inputs>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSignin = (data: Inputs) => {
		startTransition(async () => {
			try {
				const {
					error,
				} = await supabase.auth.signInWithPassword({
					email: data.email,
					password: data.password,
				});

				if (error) {
					toast.error("Sign in Failed!", {
						description: error.message,
					});

					return;
				}

				toast.success("Authenticated", {
					description: "Sign in successful!",
				});

				router.push("/");
			} catch (error) {
				// TODO
				// console.log(error);

				toast.error("Sign in Failed!", {
					description: unknownError,
				});
			}
		});
	};

	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
			<div className="z-10 w-full max-w-6xl">
				<div className="bg-[#ffffff0b] overflow-hidden rounded-[40px] shadow-2xl">
					<div className="grid min-h-[700px] lg:grid-cols-2">
						{/* Left Side */}
						<div className="flex flex-col justify-center p-10">
							<div className="mx-auto w-full">
								<div className="flex mb-5">
									<span className="sr-only">Afia</span>
									<Image
										className="w-[80px] h-15 max-w-none"
										width={100}
										height={40}
										src="/images/afia_logo.svg"
										alt="Afia Logo"
									/>
								</div>

								<div className="space-y-6 mb-6">
									<h1 className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] mb-2 uppercase">
										Access your
										<br />
										account
									</h1>
									<p className="mt-6 text-sm font-outfit font-light text-muted-foreground max-w-prose text-pretty">
										Access your personalized experience — continue watching, save favorites, and
										stay updated with the latest stories from Southeast Nigeria.
									</p>
								</div>

								<form onSubmit={handleSubmit(handleSignin)} className="space-y-6">
									<div className="flex flex-col-reverse w-full items-start gap-[11px]">
										<Input
											className="h-11 w-full shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 text-white !text-base placeholder:text-muted-foreground relative peer"
											placeholder="m@example.com"
											{...register("email", { required: true })}
											type="email"
											id="email"
											required
										/>

										<label
											className="font-epilogue font-medium text-primary text-[13.1px] tracking-[-0.14px] leading-[16.8px] peer-valid:!text-muted-foreground"
											htmlFor="email">
											Email Address
										</label>
									</div>

									{/* Password Row */}
									<div className="flex flex-col-reverse w-full items-start gap-[11px]">
										<Input
											className="h-11 shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 text-white !text-base placeholder:text-muted-foreground peer relative w-full"
											placeholder="!wP3&zM7#kD2$qS"
											type="password"
											{...register("password", { required: true })}
											id="password"
											required
										/>

										<label
											className="font-epilogue font-medium text-primary text-[13.6px] tracking-[-0.14px] leading-[16.8px] peer-valid:!text-muted-foreground"
											htmlFor="password">
											Password
										</label>
									</div>

									<div className="flex items-center justify-end">
										{/* <label className="text-muted-foreground flex items-center text-sm">
											<input
												type="checkbox"
												className="border-border text-primary h-4 w-4 rounded"
											/>
											<span className="ml-2">Remember me</span>
										</label> */}

										<a href="/forgot-password" className="text-brand hover:text-brand/80 text-sm">
											Forgot password?
										</a>
									</div>

									<Button
										disabled={isLoading}
										type="submit"
										className="!py-3 h-auto relative rounded-full z-10 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
										Sign In To Your Account
									</Button>

									{/* <div className="flex items-center justify-center relative text-center text-sm text-stone-500">
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
									</div> */}
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
						<div className="hidden lg:flex brand-side relative m-4 rounded-3xl bg-[url('/images/signin-img.png')] bg-cover bg-center p-12 text-white" />
					</div>
				</div>
			</div>
		</div>
	);
}
