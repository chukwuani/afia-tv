"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import RotateKey from "@/components/layout/rotate-key";

type SubmissionRow = {
	id: string;
	contestantId: number;
	fullName: string;
	age: number;
	stateOfOrigin: string;
	community: string;
	entryTitle: string;
	category: string;
	phone: string;
	email: string;
	instagramLink: string;
	caption: string | null;
	fileUrl: string;
	photoUrl: string;
	status: string;
	approvedBy: string | null;
	reviewedAt: Date | null;
	createdAt: Date;
};

type LastExport = { adminName: string; exportedAt: string } | null;

const CATEGORY_OPTIONS = [
	{ value: "all", label: "All categories" },
	{ value: "essay", label: "Essay" },
	{ value: "videography", label: "Videography" },
	{ value: "photography", label: "Photography" },
];

function StatusBadge({ status }: { status: string }) {
	const styles: Record<string, string> = {
		pending: "bg-yellow-100 text-yellow-800",
		approved: "bg-green-100 text-green-800",
		rejected: "bg-red-100 text-red-800",
	};

	return (
		<span
			className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[status] ?? ""}`}>
			{status}
		</span>
	);
}

export default function AdminDashboard({
	submissions,
	adminName,
	accessKey,
	lastExport,
}: {
	submissions: SubmissionRow[];
	adminName: string;
	accessKey: string;
	lastExport: LastExport;
}) {
	const [rows, setRows] = useState(submissions);
	const [pendingId, setPendingId] = useState<string | null>(null);
	const [categoryFilter, setCategoryFilter] = useState("all");

	const handleReview = async (id: string, action: "approve" | "reject") => {
		setPendingId(id);

		try {
			const res = await fetch(`/api/admin/submissions/${id}/review?ak=${accessKey}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action }),
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(
					typeof result?.error === "string" ? result.error : "Failed to update submission",
				);
			}

			setRows((prev) =>
				prev.map((row) =>
					row.id === id
						? { ...row, status: result.submission.status, approvedBy: result.submission.approvedBy }
						: row,
				),
			);

			toast.success(`Submission ${action === "approve" ? "approved" : "rejected"}`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setPendingId(null);
		}
	};

	const handleExport = () => {
		const query = categoryFilter === "all" ? "" : `&category=${categoryFilter}`;
		window.open(`/api/admin/export?ak=${accessKey}${query}`, "_blank");
	};

	const handleCopyCaption = async (caption: string) => {
		try {
			await navigator.clipboard.writeText(caption);
			toast.success("Caption copied");
		} catch {
			toast.error("Couldn't copy — your browser may be blocking clipboard access");
		}
	};

	const visibleRows =
		categoryFilter === "all" ? rows : rows.filter((r) => r.category === categoryFilter);

	return (
		<div className="mx-auto max-w-7xl space-y-4 p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-xl font-semibold">Submissions</h1>
					<p className="text-muted-foreground text-sm">
						Logged in as {adminName}
						{lastExport && (
							<>
								{" · "}Last exported by {lastExport.adminName} on{" "}
								{new Date(lastExport.exportedAt).toLocaleString("en-NG")}
							</>
						)}
					</p>
				</div>

				<div className="flex items-center gap-2">
					<Select defaultValue={categoryFilter} onValueChange={(e) => setCategoryFilter(e)}>
						<SelectTrigger className="w-full" id="category">
							<SelectValue placeholder="Select category" />
						</SelectTrigger>
						<SelectContent>
							{CATEGORY_OPTIONS.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Button onClick={handleExport}>Export to Excel</Button>

					<RotateKey accessKey={accessKey} />
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg border">
				<table className="w-full text-sm">
					<thead className="bg-muted/50 text-left">
						<tr>
							<th className="px-3 py-2">ID</th>
							<th className="px-3 py-2">Name</th>
							<th className="px-3 py-2">Category</th>
							<th className="px-3 py-2">Entry Title</th>
							<th className="px-3 py-2">Caption</th>
							<th className="px-3 py-2">State</th>
							<th className="px-3 py-2">Contact</th>
							<th className="px-3 py-2">Files</th>
							<th className="px-3 py-2">Status</th>
							<th className="px-3 py-2">Reviewed By</th>
							<th className="px-3 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{visibleRows.map((row) => (
							<tr key={row.id} className="border-t">
								<td className="px-3 py-2 font-mono">{row.contestantId}</td>
								<td className="px-3 py-2">
									{row.fullName}
									<div className="text-muted-foreground text-xs">
										{row.age} yrs · {row.community}
									</div>
								</td>
								<td className="px-3 py-2 capitalize">{row.category}</td>
								<td className="px-3 py-2">{row.entryTitle}</td>
								<td className="max-w-55 px-3 py-2">
									{row.caption ? (
										<div className="flex items-start gap-1.5">
											<span className="line-clamp-2 text-xs" title={row.caption}>
												{row.caption}
											</span>
											<button
												type="button"
												onClick={() => handleCopyCaption(row.caption!)}
												className="text-muted-foreground hover:text-foreground shrink-0"
												title="Copy full caption">
												<Copy className="h-3.5 w-3.5" />
											</button>
										</div>
									) : (
										<span className="text-muted-foreground">—</span>
									)}
								</td>
								<td className="px-3 py-2 capitalize">{row.stateOfOrigin}</td>
								<td className="px-3 py-2">
									<div>{row.phone}</div>
									<div className="text-muted-foreground text-xs">{row.email}</div>
								</td>
								<td className="px-3 py-2 space-x-2">
									<a
										className="text-blue-600 underline"
										href={row.fileUrl}
										target="_blank"
										rel="noreferrer">
										Entry
									</a>
									<a
										className="text-blue-600 underline"
										href={row.photoUrl}
										target="_blank"
										rel="noreferrer">
										Photo
									</a>
								</td>
								<td className="px-3 py-2">
									<StatusBadge status={row.status} />
								</td>
								<td className="px-3 py-2">{row.approvedBy ?? "—"}</td>
								<td className="px-3 py-2">
									<div className="flex gap-2">
										<Button
											size="sm"
											variant="outline"
											disabled={pendingId === row.id || row.status === "approved"}
											onClick={() => handleReview(row.id, "approve")}>
											Approve
										</Button>
										<Button
											size="sm"
											variant="outline"
											disabled={pendingId === row.id || row.status === "rejected"}
											onClick={() => handleReview(row.id, "reject")}>
											Reject
										</Button>
									</div>
								</td>
							</tr>
						))}
						{visibleRows.length === 0 && (
							<tr>
								<td colSpan={11} className="text-muted-foreground px-3 py-8 text-center">
									No submissions in this category yet.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
