import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json() // 입력 유효성 검사
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    } // 이메일 형식 검사
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // 유저 생성 로직 (MongoDB 관련 코드 삭제)

    return NextResponse.json(
      { message: 'User registered', user: { name, email } }, // MongoDB 없이 가상의 유저 객체 반환
      { status: 201 }
    )
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
}
