"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scissors, Type, Sliders, Volume2, Play, Pause, Plus, Trash2, Check, X } from "lucide-react"

interface VideoEditorProps {
  videoSrc: string
  onSave: (editedVideo: Blob) => void
}

export default function VideoEditor({ videoSrc, onSave }: VideoEditorProps) {
  const [currentTab, setCurrentTab] = useState("trim")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(100)
  const [textOverlays, setTextOverlays] = useState<
    Array<{ id: string; text: string; x: number; y: number; size: number; color: string }>
  >([])
  const [newText, setNewText] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("none")
  const [volume, setVolume] = useState(100)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setTrimEnd(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = volume / 100
  }, [volume])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTrimChange = (values: number[]) => {
    setTrimStart(values[0])
    setTrimEnd(values[1])
  }

  const handleAddText = () => {
    if (!newText.trim()) return

    const newOverlay = {
      id: `text-${Date.now()}`,
      text: newText,
      x: 50, // center position as percentage
      y: 50, // center position as percentage
      size: 24,
      color: "#ffffff",
    }

    setTextOverlays([...textOverlays, newOverlay])
    setNewText("")
  }

  const handleRemoveText = (id: string) => {
    setTextOverlays(textOverlays.filter((overlay) => overlay.id !== id))
  }

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0])
  }

  const handleSaveEdits = () => {
    // In a real implementation, this would process the video with the edits
    // and return a new video blob
    // For this demo, we'll just simulate a delay
    setTimeout(() => {
      // Mock blob creation
      fetch(videoSrc)
        .then((res) => res.blob())
        .then((blob) => {
          onSave(blob)
        })
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video ref={videoRef} src={videoSrc} className="w-full h-full" onClick={handlePlayPause} />

        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" width={1280} height={720} />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center gap-2 text-white">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="trim">
            <Scissors className="h-4 w-4 mr-2" />
            Trim
          </TabsTrigger>
          <TabsTrigger value="text">
            <Type className="h-4 w-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="filters">
            <Sliders className="h-4 w-4 mr-2" />
            Filters
          </TabsTrigger>
          <TabsTrigger value="audio">
            <Volume2 className="h-4 w-4 mr-2" />
            Audio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trim" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Start: {formatTime(trimStart)}</span>
              <span>End: {formatTime(trimEnd)}</span>
            </div>
            <Slider
              value={[trimStart, trimEnd]}
              min={0}
              max={duration}
              step={0.1}
              onValueChange={handleTrimChange}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setTrimStart(0)
                setTrimEnd(duration)
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = trimStart
                }
              }}
            >
              Preview Trim
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4 pt-4">
          <div className="flex gap-2">
            <Input placeholder="Enter text overlay" value={newText} onChange={(e) => setNewText(e.target.value)} />
            <Button onClick={handleAddText}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-2">
            {textOverlays.length === 0 ? (
              <p className="text-sm text-muted-foreground">No text overlays added yet</p>
            ) : (
              textOverlays.map((overlay) => (
                <div key={overlay.id} className="flex items-center justify-between p-2 border rounded-md">
                  <span className="font-medium">{overlay.text}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveText(overlay.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {textOverlays.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Text Properties</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs">Size</label>
                  <Slider defaultValue={[24]} min={12} max={72} step={1} className="cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs">Color</label>
                  <div className="flex gap-2 mt-2">
                    <button className="w-6 h-6 rounded-full bg-white border"></button>
                    <button className="w-6 h-6 rounded-full bg-yellow-400 border"></button>
                    <button className="w-6 h-6 rounded-full bg-red-500 border"></button>
                    <button className="w-6 h-6 rounded-full bg-blue-500 border"></button>
                    <button className="w-6 h-6 rounded-full bg-green-500 border"></button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="filters" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={selectedFilter === "none" ? "default" : "outline"}
              className="h-auto py-2 flex flex-col gap-1"
              onClick={() => handleFilterChange("none")}
            >
              <div className="w-full h-12 bg-gray-200 rounded"></div>
              <span className="text-xs">None</span>
            </Button>
            <Button
              variant={selectedFilter === "grayscale" ? "default" : "outline"}
              className="h-auto py-2 flex flex-col gap-1"
              onClick={() => handleFilterChange("grayscale")}
            >
              <div className="w-full h-12 bg-gray-500 rounded"></div>
              <span className="text-xs">Grayscale</span>
            </Button>
            <Button
              variant={selectedFilter === "sepia" ? "default" : "outline"}
              className="h-auto py-2 flex flex-col gap-1"
              onClick={() => handleFilterChange("sepia")}
            >
              <div className="w-full h-12 bg-amber-200 rounded"></div>
              <span className="text-xs">Sepia</span>
            </Button>
            <Button
              variant={selectedFilter === "vintage" ? "default" : "outline"}
              className="h-auto py-2 flex flex-col gap-1"
              onClick={() => handleFilterChange("vintage")}
            >
              <div className="w-full h-12 bg-amber-700 rounded"></div>
              <span className="text-xs">Vintage</span>
            </Button>
            <Button
              variant={selectedFilter === "cool" ? "default" : "outline"}
              className="h-auto py-2 flex flex-col gap-1"
              onClick={() => handleFilterChange("cool")}
            >
              <div className="w-full h-12 bg-blue-200 rounded"></div>
              <span className="text-xs">Cool</span>
            </Button>
            <Button
              variant={selectedFilter === "warm" ? "default" : "outline"}
              className="h-auto py-2 flex flex-col gap-1"
              onClick={() => handleFilterChange("warm")}
            >
              <div className="w-full h-12 bg-orange-200 rounded"></div>
              <span className="text-xs">Warm</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Volume</h3>
              <span className="text-sm">{volume}%</span>
            </div>
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Background Music</h3>
            <div className="flex gap-2">
              <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option value="">None</option>
                <option value="upbeat">Upbeat</option>
                <option value="relaxing">Relaxing</option>
                <option value="dramatic">Dramatic</option>
                <option value="funny">Funny</option>
              </select>
              <Button variant="outline" size="icon">
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Music Volume</h3>
              <span className="text-sm">50%</span>
            </div>
            <Slider defaultValue={[50]} min={0} max={100} step={1} className="cursor-pointer" />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSaveEdits}>
          <Check className="h-4 w-4 mr-2" />
          Apply Changes
        </Button>
      </div>
    </div>
  )
}

