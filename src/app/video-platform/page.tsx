"use client"

import { useState } from "react"
import PageLayout from "@/components/video-platform/page-layout"
import VideoGrid from "@/components/video-platform/video-grid"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videoCount, setVideoCount] = useState(0)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleVideoCountChange = (count: number) => {
    setVideoCount(count)
  }

  return (
    <PageLayout title="Recommended" count={videoCount} onSearch={handleSearch}>
      <VideoGrid 
        searchQuery={searchQuery} 
        onVideoCountChange={handleVideoCountChange} 
      />
    </PageLayout>
  )
}
