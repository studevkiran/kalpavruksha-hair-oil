'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    setStatus(null)
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (res.ok) setStatus('Thanks! We will contact you soon.')
    else setStatus(data.message || 'Something went wrong')
  }

  return (
    <>
      <Navbar />
      <main className="container-section py-10">
        <h1 className="font-heading text-3xl font-semibold">Contact</h1>
        <p className="mt-2 text-gray-700">Have a question or want to bulk order? Send us a message.</p>
        <form onSubmit={submit} className="mt-6 grid sm:grid-cols-2 gap-4 max-w-2xl">
          <input name="name" placeholder="Name" required className="rounded-md border p-3" />
          <input name="email" placeholder="Email" type="email" required className="rounded-md border p-3" />
          <input name="phone" placeholder="Phone" className="rounded-md border p-3 sm:col-span-2" />
          <textarea name="message" placeholder="Message" required className="rounded-md border p-3 sm:col-span-2" rows={4} />
          <button className="btn-primary sm:col-span-2">Send</button>
          {status && <p className="sm:col-span-2 text-green-700">{status}</p>}
        </form>
      </main>
      <Footer />
    </>
  )
}
