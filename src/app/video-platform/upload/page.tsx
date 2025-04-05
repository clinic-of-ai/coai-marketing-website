"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Youtube,
  AlertCircle,
  Check,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Upload,
  ArrowLeft,
  ThumbsUp,
  LayoutGrid,
  Clock,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

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
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState("upload")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Upload state
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [videoCategory, setVideoCategory] = useState("AI/ML News")
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  // Video management state
  const [videos, setVideos] = useState(mockVideos)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingVideo, setEditingVideo] = useState<any | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  const videosPerPage = 10

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter videos based on search query
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)
  const paginatedVideos = filteredVideos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage)

  // Validate and process URL when it changes
  useEffect(() => {
    if (!videoUrl) {
      setError(null)
      return
    }

    // Simple validation for video URLs
    const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(videoUrl)

    if (isYoutubeUrl) {
      setError(null)

      // Auto-import after a short delay to allow user to finish typing
      const timer = setTimeout(() => {
        importVideo()
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setError("Please enter a valid YouTube URL")
    }
  }, [videoUrl])

  // Set video to start at the beginning for thumbnail
  useEffect(() => {
    if (videoRef.current && videoPreview) {
      videoRef.current.currentTime = 0
    }
  }, [videoPreview])

  const importVideo = () => {
    if (error || isLoading || !videoUrl) return

    setIsLoading(true)

    // In a real app, this would fetch the actual video from the URL
    // For demo purposes, we'll use a sample video
    setTimeout(() => {
      setVideoPreview("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
      setIsLoading(false)
    }, 1500)
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePublish = () => {
    if (!videoTitle) {
      alert("Please enter a title for your video")
      return
    }

    setIsUploading(true)

    // Simulate upload with progress updates
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        // Simulate completion after upload
        setTimeout(() => {
          setIsUploading(false)
          setUploadSuccess(true)

          // Add the new video to the list
          const newVideo = {
            id: `video-${videos.length + 1}`,
            title: videoTitle,
            description: videoDescription,
            thumbnail: thumbnailPreview || `/placeholder.svg?height=180&width=320&text=New Video`,
            views: 0,
            uploadDate: new Date().toISOString(),
            duration: "0:00",
            visibility: "private",
            category: videoCategory,
          }

          setVideos([newVideo, ...videos])

          // Reset form after successful upload
          setTimeout(() => {
            setVideoUrl("")
            setVideoPreview(null)
            setVideoTitle("")
            setVideoDescription("")
            setThumbnailPreview(null)
            setThumbnailFile(null)
            setUploadSuccess(false)
            setCurrentTab("manage")
          }, 2000)
        }, 500)
      }
    }, 150)
  }

  // Update the handleVideoClick function to use the same modal for both description and edit icon clicks
  const handleVideoClick = (video: any) => {
    setEditingVideo({ ...video })
    setIsEditDialogOpen(true)
  }

  const saveEditedVideo = () => {
    if (editingVideo) {
      // If there's a new thumbnail, update the video's thumbnail property
      const updatedVideo = { ...editingVideo }
      if (updatedVideo.thumbnailPreview) {
        updatedVideo.thumbnail = updatedVideo.thumbnailPreview
      }

      setVideos(videos.map((v) => (v.id === updatedVideo.id ? updatedVideo : v)))
      setIsEditDialogOpen(false)
      setEditingVideo(null)
    }
  }

  const handleDeleteVideo = (videoId: string) => {
    setVideoToDelete(videoId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteVideo = () => {
    if (videoToDelete) {
      setVideos(videos.filter((v) => v.id !== videoToDelete))
      setIsDeleteDialogOpen(false)
      setVideoToDelete(null)

      // Adjust current page if needed
      if (paginatedVideos.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  const toggleVideoVisibility = (videoId: string) => {
    setVideos(
      videos.map((v) => {
        if (v.id === videoId) {
          return {
            ...v,
            visibility: v.visibility === "public" ? "private" : "public",
          }
        }
        return v
      }),
    )
  }

  const formatDate = (dateString: string, compact = false) => {
    const date = new Date(dateString)
    if (compact) {
      return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
      })
    }
    return (
      date.toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }) + " UTC"
    )
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return `${views}`
  }

  // Update the responsive behavior detection
  const showNumberColumn = windowWidth >= 480
  const showCategoryColumn = windowWidth >= 1200
  const showVisibilityColumn = windowWidth >= 1200
  const showDateColumn = windowWidth >= 1200
  const showViewsColumn = windowWidth >= 1200
  const showDeleteButton = windowWidth >= 1200
  const showDescription = windowWidth >= 480
  const showActionsColumn = windowWidth >= 800

  const handleEditVideo = (video: any) => {
    setEditingVideo({ ...video })
    setIsEditDialogOpen(true)
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

        {currentTab === "upload" && (
          <div className="space-y-6">
            {videoPreview ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left side - Form fields */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="title"
                      placeholder="Add a title that describes your video"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Tell viewers about your video"
                      rows={6}
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={videoCategory}
                      onChange={(e) => setVideoCategory(e.target.value)}
                    >
                      <option value="AI/ML News">AI/ML News</option>
                      <option value="Cybernetics">Cybernetics</option>
                      <option value="Polymatheism">Polymatheism</option>
                      <option value="The New Realty">The New Realty</option>
                      <option value="Clinic Of AI">Clinic Of AI</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="visibility" className="block text-sm font-medium mb-1">
                      Visibility
                    </label>
                    <select id="visibility" className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">
                      Thumbnail
                    </label>
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={handleThumbnailChange}
                    />
                  </div>

                  {isUploading && (
                    <div className="space-y-2 p-3 border rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {uploadSuccess && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-800 dark:text-green-300">Upload successful!</p>
                          <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                            Your video has been uploaded.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setVideoUrl("")
                        setVideoPreview(null)
                      }}
                    >
                      Back
                    </Button>

                    <Button onClick={handlePublish} disabled={isUploading || uploadSuccess || !videoTitle}>
                      {isUploading ? "Uploading..." : uploadSuccess ? "Published!" : "Publish"}
                    </Button>
                  </div>
                </div>

                {/* Right side - Video Preview */}
                <div className="space-y-2">
                  <h2 className="text-lg font-medium">Video Preview</h2>
                  <div className="bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      src={videoPreview}
                      className="w-full aspect-video"
                      controls
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Keep the existing import from URL section
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 md:p-12 text-center">
                <h3 className="text-lg font-medium mb-4">Import video from URL</h3>

                <div className="max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      type="button"
                      onClick={() => focusInput()}
                      className="flex-shrink-0 focus:outline-none"
                      aria-label="Focus input for YouTube"
                    >
                      <Youtube className="h-8 w-8 text-red-600 hover:text-red-700 transition-colors" />
                    </button>
                    <div className="relative flex-1">
                      <Input
                        ref={inputRef}
                        type="text"
                        placeholder="https://youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className={`w-full pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        disabled={isLoading}
                      />
                      {isLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start mt-2 text-red-500 text-sm text-left">
                      <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {currentTab === "manage" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search videos"
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1) // Reset to first page on search
                  }}
                />
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                Showing {paginatedVideos.length} of {filteredVideos.length} videos
              </div>
            </div>

            {/* Responsive Table - Adapts to screen size without horizontal scroll */}
            <div className="border rounded-lg overflow-hidden shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    {showNumberColumn && <th className="px-4 py-3 text-left text-sm font-medium w-12">#</th>}
                    <th className="px-4 py-3 text-left text-sm font-medium">Video</th>
                    {showCategoryColumn && <th className="px-4 py-3 text-left text-sm font-medium">Category</th>}
                    {showVisibilityColumn && <th className="px-4 py-3 text-left text-sm font-medium">Visibility</th>}
                    {showDateColumn && (
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Date</span>
                        </div>
                      </th>
                    )}
                    {showViewsColumn && (
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Views</span>
                        </div>
                      </th>
                    )}
                    {showActionsColumn && <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedVideos.length > 0 ? (
                    paginatedVideos.map((video, index) => (
                      <tr key={video.id} className="hover:bg-muted/50 transition-colors">
                        {showNumberColumn && (
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {(currentPage - 1) * videosPerPage + index + 1}
                          </td>
                        )}
                        <td
                          className={`px-4 py-3 ${windowWidth < 800 ? "cursor-pointer" : ""}`}
                          onClick={() => (windowWidth < 800 ? handleVideoClick(video) : null)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-16 sm:w-24 h-10 sm:h-14 flex-shrink-0 rounded overflow-hidden">
                              <img
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">
                                {windowWidth < 400
                                  ? video.title.length > 20
                                    ? video.title.substring(0, 17) + "..."
                                    : video.title
                                  : video.title}
                              </p>
                              {showDescription && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {windowWidth < 400
                                    ? video.description.length > 30
                                      ? video.description.substring(0, 27) + "..."
                                      : video.description
                                    : windowWidth < 640
                                      ? video.description.length > 60
                                        ? video.description.substring(0, 57) + "..."
                                        : video.description
                                      : video.description}
                                </p>
                              )}

                              {/* Mobile-only info - show when columns are hidden */}
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                {!showVisibilityColumn && (
                                  <Badge variant="outline" className="text-[10px] h-4">
                                    {video.visibility === "public" ? "Public" : "Private"}
                                  </Badge>
                                )}
                                {!showViewsColumn && (
                                  <span className="text-[10px] text-muted-foreground">
                                    {formatViews(video.views)} views
                                  </span>
                                )}
                                {!showDateColumn && (
                                  <span className="text-[10px] text-muted-foreground">
                                    {formatDate(video.uploadDate, true)}
                                  </span>
                                )}
                                {!showCategoryColumn && windowWidth >= 480 && (
                                  <span className="text-[10px] text-muted-foreground">{video.category}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        {showCategoryColumn && <td className="px-4 py-3 text-sm">{video.category}</td>}
                        {showVisibilityColumn && (
                          <td className="px-4 py-3">
                            <Switch
                              checked={video.visibility === "public"}
                              onCheckedChange={() => toggleVideoVisibility(video.id)}
                            />
                          </td>
                        )}
                        {showDateColumn && (
                          <td className="px-4 py-3 text-sm whitespace-nowrap">{formatDate(video.uploadDate)}</td>
                        )}
                        {showViewsColumn && (
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatViews(video.views)}</span>
                            </div>
                          </td>
                        )}
                        <td className={`px-4 py-3 text-right ${showActionsColumn ? "" : "hidden"}`}>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditVideo(video)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>

                            {/* Delete button - only shown on larger screens */}
                            {showDeleteButton && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteVideo(video.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            )}

                            {/* Dropdown menu for smaller screens */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild className={showDeleteButton ? "hidden" : ""}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!showVisibilityColumn && (
                                  <DropdownMenuItem onClick={() => toggleVideoVisibility(video.id)}>
                                    {video.visibility === "public" ? (
                                      <>
                                        <EyeOff className="h-4 w-4 mr-2" />
                                        <span>Make Private</span>
                                      </>
                                    ) : (
                                      <>
                                        <Eye className="h-4 w-4 mr-2" />
                                        <span>Make Public</span>
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                )}
                                {!showDeleteButton && (
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteVideo(video.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        {searchQuery ? (
                          <>
                            <p className="font-medium">No videos found</p>
                            <p className="text-sm mt-1">Try a different search term</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">No videos yet</p>
                            <p className="text-sm mt-1">Upload your first video to get started</p>
                          </>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination - For both mobile and desktop */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
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
          </div>
        )}
      </div>

      {/* Edit Video Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>Make changes to your video details.</DialogDescription>
          </DialogHeader>

          {editingVideo && (
            <div className="space-y-4 py-4">
              {/* Video Preview */}
              <div className="w-full aspect-video rounded overflow-hidden flex-shrink-0 bg-black">
                <video
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Thumbnail</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-18 rounded overflow-hidden flex-shrink-0">
                    {editingVideo.thumbnailPreview ? (
                      <img
                        src={editingVideo.thumbnailPreview || "/placeholder.svg"}
                        alt={editingVideo.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={editingVideo.thumbnail || "/placeholder.svg"}
                        alt={editingVideo.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="edit-thumbnail"
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            setEditingVideo({
                              ...editingVideo,
                              thumbnailFile: file,
                              thumbnailPreview: e.target?.result as string,
                            })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input
                  id="edit-title"
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="edit-description"
                  rows={4}
                  value={editingVideo.description}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  id="edit-category"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={editingVideo.category}
                  onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value })}
                >
                  <option value="AI/ML News">AI/ML News</option>
                  <option value="Cybernetics">Cybernetics</option>
                  <option value="Polymatheism">Polymatheism</option>
                  <option value="The New Realty">The New Realty</option>
                  <option value="Clinic Of AI">Clinic Of AI</option>
                </select>
              </div>

              <div>
                <label htmlFor="edit-visibility" className="block text-sm font-medium mb-1">
                  Visibility
                </label>
                <select
                  id="edit-visibility"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={editingVideo.visibility}
                  onChange={(e) => setEditingVideo({ ...editingVideo, visibility: e.target.value })}
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedVideo}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteVideo}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

