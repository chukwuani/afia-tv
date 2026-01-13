"use client";

import { useEffect } from "react";

type AdBannerProps = {
	dataAdSlot: string;
	dataAdFormat: string;
	dataFullWidthResponsive: boolean;
};

function AdBanner({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdBannerProps) {
	useEffect(() => {
		try {
			((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
		} catch (e) {
			console.error("Adsense error:", e);
		}
	}, []);

	return (
		<ins
			className="adsbygoogle"
			style={{
				display: "block",
			}}
			data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
			data-ad-slot={dataAdSlot}
			data-ad-format={dataAdFormat}
			data-full-width-responsive={dataFullWidthResponsive.toString()}
		/>
	);
}

export default AdBanner;
