import { IndustryCard } from "@/components/Card/IndustryCard";
import { industries } from "@/data/industries";
import { SimpleGallery } from "@/components/features/homepage/SimpleGallery";

export function IndustryGallerySection() {
  return (
    <section className="container py-20">
      <SimpleGallery>
        {industries.map((industry) => (
          <IndustryCard
            key={industry.tag}
            imageSrc={industry.image}
            title={industry.title}
            paragraph={industry.description}
            href={industry.href}
            layout="loosed"
          />
        ))}
      </SimpleGallery>
    </section>
  );
}
