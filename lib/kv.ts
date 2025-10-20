import { kv } from '@vercel/kv'

// Keys
const ORDER_IDS_KEY = 'order:ids'
const ORDER_STATUS_PREFIX = 'order:status:'

// Save order ID to tracking list
export async function saveOrderId(orderId: string): Promise<void> {
  try {
    // Add to set of all order IDs (prevents duplicates)
    await kv.sadd(ORDER_IDS_KEY, orderId)
  } catch (error) {
    console.error('Error saving order ID to KV:', error)
    throw error
  }
}

// Get all tracked order IDs
export async function getAllOrderIds(): Promise<string[]> {
  try {
    const orderIds = await kv.smembers(ORDER_IDS_KEY)
    return (orderIds as string[]).sort().reverse() // Most recent first
  } catch (error) {
    console.error('Error getting order IDs from KV:', error)
    return []
  }
}

// Save order fulfillment status
export async function saveOrderStatus(orderId: string, status: string): Promise<void> {
  try {
    await kv.set(`${ORDER_STATUS_PREFIX}${orderId}`, status)
  } catch (error) {
    console.error('Error saving order status to KV:', error)
    throw error
  }
}

// Get order fulfillment status
export async function getOrderStatus(orderId: string): Promise<string> {
  try {
    const status = await kv.get(`${ORDER_STATUS_PREFIX}${orderId}`)
    return (status as string) || 'pending'
  } catch (error) {
    console.error('Error getting order status from KV:', error)
    return 'pending'
  }
}

// Get multiple order statuses at once
export async function getMultipleOrderStatuses(orderIds: string[]): Promise<Record<string, string>> {
  try {
    const pipeline = kv.pipeline()
    orderIds.forEach(id => {
      pipeline.get(`${ORDER_STATUS_PREFIX}${id}`)
    })
    const results = await pipeline.exec()
    
    const statuses: Record<string, string> = {}
    orderIds.forEach((id, index) => {
      statuses[id] = (results[index] as string) || 'pending'
    })
    
    return statuses
  } catch (error) {
    console.error('Error getting multiple order statuses from KV:', error)
    return {}
  }
}

// Delete order ID from tracking list
export async function deleteOrderId(orderId: string): Promise<void> {
  try {
    // Remove from set of all order IDs
    await kv.srem(ORDER_IDS_KEY, orderId)
  } catch (error) {
    console.error('Error deleting order ID from KV:', error)
    throw error
  }
}

// Delete order fulfillment status
export async function deleteOrderStatus(orderId: string): Promise<void> {
  try {
    await kv.del(`${ORDER_STATUS_PREFIX}${orderId}`)
  } catch (error) {
    console.error('Error deleting order status from KV:', error)
    throw error
  }
}
