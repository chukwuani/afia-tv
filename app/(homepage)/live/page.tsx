"use client";

import AdSticker from "@/components/layout/ad-sticker";

const LivePage = () => {
	return (
		<>
			<AdSticker />

			<section className="mx-auto w-full flex flex-col items-center justify-center py-8">
				<iframe
					src="https://player.twitch.tv/?channel=afiatv&parent=afiatv.net&parent=www.afiatv.net"
					frameBorder="0"
					allowFullScreen={true}
					scrolling="no"
					height="480"
					width="853"></iframe>
			</section>
		</>
	);
};

export default LivePage;
