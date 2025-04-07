import { Suspense } from "react"
import PageLayout from "@/components/video-platform/page-layout"
import VideoPlayer from "@/components/video-platform/video-player"
import VideoInfo from "@/components/video-platform/video-info"
import RelatedVideos from "@/components/video-platform/related-videos"
import { Skeleton } from "@/components/ui/skeleton"
import { getVideoById, getAllVideos } from "@/libs/api"

// Generate static params for all videos at build time
export async function generateStaticParams() {
  try {
    const videos = await getAllVideos();
    return videos.map((video) => ({
      id: video.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Get video data for the current page
async function getVideoData(id: string) {
  try {
    const video = await getVideoById(id);
    return video;
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    return null;
  }
}

export default async function WatchPage({ params }: { params: { id: string } }) {
  // Fetch the video data
  const video = await getVideoData(params.id);

  if (!video) {
    return (
      <PageLayout title="Video Not Found" count={0} hidesearch={false}>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
            ❌
          </div>
          <h2 className="text-xl font-semibold mb-2">Video Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            The video you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={video.title} count={5} hidesearch={true}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Suspense fallback={<VideoPlayerSkeleton />}>
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Video Preview</h2>
              <div className="bg-black rounded-lg overflow-hidden shadow-lg">
                {video.youtube_url ? (
                  <div className="relative w-full pt-[56.25%]">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${params.id}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <VideoPlayer videoId={params.id} youtubeUrl={video.youtube_url} />
                )}
              </div>
            </div>
          </Suspense>
          <Suspense fallback={<VideoInfoSkeleton />}>
            <VideoInfo videoId={params.id} video={video} />
          </Suspense>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            Related Videos <span className="text-muted-foreground">(6)</span>
          </h2>
          <Suspense fallback={<RelatedVideosSkeleton />}>
            <RelatedVideos videoId={params.id} />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  )
}

function VideoPlayerSkeleton() {
  return <Skeleton className="w-full aspect-video rounded-lg" />
}

function VideoInfoSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-3/4" />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-24 w-full" />
    </div>
  )
}

function RelatedVideosSkeleton() {
  return (
    <div className="space-y-4">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="h-24 w-40 rounded-md" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
    </div>
  )
}
