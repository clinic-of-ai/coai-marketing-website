"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Increase to 20 videos
const allVideos = [
  // Original 8 videos
  {
    id: "1",
    title: "Building a YouTube Clone with MERN Stack",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "120K",
    timestamp: "3 days ago",
    duration: "12:34",
    channel: {
      name: "Dev Channel",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "2",
    title: "React Hooks Explained: useEffect, useState, useContext",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "45K",
    timestamp: "1 week ago",
    duration: "18:27",
    channel: {
      name: "React Masters",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "3",
    title: "MongoDB Atlas Tutorial for Beginners",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "78K",
    timestamp: "2 weeks ago",
    duration: "22:15",
    channel: {
      name: "Database Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  {
    id: "4",
    title: "Tailwind CSS: From Zero to Hero",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "230K",
    timestamp: "1 month ago",
    duration: "45:12",
    channel: {
      name: "CSS Wizards",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "5",
    title: "Node.js Authentication with Passport.js",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "67K",
    timestamp: "3 weeks ago",
    duration: "32:45",
    channel: {
      name: "Backend Dev",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  {
    id: "6",
    title: "Express.js REST API Development",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "92K",
    timestamp: "5 days ago",
    duration: "28:19",
    channel: {
      name: "API Guru",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "7",
    title: "Full Stack Development Roadmap 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "320K",
    timestamp: "2 months ago",
    duration: "15:30",
    channel: {
      name: "Tech Career",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "8",
    title: "Building Real-time Applications with Socket.io",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "45K",
    timestamp: "4 weeks ago",
    duration: "26:54",
    channel: {
      name: "Real-time Dev",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  // Additional 12 videos to make 20 total
  {
    id: "9",
    title: "Advanced TypeScript Patterns for Enterprise Applications",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "87K",
    timestamp: "2 weeks ago",
    duration: "34:21",
    channel: {
      name: "TypeScript Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "10",
    title: "Building Microservices with Docker and Kubernetes",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "156K",
    timestamp: "1 month ago",
    duration: "42:18",
    channel: {
      name: "Cloud Native",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "11",
    title: "GraphQL vs REST: Choosing the Right API Architecture",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "112K",
    timestamp: "3 weeks ago",
    duration: "28:45",
    channel: {
      name: "API Design",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  {
    id: "12",
    title: "Machine Learning for JavaScript Developers",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "203K",
    timestamp: "2 months ago",
    duration: "38:12",
    channel: {
      name: "JS AI",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "13",
    title: "Building a Serverless Application with AWS Lambda",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "94K",
    timestamp: "1 month ago",
    duration: "31:54",
    channel: {
      name: "Cloud Computing",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "14",
    title: "React Native: Build Once, Deploy Everywhere",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "187K",
    timestamp: "3 weeks ago",
    duration: "45:32",
    channel: {
      name: "Mobile Dev",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "15",
    title: "Web Performance Optimization Techniques",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "76K",
    timestamp: "2 weeks ago",
    duration: "29:47",
    channel: {
      name: "Performance Guru",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  {
    id: "16",
    title: "Building Accessible Web Applications",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "63K",
    timestamp: "1 month ago",
    duration: "36:21",
    channel: {
      name: "A11y Expert",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "17",
    title: "Advanced CSS Animation Techniques",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "142K",
    timestamp: "3 weeks ago",
    duration: "27:18",
    channel: {
      name: "CSS Animations",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  {
    id: "18",
    title: "Testing React Applications with Jest and React Testing Library",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "89K",
    timestamp: "1 month ago",
    duration: "33:45",
    channel: {
      name: "Test Driven",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "19",
    title: "Building a CI/CD Pipeline with GitHub Actions",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "71K",
    timestamp: "2 weeks ago",
    duration: "39:12",
    channel: {
      name: "DevOps Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "20",
    title: "State Management in React: Context API vs Redux",
    thumbnail: "/placeholder.svg?height=180&width=320",
    views: "118K",
    timestamp: "3 weeks ago",
    duration: "41:27",
    channel: {
      name: "React State",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
]

interface VideoGridProps {
  searchQuery?: string
}

export default function VideoGrid({ searchQuery = "" }: VideoGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [videos, setVideos] = useState(allVideos)
  const videosPerPage = 12 // Increased to 12 videos per page

  // Filter videos based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setVideos(allVideos)
    } else {
      const filtered = allVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.channel.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setVideos(filtered)
    }
    // Reset to first page when search changes
    setCurrentPage(1)
  }, [searchQuery])

  const totalPages = Math.ceil(videos.length / videosPerPage)

  // Get current videos
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo)

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
          {currentVideos.map((video) => (
            <div key={video.id} className="group">
              <Link href={`/watch/${video.id}`} className="space-y-2">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Avatar className="h-9 w-9 rounded-full">
                    <AvatarImage src={video.channel.avatar} alt={video.channel.name} />
                    <AvatarFallback>{video.channel.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
                    <div className="flex flex-col text-xs text-muted-foreground">
                      <span className="flex items-center">
                        {video.channel.name}
                        {video.channel.verified && (
                          <svg className="h-3 w-3 ml-1 fill-blue-500" viewBox="0 0 24 24">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-4.5-4.5 1.4-1.4 3.1 3.1 6.2-6.2 1.4 1.4-7.6 7.6z" />
                          </svg>
                        )}
                      </span>
                      <span>
                        {video.views} views • {video.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum = currentPage
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(pageNum)}
                  className="hidden sm:flex"
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* No results message */}
      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-2xl text-muted-foreground">0</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">No videos found</h2>
          <p className="text-muted-foreground max-w-md">
            {"Don&apos;t have any videos &quot;uploaded&quot; yet"}
          </p>
        </div>
      )}
    </div>
  )
}

