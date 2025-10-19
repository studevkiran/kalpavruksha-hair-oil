import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    // Get owner password from environment variable
    const ownerPassword = process.env.OWNER_DASHBOARD_PASSWORD || 'admin123'

    if (password === ownerPassword) {
      // Generate a simple token (you can use JWT for more security)
      const token = crypto.randomBytes(32).toString('hex')
      
      return NextResponse.json({
        success: true,
        token,
        message: 'Authentication successful'
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// Optional: Verify token endpoint
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    // In a production app, you'd verify the token against a database/cache
    // For now, just check if it exists and looks valid
    if (token && token.length === 64) {
      return NextResponse.json({ valid: true })
    }

    return NextResponse.json({ valid: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
