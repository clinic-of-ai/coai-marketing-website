import { IndustryCard } from "@/components/Card/IndustryCard";
import { industries } from "@/data/industries";
import { SimpleGallery } from "@/components/features/homepage/SimpleGallery";

export function IndustryGallerySection() {
  return (
    <section className="container py-20">
      <SimpleGallery>
        {industries.map((industry) => (
          <IndustryCard key={industry.tag} {...industry} layout="loosed" />
        ))}
      </SimpleGallery>
    </section>
  );
}
