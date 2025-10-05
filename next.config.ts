import type { NextConfig } from "next";

// Security headers for better protection
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

// Define if we're in development or production
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  // React Three Fiber/Drei need transpilation
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  
  // Performance optimizations
  compiler: {
    removeConsole: !isDev ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Experimental features for better performance with 3D and animations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-spring/three',
      '@react-spring/web',
      'three',
    ],
  },
  
  // Add security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
  
  // Error handling - consider enabling in production later
  typescript: {
    // In production, you may want to set this to false and fix TS errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // In production, you may want to set this to false and fix ESLint errors
    ignoreDuringBuilds: true,
  },
  
  // Miscellaneous optimization options
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true,
  output: 'standalone', // Optimizes for container deployments
};

export default nextConfig;