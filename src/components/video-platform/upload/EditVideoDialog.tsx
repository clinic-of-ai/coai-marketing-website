import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface Video {
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

interface EditVideoDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editingVideo: Video | null;
  setEditingVideo: (video: Video | null) => void;
  saveEditedVideo: () => void;
}

export function EditVideoDialog({
  isOpen,
  setIsOpen,
  editingVideo,
  setEditingVideo,
  saveEditedVideo,
}: EditVideoDialogProps) {
  if (!editingVideo) return null;

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingVideo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditingVideo({
          ...editingVideo,
          thumbnailFile: file,
          thumbnailPreview: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
          <DialogDescription>Make changes to your video details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Video Preview */}
          <div className="w-full aspect-video rounded overflow-hidden flex-shrink-0 bg-black">
            {editingVideo.videoType === "youtube" && editingVideo.youtubeVideoId ? (
              <iframe
                width="100%"
                height="315"
                className="aspect-video"
                src={`https://www.youtube.com/embed/${editingVideo.youtubeVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Thumbnail section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Thumbnail</label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-18 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={editingVideo.thumbnailPreview || editingVideo.thumbnail || "/placeholder.svg"}
                  alt={editingVideo.title}
                  width={128}
                  height={72}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <Input
                  id="edit-thumbnail"
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={handleThumbnailChange}
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

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={saveEditedVideo}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 