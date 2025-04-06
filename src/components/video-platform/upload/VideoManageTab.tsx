import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { VideoTable } from "./VideoTable";
import { Pagination } from "./Pagination";
import { EditVideoDialog } from "./EditVideoDialog";
import { DeleteVideoDialog } from "./DeleteVideoDialog";
import { Video } from "./types";

interface VideoManageTabProps {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  windowWidth: number;
}

export function VideoManageTab({ videos, setVideos, windowWidth }: VideoManageTabProps) {
  // Video management state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

  const videosPerPage = 10;

  // Filter videos based on search query
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const paginatedVideos = filteredVideos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage);

  // Update the handleVideoClick function to use the same modal for both description and edit icon clicks
  const handleVideoClick = (video: Video) => {
    setEditingVideo({ ...video });
    setIsEditDialogOpen(true);
  };

  const saveEditedVideo = () => {
    if (editingVideo) {
      // If there's a new thumbnail, update the video's thumbnail property
      const updatedVideo = { ...editingVideo };
      if (updatedVideo.thumbnailPreview) {
        updatedVideo.thumbnail = updatedVideo.thumbnailPreview;
      }

      setVideos(videos.map((v) => (v.id === updatedVideo.id ? updatedVideo : v)));
      setIsEditDialogOpen(false);
      setEditingVideo(null);
    }
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideoToDelete(videoId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteVideo = () => {
    if (videoToDelete) {
      setVideos(videos.filter((v) => v.id !== videoToDelete));
      setIsDeleteDialogOpen(false);
      setVideoToDelete(null);

      // Adjust current page if needed
      if (paginatedVideos.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const toggleVideoVisibility = (videoId: string) => {
    setVideos(
      videos.map((v) => {
        if (v.id === videoId) {
          return {
            ...v,
            visibility: v.visibility === "public" ? "private" : "public",
          };
        }
        return v;
      }),
    );
  };

  const formatDate = (dateString: string, compact = false) => {
    const date = new Date(dateString);
    if (compact) {
      return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
      });
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
    );
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return `${views}`;
  };

  return (
    <div className="space-y-6">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
        totalVideos={videos.length}
        filteredCount={filteredVideos.length}
      />

      <VideoTable
        paginatedVideos={paginatedVideos}
        currentPage={currentPage}
        videosPerPage={videosPerPage}
        windowWidth={windowWidth}
        searchQuery={searchQuery}
        formatDate={formatDate}
        formatViews={formatViews}
        handleEditVideo={handleVideoClick}
        handleDeleteVideo={handleDeleteVideo}
        toggleVideoVisibility={toggleVideoVisibility}
        handleVideoClick={handleVideoClick}
      />

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />
      )}

      <EditVideoDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        editingVideo={editingVideo}
        setEditingVideo={setEditingVideo}
        saveEditedVideo={saveEditedVideo}
      />

      <DeleteVideoDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        confirmDelete={confirmDeleteVideo}
      />
    </div>
  );
} 