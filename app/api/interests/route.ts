import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const interests = await prisma.interest.findMany({
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json({ interests })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch interests' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, tags } = body

    const interest = await prisma.interest.create({
      data: {
        name,
        category,
        tags: tags || []
      }
    })

    return NextResponse.json({ interest })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Interest already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create interest' },
      { status: 500 }
    )
  }
}
