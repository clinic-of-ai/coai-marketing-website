import Link from "next/link";
import Image from "next/image";
import { AnimatedArrowButton } from "../AnimatedArrowButton";

export interface InsightCardProps {
  title: string;
  description: string;
  thumbnail: string;
  href: string;
}

export function InsightCard(props: InsightCardProps) {
  const { title, description, thumbnail, href } = props;

  return (
    <Link href={href} target="_blank" className="block overflow-hidden">
      <div className="group relative w-full overflow-hidden rounded-lg border border-gray-200 bg-inherit text-inherit transition-all duration-300 ease-in-out hover:shadow-md">
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            fill
            alt=""
            src={thumbnail}
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="space-y-3 p-4">
          <div className="text-base font-semibold capitalize text-gray-900 sm:text-sm">
            {title}
          </div>
          <div className="h-[48px] w-full overflow-hidden">
            <p className="text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          </div>
          <div className="translate-y-[150%] transform overflow-hidden transition-transform duration-300 ease-in-out group-hover:translate-y-0">
            <AnimatedArrowButton
              size="sm"
              variant="secondary"
              className="text-xs"
            >
              Read
            </AnimatedArrowButton>
          </div>
        </div>
      </div>
    </Link>
  );
}
