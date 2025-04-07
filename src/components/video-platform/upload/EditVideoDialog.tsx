import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "./types";
import { Loader2 } from "lucide-react";

interface EditVideoDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editingVideo: Video | null;
  setEditingVideo: (video: Video | null) => void;
  saveEditedVideo: () => void;
  isProcessing?: boolean;
}

export function EditVideoDialog({
  isOpen,
  setIsOpen,
  editingVideo,
  setEditingVideo,
  saveEditedVideo,
  isProcessing = false,
}: EditVideoDialogProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only update the preview when the dialog is opened
  useEffect(() => {
    if (isOpen && editingVideo) {
      setThumbnailPreview(editingVideo.thumbnail);
    } else {
      setThumbnailPreview(null);
    }
  }, [isOpen, editingVideo]);

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingVideo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setThumbnailPreview(result);
        setEditingVideo({
          ...editingVideo,
          thumbnailPreview: result,
          thumbnailFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Video
  ) => {
    if (editingVideo) {
      setEditingVideo({
        ...editingVideo,
        [field]: e.target.value,
      });
    }
  };

  if (!editingVideo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              value={editingVideo.title}
              onChange={(e) => handleInputChange(e, "title")}
              disabled={isProcessing}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              rows={4}
              value={editingVideo.description}
              onChange={(e) => handleInputChange(e, "description")}
              disabled={isProcessing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail</label>
            <div
              className="relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer"
              onClick={handleThumbnailClick}
            >
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-muted-foreground">No thumbnail</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
                disabled={isProcessing}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-medium bg-black/50 px-2 py-1 rounded">
                  Click to change
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Click the thumbnail to upload a new one
            </p>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button 
            onClick={saveEditedVideo}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 