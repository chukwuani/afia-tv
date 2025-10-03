import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function RateCard() {
	return (
		<div className="py-10 px-6 md:px-10 lg:px-20">
			<div className="w-full flex max-lg:flex-col bg-brand bg-[url('/images/rate-card-bg.png')] bg-cover bg-center bg-no-repeat rounded-3xl shadow-sm">
				<section className="py-10 px-10">
					<h1 className="text-4xl sm:text-5xl font-normal -tracking-[.053rem] font-epilogue mb-6">
						Reach the heart of Ala Igbo.
					</h1>

					<p className="font-dm-sans font-medium tracking-[.009rem] text-white text-base leading-[28px] mb-8">
						Whether you&apos;re launching a product, hosting an event, or building awareness — Afia TV helps you connect through authentic media and targeted campaigns.
					</p>

					<Link
						href="#"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							buttonVariants({ variant: "default" }),
							"inline-block hover:bg-white bg-white text-brand px-8 !py-3 rounded-full font-medium uppercase tracking-wide !text-sm h-auto"
						)}>
						View Rate Card
					</Link>
				</section>

				<div className="h-auto max-w-[600px] w-full rounded-2xl rounded-b-none overflow-hidden relative">
					<img
						className="size-full rounded-[12px] rounded-b-none object-cover"
						alt=""
						src={"/images/tv-bg.png"}
					/>
				</div>
			</div>
		</div>
	);
}

export default RateCard;
