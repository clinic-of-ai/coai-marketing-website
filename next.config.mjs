import { withNextVideo } from "next-video/process";

let userConfig = undefined;

try {
	userConfig = await import('./v0-user-next.config');
} catch (e) {
	// safely ignore if not exist
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	// ✅ ESLint and TypeScript build optimizations from the 2nd project
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},

	// ✅ Image optimizations (Combination of both projects)
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
		],
		formats: ['image/avif', 'image/webp'],
	},

	// ✅ Experimental flags (from 2nd project - optional but good for large projects)
	experimental: {
		webpackBuildWorker: true,
		parallelServerBuildTraces: true,
		parallelServerCompiles: true,
	},

	// ✅ Webpack rules (SVG loader from 1st project)
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: "@svgr/webpack", options: { icon: true } }],
		});
		return config;
	},
};

// ✅ Merge userConfig from 2nd project, if exists
mergeConfig(nextConfig, userConfig);

function mergeConfig(nextConfig, userConfig) {
	if (!userConfig) {
		return;
	}

	for (const key in userConfig) {
		if (
			typeof nextConfig[key] === 'object' &&
			!Array.isArray(nextConfig[key])
		) {
			nextConfig[key] = {
				...nextConfig[key],
				...userConfig[key],
			};
		} else {
			nextConfig[key] = userConfig[key];
		}
	}
}

export default withNextVideo(nextConfig);