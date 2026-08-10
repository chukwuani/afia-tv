"use client";

import { useState } from "react";
import { Copy, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import RotateKeyDialog from "@/components/layout/rotate-key";

import { NIGERIAN_STATE_LABELS, STATE_OF_RESIDENCE_LABELS } from "@/lib/validations/submission";

type SubmissionRow = {
	id: string;
	contestantId: number;
	fullName: string;
	dateOfBirth: string;
	gender: string;
	stateOfOrigin: keyof typeof NIGERIAN_STATE_LABELS;
	stateOfResidence: keyof typeof STATE_OF_RESIDENCE_LABELS;
	address: string;
	entryTitle: string;
	category: string;
	phone: string;
	email: string;
	instagramLink: string;
	caption: string | null;
	fileUrl: string;
	fileUrlTwo: string | null;
	photoUrl: string;
	status: string;
	approvedBy: string | null;
	reviewedAt: Date | null;
	flaggedForReview: boolean;
	flagReason: string | null;
	createdAt: Date;
};

type LastExport = { adminName: string; exportedAt: string } | null;
type ReviewAction = "approve" | "reject" | "disqualify";

const CATEGORY_OPTIONS = [
	{ value: "all", label: "All categories" },
	{ value: "essay", label: "Essay" },
	{ value: "videography", label: "Videography" },
	{ value: "photography", label: "Photography" },
];

const ACTION_PAST_TENSE: Record<ReviewAction, string> = {
	approve: "approved",
	reject: "rejected",
	disqualify: "disqualified",
};

function StatusBadge({ status }: { status: string }) {
	const styles: Record<string, string> = {
		pending: "bg-yellow-100 text-yellow-800",
		approved: "bg-green-100 text-green-800",
		rejected: "bg-red-100 text-red-800",
		disqualified: "bg-black text-white",
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
	const [confirmDisqualifyId, setConfirmDisqualifyId] = useState<string | null>(null);

	const handleReview = async (id: string, action: ReviewAction) => {
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

			toast.success(`Submission ${ACTION_PAST_TENSE[action]}`);

			if (action === "disqualify") {
				toast.info(
					"This contestant is now blocked from submitting to any category — not just this one.",
				);
			}
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
					<p className="text-muted-foreground text-sm">Logged in as {adminName}</p>
					<p className="text-muted-foreground text-sm">
						{lastExport && (
							<>
								Last exported by {lastExport.adminName} on{" "}
								{new Date(lastExport.exportedAt).toLocaleString("en-NG").slice(0, 10)}
							</>
						)}
					</p>
					<div className="flex items-center gap-2 mt-2">
						<Button
							className="inline-flex text-xs text-[10px]! font-normal px-2! h-7"
							onClick={handleExport}>
							Export Excel
						</Button>
						<RotateKeyDialog accessKey={accessKey} />
					</div>
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
							<th className="px-3 py-2">Location</th>
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
								<td className="px-3 py-2 font-mono">
									<div className="flex items-center gap-1.5">
										{row.contestantId}
										{row.flaggedForReview && (
											<span title={row.flagReason ?? "Flagged for review"}>
												<TriangleAlert
													className="h-3.5 w-3.5 text-amber-600"
													aria-label={row.flagReason ?? "Flagged for review"}
												/>
											</span>
										)}
									</div>
								</td>
								<td className="px-3 py-2">
									{row.fullName}
									<div className="text-muted-foreground text-xs capitalize">
										{row.gender} · {row.dateOfBirth}
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
								<td className="max-w-[180px] px-3 py-2">
									<div>Origin: {NIGERIAN_STATE_LABELS[row.stateOfOrigin] ?? row.stateOfOrigin}</div>
									<div className="text-muted-foreground text-xs">
										Resides:{" "}
										{STATE_OF_RESIDENCE_LABELS[row.stateOfResidence] ?? row.stateOfResidence}
									</div>
									<div className="text-muted-foreground truncate text-xs" title={row.address}>
										{row.address}
									</div>
								</td>
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
									{row.fileUrlTwo && (
										<a
											className="text-blue-600 underline"
											href={row.fileUrlTwo}
											target="_blank"
											rel="noreferrer">
											Entry2
										</a>
									)}
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
									<div className="flex flex-wrap gap-2">
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
										<Button
											size="sm"
											variant="outline"
											className="text-red-700 hover:text-red-800"
											disabled={pendingId === row.id || row.status === "disqualified"}
											onClick={() => setConfirmDisqualifyId(row.id)}>
											Disqualify
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

			<AlertDialog
				open={confirmDisqualifyId !== null}
				onOpenChange={(open) => !open && setConfirmDisqualifyId(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Disqualify this contestant?</AlertDialogTitle>
						<AlertDialogDescription>
							This blocks them from submitting to any category going forward, not just this one —
							and they won't be able to resubmit even a rejected entry. This can't be undone from
							the dashboard.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								if (confirmDisqualifyId) handleReview(confirmDisqualifyId, "disqualify");
								setConfirmDisqualifyId(null);
							}}>
							Yes, disqualify
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
