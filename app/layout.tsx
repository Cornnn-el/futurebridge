import type { Metadata } from 'next'
import './globals.css'
import TargetCursor from '@/components/TargetCursor'

export const metadata: Metadata = {
  title: 'FutureBridge — Story Edition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TargetCursor />
        {children}
      </body>
    </html>
  )
}
