import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { verifyToken } from '@/lib/auth/auth'

function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  return verifyToken(token)
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c * 1000 // Convert to meters
}

export async function GET(request: NextRequest) {
  try {
    const user = getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const radius = parseInt(searchParams.get('radius') || '5000') // 5km default
    const limit = parseInt(searchParams.get('limit') || '20')

    // Get current user with location and interests
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        interests: {
          include: {
            interest: true
          }
        }
      }
    })

    if (!currentUser || !currentUser.latitude || !currentUser.longitude) {
      return NextResponse.json({ error: 'Location required for matching' }, { status: 400 })
    }

    // Find potential matches
    const potentialMatches = await prisma.user.findMany({
      where: {
        id: { not: user.id },
        latitude: { not: null },
        longitude: { not: null },
        locationSharing: { in: ['exact', 'coarse'] }
      },
      include: {
        interests: {
          include: {
            interest: true
          }
        },
        profiles: {
          include: {
            familyMembers: true
          }
        }
      },
      take: 100 // Get more to filter by distance
    })

    // Calculate matches with scores
    const matches = potentialMatches
      .map(match => {
        const distance = calculateDistance(
          currentUser.latitude!,
          currentUser.longitude!,
          match.latitude!,
          match.longitude!
        )

        if (distance > radius) return null

        // Calculate common interests
        const userInterestIds = currentUser.interests.map(ui => ui.interestId)
        const matchInterestIds = match.interests.map(ui => ui.interestId)
        const commonInterests = userInterestIds.filter(id => matchInterestIds.includes(id))
        
        // Simple scoring algorithm
        const interestScore = commonInterests.length / Math.max(userInterestIds.length, 1)
        const proximityScore = Math.max(0, 1 - (distance / radius))
        const matchScore = (interestScore * 0.7) + (proximityScore * 0.3)

        return {
          user_id: match.id,
          display_name: match.name,
          match_score: Math.round(matchScore * 100) / 100,
          common_interests: commonInterests,
          proximity_m: Math.round(distance),
          trust_badges: match.verified ? ['verified'] : [],
          has_children: match.profiles.some(p => p.familyMembers.length > 0)
        }
      })
      .filter(match => match !== null && match.match_score > 0.1)
      .sort((a, b) => b!.match_score - a!.match_score)
      .slice(0, limit)

    return NextResponse.json({ matches })
  } catch (error) {
    console.error('Match error:', error)
    return NextResponse.json(
      { error: 'Failed to find matches' },
      { status: 500 }
    )
  }
}
