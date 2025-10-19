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