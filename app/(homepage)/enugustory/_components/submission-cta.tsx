"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SubmissionCTA() {
	const searchParams = useSearchParams();

	const isTestAccess = searchParams.get("test") === "alpha";

	if (!isTestAccess) {
		return (
			<Button
				onClick={() => {
					toast.info("Submissions would open soon!", {
						description: "Submissions are currently closed. Please check back later.",
					});
				}}
				className={
					"mt-4 relative z-10 text-xs text-[10px]! p-2 lg:px-4! lg:py-3 h-auto lg:text-[0.75rem]! tracking-[2.4px] uppercase"
				}>
				Submit your Story
			</Button>
		);
	}

	return (
		<>
			{isTestAccess && (
				<a
					href="/enugustory/submit?test=alpha"
					className={cn(
						buttonVariants({ variant: "default" }),
						"mt-4 relative z-10 text-xs text-[10px]! p-2 lg:px-4! lg:py-3 h-auto lg:text-[0.75rem]! tracking-[2.4px] uppercase",
					)}>
					Submit your Story
				</a>
			)}
		</>
	);
}
