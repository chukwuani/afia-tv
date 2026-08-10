"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SubmissionCTA() {
	return (
		<a
			href="/enugustory/submit"
			className={cn(
				buttonVariants({ variant: "default" }),
				"mt-4 relative z-10 text-xs text-[10px]! p-2 lg:px-4! lg:py-3 h-auto lg:text-[0.75rem]! tracking-[2.4px] uppercase",
			)}>
			Submit your Story
		</a>
	);
}
