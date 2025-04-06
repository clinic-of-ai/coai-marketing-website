import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VideoFormProps {
  videoTitle: string;
  setVideoTitle: (title: string) => void;
  videoDescription: string;
  setVideoDescription: (description: string) => void;
  videoCategory: string;
  setVideoCategory: (category: string) => void;
  handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePublish: () => void;
  handleGoBack: () => void;
  isUploading: boolean;
  uploadProgress: number;
  uploadSuccess: boolean;
}

export function VideoForm({
  videoTitle,
  setVideoTitle,
  videoDescription,
  setVideoDescription,
  videoCategory,
  setVideoCategory,
  handleThumbnailChange,
  handlePublish,
  handleGoBack,
  isUploading,
  uploadProgress,
  uploadSuccess,
}: VideoFormProps) {
  return (
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
        <Button variant="outline" onClick={handleGoBack}>
          Back
        </Button>

        <Button onClick={handlePublish} disabled={isUploading || uploadSuccess || !videoTitle}>
          {isUploading ? "Uploading..." : uploadSuccess ? "Published!" : "Publish"}
        </Button>
      </div>
    </div>
  );
} 