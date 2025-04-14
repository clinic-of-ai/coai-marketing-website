"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, LayoutGrid, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VideoUploadTab } from "@/components/video-platform/upload/VideoUploadTab"
import { VideoManageTab } from "@/components/video-platform/upload/VideoManageTab"
import { Video, mapSupabaseVideoToUIVideo } from "@/components/video-platform/upload/types"
import { getAllDBVideos } from "@/libs/api"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import { Skeleton } from "@/components/ui/skeleton"

export default function UploadPage() {
  // Require authentication for this page
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth()
  
  const [currentTab, setCurrentTab] = useState("upload")
  const [videos, setVideos] = useState<Video[]>([])
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const [loading, setLoading] = useState(true)

  // Fetch videos from the database
  useEffect(() => {
    // Only fetch videos if authenticated
    if (!isAuthenticated) return
    
    const fetchVideos = async () => {
      try {
        const dbVideos = await getAllDBVideos()
        // Map the Supabase videos to our UI format with proper thumbnail handling
        const mappedVideos = dbVideos.map(video => mapSupabaseVideoToUIVideo(video))
        setVideos(mappedVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [isAuthenticated])

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto p-4 md:p-6">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Video Manager</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={currentTab === "upload" ? "default" : "outline"}
              onClick={() => setCurrentTab("upload")}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </Button>

            <Button
              variant={currentTab === "manage" ? "default" : "outline"}
              onClick={() => setCurrentTab("manage")}
              className="gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Manage</span>
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border">
          {currentTab === "upload" ? (
            <VideoUploadTab videos={videos} setVideos={setVideos} setCurrentTab={setCurrentTab} />
          ) : (
            <VideoManageTab 
              videos={videos} 
              setVideos={setVideos} 
              windowWidth={windowWidth} 
            />
          )}
        </div>
      </div>
    </div>
  )
}
