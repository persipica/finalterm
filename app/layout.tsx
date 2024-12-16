import type { Metadata } from 'next'

import './globals.css'
import { Jua } from 'next/font/google'
import { NextAuthProvider } from '@/components/Provider'

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })

const jua = Jua({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'KHS Portfollio',
  description: '강희수의 포트폴리오',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={jua.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
