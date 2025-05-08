/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: {
            ssr: true,
            displayName: true,
        },
    },
    images: {
        domains: ['img.daisyui.com'],
    },
    // Removed experimental.appDir
};

export default nextConfig;
