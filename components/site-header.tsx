import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";

export function SiteHeader() {
	return (
		<header>
			<div className="flex items-center justify-between px-4 py-2 bg-white border-b">
				<div className="flex space-x-4">
					<Link
						href="#"
						className="text-gray-600 hover:text-gray-900">
						<FacebookIcon className="w-4 h-4" />
					</Link>
					<Link
						href="#"
						className="text-gray-600 hover:text-gray-900">
						<TwitterIcon className="w-4 h-4" />
					</Link>
					<Link
						href="#"
						className="text-gray-600 hover:text-gray-900">
						<YoutubeIcon className="w-4 h-4" />
					</Link>
					<Link
						href="#"
						className="text-gray-600 hover:text-gray-900">
						<InstagramIcon className="w-4 h-4" />
					</Link>
				</div>

				<Link
					href="/"
					className="text-xl font-serif">
					<Image
						src={"/logo.png"}
						alt="Logo"
						width={150}
						height={25}
					/>
				</Link>

				<div className="flex items-center space-x-2">
					<Phone className="w-4 h-4" />
					<span className="text-sm">0890717-515</span>
				</div>
			</div>
		</header>
	);
}

function FacebookIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
		</svg>
	);
}

function TwitterIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
		</svg>
	);
}

function YoutubeIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
			<path d="m10 15 5-3-5-3z" />
		</svg>
	);
}

function InstagramIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<rect
				width="20"
				height="20"
				x="2"
				y="2"
				rx="5"
				ry="5"
			/>
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line
				x1="17.5"
				x2="17.51"
				y1="6.5"
				y2="6.5"
			/>
		</svg>
	);
}
