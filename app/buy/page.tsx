'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

declare global {
  interface Window {
    Razorpay?: any
  }
}

export default function BuyPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 49900, currency: 'INR', name: 'Kalpavruksha Hair Oil', quantity: 1 })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to create order')

      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Razorpay'))
          document.body.appendChild(script)
        })
      }

      const options = {
        key,
        amount: data.amount,
        currency: data.currency,
        name: 'Kalpavruksha Hair Oil',
        description: '51 Magical Ingredients',
        order_id: data.id,
        handler: async function (response: any) {
          try {
            const verify = await fetch('/api/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            })
            const v = await verify.json()
            if (!verify.ok) throw new Error(v.message || 'Payment verification failed')
            alert('Payment successful! We will contact you shortly.')
          } catch (e: any) {
            setError(e.message)
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: { color: '#1d6b4c' },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container-section py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="rounded-xl border p-6 bg-white shadow-sm">
            <h1 className="font-heading text-3xl font-semibold">Kalpavruksha Hair Oil</h1>
            <p className="mt-2 text-gray-700">Hand made, chemical free, powered by 46 herbs + 5 nourishing oils.</p>
            <p className="mt-4 text-2xl font-semibold">₹499</p>
            <button disabled={loading} onClick={handleCheckout} className="mt-6 btn-primary disabled:opacity-60">
              {loading ? 'Processing…' : 'Pay with Razorpay'}
            </button>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <p className="mt-6 text-sm text-gray-600">For external use only. Suitable for all hair types.</p>
          </div>
          <div className="rounded-xl border p-6 bg-white shadow-sm text-sm text-gray-700">
            <h2 className="font-semibold text-lg">What’s inside?</h2>
            <p className="mt-2">Amla, Rosemary, Bhringaraj, Tulsi, Hibiscus, Henna, Brahmi, Neem, Onion, Moringa, Flaxseed, Aloe vera, Curry leaf, Lavancha, Jatamansi etc.</p>
            <h2 className="font-semibold text-lg mt-6">How to use</h2>
            <ol className="mt-2 list-decimal pl-5 space-y-1">
              <li>Warm a small amount and apply to scalp and hair.</li>
              <li>Massage gently for 5–10 minutes.</li>
              <li>Leave for at least 1 hour or overnight, then wash.</li>
              <li>Use 2–3 times a week for best results.</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
