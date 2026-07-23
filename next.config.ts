import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: "/news",
				destination: "/",
				permanent: true, // 308, good for SEO if this is a permanent change
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "i.scdn.co",
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
