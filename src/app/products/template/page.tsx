import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Template() {
  return (
    <>
      <ComponentSectionOne />
      <ComponentSectionFour />
      <ComponentSectionTwo />
      <ComponentSectionThree />
      <ComponentSectionFive />
    </>
  );
}

export function ComponentSectionOne() {
  return (
    <section className="container pb-12 pt-16 text-center">
      <p className="mb-4 text-sm font-medium">Master Wire Frame</p>
      <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
        Master Wire is powerful tool for your project.
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-xl">
        Accelerate your wireframing workflow using pre-build components or
        create your own.
      </p>
      <div className="flex justify-center gap-4">
        <Button className="rounded-md bg-black px-6 text-white hover:bg-black/90">
          I want click here
        </Button>
        <Button
          variant="outline"
          className="rounded-md border-[#d9d9d9] px-6 text-black hover:bg-gray-50"
        >
          Consequat
        </Button>
      </div>

      <div className="mt-12 aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#f1f1f1]">
        <Image
          src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
          alt="Master Wire Frame Preview"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </section>
  );
}

import { Check } from "lucide-react";

export function ComponentSectionTwo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Image */}
      <div className="relative mb-16 aspect-[2/1] w-full">
        <Image
          src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
          alt="Hero image"
          fill
          className="rounded-2xl object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Master Wire is powerful tool for your project.
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-900">
          Dolor sit amet, consectetuer adipiscing elit. Etiam sapien elit,
          consequat eget, tristique non lorem.
        </p>

        <Button
          variant="default"
          className="mb-16 rounded-lg bg-black px-6 py-3 text-lg font-medium text-white hover:bg-black/90"
        >
          I want click here
        </Button>

        {/* Features Grid */}
        <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="h-5 w-5 text-black" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">
                  Pellentesque sapien dolore tellus odio dapibus.
                </h3>
                <p className="text-gray-600">
                  Mauris dolor felis, sagittis at, luctus sed, aliquam non,
                  tellus. Duis pulvinar.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export function ComponentSectionThree() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="mb-16 text-center">
        <p className="mb-4 text-sm">Master Wire Frame</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Master Wire is powerful tool for your project
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Accelerate your wireframing workflow using pre-build components or
          combine your own
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Large Card */}
        <div className="rounded-lg bg-[#f1f1f1] p-8 md:col-span-2 md:row-span-2">
          <div className="flex h-full flex-col">
            <div className="mb-6 h-12 w-12 rounded-full bg-[#d9d9d9]" />
            <h2 className="mb-4 text-2xl font-bold">Flexible wireframe</h2>
            <p className="mb-6 text-gray-600">
              Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus.
              Nam sed tellus id magna elementum tincidunt.
            </p>
            <Link
              href="#"
              className="mb-8 inline-flex items-center font-medium text-black hover:opacity-80"
            >
              Show me
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <div className="mt-auto">
              <div className="aspect-video w-full rounded-lg bg-[#d9d9d9]" />
            </div>
          </div>
        </div>

        {/* Regular Cards */}
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg bg-[#f1f1f1] p-6"
          >
            <div className="mb-4 h-10 w-10 rounded-full bg-[#d9d9d9]" />
            <h2 className="mb-3 text-xl font-bold">Flexible wireframe</h2>
            <p className="mb-4 text-sm text-gray-600">
              Accelerate your wireframing workflow using pre-build components or
              combine your own.
            </p>
            <Link
              href="#"
              className="mb-4 inline-flex items-center font-medium text-black hover:opacity-80"
            >
              Show me
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <div className="mt-auto">
              <div className="aspect-video w-full rounded-lg bg-[#d9d9d9]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { ArrowRight } from "lucide-react";

export function ComponentSectionFour() {
  const features = [
    {
      title: "Feature element",
      description:
        "This awesome element has more variants and fully customizable property.",
    },
    {
      title: "Feature element",
      description:
        "This awesome element has more variants and fully customizable property.",
    },
    {
      title: "Feature element",
      description:
        "This awesome element has more variants and fully customizable property.",
    },
    {
      title: "Feature element",
      description:
        "This awesome element has more variants and fully customizable property.",
    },
    {
      title: "Feature element",
      description:
        "This awesome element has more variants and fully customizable property.",
    },
    {
      title: "Feature element",
      description:
        "This awesome element has more variants and fully customizable property.",
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-16 max-w-3xl">
        <p className="mb-4 text-sm">Master Wire Frame</p>
        <h1 className="mb-6 text-5xl font-bold">
          Customizable feature grid component
        </h1>
        <p className="mb-8 text-xl">
          With or without background, add text, link or simple arrow, change the
          icon to number, it&apos;s fully up to you.
        </p>
        <button className="rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-black/90">
          I want click here
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="space-y-4 rounded-lg border border-[#d9d9d9] p-6"
          >
            <div className="mb-6 h-16 w-16 rounded-full bg-[#d9d9d9]" />
            <h3 className="text-2xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
            <Link
              href="#"
              className="inline-flex items-center font-medium text-black hover:underline"
            >
              Show me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";

export function ComponentSectionFive() {
  const tiers = [
    {
      name: "Basic",
      price: "16",
      description:
        "Duis condimentum augue id magna semper rutrum donec ipsum massa",
      features: [
        "Pellentesque sapien dolore tellus odio dapibus.",
        "Fusce tellus odio, dapibus ntesque sapien in.",
        "Sapien fusce tellus odio, dapibus pellentesque.",
      ],
      buttonVariant: "secondary" as const,
    },
    {
      name: "Professional",
      price: "32",
      description:
        "Duis condimentum augue id magna semper rutrum donec ipsum massa",
      features: [
        "Pellentesque sapien dolore tellus odio dapibus.",
        "Fusce tellus odio, dapibus ntesque sapien in.",
        "Sapien fusce tellus odio, dapibus pellentesque.",
      ],
      buttonVariant: "default" as const,
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "48",
      description:
        "Duis condimentum augue id magna semper rutrum donec ipsum massa",
      features: [
        "Pellentesque sapien dolore tellus odio dapibus.",
        "Fusce tellus odio, dapibus ntesque sapien in.",
        "Sapien fusce tellus odio, dapibus pellentesque.",
      ],
      buttonVariant: "secondary" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7">
            Master Wire Pricing
          </h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            How much it will cost you?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="default" className="rounded-full">
              Log In
            </Button>
            <Button variant="outline" className="rounded-full">
              Sign up
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col p-8 ${tier.highlighted ? "bg-[#f1f1f1]" : "bg-white"} rounded-3xl`}
            >
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <div className="mt-4 text-5xl font-bold">${tier.price}</div>
              <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
              <div className="mt-8 flex-1 space-y-4">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                <Button
                  variant={tier.buttonVariant}
                  className="w-full rounded-full"
                >
                  Sign me up!
                </Button>
                <Button variant="link" className="w-full text-sm underline">
                  Learn more
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
