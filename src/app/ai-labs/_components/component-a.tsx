import type React from "react";
import { Settings, Keyboard, BarChart3, Users } from "lucide-react";

export function ComponentA() {
  return (
    <section className="border-y border-border">
      <div className="container border-x border-border py-16">
        <div className="relative">
          {/* Background Pattern - Simplified version of the geometric shapes */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-blue-50 opacity-50" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-50 opacity-50" />
          </div>

          {/* Content */}
          <div className="space-y-16 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:space-y-0">
            {/* Header */}
            <div className="space-y-4 lg:max-w-xl lg:flex-1">
              <h2 className="font-mono text-sm uppercase tracking-wider">
                WHY GRANTS STACK?
              </h2>
              <h1 className="font-display text-5xl leading-tight">
                A streamlined solution customized to your ecosystem&apos;s
                needs.
              </h1>
            </div>

            {/* Features Grid - Adjust to take remaining space */}
            <div className="grid gap-12 md:grid-cols-2 lg:flex-1 lg:gap-16">
              <Feature
                icon={<Settings className="h-8 w-8" />}
                label="FUNDING YOUR WAY"
                description="Launch and manage a Direct Grants or Quadratic Funding round with ease"
              />
              <Feature
                icon={<Keyboard className="h-8 w-8" />}
                label="BUILD ONCHAIN REP"
                description="Empower grant applicants to mobilize their community while building onchain reputation"
              />
              <Feature
                icon={<BarChart3 className="h-8 w-8" />}
                label="BOOST ENGAGEMENT"
                description="Incentivize your community to vote or build to help grow your ecosystem"
              />
              <Feature
                icon={<Users className="h-8 w-8" />}
                label="DISTRIBUTE FUNDS"
                description="Easily distribute funds directly to projects based on your chosen criteria"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  label: string;
  description: string;
}

function Feature({ icon, label, description }: FeatureProps) {
  return (
    <div className="space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
        {icon}
      </div>
      <div className="space-y-2">
        <div className="w-fit rounded-full bg-blue-50 px-4 py-1.5 font-mono text-sm">
          {label}
        </div>
        <p className="leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
}
