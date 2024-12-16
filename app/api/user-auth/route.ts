import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { user } = await req.json()
  const { email } = user

  try {
    const apiUrl = process.env.API_URL
    if (!apiUrl) {
      throw new Error('API_URL is not defined in the environment variables')
    }

    await fetch(`${apiUrl}/api/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
