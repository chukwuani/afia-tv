"use client";

import { usePathname } from "next/navigation";

import {
	FacebookShareButton,
	FacebookIcon,
	RedditShareButton,
	RedditIcon,
	TelegramShareButton,
	TelegramIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon,
	EmailIcon,
	EmailShareButton,
	LinkedinIcon,
	LinkedinShareButton,
} from "next-share";
import { absoluteUrl } from "@/lib/utils";

const Share = ({ title }: { title: string }) => {
	const pathname = usePathname();
	const url = absoluteUrl(pathname);

	return (
		<section className="flex flex-col gap-4">
			<p className="text-sm font-medium uppercase">Share :</p>

			<section className="flex gap-2">
				<FacebookShareButton
					url={url}
					quote={title}>
					<FacebookIcon
						size={32}
						round
					/>
				</FacebookShareButton>

				<RedditShareButton
					url={url}
					title={title}>
					<RedditIcon
						size={32}
						round
					/>
				</RedditShareButton>

				<TelegramShareButton
					url={url}
					title={title}>
					<TelegramIcon
						size={32}
						round
					/>
				</TelegramShareButton>

				<TwitterShareButton
					url={url}
					title={title}>
					<TwitterIcon
						size={32}
						round
					/>
				</TwitterShareButton>

				<LinkedinShareButton
					url={url}
					title={title}>
					<LinkedinIcon
						size={32}
						round
					/>
				</LinkedinShareButton>

				<WhatsappShareButton
					url={url}
					title={title}
					separator=":: ">
					<WhatsappIcon
						size={32}
						round
					/>
				</WhatsappShareButton>

				<EmailShareButton
					url={url}
					subject={title}
					body={url}>
					<EmailIcon
						size={32}
						round
					/>
				</EmailShareButton>
			</section>
		</section>
	);
};
export default Share;
