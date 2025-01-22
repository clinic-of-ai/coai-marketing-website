import { HoveringQuoteMark } from "@/components/HoveringQuoteMark";

export function MotivationSection() {
  return (
    <div className="px-6 container">
      <div className="bg-inverse rounded-2xl text-center pb-24 pt-28 text-inverse-foreground md:px-10 lg:mx-auto">
        <div className="mx-auto flex gap-3 lg:flex-row">
          <HoveringQuoteMark />
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              We are motivated by our youthful enthusiasm on the possibilities
              brought by this new wave of technology and a ruthless pragmatism
              to making it available to everyone.
            </h2>
            <p className="mx-auto max-w-3xl text-base">
              One of the first communities from the early days of Discord that
              brought together researchers, tinkerers, engineers, and corporate
              strategists.
            </p>
          </div>
          <HoveringQuoteMark />
        </div>
      </div>
    </div>
  );
}
