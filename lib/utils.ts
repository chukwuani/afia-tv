import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const unknownError = "An unknown error occurred. Please try again later."
export const networkError = "A network error occurred. Please check your connection and try again."
export const comingSoonMsg = "We're working hard on this feature. Check back soon!"

export function formatDate(date: Date | string | number, options: Intl.DateTimeFormatOptions = {}) {
	return new Intl.DateTimeFormat("en-US", {
		month: options.month ?? "long",
		day: options.day ?? "numeric",
		year: options.year ?? "numeric",
		...options,
	}).format(new Date(date));
}

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatBytes(
	bytes: number,
	opts: {
		decimals?: number;
		sizeType?: "accurate" | "normal";
	} = {}
) {
	const { decimals = 0, sizeType = "normal" } = opts;

	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
	if (bytes === 0) return "0 Byte";
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
		sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
	}`;
}
