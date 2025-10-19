import { NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

// Read all saved order IDs
async function readOrderIds(): Promise<string[]> {
  try {
    await ensureDataDir()
    if (existsSync(ORDERS_FILE)) {
      const data = await readFile(ORDERS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading orders file:', error)
  }
  return []
}

// Save order ID
async function saveOrderId(orderId: string) {
  try {
    await ensureDataDir()
    const orderIds = await readOrderIds()
    if (!orderIds.includes(orderId)) {
      orderIds.unshift(orderId) // Add to beginning
      await writeFile(ORDERS_FILE, JSON.stringify(orderIds, null, 2))
    }
  } catch (error) {
    console.error('Error saving order ID:', error)
  }
}

// GET - Retrieve all order IDs
export async function GET() {
  try {
    const orderIds = await readOrderIds()
    return NextResponse.json({ orderIds, count: orderIds.length })
  } catch (error) {
    return NextResponse.json({ orderIds: [], count: 0 }, { status: 500 })
  }
}

// POST - Save a new order ID
export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()
    if (!orderId) {
      return NextResponse.json({ message: 'Order ID required' }, { status: 400 })
    }
    
    await saveOrderId(orderId)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to save order ID' }, { status: 500 })
  }
}
