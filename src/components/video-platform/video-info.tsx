"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface VideoInfoProps {
  videoId: string
}

export default function VideoInfo({ videoId }: VideoInfoProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [likeCount, setLikeCount] = useState(15243)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  // Mock data - in a real app, this would come from your API
  const video = {
    title: "Building a YouTube Clone with MERN Stack and Advanced Features",
    views: "120,543",
    date: "Mar 5, 2023",
    description: `In this comprehensive tutorial, we'll build a complete YouTube clone using the MERN stack (MongoDB, Express.js, React.js, and Node.js) with Tailwind CSS for styling.

We'll implement advanced features including:
- User authentication with Passport.js
- Video uploading and streaming
- Video editing capabilities
- Comments and likes
- Personalized playlists
- Live streaming
- Related videos recommendations

This project is perfect for developers looking to enhance their full-stack development skills and build a complex, real-world application.

Don't forget to like and subscribe for more tutorials!`,
    channel: {
      name: "Dev Masters",
      subscribers: "1.2M",
      avatar: "/placeholder.svg?height=48&width=48",
      verified: true,
    },
  }

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1)
      setIsLiked(false)
    } else {
      setLikeCount((prev) => prev + (isDisliked ? 2 : 1))
      setIsLiked(true)
      setIsDisliked(false)
    }
  }

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false)
    } else {
      if (isLiked) {
        setLikeCount((prev) => prev - 1)
      }
      setIsLiked(false)
      setIsDisliked(true)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold md:text-2xl">{video.title}</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 md:h-12 md:w-12">
            <AvatarImage src={video.channel.avatar} alt={video.channel.name} />
            <AvatarFallback>{video.channel.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <span className="font-medium">{video.channel.name}</span>
              {video.channel.verified && (
                <svg className="h-4 w-4 ml-1 fill-blue-500" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-4.5-4.5 1.4-1.4 3.1 3.1 6.2-6.2 1.4 1.4-7.6 7.6z" />
                </svg>
              )}
            </div>
            <div className="text-sm text-muted-foreground">{video.channel.subscribers} subscribers</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          <Button
            variant={isSubscribed ? "outline" : "default"}
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={isSubscribed ? "bg-muted hover:bg-muted" : ""}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>

          <div className="flex items-center border rounded-full overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none px-3 ${isLiked ? "bg-muted" : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp className={`h-4 w-4 mr-1.5 ${isLiked ? "fill-current" : ""}`} />
              {formatNumber(likeCount)}
            </Button>
            <div className="h-5 w-px bg-border"></div>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none px-3 ${isDisliked ? "bg-muted" : ""}`}
              onClick={handleDislike}
            >
              <ThumbsDown className={`h-4 w-4 ${isDisliked ? "fill-current" : ""}`} />
            </Button>
          </div>

          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </Button>

          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="h-4 w-4 mr-1.5" />
            Download
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="sm:hidden">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator className="sm:hidden" />
              <DropdownMenuItem>Save to playlist</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{video.views} views</span>
          <span>•</span>
          <span>{video.date}</span>
        </div>

        <div className={`mt-2 text-sm whitespace-pre-line ${isDescriptionExpanded ? "" : "line-clamp-2"}`}>
          {video.description}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="mt-1 h-auto p-0 text-xs font-medium"
          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        >
          {isDescriptionExpanded ? (
            <span className="flex items-center">
              Show less <ChevronUp className="h-3 w-3 ml-1" />
            </span>
          ) : (
            <span className="flex items-center">
              Show more <ChevronDown className="h-3 w-3 ml-1" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

