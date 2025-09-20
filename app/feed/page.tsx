'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import HuddleLogo from '@/components/ui/logo'
import CreatePost from '@/components/social/CreatePost'
import PostCard from '@/components/social/PostCard'
import { Button } from '@/components/ui/button'
import InstallButton from '@/components/ui/install-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar,
  MessageCircle,
  Bell
} from 'lucide-react'

export default function SocialFeed() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    // Load user data
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    loadPosts()
  }, [router])

  const loadPosts = async (type?: string) => {
    try {
      const token = localStorage.getItem('token')
      const url = type ? `/api/posts?type=${type}` : '/api/posts'
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const postsData = await response.json()
        setPosts(postsData)
      }
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePostCreated = (newPost: any) => {
    setPosts(prev => [newPost, ...prev])
  }

  const handleLike = async (postId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postId })
      })

      if (response.ok) {
        const { liked } = await response.json()
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isLiked: liked,
                _count: {
                  ...post._count,
                  likes: post._count.likes + (liked ? 1 : -1)
                }
              }
            : post
        ))
      }
    } catch (error) {
      console.error('Failed to toggle like:', error)
    }
  }

  const handleComment = async (postId: string, content: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postId, content })
      })

      if (response.ok) {
        // Update comment count
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { 
                ...post,
                _count: {
                  ...post._count,
                  comments: post._count.comments + 1
                }
              }
            : post
        ))
      }
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const type = value === 'all' ? undefined : value
    loadPosts(type)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your social feed...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <HuddleLogo size={32} className="text-blue-600" />
                <h1 className="text-2xl font-bold text-blue-600">Huddle</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <MapPin className="h-3 w-3 mr-1" />
                London, UK
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-blue-600 text-sm">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Trending Now</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">#TennisLondon</span>
                  <Badge variant="secondary">124 posts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#FootballKids</span>
                  <Badge variant="secondary">89 posts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#SwimmingLessons</span>
                  <Badge variant="secondary">67 posts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#FamilyFitness</span>
                  <Badge variant="secondary">45 posts</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-green-600 text-sm">S</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Sarah M.</p>
                      <p className="text-xs text-gray-500">Tennis enthusiast</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-purple-600 text-sm">M</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Mike R.</p>
                      <p className="text-xs text-gray-500">Football coach</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {user && (
              <CreatePost user={user} onPostCreated={handlePostCreated} />
            )}

            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="activity">Activities</TabsTrigger>
                <TabsTrigger value="product">Products</TabsTrigger>
                <TabsTrigger value="trip">Trips</TabsTrigger>
                <TabsTrigger value="facility">Facilities</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No posts yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Be the first to share something with the community!
                    </p>
                    <Button>Create Your First Post</Button>
                  </CardContent>
                </Card>
              ) : (
                posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={user}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-4 w-4 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Tennis Tournament</p>
                    <p className="text-xs text-gray-500">Tomorrow, 2:00 PM</p>
                    <p className="text-xs text-gray-500">Wimbledon Club</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-4 w-4 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Family Swim Day</p>
                    <p className="text-xs text-gray-500">Saturday, 10:00 AM</p>
                    <p className="text-xs text-gray-500">Aquatic Centre</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Your Posts</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connections</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Activities Joined</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Points Earned</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    0
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
