"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, LayoutGrid, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VideoUploadTab } from "@/components/video-platform/upload/VideoUploadTab"
import { VideoManageTab } from "@/components/video-platform/upload/VideoManageTab"
import { Video, mapSupabaseVideoToUIVideo } from "@/components/video-platform/upload/types"
import { getAllDBVideos } from "@/libs/api"

export default function UploadPage() {
  const [currentTab, setCurrentTab] = useState("upload")
  const [videos, setVideos] = useState<Video[]>([])
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const [loading, setLoading] = useState(true)

  // Fetch videos from the database
  useEffect(() => {
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
  }, [])

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative flex items-center justify-center w-[150px] h-[150px] rounded-full border-[3px] border-blue-500 border-opacity-10 text-blue-500 font-sans uppercase tracking-widest shadow-xl">
            COAI
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-transparent border-t-blue-500 border-r-blue-500 animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/2 w-1/2 h-[4px] origin-left bg-transparent animate-spin-loader-line">
              <div className="absolute -right-[8px] -top-[6px] w-4 h-4 rounded-full bg-blue-400 shadow-blue-glow"></div>
            </div>
          </div>
        </div>
        ) : (
          <>
            {currentTab === "upload" && (
              <VideoUploadTab 
                videos={videos}
                setVideos={setVideos}
                setCurrentTab={setCurrentTab}
              />
            )}

            {currentTab === "manage" && (
              <VideoManageTab 
                key={`video-manage-${videos.length}`}
                videos={videos}
                setVideos={setVideos}
                windowWidth={windowWidth}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
