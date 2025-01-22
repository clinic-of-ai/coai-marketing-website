import Image from "next/image";

interface TeamCardProps {
  name: string;
  title: string;
  imageUrl: string;
  linkedinUrl: string;
}

export function TeamCard(props: TeamCardProps) {
  const { name, imageUrl } = props;

  return (
    <div className="group flex w-full flex-col gap-y-4 rounded-2xl bg-background">
      <div className="relative h-64 w-full overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded-2xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-semibold">{name}</h3>
        </div>
      </div>
    </div>
  );
}
