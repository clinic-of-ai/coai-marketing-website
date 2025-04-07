"use client"

import { useState, useEffect } from "react"
import { extractYouTubeVideoId } from "@/libs/utils"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoId: string
  youtubeUrl?: string
}

export default function VideoPlayer({ videoId, youtubeUrl }: VideoPlayerProps) {
  const [videoEmbedId, setVideoEmbedId] = useState<string | null>(null)
  
  useEffect(() => {
    if (youtubeUrl) {
      const embedId = extractYouTubeVideoId(youtubeUrl)
      setVideoEmbedId(embedId)
    }
  }, [youtubeUrl])
  
  // Handle YouTube embed
  if (videoEmbedId) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoEmbedId}?autoplay=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )
  }
  
  // Direct video files would be handled here if implemented
  
  // Fallback when no video source is available
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-medium">Video unavailable</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {youtubeUrl ? 
            "This YouTube video couldn't be embedded. You can watch it directly on YouTube." : 
            "This video doesn't have an associated media source."}
        </p>
        
        {youtubeUrl && (
          <Button variant="outline" asChild>
            <a 
              href={youtubeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              Watch on YouTube
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

