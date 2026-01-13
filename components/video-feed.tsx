import { Button } from "./ui/button";

export default function VideoFeed() {
	const newsFeedOne = [
		{
			id: 1,
			imgSrc:
				"https://cdn.theatlantic.com/thumbor/zk0bFQKmWgZQj06EIAnsuC4UuCg=/0x0:2000x1125/976x549/media/img/mt/2025/11/2025_11_21_Powell_Trump_Mamdani_meeting_final/original.png",
			title: "Why Donald Trump Seems Taken With Zohran Mamdani",
			description:
				"The success of obesity drug Mounjaro turned Eli Lilly into the first $1 trillion drugmaker on Friday, while Danish rival Novo Nordisk is languishing at the bottom of the Stoxx 600 after a key trial for an Alzheimer's drug failed. Investor Peter Andersen told",
		},
	];

	const newsFeed = [
		{
			id: 2,
			imgSrc:
				"https://cdn.theatlantic.com/thumbor/tMpoxoxRobo8cPpUqoyjr31KdKw=/155x1:1842x1124/296x197/media/img/mt/2025/05/tattoos3/original.jpg",
			title: "Why Microchaneling Outdoes Microneedling Every Time",
			description:
				"Much more cost-effective than renovating, freshen up your space by swapping out your counter stools.",
		},
		{
			id: 3,
			imgSrc:
				"https://cdn.theatlantic.com/thumbor/J9OIm97vOY48IMeymeWob7hlQRY=/396x3:4631x2822/296x197/media/img/mt/2025/05/2025_04_25_Books_Briefing_Books_that_make_you_want_to_leave_the_house/original.jpg",
			title: "Sunlighten Full Spectrum Infrared Sauna Explained by Inventor",
			description:
				"A wicker chair outside is a comfortable sight to see, but there's a natural warmth that the look brings inside.",
		},
		{
			id: 4,
			imgSrc:
				"https://cdn.theatlantic.com/thumbor/s66-hICZi-Pk7ZYeGSNSUNhGP9w=/71x2:3928x2569/296x197/media/img/mt/2025/04/14_B_General-1/original.jpg",
			title: "Sunlighten Full Spectrum Infrared Sauna Explained by Inventor",
			description:
				"A wicker chair outside is a comfortable sight to see, but there's a natural warmth that the look brings inside.",
		},
		{
			id: 5,
			imgSrc:
				"https://cdn.theatlantic.com/thumbor/it2Ol7Wzi76aT2g8NB9IZo5UOWQ=/155x1:1842x1124/296x197/media/img/mt/2025/11/2025_11_20_Florko_Gas_station_weed_final/original.png",
			title: "Sunlighten Full Spectrum Infrared Sauna Explained by Inventor",
			description:
				"A wicker chair outside is a comfortable sight to see, but there's a natural warmth that the look brings inside.",
		},
	];

	return (
		<section className="flex flex-col pb-10 bg-accent">
			<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 sm:px-12">
				<section className="py-10 pb-0 lg:col-span-2">
					<h2 className="text-3xl mb-10 max-sm:px-6 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
						Top Video News
					</h2>

					<div className="grid grid-cols-1 gap-8">
						{newsFeedOne.map((item) => (
							<div key={item.id} className="flex flex-col">
								<section className="w-full aspect-video object-cover mb-4 bg-muted">
									<iframe width="100%" height="100%" src="https://www.youtube.com/embed/_U4Y71eKDys?si=rP2gQrIEhcmtBW6E" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
								</section>

								<section className="max-sm:px-6">
									<section className="flex gap-2 items-center mb-2">
										<p className="text-xs text-muted-foreground font-medium capitalize">
											November 24, 2025 ·{" "}
										</p>
										<p className="text-xs text-muted-foreground font-medium inline-flex capitalize">
											12:56 PM
										</p>
									</section>

									<h3 className="font-anton uppercase text-[24px] sm:text-[28px] md:text-[32px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
										{item.title}
									</h3>
									<p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-2">
										{item.description}
									</p>
								</section>
							</div>
						))}
					</div>
				</section>

				<section className="py-10 pb-0 lg:col-span-1">
					<h2 className="text-3xl mb-10 max-sm:px-6 tracking-[.009rem] text-brand font-anton text-[36px] leading-[1.1em] font-normal uppercase">
						Up Next
					</h2>

					<div className="grid grid-cols-1 gap-6 max-sm:px-6">
						{newsFeed.map((item) => (
							<div className="flex items-start justify-center gap-4" key={item.id}>
								<section className="relative w-full max-w-[120px] aspect-square">
									<img
										src={item.imgSrc}
										alt="Skincare Blog"
										className="w-full max-w-[120px] aspect-square object-cover bg-muted"
									/>

									<section className="size-11 bg-black p-2 flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="128"
											height="128"
											viewBox="0 0 24 24"
											fill="none"
											data-src="https://cdn.hugeicons.com/icons/play-solid-rounded.svg?v=1.0.1"
											role="img"
											color="#FFFFFF">
											<path
												d="M13.9405 6.337C15.5735 7.26468 16.8567 7.99369 17.7709 8.66148C18.6913 9.33386 19.3721 10.0366 19.6159 10.9632C19.7947 11.6426 19.7947 12.3574 19.6159 13.0368C19.3721 13.9634 18.6913 14.6661 17.7709 15.3385C16.8567 16.0063 15.5735 16.7353 13.9406 17.663L13.9406 17.663C12.3632 18.5591 11.033 19.3148 10.0232 19.7444C9.0053 20.1773 8.07729 20.3968 7.17536 20.1412C6.51252 19.9533 5.90941 19.5968 5.42356 19.1066C4.76419 18.4414 4.49951 17.5219 4.37429 16.4154C4.24998 15.3169 4.24999 13.879 4.25 12.0501V12.0501V11.9499V11.9499C4.24999 10.121 4.24998 8.68309 4.37429 7.58464C4.49951 6.4781 4.76419 5.55861 5.42356 4.89335C5.90941 4.40317 6.51252 4.04666 7.17536 3.85883C8.07729 3.60325 9.0053 3.82269 10.0232 4.25565C11.033 4.68516 12.3632 5.44084 13.9405 6.337Z"
												fill="#FFFFFF"></path>
										</svg>
									</section>
								</section>

								<section>
									<h3 className="font-anton uppercase text-[20px] leading-[140%] tracking-normal mt-1 mb-3 line-clamp-2 transition-colors group-hover:text-brand">
										{item.title}
									</h3>
									<p className="text-[12px] leading-6 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-2">
										{item.description}
									</p>
								</section>
							</div>
						))}
					</div>
				</section>
			</div>

			<Button variant="outline" size="lg" className="flex mx-auto rounded-full mt-8">
				View All Videos
			</Button>
		</section>
	);
}
