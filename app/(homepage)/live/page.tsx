"use client";

import { ProtectedPage } from "@/components/protected-page";

const LivePage = () => {
	return (
		<ProtectedPage>
			<section className="mx-auto w-full flex items-center justify-center py-8">
				<iframe
					src="https://player.twitch.tv/?channel=afiatv&parent=afiatv.net&parent=www.afiatv.net"
					frameBorder="0"
					allowFullScreen={true}
					scrolling="no"
					height="480"
					width="853"></iframe>
			</section>
		</ProtectedPage>
	);
};

export default LivePage;
