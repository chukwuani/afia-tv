"use client";

const LivePage = () => {
	return (

			<section className="mx-auto w-full flex flex-col items-center justify-center py-8">
				<iframe
					style={{ maxWidth: "100%" }}
					src="https://player.twitch.tv/?channel=afiatv&parent=afiatv.net&parent=www.afiatv.net"
					frameBorder="0"
					allowFullScreen={true}
					scrolling="no"
					height="480"
					width="853"></iframe>
			</section>
	);
};

export default LivePage;
