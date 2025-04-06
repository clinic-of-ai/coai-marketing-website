import React, { useState, useRef, useEffect } from "react";
import { VideoImport } from "./VideoImport";
import { VideoForm } from "./VideoForm";
import { VideoPreview } from "./VideoPreview";

interface VideoUploadTabProps {
  videos: any[];
  setVideos: React.Dispatch<React.SetStateAction<any[]>>;
  setCurrentTab: (tab: string) => void;
}

export function VideoUploadTab({ videos, setVideos, setCurrentTab }: VideoUploadTabProps) {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // YouTube specific state
  const [videoType, setVideoType] = useState<"youtube" | "direct">("direct");
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoCategory, setVideoCategory] = useState("AI/ML News");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // Extract YouTube video ID from URL
  const extractYoutubeVideoId = (url: string): string | null => {
    // Match youtube.com/watch?v=VIDEOID
    let match = url.match(/youtube\.com\/watch\?v=([^&]+)/);
    if (match) return match[1];
    
    // Match youtu.be/VIDEOID
    match = url.match(/youtu\.be\/([^?]+)/);
    if (match) return match[1];
    
    // Match youtube.com/embed/VIDEOID
    match = url.match(/youtube\.com\/embed\/([^?]+)/);
    if (match) return match[1];
    
    return null;
  };

  // Validate and process URL when it changes
  useEffect(() => {
    if (!videoUrl) {
      setError(null);
      return;
    }

    // Simple validation for video URLs
    const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(videoUrl);

    if (isYoutubeUrl) {
      setError(null);

      // Auto-import after a short delay to allow user to finish typing
      const timer = setTimeout(() => {
        importVideo();
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setError("Please enter a valid YouTube URL");
    }
  }, [videoUrl]);

  // Set video to start at the beginning for thumbnail
  useEffect(() => {
    if (videoRef.current && videoPreview && videoType === "direct") {
      videoRef.current.currentTime = 0;
    }
  }, [videoPreview, videoType]);

  const importVideo = () => {
    if (error || isLoading || !videoUrl) return;

    setIsLoading(true);

    // Extract the YouTube video ID
    const videoId = extractYoutubeVideoId(videoUrl);
    
    if (videoId) {
      // We have a valid YouTube video ID
      setYoutubeVideoId(videoId);
      setVideoType("youtube");
      
      // Auto-populate title if empty
      if (!videoTitle) {
        // In a real app, you would fetch video metadata from YouTube API
        setVideoTitle(`YouTube Video (${videoId})`);
      }
      
      // You could fetch video thumbnail from YouTube using:
      // setThumbnailPreview(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      
      setIsLoading(false);
    } else {
      // For demo purposes, fallback to sample video if YouTube ID extraction fails
      setTimeout(() => {
        setVideoType("direct");
        setVideoPreview("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if (!videoTitle) {
      alert("Please enter a title for your video");
      return;
    }

    setIsUploading(true);

    // Simulate upload with progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Simulate completion after upload
        setTimeout(() => {
          setIsUploading(false);
          setUploadSuccess(true);

          // Add the new video to the list
          const newVideo = {
            id: `video-${videos.length + 1}`,
            title: videoTitle,
            description: videoDescription,
            thumbnail: thumbnailPreview || 
              (youtubeVideoId ? `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg` : `/placeholder.svg?height=180&width=320&text=New Video`),
            views: 0,
            uploadDate: new Date().toISOString(),
            duration: "0:00",
            visibility: "private",
            category: videoCategory,
            youtubeVideoId: youtubeVideoId,
            videoType: videoType,
          };

          setVideos([newVideo, ...videos]);

          // Reset form after successful upload
          setTimeout(() => {
            setVideoUrl("");
            setVideoPreview(null);
            setYoutubeVideoId(null);
            setVideoTitle("");
            setVideoDescription("");
            setThumbnailPreview(null);
            setThumbnailFile(null);
            setUploadSuccess(false);
            setCurrentTab("manage");
          }, 2000);
        }, 500);
      }
    }, 150);
  };

  const handleGoBack = () => {
    setVideoUrl("");
    setVideoPreview(null);
    setYoutubeVideoId(null);
  };

  return (
    <div className="space-y-6">
      {(videoPreview || youtubeVideoId) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - Form fields */}
          <VideoForm
            videoTitle={videoTitle}
            setVideoTitle={setVideoTitle}
            videoDescription={videoDescription}
            setVideoDescription={setVideoDescription}
            videoCategory={videoCategory}
            setVideoCategory={setVideoCategory}
            handleThumbnailChange={handleThumbnailChange}
            handlePublish={handlePublish}
            handleGoBack={handleGoBack}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            uploadSuccess={uploadSuccess}
          />

          {/* Right side - Video Preview */}
          <VideoPreview 
            videoRef={videoRef} 
            videoPreview={videoPreview} 
            videoType={videoType}
            youtubeVideoId={youtubeVideoId || undefined}
          />
        </div>
      ) : (
        <VideoImport
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          error={error}
          isLoading={isLoading}
        />
      )}
    </div>
  );
} 