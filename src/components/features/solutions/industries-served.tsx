import Image from "next/image";

type IndustriesServedProps = {
  content: {
    title: string;
    description: string;
    stats: {
      number: number;
      label: string;
    }[];
    images: {
      src: string;
      alt: string;
      width: number;
      height: number;
    }[];
  };
};

export function IndustriesServed({ content }: IndustriesServedProps) {
  return (
    <div className="container py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl leading-tight tracking-tighter">
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {content.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            {content.stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-sm text-[#000000]/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {content.images.map((image, index) => (
            <div
              key={index}
              className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#f1f1f1]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
