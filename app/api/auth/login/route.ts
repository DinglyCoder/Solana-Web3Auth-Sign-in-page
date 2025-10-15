import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // For Plug and Play Web3Auth, the authentication is handled client-side
    // This endpoint is kept for compatibility but redirects to the main page
    // where the Web3Auth modal will be triggered
    
    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Login redirect failed:', error)
    return NextResponse.json({ error: 'Login redirect failed' }, { status: 500 })
  }
}