"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import {
  ExpandableCard,
  ExpandableCardProps,
} from "@/components/Card/ExpandableCard";

const cards: ExpandableCardProps[] = [
  {
    id: "ai-assistants",
    title: "24/7 Multilingual Support",
    description:
      "Customized chatbots that can handle a wide range of tasks, providing timely information and precise responses tailored to you and your business.",
    buttonText: "Learn More",
    bulletPoints: [
      "Never miss a hotel booking or restaurant reservation, day or night",
      "Communicate effortlessly with guests in multiple languages",
      "Provide instant responses to common questions about rooms, menus, or local attractions",
    ],
    bgColor: "bg-orange-100",
    textColor: "text-orange-900",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    arrowBgColor: "bg-orange-200",
    isHovered: false,
    onMouseEnter: function (): void {
      throw new Error("Function not implemented.");
    },
    onMouseLeave: function (): void {
      throw new Error("Function not implemented.");
    },
  },
  {
    id: "streamlined-operations",
    title: "Streamlined Operations",
    description:
      "Optimize your hospitality business with AI-powered automation, seamlessly integrating with your existing systems to enhance efficiency and service quality.",
    buttonText: "Learn More",
    bulletPoints: [
      "Automate hotel check-ins, restaurant reservations, and customer service tasks",
      "Integrate seamlessly with your existing systems (PMS, CRM, POS)",
      "Reduce operational costs while improving service quality",
    ],
    bgColor: "bg-blue-100",
    textColor: "text-blue-900",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    arrowBgColor: "bg-blue-200",
    isHovered: false,
    onMouseEnter: function (): void {
      throw new Error("Function not implemented.");
    },
    onMouseLeave: function (): void {
      throw new Error("Function not implemented.");
    },
  },
  {
    id: "personalized-experiences",
    title: "Personalized Guest Experiences",
    description:
      "Elevate your hospitality with AI-driven personalization, creating memorable stays and dining experiences tailored to each guest's preferences.",
    buttonText: "Learn More",
    bulletPoints: [
      "Offer tailored recommendations for rooms, dining options, or local activities",
      "Remember returning guests and their preferences, from pillow choices to favorite tables",
      "Provide consistent, high-quality service across all interactions",
    ],
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
    buttonColor: "bg-gray-600 hover:bg-gray-700",
    arrowBgColor: "bg-gray-200",
    isHovered: false,
    onMouseEnter: function (): void {
      throw new Error("Function not implemented.");
    },
    onMouseLeave: function (): void {
      throw new Error("Function not implemented.");
    },
  },
  {
    id: "boost-your-revenue",
    title: "Boost Your Revenue",
    description:
      "Maximize your hospitality business's earning potential with AI-driven strategies that increase bookings, encourage upsells, and foster customer loyalty.",
    buttonText: "Learn More",
    bulletPoints: [
      "Increase bookings and reservations with round-the-clock availability",
      "UpSell services, amenities, or special menu items intelligently",
      "Improve guest satisfaction and encourage repeat visits",
    ],
    bgColor: "bg-green-100",
    textColor: "text-gray-900",
    buttonColor: "bg-green-600 hover:bg-green-700",
    arrowBgColor: "bg-green-200",
    isHovered: false,
    onMouseEnter: function (): void {
      throw new Error("Function not implemented.");
    },
    onMouseLeave: function (): void {
      throw new Error("Function not implemented.");
    },
  },
];

export function WhyChooseSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="bg-gray-50 py-20">
      <SectionHeader
        subtitle="Why Choose AVA?"
        title="From Hoteliers to Hoteliers."
        description="AVA is an all-in-one hotel and restaurant management system designed to streamline operations and elevate guest experiences."
      />
      <div className="container grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:flex xl:flex-row">
        {cards.map((card) => (
          <ExpandableCard
            key={card.id}
            {...card}
            isHovered={hoveredCard === card.id}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>
    </section>
  );
}
