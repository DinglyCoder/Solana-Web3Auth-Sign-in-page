import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // For Plug and Play Web3Auth, session management is handled client-side
    // This endpoint returns a 401 to indicate no server-side session
    return NextResponse.json({ error: 'No server-side session' }, { status: 401 })
  } catch (error) {
    console.error('Session check failed:', error)
    return NextResponse.json({ error: 'Session check failed' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // For Plug and Play Web3Auth, logout is handled client-side
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout failed:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}