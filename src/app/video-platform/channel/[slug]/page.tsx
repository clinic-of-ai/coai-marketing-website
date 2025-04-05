import EmptyCategory from "@/components/video-platform/empty-category"

export default function ChannelPage({ params }: { params: { slug: string } }) {
  // Convert slug to a readable title (e.g., "ai-ml-news" to "AI/ML News")
  const title = params.slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "ai" || word.toLowerCase() === "ml") return word.toUpperCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
    .replace("Ai", "AI")
    .replace("Ml", "ML")
    .replace("Of Ai", "Of AI")

  return <EmptyCategory title={title} />
}

