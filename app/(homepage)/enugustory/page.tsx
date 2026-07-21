"use client";

import HeroSection from "@/app/(homepage)/enugustory/_components/hero-section";
import { Card } from "@/components/ui/card";

import {
	VideoPlayer,
	VideoPlayerContent,
	VideoPlayerControlBar,
	VideoPlayerMuteButton,
	VideoPlayerPlayButton,
	VideoPlayerSeekBackwardButton,
	VideoPlayerSeekForwardButton,
	VideoPlayerTimeDisplay,
	VideoPlayerTimeRange,
	VideoPlayerVolumeRange,
} from "@/components/kibo-ui/video-player";

export default function HomePage() {
	return (
		<main className="relative w-full">
			<HeroSection />

			{/* Video/image preview card */}
			<Card className="w-full max-w-[1100px] mx-auto border-0 p-0 z-10">
				<VideoPlayer className="w-full overflow-hidden border-0">
					<VideoPlayerContent
						crossOrigin=""
						muted
						autoPlay
						loop
						preload="auto"
						slot="media"
						src="https://8kvl2urisy.ufs.sh/f/BxfEHnSVCZL45qJ4mb5iwayn8tM2jkJqHVSIRrW9oYbhNs43"
					/>
					<VideoPlayerControlBar>
						<VideoPlayerPlayButton />
						<VideoPlayerSeekBackwardButton />
						<VideoPlayerSeekForwardButton />
						<VideoPlayerTimeRange />
						<VideoPlayerTimeDisplay showDuration />
						<VideoPlayerMuteButton />
						<VideoPlayerVolumeRange />
					</VideoPlayerControlBar>
				</VideoPlayer>
			</Card>
		</main>
	);
}
