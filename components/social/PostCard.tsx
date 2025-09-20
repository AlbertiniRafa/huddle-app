'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Clock,
  MoreHorizontal,
  Send,
  Tag
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: {
    id: string
    content: string
    type: string
    location?: string
    price?: number
    currency?: string
    tags: string[]
    createdAt: string
    user: {
      id: string
      name: string
      avatar?: string
    }
    venue?: {
      name: string
    }
    seller?: {
      name: string
    }
    _count: {
      likes: number
      comments: number
    }
    isLiked?: boolean
  }
  currentUser: any
  onLike: (postId: string) => void
  onComment: (postId: string, content: string) => void
}

export default function PostCard({ post, currentUser, onLike, onComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)
    await onLike(post.id)
    setIsLiking(false)
  }

  const handleComment = async () => {
    if (!commentText.trim()) return
    await onComment(post.id, commentText)
    setCommentText('')
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'activity': return 'bg-green-100 text-green-800'
      case 'product': return 'bg-blue-100 text-blue-800'
      case 'trip': return 'bg-purple-100 text-purple-800'
      case 'facility': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'activity': return '🏃 Activity'
      case 'product': return '🛍️ Product'
      case 'trip': return '✈️ Trip'
      case 'facility': return '🏢 Facility'
      default: return '💬 Post'
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-semibold text-blue-600">
                {post.user.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold">{post.user.name}</p>
                <Badge variant="secondary" className={getPostTypeColor(post.type)}>
                  {getPostTypeLabel(post.type)}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                {post.location && (
                  <>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{post.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-gray-900">
          {post.content}
        </div>

        {post.price && (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              {post.currency === 'GBP' ? '£' : '$'}{post.price}
            </Badge>
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {post.venue && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>at {post.venue.name}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-2 ${
                post.isLiked ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span>{post._count.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-500"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post._count.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-500"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          {(post.type === 'activity' || post.type === 'product' || post.type === 'facility') && (
            <Button size="sm">
              {post.type === 'activity' ? 'Join' : 
               post.type === 'product' ? 'Buy' : 'Book'}
            </Button>
          )}
        </div>

        {showComments && (
          <div className="pt-3 border-t space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">
                  {currentUser.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 flex space-x-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[60px] resize-none"
                />
                <Button 
                  size="sm" 
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sample comments - would be loaded from API */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">S</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="font-semibold text-sm">Sarah Johnson</p>
                    <p className="text-sm">This looks amazing! Count me in 🎾</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>2h ago</span>
                    <button className="hover:text-gray-700">Like</button>
                    <button className="hover:text-gray-700">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
