"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IntroTitle } from "@/components/IntroTitle";

export function Pricing() {
  return (
    <div className="container py-16">
      <div className="mb-16 text-center">
        <IntroTitle heading="Pricing" title="How much it will cost you?" />
        <p className="text-gray-600">
          You can add columns and rows as you like
        </p>
      </div>

      <div className="mb-16 grid gap-8 md:grid-cols-3">
        {/* Basic Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>
              Duis condim entum augue id loremdolor magna semper rutrum donec
              ipsum massa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Sign me up!
            </Button>
            <Button variant="link" className="w-full">
              Learn more
            </Button>
          </CardContent>
        </Card>

        {/* Professional Plan */}
        <Card className="bg-[#f1f1f1]">
          <CardHeader>
            <CardTitle>Professional</CardTitle>
            <CardDescription>
              Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.
              In convallis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Sign me up!
            </Button>
            <Button variant="link" className="w-full">
              Learn more
            </Button>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>
              Nullam rhoncus aliquam metus. Duis bibendum, lectus ut viverra
              rhoncus.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Sign me up!
            </Button>
            <Button variant="link" className="w-full">
              Learn more
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features Table */}
      <div className="mb-16 space-y-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="font-medium">Type of plan</div>
          <div className="text-center">Basic</div>
          <div className="text-center">Professional</div>
          <div className="text-center">Enterprise</div>
        </div>

        {[
          "Excepteur",
          "Mauris dolor felissagittis",
          "Donec odio",
          "Quisque porta",
          "Mauris vitae tortor",
          "Mauris elementum",
        ].map((feature, index) => (
          <div
            key={feature}
            className="grid grid-cols-4 items-center gap-4 border-t py-2"
          >
            <div>{feature}</div>
            <div className="text-center">
              {index < 2 && <Check className="mx-auto h-4 w-4" />}
            </div>
            <div className="text-center">
              {index < 4 && <Check className="mx-auto h-4 w-4" />}
            </div>
            <div className="text-center">
              <Check className="mx-auto h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      {/* What you get */}
      <div className="mb-16 space-y-8">
        <h3 className="text-xl font-bold">What you get</h3>
        <div className="space-y-4">
          {[
            {
              label: "Personal files",
              basic: "10",
              pro: "150",
              enterprise: "Unlimited",
              tooltip: "Number of personal files you can store",
            },
            {
              label: "Maecenas ipsum velit",
              basic: "4",
              pro: "80",
              enterprise: "Unlimited",
              tooltip: "Additional information about this feature",
            },
            {
              label: "Elementum tincidunt",
              basic: "30 Days",
              pro: "Unlimited",
              enterprise: "Unlimited",
              tooltip: "Duration of elementum tincidunt",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-4 items-center gap-4 border-t py-2"
            >
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  {item.label}
                  <Tooltip>
                    <TooltipTrigger className="cursor-help">ⓘ</TooltipTrigger>
                    <TooltipContent>
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <div className="text-center">{item.basic}</div>
              <div className="text-center">{item.pro}</div>
              <div className="text-center">{item.enterprise}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mb-4 text-sm">Monthly per month</div>
          <div className="mb-4 text-5xl font-bold">$16</div>
          <Button className="mb-4 w-full">Sign me up!</Button>
          <div className="mb-2 text-sm">or</div>
          <div className="mb-2 text-sm">Yearly per month</div>
          <div className="mb-4 text-2xl font-bold">$12</div>
          <Button variant="outline" className="w-full">
            Sign me up!
          </Button>
        </div>

        <div className="rounded-lg bg-[#f1f1f1] p-6 text-center">
          <div className="mb-4 text-sm">Monthly per month</div>
          <div className="mb-4 text-5xl font-bold">$32</div>
          <Button className="mb-4 w-full">Sign me up!</Button>
          <div className="mb-2 text-sm">or</div>
          <div className="mb-2 text-sm">Yearly per month</div>
          <div className="mb-4 text-2xl font-bold">$28</div>
          <Button variant="outline" className="w-full">
            Sign me up!
          </Button>
        </div>

        <div className="text-center">
          <div className="mb-4 text-sm">Monthly per month</div>
          <div className="mb-4 text-5xl font-bold">$48</div>
          <Button className="mb-4 w-full">Sign me up!</Button>
          <div className="mb-2 text-sm">or</div>
          <div className="mb-2 text-sm">Yearly per month</div>
          <div className="mb-4 text-2xl font-bold">$44</div>
          <Button variant="outline" className="w-full">
            Sign me up!
          </Button>
        </div>
      </div>
    </div>
  );
}
