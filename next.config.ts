import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/dist/shared/lib/constants'

const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  return {
    compiler: {
      styledComponents: true,
      // removeConsole: {
      // exclude: ['error'],
      // },
    },
    turbopack: {
      root: __dirname,
    },
    reactStrictMode: false,
    env: {
      PUBLIC_API_URL: 'https://abook.nikelroot.ru',
    },
    typescript: { ignoreBuildErrors: true },
    output: 'standalone',
    productionBrowserSourceMaps: false,
    async rewrites() {
      if (!isDev) return []
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/:path*',
        },
      ]
    },
  }
}
export default nextConfig
