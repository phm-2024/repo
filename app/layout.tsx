import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My notes',
  description: 'Save your notes!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className="text-indigo-600 text-4xl m-5">REALISTIC NOTES</h1>
        {children}
      </body>
    </html>
  )
}
