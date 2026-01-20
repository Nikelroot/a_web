import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
}

export default nextConfig
