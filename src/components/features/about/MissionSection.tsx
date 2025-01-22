import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SectionHeader } from "@/components/SectionHeader";
import { FeatureCard, FeatureCardProps } from "./FeatureSection";
import { HeartHandshake } from 'lucide-react';
import { Puzzle } from 'lucide-react';
import { Key } from 'lucide-react';

const features: FeatureCardProps[] = [
    {
      title: 'Democratizing AI',
      description: 'We are committed to addressing inequality by making AI accessible to everyone, not just Fortune 100 companies.',
      link: '#',
      icon: HeartHandshake  
    },
    {
      title: 'Ecosystem of Solutions',
      description: 'Building a wide variety of easy-to-use AI-driven products and services for real-life everyday problems.',
      link: '#',
      icon: Puzzle  
    },
    {
      title: 'Empowering All Businesses',
      description: 'Creating AI solutions that benefit software developers, data scientists, businesses of all sizes, and ordinary people.',
      link: '#',
      icon: Key  
    },
  ]

export function MissionSection() {
  return (
    <div className="container">
      <div className="flex flex-col gap-4 pt-20 pb-10">
        <SectionHeader
          subtitle="Our Mission"
          title="Democratizing AI for Everyone"
          description="We are addressing inequality and democratizing AI, committed to helping everyone benefit from the new Intelligence Age."
        />
      </div>

      <AspectRatio ratio={13 / 8} className="w-full">
        <Image
          src="https://images.pexels.com/photos/6248751/pexels-photo-6248751.jpeg"
          alt="Our Mission"
          className="rounded-xl bg-slate-400 object-cover"
          fill
        />
      </AspectRatio>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}
