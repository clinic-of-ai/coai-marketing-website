import { Suspense } from "react"
import PageLayout from "@/components/video-platform/page-layout"
import VideoPlayer from "@/components/video-platform/video-player"
import VideoInfo from "@/components/video-platform/video-info"
import CommentSection from "@/components/video-platform/comment-section"
import RelatedVideos from "@/components/video-platform/related-videos"
import { Skeleton } from "@/components/ui/skeleton"

export default function WatchPage({ params }: { params: { id: string } }) {
    // Mock data - in a real app, this would come from your API
    const relatedVideoCount = 7

    return (
        <PageLayout title="Recommended" count={relatedVideoCount}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Suspense fallback={<VideoPlayerSkeleton />}>
                        <VideoPlayer videoId={params.id} />
                    </Suspense>
                    <Suspense fallback={<VideoInfoSkeleton />}>
                        <VideoInfo videoId={params.id} />
                    </Suspense>
                    {false && <Suspense fallback={<CommentSectionSkeleton />}>
                        <CommentSection videoId={params.id} />
                    </Suspense>}
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                        Related Videos <span className="text-muted-foreground">({relatedVideoCount})</span>
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

function CommentSectionSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-full rounded-md" />
            </div>
            {Array(3)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="flex gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1 flex-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-full" />
                        </div>
                    </div>
                ))}
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

