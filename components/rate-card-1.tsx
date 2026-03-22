import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function RateCard() {
	return (
		<div className="py-10 px-6 md:px-10 lg:px-20">
			<div className="w-full flex max-lg:flex-col bg-brand bg-[url('/images/rate-card-bg.png')] bg-cover bg-center bg-no-repeat rounded-3xl shadow-sm">
				<section className="py-10 px-10 pt-[100px]">
					<h1 className="font-anton text-[36px] md:text-[60px] leading-[1.1em] font-normal tracking-[.5px] mb-6 uppercase max-w-[450px]">
						Reach the heart of Ala Igbo.
					</h1>

					<p className="font-outfit text-white text-sm leading-[140%] tracking-[.009rem] mb-8">
						Whether you&apos;re launching a product, hosting an event, or building awareness, Afia TV helps you connect through authentic media and targeted campaigns.
					</p>

					<Link
						href="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL4RIK8VizxD8EQMhz3iSJTrCt10AGjfnYVkHZB"
						target="_blank"
						rel="noreferrer"
						className={cn(
							buttonVariants({ variant: "outline" }),
							"inline-flex font-normal rounded-full text-xs lg:text-base w-fit py-3 px-6 lg:py-5 lg:px-8 h-auto uppercase tracking-[2.4px]"
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
