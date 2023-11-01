/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["res.cloudinary.com", "ae01.alicdn.com"],
	},
	// how to use port 8000
	// https://nextjs.org/docs/api-reference/next.config.js/port
};

module.exports = nextConfig;
