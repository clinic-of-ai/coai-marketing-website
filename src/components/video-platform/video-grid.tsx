import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data - in a real app, this would come from your API
const videos = [
  {
    id: "1",
    title: "Building a YouTube Clone with MERN Stack",
    thumbnail: "/image/placeholder.svg?height=180&width=320",
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
    thumbnail: "/image/placeholder.svg?height=180&width=320",
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
    thumbnail: "/image/placeholder.svg?height=180&width=320",
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
    thumbnail: "/image/placeholder.svg?height=180&width=320",
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
    thumbnail: "/image/placeholder.svg?height=180&width=320",
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
    thumbnail: "/image/placeholder.svg?height=180&width=320",
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
    thumbnail: "/image/placeholder.svg?height=180&width=320",
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
    thumbnail: "/image/placeholder.svg?height=180&width=320",
    views: "45K",
    timestamp: "4 weeks ago",
    duration: "26:54",
    channel: {
      name: "Real-time Dev",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
]

export default function VideoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="group">
          <Link href={`/video-platform/watch/${video.id}`} className="space-y-2">
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
  )
}

