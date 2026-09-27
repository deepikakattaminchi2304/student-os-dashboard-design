import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { TopBar } from '@/components/dashboard/top-bar'
import { AppNav } from '@/components/os/app-nav'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: {
    default: 'Dashboard - Space Green | ALLEN 2040 Student OS',
    template: '%s | ALLEN 2040 Student OS',
  },
  description:
    'ALLEN 2040 Student OS: Bhasha Learn modules, textbook library, Pocket Bank wallet, Green Meter and campus leaderboards.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#060D0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="antialiased">
        <div className="relative min-h-screen overflow-hidden bg-background">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_70%)]"
          />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
            <TopBar />
            <AppNav />
            <main className="flex flex-col gap-6">{children}</main>
          </div>
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
