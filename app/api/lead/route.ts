import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { name, email, phone, message } = body || {}
  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }
  try {
    const lead = await prisma.lead.create({ data: { name, email, phone: phone ?? '', message } })
    return NextResponse.json({ id: lead.id })
  } catch (e) {
    return NextResponse.json({ message: 'Failed to save lead' }, { status: 500 })
  }
}
