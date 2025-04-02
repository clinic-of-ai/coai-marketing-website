"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipForward,
  SkipBack,
  RotateCcw,
} from "lucide-react"

interface VideoPlayerProps {
  videoId: string
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(100)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  // Mock video URL - in a real app, this would come from your API
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
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
    setIsMuted(volume === 0)
  }, [volume])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
    if (isMuted) {
      setVolume(0)
    } else if (volume === 0) {
      setVolume(50)
    }
  }, [isMuted, volume])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = (value[0] / 100) * duration
  }

  const handleFullscreen = () => {
    if (!playerRef.current) return

    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
    }

    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)

    setControlsTimeout(timeout)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const seekForward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.min(video.currentTime + 10, duration)
  }

  const seekBackward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(video.currentTime - 10, 0)
  }

  const restart = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    setIsPlaying(true)
  }

  return (
    <div
      ref={playerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={handlePlayPause}
        onDoubleClick={handleFullscreen}
      />

      {/* Video Controls */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Top Controls */}
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Center Controls */}
        <div className="flex justify-center items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={seekBackward}>
            <SkipBack className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-black/20 h-16 w-16"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={seekForward}>
            <SkipForward className="h-8 w-8" />
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="space-y-2">
          <Slider
            value={[currentTime ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            className="cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary"
          />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <span className="text-white text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={restart}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 ml-auto">
              <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={handleMute}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <div className="w-24 hidden sm:block">
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={handleFullscreen}>
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

