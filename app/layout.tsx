import type { Metadata } from 'next'
import Link from 'next/link'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SquadFlow - Workshop Task Manager',
  description: 'A full-stack workshop app for learning system architecture',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <nav className="border-b bg-background sticky top-0 z-50">
          <div className="container mx-auto px-4 flex h-16 items-center justify-between">
            <Link href="/" className="font-bold text-lg">
              SquadFlow
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/" className="text-sm hover:text-foreground/80 transition-colors">
                Dashboard
              </Link>
              <Link href="/tasks" className="text-sm hover:text-foreground/80 transition-colors">
                Tasks
              </Link>
              <Link href="/learners" className="text-sm hover:text-foreground/80 transition-colors">
                Learners
              </Link>
              <Link href="/system-map" className="text-sm hover:text-foreground/80 transition-colors">
                System
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
