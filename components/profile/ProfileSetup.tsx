'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { MapPin, User, Heart } from 'lucide-react'

interface ProfileSetupProps {
  user: any
  onComplete: (user: any) => void
}

const SPORTS_INTERESTS = [
  { id: 'tennis', name: 'Tennis', category: 'racquet' },
  { id: 'football', name: 'Football', category: 'team' },
  { id: 'swimming', name: 'Swimming', category: 'water' },
  { id: 'basketball', name: 'Basketball', category: 'team' },
  { id: 'running', name: 'Running', category: 'individual' },
  { id: 'cycling', name: 'Cycling', category: 'individual' },
  { id: 'golf', name: 'Golf', category: 'individual' },
  { id: 'badminton', name: 'Badminton', category: 'racquet' },
  { id: 'cricket', name: 'Cricket', category: 'team' },
  { id: 'rugby', name: 'Rugby', category: 'team' },
  { id: 'yoga', name: 'Yoga', category: 'fitness' },
  { id: 'gym', name: 'Gym/Fitness', category: 'fitness' }
]

export default function ProfileSetup({ user, onComplete }: ProfileSetupProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    bio: '',
    interests: [] as string[],
    location: '',
    latitude: null as number | null,
    longitude: null as number | null,
    locationSharing: 'coarse'
  })

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: 'Location enabled'
          }))
        },
        (error) => {
          console.error('Location error:', error)
          alert('Location access denied. You can set this up later in settings.')
        }
      )
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      
      // Update profile
      const profileResponse = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bio: formData.bio,
          latitude: formData.latitude,
          longitude: formData.longitude,
          locationSharing: formData.locationSharing
        })
      })

      if (!profileResponse.ok) {
        throw new Error('Failed to update profile')
      }

      // Create interests
      for (const interestId of formData.interests) {
        const interest = SPORTS_INTERESTS.find(i => i.id === interestId)
        if (interest) {
          // First ensure the interest exists
          await fetch('/api/interests', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              name: interest.name,
              category: interest.category,
              tags: [interest.category]
            })
          })
        }
      }

      // Fetch updated profile
      const updatedProfileResponse = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (updatedProfileResponse.ok) {
        const updatedData = await updatedProfileResponse.json()
        onComplete(updatedData.profile)
      }
    } catch (error) {
      console.error('Setup error:', error)
      alert('Setup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Let's set up your profile
          </h1>
          <p className="text-gray-600">
            Help us personalize your experience and connect you with the right people
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= step ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell other families a bit about yourself and what you're looking for..."
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
              
              <Button onClick={() => setStep(2)} className="w-full">
                Next: Choose Interests
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                What are your interests?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Select the sports and activities you enjoy (choose at least 3)
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SPORTS_INTERESTS.map((interest) => (
                  <div
                    key={interest.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.interests.includes(interest.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInterestToggle(interest.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.interests.includes(interest.id)}
                        onChange={() => {}}
                      />
                      <span className="text-sm font-medium">{interest.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  className="flex-1"
                  disabled={formData.interests.length < 3}
                >
                  Next: Location
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Enable location sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Location helps us connect you with nearby families and activities. 
                We only share approximate location for privacy.
              </p>

              {!formData.latitude ? (
                <Button onClick={requestLocation} className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Enable Location
                </Button>
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">✓ Location enabled</p>
                </div>
              )}

              <div className="text-xs text-gray-500 space-y-1">
                <p>• We never share your exact location</p>
                <p>• Other users only see approximate distance</p>
                <p>• You can change this anytime in settings</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Setting up...' : 'Complete Setup'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
