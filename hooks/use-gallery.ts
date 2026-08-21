"use client";

import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import type { CategoryFilter, GallerySubmission, SubmissionOrigin, Voter } from "@/lib/gallery";

// --- Submissions (paginated) ------------------------------------------------

interface SubmissionsPage {
	submissions: GallerySubmission[];
	totalCount: number;
	page: number;
	pageSize: number;
}

async function fetchSubmissions(params: {
	origin: SubmissionOrigin;
	category: CategoryFilter;
	page: number;
	pageSize: number;
}): Promise<SubmissionsPage> {
	const search = new URLSearchParams({
		origin: params.origin,
		status: "approved",
		page: String(params.page),
		pageSize: String(params.pageSize),
	});
	if (params.category !== "all") search.set("category", params.category);

	const res = await fetch(`/api/submissions?${search.toString()}`);
	if (!res.ok) throw new Error("Failed to load submissions.");
	return res.json();
}

export function useSubmissions(params: {
	origin: SubmissionOrigin;
	category: CategoryFilter;
	page: number;
	pageSize: number;
}) {
	return useQuery({
		queryKey: ["submissions", params.origin, params.category, params.page, params.pageSize],
		queryFn: () => fetchSubmissions(params),
		// Keep showing the current page's data while the next page loads,
		// instead of flashing a loading state on every page click.
		placeholderData: keepPreviousData,
	});
}

// --- Leaderboard -------------------------------------------------------

async function fetchLeaderboard(params: {
	origin: SubmissionOrigin;
	category: CategoryFilter;
	limit?: number;
}): Promise<{ leaderboard: GallerySubmission[] }> {
	const search = new URLSearchParams({ origin: params.origin, limit: String(params.limit ?? 10) });
	if (params.category !== "all") search.set("category", params.category);

	const res = await fetch(`/api/leaderboard?${search.toString()}`);
	if (!res.ok) throw new Error("Failed to load leaderboard.");
	return res.json();
}

export function useLeaderboard(params: { origin: SubmissionOrigin; category: CategoryFilter }) {
	return useQuery({
		queryKey: ["leaderboard", params.origin, params.category],
		queryFn: () => fetchLeaderboard(params),
	});
}

// --- Voter session -------------------------------------------------------

async function fetchVoter(): Promise<Voter | null> {
	const res = await fetch("/api/voters/me");
	if (res.status === 401) return null;
	if (!res.ok) throw new Error("Failed to load voter session.");
	return res.json();
}

export function useVoter() {
	return useQuery({ queryKey: ["voter"], queryFn: fetchVoter });
}

// --- Voting mutations -------------------------------------------------------

export function useRequestOtp() {
	return useMutation({
		mutationFn: async (email: string) => {
			const res = await fetch("/api/voters/verify-email/request", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result?.error ?? "Could not send the code.");
			return result as { verificationId: string };
		},
	});
}

export function useConfirmOtp() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (opts: { verificationId: string; code: string }) => {
			const res = await fetch("/api/voters/verify-email/confirm", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(opts),
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result?.error ?? "That code didn't work.");
			return result.voter as Voter;
		},
		onSuccess: (voter) => {
			// Seed the voter query directly instead of refetching — we already
			// have the fresh row from the response.
			queryClient.setQueryData(["voter"], voter);
		},
	});
}

export function useCastFreeVote() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (submissionId: string) => {
			const res = await fetch("/api/votes/free", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ submissionId }),
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result?.error ?? "Couldn't cast your vote.");
			return result as { voteCount: number };
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["submissions"] });
			queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
			queryClient.invalidateQueries({ queryKey: ["voter"] });
		},
	});
}

export function useBuyVotes() {
	return useMutation({
		mutationFn: async (opts: { submissionId: string; quantity: number }) => {
			const res = await fetch("/api/vote-purchases", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(opts),
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result?.error ?? "Couldn't start checkout.");
			return result as { checkoutUrl: string };
		},
		// No cache invalidation here — a paid vote only gets credited once
		// Stripe's webhook confirms the payment, which happens after this
		// resolves. The redirect to Stripe (and back) is what refreshes state.
	});
}