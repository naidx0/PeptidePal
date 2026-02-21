import type { Metadata } from 'next'
import { DM_Sans, Libre_Baskerville } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Peptide Pal — Unlock Your Biology',
  description:
    'AI-powered peptide optimization and biohacking protocols. Personalized research recommendations for fat loss, recovery, longevity, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${libreBaskerville.variable} font-sans text-black bg-[#Fdfcf8]`}>{children}</body>
    </html>
  )
}
