import StyledComponentsRegistry from '../../lib/registry'
import { GlobalStyles } from '@/global/global'
import { Rethink_Sans, Prata, Inter } from 'next/font/google'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { ConfigProvider } from 'antd'
import { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import PlayerZone from '@/layouts/PlayerZone'
import { StoreProvider } from '@/store/root.context'

const rethink = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rethink',
  display: 'swap',
})

const prata = Prata({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-prata',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const theme = {
  token: {
    colorPrimary: '#305DDD',
    colorPrimaryBorderHover: '#305DDD',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru" className={`${rethink.variable} ${prata.variable} ${inter.variable}`}>
      <body>
        <StoreProvider>
          <StyledComponentsRegistry>
            <ReactQueryProvider>
              <ConfigProvider theme={theme}>
                <GlobalStyles />
                <div id="wrap">
                  {children}
                  <PlayerZone />
                </div>
              </ConfigProvider>
            </ReactQueryProvider>
          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  )
}
