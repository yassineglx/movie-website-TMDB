import { NextResponse } from 'next/server'
import { signToken } from '@/lib/jwt'

const MOCK_USER = { id: 1, username: 'demo' }
const MOCK_PASSWORD = 'password123'

export async function POST(request) {
  const body = await request.json()
  const { username, password } = body
  console.log(username, password)

  if (username === MOCK_USER.username && password === MOCK_PASSWORD) {
    const token = signToken({ userId: MOCK_USER.id })
    return NextResponse.json({ user: MOCK_USER, token })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}

