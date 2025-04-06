"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, LayoutGrid, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VideoUploadTab } from "@/components/video-platform/upload/VideoUploadTab"
import { VideoManageTab } from "@/components/video-platform/upload/VideoManageTab"
import { Video } from "@/components/video-platform/upload/types"

// Mock data for videos - increase to 15 videos
const mockVideos = Array(15)
  .fill(null)
  .map((_, i) => ({
    id: `video-${i + 1}`,
    title: `Video ${i + 1}: Understanding AI Concepts and Applications`,
    description:
      "This video explores the fundamental concepts of artificial intelligence and its real-world applications.",
    thumbnail: `/placeholder.svg?height=180&width=320&text=Video ${i + 1}`,
    views: Math.floor(Math.random() * 10000),
    uploadDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
    visibility: Math.random() > 0.3 ? "public" : "private",
    category: ["AI/ML News", "Cybernetics", "Polymatheism", "The New Realty", "Clinic Of AI"][
      Math.floor(Math.random() * 5)
    ],
  }))

export default function UploadPage() {
  const [currentTab, setCurrentTab] = useState("upload")
  const [videos, setVideos] = useState<Video[]>(mockVideos)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

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

        {currentTab === "upload" && (
          <VideoUploadTab 
            videos={videos}
            setVideos={setVideos}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === "manage" && (
          <VideoManageTab 
            videos={videos}
            setVideos={setVideos}
            windowWidth={windowWidth}
          />
        )}
      </div>
    </div>
  )
}

