import { TestimonialCard } from "@/components/Card/TestimonialCard";
import { IntroTitle } from "@/components/IntroTitle";

const testimonials = [
  {
    quote:
      "Since implementing AVA, our guest satisfaction scores have increased by 35%. The 24/7 multilingual support has been particularly valuable for our international clientele.",
    name: "Isabella Martinez",
    title: "General Manager",
    company: "The Ritz-Carlton Barcelona",
    image: "/image/avatar/client-1.jpg",
  },
  {
    quote: "AVA has revolutionized our reservation system. We've reduced no-shows by 60% and increased our average table turnover. The automated reminders and confirmation system is a game-changer.",
    name: "David Chang",
    title: "Executive Chef & Owner",
    company: "Momofuku Group",
    image: "/image/avatar/client-2.jpg",
  },
  {
    quote:
      "The ROI with AVA has been remarkable. We've cut operational costs by 25% while improving our response time to guest requests from hours to minutes. It's transformed how we do business.",
    name: "Alexandra Dubois",
    title: "Operations Director",
    company: "Sofitel Paris Le Faubourg",
    image: "/image/avatar/client-3.jpg",
  },
];

export function ClientTestimonialSection() {
  return (
    <section className="container space-y-12 pb-20 py-[72px] border-b border-border">
      <IntroTitle
        heading="Testimonials"
        title="What Our Clients are saying..."
        align="left"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
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
