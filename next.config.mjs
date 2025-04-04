let userConfig;

try {
	userConfig = (await import('./v0-user-next.config')).default;
} catch (e) {
	userConfig = {};
	// safely ignore if user config doesn't exist
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	// ✅ ESLint and TypeScript optimizations
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},

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
		unoptimized: true,
	},

	// ✅ Modified experimental flags
	experimental: {
		// Remove optimizeCss since it's causing issues
		workerThreads: false,
		cpus: 1
	},

	// ✅ Webpack configuration with optimizations
	webpack: (config, { isServer }) => {
		// SVG handling
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: '@svgr/webpack', options: { icon: true } }],
		});

		// Build optimizations
		config.optimization = {
			...config.optimization,
			minimize: true,
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 25,
				minSize: 20000,
				cacheGroups: {
					default: false,
					vendors: false,
					vendor: {
						name: 'vendor',
						chunks: 'all',
						test: /node_modules/,
						priority: 20
					},
					common: {
						name: 'common',
						minChunks: 2,
						chunks: 'all',
						priority: 10,
						reuseExistingChunk: true,
						enforce: true
					}
				}
			}
		};

		// Performance hints
		config.performance = {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
		};

		// Additional optimizations
		if (!isServer) {
			config.optimization.moduleIds = 'deterministic';
			config.optimization.chunkIds = 'deterministic';
		}

		return config;
	},

	// ✅ Production optimizations
	productionBrowserSourceMaps: false,
	swcMinify: true,
	compress: true,

	// ✅ Add output configuration
	output: 'standalone',
};

// ✅ Safe merge of user config
mergeConfig(nextConfig, userConfig);

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

export default nextConfig;