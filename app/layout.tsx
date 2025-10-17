import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalpavruksha Hair Oil – 51 Magical Ingredients',
  description: 'Nature-powered hair oil with 46 herbs and 5 nourishing oils. Promotes hair growth, reduces hair fall & dandruff. Hand made, chemical free.',
  openGraph: {
    title: 'Kalpavruksha Hair Oil',
    description: 'Nature-powered hair oil with 46 herbs and 5 nourishing oils.',
    images: ['/images/label.svg'],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
