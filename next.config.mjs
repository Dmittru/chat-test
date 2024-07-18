/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.m?js$/,
            resolve: {
                fullySpecified: false, // disable the behavior
            },
            exclude: /node_modules/, // if you want to transpile some specific module
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['next/babel'],
                },
            },
        });
        return config;
    },
};

export default nextConfig;
