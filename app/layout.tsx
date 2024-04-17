import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from './navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Question Bank',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col">
          <Navigation />
          <div className="w-full max-w-4xl flex-1 self-center border-x border-gray-300 py-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
