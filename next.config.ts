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
          destination: 'https://abook.nikelroot.ru/api/:path*',
        },
      ]
    },
  }
}
export default nextConfig
