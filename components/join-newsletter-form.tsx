"use client";

import React from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Icons } from "./icons";

import { cn, unknownError } from "@/lib/utils";
import { type EmailSchema, emailSchema } from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

const JoinNewsletterForm = () => {
	const [loading, setLoading] = React.useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		clearErrors,
	} = useForm<EmailSchema>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: EmailSchema) => {
		setLoading(true);
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/email/newsletter`, {
				email: data.email,
			});

			toast.success("Thank You for Joining Us!", {
				description: "You have been subscribed to our newsletter.",
			});

			reset();
		} catch (err) {
			// TODO
			//   Sentry.captureException(err);

			if (err instanceof AxiosError) {
				switch (err.status) {
					case 409:
						toast.error("You're Part of the Family", {
							description: "You are already subscribed to our newsletter.",
						});
						break;
					case 400:
						toast.error("Error", { description: "Invalid input." });
						break;
					default:
						toast.error("Subscription Unsuccessful", {
							description: unknownError,
						});
				}
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<section id="newsletter" aria-labelledby="newsletter-heading" className="space-y-3">
			<h4 className="text-[12px] leading-[16px] font-medium text-white uppercase font-jetbrains-mono">
				Subscribe to our newsletter
			</h4>
			<p
				className={cn(
					"text-xs font-medium max-w-[400px] text-muted-foreground transition-colors",
				)}>
				Join our newsletter to stay in the loop with our latest news, updates, and exclusive offers.
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{
					backgroundImage: "linear-gradient(0deg, #131313, #222)",
				}}
				className="flex gap-2 rounded overflow-hidden px-1 py-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-foreground focus-visible:outline-none">
				<Input
					{...register("email")}
					onChange={() => clearErrors("email")}
					autoComplete="email"
					type="email"
					placeholder="m@example.com"
					className={cn(
						"flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 rounded text-white",
						errors.email && "ring-2 !ring-destructive ring-offset-2",
					)}
					required
				/>
				<Button
					disabled={loading}
					className="bg-brand hover:bg-brand/90 text-white font-medium relative rounded"
					type="submit">
					{loading && (
						<Icons.spinner className="absolute mx-auto size-5 animate-spin" aria-hidden="true" />
					)}
					<p
						className={
							loading
								? "opacity-0 text-[0.75rem] tracking-[2.4px] uppercase font-haffer"
								: "text-[0.75rem] tracking-[2.4px] uppercase font-haffer"
						}>
						Subscribe
					</p>

					<span className="sr-only">Join newsletter</span>
				</Button>
			</form>
		</section>
	);
};
export default JoinNewsletterForm;
