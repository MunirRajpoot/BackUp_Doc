/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: {
            ssr: true,         // Enables Server-Side Rendering for styled-components
            displayName: true, // Helps with debugging in development mode
        },
    },
    experimental: {
        appDir: true, // Required for Next.js 15 App Router
    },
};

export default nextConfig;
