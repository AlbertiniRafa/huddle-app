'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Calendar, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Star,
  Settings,
  LogOut,
  Filter
} from 'lucide-react'

interface FeedProps {
  user: any
}

export default function Feed({ user }: FeedProps) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('feed')

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/matches?radius=5000&limit=10', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setMatches(data.matches || [])
      }
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${meters}m away`
    }
    return `${(meters / 1000).toFixed(1)}km away`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">FamilySports</h1>
              <Badge variant="secondary">
                <MapPin className="h-3 w-3 mr-1" />
                {user.locationSharing === 'exact' ? 'Exact' : 'Approximate'} location
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="matches">People</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Personalized Feed</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Welcome message */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Welcome to FamilySports, {user.name}! 🎾
                    </h3>
                    <p className="text-blue-700 text-sm">
                      We found {matches.length} potential matches near you. Start connecting with families who share your interests!
                    </p>
                  </CardContent>
                </Card>

                {/* Sample activity */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Family Tennis Session</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Wimbledon Tennis Club • Today 2:00 PM
                        </p>
                        <div className="flex space-x-2 mb-3">
                          <Badge variant="secondary">Tennis</Badge>
                          <Badge variant="secondary">Family-friendly</Badge>
                          <Badge variant="secondary">£20/hour</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm">Book Court</Button>
                          <Button size="sm" variant="outline">
                            <Heart className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top matches */}
                {matches.slice(0, 3).map((match: any) => (
                  <Card key={match.user_id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{match.display_name}</h3>
                            {match.trust_badges?.includes('verified') && (
                              <Badge variant="secondary" className="text-xs">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {Math.round(match.match_score * 100)}% match • {formatDistance(match.proximity_m)}
                            {match.has_children && ' • Has children'}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {match.common_interests?.slice(0, 3).map((interest: string) => (
                              <Badge key={interest} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Connect
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Sample deal */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">Weekend Football Camp</h3>
                          <Badge variant="destructive" className="text-xs">20% OFF</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Chelsea FC Academy • This Weekend
                        </p>
                        <div className="flex space-x-2 mb-3">
                          <Badge variant="secondary">Football</Badge>
                          <Badge variant="secondary">Ages 6-12</Badge>
                          <Badge variant="secondary">£40 → £32</Badge>
                        </div>
                        <Button size="sm">Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">People Near You</h2>
              <Button variant="outline" size="sm" onClick={fetchMatches}>
                Refresh
              </Button>
            </div>

            {loading ? (
              <div>Loading matches...</div>
            ) : matches.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-600 text-sm">
                    Try expanding your search radius or adding more interests to find people near you.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {matches.map((match: any) => (
                  <Card key={match.user_id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="text-lg">
                            {match.display_name?.charAt(0)?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{match.display_name}</h3>
                            <Badge variant="secondary">
                              {Math.round(match.match_score * 100)}% match
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            {formatDistance(match.proximity_m)}
                            {match.has_children && ' • Family with children'}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {match.common_interests?.map((interest: string) => (
                              <Badge key={interest} variant="outline">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Button>
                              <Heart className="h-4 w-4 mr-2" />
                              Connect
                            </Button>
                            <Button variant="outline">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activities" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Activities & Events</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Family Swimming</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        David Lloyd Club • Tomorrow 10:00 AM - 12:00 PM
                      </p>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="secondary">Swimming</Badge>
                        <Badge variant="secondary">Family-friendly</Badge>
                        <Badge variant="secondary">£15/family</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Family swimming session with qualified instructors. All ages welcome.
                      </p>
                      <Button>Book Session</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Tennis Coaching</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Wimbledon Tennis Club • This Saturday 2:00 PM
                      </p>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="secondary">Tennis</Badge>
                        <Badge variant="secondary">Beginner</Badge>
                        <Badge variant="secondary">£25/person</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Professional tennis coaching for beginners. Equipment provided.
                      </p>
                      <Button>Book Lesson</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deals" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Special Offers</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Star className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">Football Academy</h3>
                        <Badge variant="destructive">30% OFF</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Chelsea FC Academy • Weekend Program
                      </p>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="secondary">Football</Badge>
                        <Badge variant="secondary">Ages 6-16</Badge>
                        <Badge variant="secondary">£60 → £42</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Professional football training with Chelsea FC coaches. Limited time offer!
                      </p>
                      <Button>Claim Offer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Star className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">Gym Membership</h3>
                        <Badge variant="destructive">First Month Free</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        PureGym • Family Membership
                      </p>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="secondary">Fitness</Badge>
                        <Badge variant="secondary">Family Plan</Badge>
                        <Badge variant="secondary">£0 first month</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Complete family gym access with kids' classes included.
                      </p>
                      <Button>Get Started</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
