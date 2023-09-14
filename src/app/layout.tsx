import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons:{
    icon: "../public/favicon.ico",
  },
  title: 'Devil Cart',
  description: 'Deals so good,that they make you think we are evil.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><main className='p-4 max-w-7xl m-auto min-w-[300px]'>{children}</main></body>
    </html>
  )
}
