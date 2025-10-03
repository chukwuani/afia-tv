export default function MainArticleSection() {
	return (
		<section className="flex flex-col items-center justify-center pt-32 px-6 md:px-10 lg:px-12 w-full">
			{/* Section header */}
			<header className="flex flex-col items-center justify-center gap-[18px] max-w-[650px] w-full mb-18">
				<h1
					className="text-pretty text-[2.5rem] leading-[4rem] -tracking-[.053rem] lg:text-[4rem] lg:leading-[5rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal mx-auto
            ">
					Featured Stories
				</h1>
			</header>

			{/* Main Section for duplication */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
				<section className="md:col-span-2">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Blog Post 1 */}
						<div className="flex flex-col-reverse lg:flex-col">
							<img
								src="https://cdn.theatlantic.com/thumbor/9A8mRO5xp5PydvYvOceI0XSQFm0=/66x1:1752x1125/624x416/media/img/mt/2025/06/LAPS/original.png"
								alt="Skincare Blog"
								className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
							/>

							<section className="max-sm:px-3">
								<p className="text-muted-foreground font-epilogue text-sm mb-2">Jan 16, 2023</p>
								<h4 className="text-2xl font-dm-sans mb-3">
									How to Get Rid of a Double Chin & Turkey Neck
								</h4>
								<p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
									With timeless designs and high-quality materials, a wooden bed frame is a solid
									investment into coziness.
								</p>
							</section>
						</div>

						{/* Blog Post 2 */}
						<div className="flex flex-col-reverse lg:flex-col">
							<img
								src="https://cdn.theatlantic.com/thumbor/TN92iVT5C5rXHUVX6-vhcLj1hRw=/155x1:1842x1124/296x197/media/img/mt/2025/05/25_5_2_Jaouad_Love_and_death_final_horizontal/original.jpg"
								alt="Skincare Blog"
								className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
							/>

							<section className="max-sm:px-3">
								<p className="text-muted-foreground font-epilogue text-sm mb-2">Jan 5, 2023</p>
								<h4 className="text-2xl font-dm-sans mb-3">
									Why Microchaneling Outdoes Microneedling Every Time
								</h4>
								<p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
									Much more cost-effective than renovating, freshen up your space by swapping out
									your counter stools.
								</p>
							</section>
						</div>
					</div>
				</section>

				<section className="md:col-span-1 max-lg:pt-0">
					<div className="grid grid-cols-1 gap-8">
						{/* Blog Post 1 */}
						<div>
							<p className="text-muted-foreground font-epilogue text-sm mb-2">Jan 16, 2023</p>
							<h4 className="text-2xl font-dm-sans mb-3">
								How to Get Rid of a Double Chin & Turkey Neck
							</h4>
							<p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
								With timeless designs and high-quality materials, a wooden bed frame is a solid
								investment into coziness.
							</p>
						</div>

						{/* Blog Post 2 */}
						<div>
							<p className="text-muted-foreground font-epilogue text-sm mb-2">Jan 5, 2023</p>
							<h4 className="text-2xl font-dm-sans mb-3">
								Why Microchaneling Outdoes Microneedling Every Time
							</h4>
							<p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
								Much more cost-effective than renovating, freshen up your space by swapping out your
								counter stools.
							</p>
						</div>
					</div>
				</section>
			</div>
		</section>
	);
}
