import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

// Initialize image builder (adjust to your Sanity config)
const builder = createImageUrlBuilder({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
});

function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export const components = {
	block: {
		h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h1 className={"mt-2 scroll-m-20 font-epilogue text-4xl font-bold"}>{children}</h1>
		),
		h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h2
				className={
					"mt-6 scroll-m-20 border-b pb-2 font-epilogue text-2xl font-semibold tracking-tight first:mt-0"
				}>
				{children}
			</h2>
		),
		h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h3 className={"mt-5 mb-3 scroll-m-20 font-epilogue text-xl font-semibold tracking-tight"}>
				{children}
			</h3>
		),
		h4: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h4 className={"mt-5 mb-3 scroll-m-20 font-epilogue text-lg font-semibold tracking-tight"}>
				{children}
			</h4>
		),
		h5: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h5 className={"mt-5 mb-3 scroll-m-20 text-lg font-semibold tracking-tight"}>{children}</h5>
		),
		h6: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h6 className={"mt-5 mb-3 scroll-m-20 text-base font-semibold tracking-tight"}>{children}</h6>
		),
		normal: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => (
			<p className={"leading-7 pt-2 pb-3"}>{children}</p>
		),
		blockquote: ({ children }: React.HTMLAttributes<HTMLElement>) => (
			<blockquote className={"my-6 border-l-2 pl-6 italic"}>{children}</blockquote>
		),
	},
	listItem: {
		bullet: ({ children }: React.HTMLAttributes<HTMLElement>) => (
			<li className={"mt-2"}>{children}</li>
		),
	},
	list: {
		bullet: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
			<ul className={"my-6 ml-6 list-disc"}>{children}</ul>
		),
		number: ({ children }: React.HTMLAttributes<HTMLOListElement>) => (
			<ol className={"my-6 ml-6 list-decimal"}>{children}</ol>
		),
	},
	marks: {
		link: ({ value, children }: any) => {
			const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
			return (
				<a
					href={value?.href}
					target={target}
					rel={target === "_blank" ? "noindex nofollow" : undefined}
					className={"font-medium underline underline-offset-4"}>
					{children}
				</a>
			);
		},
	},
	types: {
		image: ({ value }: any) => {
			if (!value?.asset?._ref) {
				return null;
			}

			return (
				<img
					className="rounded-md"
					src={urlFor(value).width(800).url()}
					alt={value.alt || "Article image"}
					loading="lazy"
				/>
			);
		},
	},
	hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="my-4 md:my-8" {...props} />
	),
	table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="my-6 w-full overflow-y-auto">
			<table className={"w-full"} {...props} />
		</div>
	),
	tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr className={"m-0 border-t p-0 even:bg-muted"} {...props} />
	),
	th: ({ ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<th
			className={
				"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
			}
			{...props}
		/>
	),
	td: ({ ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td
			className={
				"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
			}
			{...props}
		/>
	),
	code: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
		<code
			className={"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"}
			{...props}
		/>
	),
};
