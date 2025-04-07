import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
	// Don't attempt to statically export the app
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'yxkvxzijwkupwucznpvu.supabase.co',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
				port: '',
			},
		],
		formats: ['image/avif', 'image/webp'],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: "@svgr/webpack", options: { icon: true } }],
		});
		return config;
	},
};

export default withNextVideo(nextConfig);
