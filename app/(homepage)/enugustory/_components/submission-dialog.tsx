"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubmissionForm from "./submission-form";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SubmissionDialog() {
	const searchParams = useSearchParams();
	const [open, setOpen] = useState(false);

	const isTestAccess = searchParams.get("test") === "alpha";

	if (!isTestAccess) {
		return (
			<Button
				onClick={() => {
					toast.info("Submissions would open soon!", {
						description: "Submissions are currently closed. Please check back later.",
					});
				}}
				variant={"default"}
				className={
					"relative z-10 text-xs text-[10px]! p-2 lg:px-4! lg:py-3 h-auto lg:text-[0.75rem]! tracking-[2.4px] uppercase"
				}>
				Submit your Story
			</Button>
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{isTestAccess && (
					<Button
						variant={"default"}
						className={
							"relative z-10 text-xs text-[10px]! p-2 lg:px-4! lg:py-3 h-auto lg:text-[0.75rem]! tracking-[2.4px] uppercase"
						}>
						Submit your Story
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 overflow-y-auto p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
				<DialogDescription className="sr-only">
					Submit your story to the My Enugu Story competition
				</DialogDescription>
				<DialogHeader className="contents space-y-0 text-left">
					<DialogTitle className="border-b px-6 py-4 text-base">
						My Enugu Story Submission
					</DialogTitle>
				</DialogHeader>
				<ScrollArea className="h-[calc(100vh-4rem)] overflow-y-auto">
					<SubmissionForm setOpen={setOpen} />
				</ScrollArea>
			</DialogContent>
			' '
		</Dialog>
	);
}
