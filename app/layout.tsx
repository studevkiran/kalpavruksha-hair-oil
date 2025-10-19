import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: 'Kalpavruksha Hair Oil – 51 Magical Ingredients',
  description: 'Nature-powered hair oil with 46 herbs and 5 nourishing oils. Promotes hair growth, reduces hair fall & dandruff. Hand made, chemical free.',
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
  openGraph: {
    title: 'Kalpavruksha Hair Oil',
    description: 'Nature-powered hair oil with 46 herbs and 5 nourishing oils.',
    images: ['/images/hair oil bottle image (prefered).png'],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
