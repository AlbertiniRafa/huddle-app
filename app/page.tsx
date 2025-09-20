'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Calendar, Star, Heart, MessageCircle } from 'lucide-react'
import AuthModal from '@/components/auth/AuthModal'
import ProfileSetup from '@/components/profile/ProfileSetup'
import Feed from '@/components/feed/Feed'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token and get user profile
      fetchProfile(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data.profile)
        
        // Check if profile setup is needed
        if (!data.profile.interests?.length || !data.profile.latitude) {
          setShowProfileSetup(true)
        }
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const handleAuthSuccess = (userData: any, token: string) => {
    localStorage.setItem('token', token)
    setUser(userData)
    setShowAuth(false)
    setShowProfileSetup(true)
  }

  const handleProfileSetupComplete = (updatedUser: any) => {
    setUser(updatedUser)
    setShowProfileSetup(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Connect. Play. Explore.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The location-aware social marketplace that connects families and sports enthusiasts 
              to events, venues, and like-minded people in your area.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => setShowAuth(true)}
            >
              Get Started
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Location-Aware Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find families and sports enthusiasts near you with shared interests and compatible schedules.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Events & Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover local events, book venues, and join activities that match your family's interests.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Family-First Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built with families in mind - comprehensive safety features and parental controls.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Sample Feed Preview */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Your Personalized Feed</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Sarah & Family</h3>
                      <p className="text-gray-600 text-sm mb-2">Looking for tennis partners • 0.8km away</p>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="secondary">Tennis</Badge>
                        <Badge variant="secondary">Family-friendly</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
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

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Family Swimming Session</h3>
                      <p className="text-gray-600 text-sm mb-2">David Lloyd Club • Tomorrow 10:00 AM</p>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="secondary">Swimming</Badge>
                        <Badge variant="secondary">£15/family</Badge>
                      </div>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Weekend Football Camp</h3>
                      <p className="text-gray-600 text-sm mb-2">Special offer • 20% off for new families</p>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="secondary">Football</Badge>
                        <Badge variant="secondary">Ages 6-12</Badge>
                      </div>
                      <Button size="sm">Learn More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuth} 
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    )
  }

  if (showProfileSetup) {
    return (
      <ProfileSetup 
        user={user}
        onComplete={handleProfileSetupComplete}
      />
    )
  }

  return <Feed user={user} />
}
