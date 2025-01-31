import { CircleDot } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ComponentB() {
  return (
    <section>
      <div className="bg-gradient-to-b from-blue-50 to-white p-8 md:p-16 container">
        <div className="">
          <div className="mb-12">
            <h1 className="font-display mb-4 text-4xl md:text-5xl">
              Choose the way that works for you
            </h1>
            <p className="text-lg text-gray-600">
              Grants Stack offers two powerful funding mechanisms to streamline
              grants
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Direct Grants Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium uppercase text-gray-600">
                    Direct Grants
                  </span>
                  <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                    NEW
                  </span>
                </div>
                <h2 className="font-display text-3xl">
                  Quickly fund specific projects for your community
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Kickstart the development of a project or help reach a
                    targeted milestone with a predetermined amount of funding
                  </p>
                </div>
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Perfect for early-stage communities and ecosystems with
                    clear project objectives
                  </p>
                </div>
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Return high short-term value to fill gaps or needs in your
                    ecosystem
                  </p>
                </div>
              </div>
            </div>

            {/* Quadratic Funding Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-sm font-medium uppercase text-gray-600">
                  Quadratic Funding
                </span>
                <h2 className="font-display text-3xl">
                  Distribute funding based on community support
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Distribute matching funds to projects that get the most
                    support from the greatest number of people
                  </p>
                </div>
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Automatically increase your impact by crowdfunding
                    additional funds that further fuel ecosystem innovation
                  </p>
                </div>
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Enable supporters to vote with their capital on the projects
                    they care about most
                  </p>
                </div>
              </div>
            </div>

            {/* Quadratic Funding Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-sm font-medium uppercase text-gray-600">
                  Quadratic Funding
                </span>
                <h2 className="font-display text-3xl">
                  Distribute funding based on community support
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Distribute matching funds to projects that get the most
                    support from the greatest number of people
                  </p>
                </div>
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Automatically increase your impact by crowdfunding
                    additional funds that further fuel ecosystem innovation
                  </p>
                </div>
                <div className="flex gap-3">
                  <CircleDot className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-600">
                    Enable supporters to vote with their capital on the projects
                    they care about most
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Button
              variant="default"
              size="lg"
              className="bg-black text-white hover:bg-gray-800"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
