"use client";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Oval } from "react-loader-spinner";

type LeadFormProps = {
  children: React.ReactNode;
  source: string;
  id: string;
};

export function LeadForm({ children, source, id }: LeadFormProps) {
	const [loading, setLoading] = useState(true);

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="">
				{loading && (
					<div className="absolute flex justify-center items-center w-full h-full z-10 top-0 left-0 bg-background">
						<div className="w-fit h-fit text-secondary">
							<Oval height="40" width="40" color="white" ariaLabel="loading" />
						</div>
					</div>
				)}

				<ScrollArea className="w-full h-[560px] overflow-scroll">
					<iframe
						src={source}
						style={{
							opacity: loading ? 0 : 1,
							width: "100%",
							height: "1300px",
							border: "none",
							overflowX: "hidden",
						}}
						scrolling="no"
						id={id}
						onLoad={() => setLoading(false)}
					></iframe>
					<div className="w-full h-[200px]" />
					<ScrollBar orientation="vertical" />
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
