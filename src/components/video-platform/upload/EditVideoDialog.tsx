import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "./types";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

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

  // Update the preview when the dialog is opened or when thumbnailPreview in editingVideo changes
  useEffect(() => {
    if (isOpen && editingVideo) {
      // Use thumbnailPreview from editingVideo if available, otherwise fall back to thumbnail
      setThumbnailPreview(editingVideo.thumbnailPreview || editingVideo.thumbnail);
    } else {
      setThumbnailPreview(null);
    }
  }, [isOpen, editingVideo, editingVideo?.thumbnailPreview]);

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingVideo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Update both the local preview state and the editingVideo object
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
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Video</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1 text-foreground/80">
              Title
            </label>
            <Input
              id="title"
              value={editingVideo.title}
              onChange={(e) => handleInputChange(e, "title")}
              disabled={isProcessing}
              className="focus-visible:ring-primary/70 transition-all"
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-foreground/80">
              Description
            </label>
            <Textarea
              id="description"
              rows={4}
              value={editingVideo.description}
              onChange={(e) => handleInputChange(e, "description")}
              disabled={isProcessing}
              className="focus-visible:ring-primary/70 transition-all resize-none"
              placeholder="Enter video description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground/80">Thumbnail</label>
            <div
              className="relative aspect-video rounded-lg overflow-hidden bg-muted/50 cursor-pointer group transition-all hover:shadow-md"
              onClick={handleThumbnailClick}
            >
              {thumbnailPreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={thumbnailPreview}
                    alt="Video thumbnail"
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Upload className="h-8 w-8 text-muted-foreground/70" />
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
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium bg-black/60 px-3 py-2 rounded-md flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Change thumbnail
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Upload className="h-3 w-3" />
              Click to upload a custom thumbnail
            </p>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isProcessing}
            className="gap-1 hover:bg-background"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button 
            onClick={saveEditedVideo}
            disabled={isProcessing}
            className="bg-primary hover:bg-primary/90 transition-colors"
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