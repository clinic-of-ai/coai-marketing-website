import { TestimonialCard } from "../cards/TestimonialCard";
import { TitleBlock } from "@/components/common/title-block";

interface ClientTestimonialSectionProps {
  title: string;
  heading: string;
  items: Array<{
    quote: string;
    name: string;
    title: string;
    company: string;
    image: string;
  }>;
}

export function ClientTestimonialSection(props: ClientTestimonialSectionProps) {
  return (
    <section className="container space-y-12 pb-20 py-[72px] border-b border-border">
      <TitleBlock
        title={props.title}
        heading={props.heading}
        align="left"
        classNames={{
          container: "max-w-[740px]"
        }}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {props.items.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            name={testimonial.name}
            title={testimonial.title}
            company={testimonial.company}
            quote={testimonial.quote}
            image={testimonial.image}
          />
        ))}
      </div>
    </section>
  );
}
