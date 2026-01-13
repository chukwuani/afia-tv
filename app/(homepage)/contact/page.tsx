import { Metadata } from "next";
import ContactForm from "@/app/(homepage)/contact/_components/contact-form";

export const metadata: Metadata = {
	title: "Contact",
};

export default function Component() {
	return (
		<div className="w-full min-h-screen bg-background p-6 lg:p-12 flex items-center justify-center">
			<div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
				<div className="space-y-12">
					<div className="space-y-6">
						<h1 className="text-5xl font-normal tracking-tight">How can we help you?</h1>
						<p className="mt-6 text-lg font-san font-light text-muted-foreground max-w-prose text-pretty">
							Whether you have a question, feedback, or just want to say hello, feel free to reach
							out. Our team is here to help and will get back to you as soon as possible.
						</p>
					</div>

					<div className="space-y-6">
						<div className="space-y-1">
							<h3 className="text-xl">Visit our office</h3>
							<p className="text-muted-foreground font-light">
								Plot 7 Ikeje Asogwa Dr, Coal City Garden Estate, GRA, Enugu 400102, Enugu
							</p>
						</div>

						<div className="space-y-1">
							<h3 className="text-xl">Support</h3>
							<a href="mailto:support@afiatv.net" className="text-muted-foreground font-light">
								info@afiatv.net
							</a>
						</div>

						<div className="space-y-1">
							<h3 className="text-xl">Sales</h3>
							<a href="mailto:sales@afiatv.net" className="text-muted-foreground font-light">
								sales@afiatv.net
							</a>
						</div>
					</div>
				</div>

				<ContactForm />
			</div>
		</div>
	);
}
