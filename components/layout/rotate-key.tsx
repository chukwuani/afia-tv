"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, KeyRound } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RotateKey({ accessKey }: { accessKey: string }) {
	const router = useRouter();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [isRotating, setIsRotating] = useState(false);
	const [newKey, setNewKey] = useState<string | null>(null);

	const handleRotate = async () => {
		setIsRotating(true);

		try {
			const res = await fetch(`/api/admin/rotate-key?ak=${accessKey}`, { method: "POST" });
			const result = await res.json();

			if (!res.ok) {
				throw new Error(typeof result?.error === "string" ? result.error : "Failed to rotate key");
			}

			setConfirmOpen(false);
			setNewKey(result.newKey);

			// Swap the current session over to the new key immediately, so the
			// admin isn't locked out of the page they're already looking at.
			const url = new URL(window.location.href);
			url.searchParams.set("ak", result.newKey);
			router.replace(`${url.pathname}${url.search}`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setIsRotating(false);
		}
	};

	const handleCopyNewKey = async () => {
		if (!newKey) return;

		try {
			await navigator.clipboard.writeText(newKey);
			toast.success("New key copied");
		} catch {
			toast.error("Couldn't copy — copy it manually below");
		}
	};

	// Once rotation succeeds, the new key is shown exactly once and must be
	// acknowledged before it can be dismissed — there's no way to retrieve it again.
	if (newKey) {
		return (
			<AlertDialog open>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Your new access key</AlertDialogTitle>
						<AlertDialogDescription>
							Save this now — it won't be shown again, and your old link no longer works.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="bg-muted/50 flex items-center gap-2 rounded-md border px-3 py-2">
						<code className="flex-1 break-all text-sm">{newKey}</code>
						<button
							type="button"
							onClick={handleCopyNewKey}
							className="text-muted-foreground hover:text-foreground shrink-0"
							title="Copy new key">
							<Copy className="h-4 w-4" />
						</button>
					</div>
					<AlertDialogFooter>
						<AlertDialogAction onClick={() => setNewKey(null)}>I've saved it</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	}

	return (
		<AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="outline" size="sm">
					<KeyRound className="mr-1.5 h-3.5 w-3.5" />
					Rotate my key
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Rotate your access key?</AlertDialogTitle>
					<AlertDialogDescription>
						Your current link stops working immediately. You'll get a new one to save — make sure
						you can copy it down before continuing.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isRotating}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleRotate} disabled={isRotating}>
						{isRotating ? "Rotating..." : "Yes, rotate it"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
