import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getReadableFileSize(bytes: number) {
  const i = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Number((bytes / Math.pow(1024, i)).toFixed(2))} ${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Match standard YouTube URLs like:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://youtube.com/shorts/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  
  return match && match[1] ? match[1] : null;
}

/**
 * Get YouTube thumbnail URL from video URL
 * @param url YouTube video URL
 * @param quality Thumbnail quality: default, hqdefault, mqdefault, sddefault, maxresdefault
 */
export function getYouTubeThumbnailUrl(url: string, quality: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return '/placeholder.svg';
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
