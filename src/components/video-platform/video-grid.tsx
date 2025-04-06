"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAllVideos } from "@/hooks/useSupabaseData"
import { extractYouTubeVideoId } from "@/libs/utils"

interface VideoGridProps {
  searchQuery?: string
  onVideoCountChange?: (count: number) => void
  categoryId?: string
  // New props for direct data passing
  videos?: any[]
  loading?: boolean
  error?: Error | null
}

export default function VideoGrid({ 
  searchQuery = "", 
  onVideoCountChange,
  categoryId,
  videos: propVideos,
  loading: propLoading,
  error: propError
}: VideoGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredVideos, setFilteredVideos] = useState<any[]>([])
  
  // Only fetch videos if they're not provided as props
  const { videos: fetchedVideos, loading: fetchLoading, error: fetchError } = useAllVideos();
  
  // Use either the provided videos or the fetched ones
  const videos = propVideos || fetchedVideos;
  const loading = propLoading !== undefined ? propLoading : fetchLoading;
  const error = propError || fetchError;

  const videosPerPage = 12

  // Filter videos based on search query and category
  useEffect(() => {
    if (!videos) return;
    
    let filtered = [...videos]; // Create a copy to avoid modifying the original
    
    // Only apply category filtering if videos weren't pre-filtered by category
    // (if videos are passed in as props from CategoryVideos, they're already filtered)
    if (categoryId && !propVideos) {
      filtered = filtered.filter(video => video?.category_id === categoryId);
    }
    
    // Filter by search query if specified
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (video) =>
          (video?.title?.toLowerCase().includes(query)) ||
          (video?.description?.toLowerCase().includes(query)) ||
          (video?.categories?.name && video.categories.name.toLowerCase().includes(query))
      );
    }
    
    setFilteredVideos(filtered);
    
    // Update parent component with video count if callback provided
    if (onVideoCountChange) {
      onVideoCountChange(filtered.length);
    }
    
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchQuery, videos, onVideoCountChange, categoryId, propVideos]);

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

  // Get current videos
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const now = new Date()
    
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays < 1) return "Today"
    if (diffInDays < 2) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  // Handle thumbnail URL
  const getThumbnailUrl = (video: any) => {
    // Check if there's a thumbnail URL
    if (!video?.thumbnail_url) {
      // If no thumbnail URL, use YouTube thumbnail if possible
      return video?.youtube_url ? `/placeholder.svg` : '/placeholder.svg';
    }
    return video.thumbnail_url;
  }

  // Safely get YouTube URL with validation
  const getYoutubeUrl = (url: string | undefined) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    if (url.startsWith('www.')) return `https://${url}`;
    return '#';
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
          ❌
        </div>
        <h2 className="text-xl font-semibold mb-2">Error loading videos</h2>
        <p className="text-muted-foreground max-w-md">
          {error.message || "Something went wrong. Please try again later."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
          {currentVideos.map((video, index) => (
            <div key={video?.id || index} className="group">
              <Link 
                href={getYoutubeUrl(video?.youtube_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="space-y-2"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  {video?.thumbnail_url && video.thumbnail_url.includes("supabase.co") ? (
                    // For Supabase hosted images, use a regular img tag instead of next/image
                    <div className="w-full h-full relative">
                      <Image
                        src={video.thumbnail_url}
                        alt={video?.title || "Video thumbnail"}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <Image
                      src={getThumbnailUrl(video) || "/placeholder.svg"}
                      alt={video?.title || "Video thumbnail"}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  {extractYouTubeVideoId(video?.youtube_url || '') && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Avatar className="h-9 w-9 rounded-full">
                    {video?.categories?.name ? (
                      <AvatarFallback style={{ backgroundColor: stringToColor(video.categories.name) }}>
                        {video.categories.name.charAt(0)}
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback>V</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium line-clamp-2 text-sm">{video?.title || "Untitled video"}</h3>
                    <div className="flex flex-col text-xs text-muted-foreground">
                      <span className="flex items-center">
                        {video?.categories?.name || "Uncategorized"}
                      </span>
                      <div className="flex items-center gap-1">
                        <span>{formatDate(video?.created_at || "")}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
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
      {filteredVideos.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-2xl text-muted-foreground">0</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">No videos found</h2>
          <p className="text-muted-foreground max-w-md">
            {searchQuery ? "No videos match your search criteria" : "No videos available yet"}
          </p>
        </div>
      )}
    </div>
  )
}

// Helper function to generate a color from a string
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
}
