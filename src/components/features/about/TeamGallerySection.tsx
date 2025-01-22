import { SectionHeader } from "@/components/SectionHeader";
import { TeamCard } from "@/components/Card/TeamCard";

type TeamMember = {
  name: string;
  title: string;
  imageUrl: string;
  linkedinUrl : string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Philippe Küng",
    title: "Founder",
    imageUrl: "/image/avatar/philippe-kueng-2.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Tiago Ferreira",
    title: "Senior Developer",
    imageUrl: "/image/avatar/coach-james.png",
    linkedinUrl: "#",
  },
  {
    name: "Maximiliano Peixoto",
    title: "Senior Developer",
    imageUrl: "/image/avatar/max.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Joshua Miller",
    title: "Senior Developer",
    imageUrl: "/image/avatar/josh.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Moses Victor",
    title: "Senior Developer",
    imageUrl: "/image/avatar/moses.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Felipe Ferreira",
    title: "Senior Developer",
    imageUrl: "/image/avatar/felipe.jpg",
    linkedinUrl: "#",
  },
];

export function TeamGallerySection() {
  return (
    <div className="container py-20 space-y-20">
      <SectionHeader
        subtitle="Meet the Team"
        title="The people that make it happen"
        description="We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients."
      />

      <div className="container grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:px-0">
        {teamMembers.map((team, index) => (
          <TeamCard key={index} {...team} />
        ))}
      </div>
    </div>
  );
}
