"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IntroTitle } from "@/components/IntroTitle";

const content = [
  {
    question: "What is AVA?",
    answer:
      "AVA is an AI-powered virtual assistant designed for the hospitality industry, handling tasks like reservations, customer inquiries, and basic operations to enhance guest experiences and streamline business processes.",
  },
  {
    question: "How does AVA integrate with my existing systems?", 
    answer:
      "AVA seamlessly integrates with your current Property Management System (PMS), Customer Relationship Management (CRM), and Point of Sale (POS) systems, ensuring a smooth transition and unified operations.",
  },
  {
    question: "Is AVA suitable for small and medium-sized businesses?",
    answer:
      "Absolutely. AVA is specifically designed to meet the needs of small and medium-sized restaurants and hotels, offering scalable solutions that grow with your business.",
  },
  {
    question: "How does AVA handle multiple languages?",
    answer:
      "AVA is equipped with multilingual capabilities, allowing it to communicate with guests in their preferred language, breaking down language barriers and enhancing guest satisfaction.",
  },
  {
    question: "What kind of support is available for AVA?",
    answer:
      "Clinic Of AI Researches and Develops AI-Agentic systems to cover whole vericle. Our AI-Strategist works alongside you to guarantee comprehensive support, including setup assistance, training, and ongoing customer service to ensure AVA meets your business needs effectively.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-inverse py-24 text-inverse-foreground">
      <div className="container mx-auto max-w-2xl space-y-16">
        <IntroTitle
          heading="Frequently asked questions"
          title=" Everything you need to know about the product and billing."
          className="mx-auto"
        />

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {content.map((value, index) => (
              <AccordionItem
                key={value.question + index}
                value={`item-${index}`}
                className="border-b border-white/15 py-2"
              >
                <AccordionTrigger>
                  <span className="text-start text-sm font-semibold tracking-tight">
                    {value.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <span className="text-sm leading-6 text-muted-foreground">
                    {value.answer}
                  </span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
