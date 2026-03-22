import { Button } from "@/components/ui/button";
import { comingSoonMsg } from "@/lib/utils";

import { toast } from "sonner";

function GuestCard() {
	return (
		<div className="py-10 px-6 md:px-10 lg:px-20 mx-auto w-fit">
			<div className="w-auto flex max-lg:flex-col bg-brand min-h-[380px] bg-cover bg-center bg-no-repeat rounded-3xl shadow-sm px-10">
				<section className="py-10 pr-10 max-w-[600px]">
					<h1 className="text-4xl sm:text-5xl font-normal -tracking-[.053rem] font-epilogue mb-6">
						Be a Guest
					</h1>

					<p className="font-outfit font-medium tracking-[.009rem] text-white text-base leading-[28px] mb-8">
						Do you have a voice, story, or expertise worth sharing? We&apos;re always looking for
						new guests, community voices, and collaborators.
					</p>

					<Button
						variant={"default"}
						onClick={() => {
							toast.info("Coming Soon!", {
								description: comingSoonMsg,
							});
						}}
						className="inline-block hover:bg-white bg-white text-brand px-8 !py-3 rounded-full font-medium uppercase tracking-wide !text-sm h-auto">
						Apply to be a guest
					</Button>
				</section>

				<div className="h-auto max-w-[350px] w-full rounded-2xl rounded-b-none overflow-hidden relative">
					<img
						className="size-full rounded-b-none object-cover"
						alt="Golden Mic"
						src={"/images/golden-mic.png"}
					/>
				</div>
			</div>
		</div>
	);
}

export default GuestCard;
