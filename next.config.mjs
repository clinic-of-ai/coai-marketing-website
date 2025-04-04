import { withNextVideo } from "next-video/process";
import bundleAnalyzer from '@next/bundle-analyzer';

// Bundle Analyzer setup (enabled via ANALYZE=true env variable)
const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

let userConfig;

try {
	userConfig = (await import('./v0-user-next.config')).default;
} catch (e) {
	userConfig = {};
	// safely ignore if user config doesn't exist
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	// ✅ ESLint and TypeScript optimizations (uncomment for faster builds)
	/*
	eslint: {
	  ignoreDuringBuilds: true,
	},
	typescript: {
	  ignoreBuildErrors: true,
	},
	*/

	// ✅ Image optimization settings
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
			},
		],
		formats: ['image/avif', 'image/webp'],
	},

	// ✅ Experimental flags (uncomment if needed)
	/*
	experimental: {
	  webpackBuildWorker: true,
	  parallelServerBuildTraces: true,
	  parallelServerCompiles: true,
	},
	*/

	// ✅ Webpack configuration for SVG files
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: '@svgr/webpack', options: { icon: true } }],
		});

		return config;
	},
};

// ✅ Safe merge of user config
mergeConfig(nextConfig, userConfig);

// ✅ Helper function for merging configurations
function mergeConfig(baseConfig, customConfig) {
	if (!customConfig || typeof customConfig !== 'object') return;

	Object.entries(customConfig).forEach(([key, value]) => {
		if (
			value &&
			typeof value === 'object' &&
			!Array.isArray(value) &&
			baseConfig[key] &&
			typeof baseConfig[key] === 'object' &&
			!Array.isArray(baseConfig[key])
		) {
			baseConfig[key] = { ...baseConfig[key], ...value };
		} else {
			baseConfig[key] = value;
		}
	});
}

// ✅ Export the final configuration wrapped with plugins
export default withBundleAnalyzer(withNextVideo(nextConfig));