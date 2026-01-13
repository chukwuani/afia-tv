import { Metadata } from "next"
import { PortableText } from "@portabletext/react";
import axios from "axios";

import {
	PageHeader,
	PageHeaderDescription,
	PageHeaderHeading,
} from "@/components/layout/page-header";
import { Shell } from "@/components/shell";
import { components } from "@/components/portable-component";

import { TypedObject } from "@/types";

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default async function PrivacyPage() {
	const query = `*[_type == "tvPrivacy"][0]{
     body
    }`;

	const res = await axios.post(
		`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
		{
			query,
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	);

	const privacy = res.data.result;

	const content: TypedObject[] = privacy?.body;

	return (
		<Shell as="article" variant="content">
			<PageHeader>
				<PageHeaderHeading className="text-brand font-anton text-[36px] md:text-[50px] leading-[1.1em] font-normal tracking-[.5px] uppercase">Privacy Policy</PageHeaderHeading>
				<PageHeaderDescription>Protecting Your Data is Our Priority.</PageHeaderDescription>
			</PageHeader>

			<PortableText value={content} components={components} />
		</Shell>
	);
}
