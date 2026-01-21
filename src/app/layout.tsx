import Player from '@/entries/Player'
import StyledComponentsRegistry from '../../lib/registry'
import { GlobalStyles, Wrap } from '@/global/global'
import { Rethink_Sans, Prata, Inter } from 'next/font/google'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

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

export const metadata = {
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${rethink.variable} ${prata.variable} ${inter.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <ReactQueryProvider>
            <GlobalStyles />
            <div id="wrap">
              {children}
              <Player />
            </div>
          </ReactQueryProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
