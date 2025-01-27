import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative min-h-[320px] w-full overflow-hidden rounded-3xl bg-black p-8 md:p-12">
          <div className="relative z-10 max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Don&apos;t miss this opportunity to try Master Wire frame
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Accelerate your wireframing workflow using pre-build components or
              combine your own.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white font-semibold text-black hover:bg-white/90"
              >
                Try today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Or try tomorrow for $69
              </Button>
            </div>
          </div>

          {/* Mountain Icon */}
          <div className="absolute right-8 top-8 md:right-12 md:top-12">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <circle cx="24" cy="12" r="8" fill="currentColor" opacity="0.4" />
              <path d="M12 36L24 16L36 36H12Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
