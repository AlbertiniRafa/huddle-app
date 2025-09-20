import { NextRequest, NextResponse } from 'next/server'
import { createUser, generateToken } from '@/lib/auth/auth'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  phone: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone } = signupSchema.parse(body)

    const user = await createUser({ email, password, name, phone })
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      verified: user.verified
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        verified: user.verified
      },
      token
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Invalid input' },
      { status: 400 }
    )
  }
}
