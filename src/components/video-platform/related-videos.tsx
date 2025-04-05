import Link from "next/link"
import Image from "next/image"

interface RelatedVideosProps {
  videoId: string
}

export default function RelatedVideos({ videoId }: RelatedVideosProps) {
  // Mock data - in a real app, this would come from your API
  const videos = [
    {
      id: "2",
      title: "React Hooks Explained: useEffect, useState, useContext",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      views: "45K",
      timestamp: "1 week ago",
      duration: "18:27",
      channel: {
        name: "React Masters",
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
      },
    },
  ]

  return (
    <div className="space-y-3">
      {videos.map((video) => (
        <Link key={video.id} href={`/video-platform/watch/${video.id}`} className="flex gap-2 group">
          <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden bg-muted">
            <Image
              src={video.thumbnail || "/image/placeholder.svg"}
              alt={video.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
            <p className="text-xs text-muted-foreground">{video.channel.name}</p>
            <p className="text-xs text-muted-foreground">
              {video.views} views • {video.timestamp}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

