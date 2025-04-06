export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailPreview?: string;
  thumbnailFile?: File;
  views: number;
  uploadDate: string;
  duration: string;
  visibility: string;
  category: string;
  youtubeVideoId?: string | null;
  videoType?: "youtube" | "direct";
}
