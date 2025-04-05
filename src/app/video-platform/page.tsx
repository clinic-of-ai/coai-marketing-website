import { Suspense } from "react"
import PageLayout from "@/components/video-platform/page-layout"
import VideoGrid from "@/components/video-platform/video-grid"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  // Mock data - in a real app, this would come from your API
  const videoCount = 8

  return (
    <PageLayout title="Recommended" count={videoCount}>
      <Suspense fallback={<VideoGridSkeleton />}>
        <VideoGrid />
      </Suspense>
    </PageLayout>
  )
}

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

