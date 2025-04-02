import EmptyCategory from "@/components/video-platform/empty-category";

interface ChannelPageProps {
  params: { slug: string };
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  // Explicitly await the slug parameter (correct Next.js App Router pattern)
  const slug = await Promise.resolve(params.slug);

  // Generate title from slug
  const title = slug
    .split("-")
    .map((word) => {
      const lower = word.toLowerCase();
      if (["ai", "ml"].includes(lower)) return lower.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bMl\b/g, "ML")
    .replace(/\bOf Ai\b/g, "Of AI");

  // Render Client Component directly
  return <EmptyCategory title={title} />;
}