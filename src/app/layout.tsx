import Player from '@/entries/Player'
import StyledComponentsRegistry from '../../lib/registry'
import { GlobalStyles } from '@/global/global'
import { Rethink_Sans, Prata, Inter } from 'next/font/google'
import Aside from '@/entries/Aside'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${rethink.variable} ${prata.variable} ${inter.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <div id="wrap">
            <Aside />
            <div className="content">{children}</div>
            <Player />
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
