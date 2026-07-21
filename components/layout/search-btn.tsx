"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchButton() {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	// Focus input when popover opens
	useEffect(() => {
		if (open) {
			setTimeout(() => inputRef.current?.focus(), 50);
		} else {
			setInputValue("");
		}
	}, [open]);

	const handleSearch = (e?: React.FormEvent) => {
		e?.preventDefault();
		const trimmed = inputValue.trim();
		if (!trimmed) return;
		setOpen(false);
		router.push(`/search?q=${encodeURIComponent(trimmed)}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			{/* ── Trigger ───────────────────────────────────────────────── */}
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon">
					<Icons.search className="size-4" />
					<span className="sr-only">Search Button</span>
				</Button>
			</PopoverTrigger>

			{/* ── Popover Content ───────────────────────────────────────── */}
			<PopoverContent
				className="w-80 sm:w-96 p-4 rounded"
				align="end"
				sideOffset={8}>

				{/* Search form */}
				<form onSubmit={handleSearch} className="flex gap-2">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
						<Input
							ref={inputRef}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							placeholder="Search for news..."
							className="pl-9 rounded text-sm"
						/>
					</div>
					<Button
						type="submit"
						disabled={!inputValue.trim()}
						className="rounded text-[0.75rem] tracking-[2.4px] uppercase">
						Search
					</Button>
				</form>

				{/* Keyboard hints */}
				<p className="text-xs text-muted-foreground font-azeret-mono mt-3">
					Press{" "}
					<kbd className="px-1.5 py-0.5 border rounded text-[10px] bg-muted">
						Enter
					</kbd>{" "}
					to search ·{" "}
					<kbd className="px-1.5 py-0.5 border rounded text-[10px] bg-muted">
						Esc
					</kbd>{" "}
					to close
				</p>
			</PopoverContent>
		</Popover>
	);
}