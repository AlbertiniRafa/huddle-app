'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Camera, 
  MapPin, 
  Tag, 
  DollarSign, 
  Calendar,
  Users,
  X
} from 'lucide-react'

interface CreatePostProps {
  user: any
  onPostCreated: (post: any) => void
}

export default function CreatePost({ user, onPostCreated }: CreatePostProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [postData, setPostData] = useState({
    content: '',
    type: 'general',
    location: '',
    tags: [] as string[],
    price: '',
    images: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [loading, setLoading] = useState(false)

  const postTypes = [
    { value: 'general', label: 'General Post', icon: Users },
    { value: 'activity', label: 'Activity/Game', icon: Calendar },
    { value: 'product', label: 'Product/Service', icon: DollarSign },
    { value: 'trip', label: 'Trip/Event', icon: MapPin },
    { value: 'facility', label: 'Facility/Venue', icon: MapPin }
  ]

  const addTag = () => {
    if (newTag && !postData.tags.includes(newTag)) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async () => {
    if (!postData.content.trim()) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      })

      if (response.ok) {
        const newPost = await response.json()
        onPostCreated(newPost)
        setPostData({
          content: '',
          type: 'general',
          location: '',
          tags: [],
          price: '',
          images: []
        })
        setIsExpanded(false)
      }
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isExpanded) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-semibold text-blue-600">
                {user.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(true)}
              className="flex-1 text-left p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            >
              What's happening in your sports world?
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Create Post</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="font-semibold text-blue-600">
              {user.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <Select value={postData.type} onValueChange={(value) => 
              setPostData(prev => ({ ...prev, type: value }))
            }>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      <type.icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Textarea
          placeholder="Share your activity, product, or experience..."
          value={postData.content}
          onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
          className="min-h-24"
        />

        {(postData.type === 'product' || postData.type === 'facility') && (
          <div>
            <Label htmlFor="price">Price (optional)</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <Input
                id="price"
                placeholder="£0.00"
                value={postData.price}
                onChange={(e) => setPostData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="location">Location (optional)</Label>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <Input
              id="location"
              placeholder="Add location..."
              value={postData.location}
              onChange={(e) => setPostData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex items-center space-x-2 mb-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
            />
            <Button type="button" onClick={addTag} size="sm">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {postData.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="cursor-pointer">
                {tag}
                <X 
                  className="h-3 w-3 ml-1" 
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Photo
            </Button>
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              Check-in
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!postData.content.trim() || loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
