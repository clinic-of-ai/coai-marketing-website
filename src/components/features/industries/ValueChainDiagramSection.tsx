import Image from "next/image";

export function ValueChainDiagramSection() {
  return (
    <section className="pb-20">
      <div className="container relative h-[300px] sm:h-[500px] w-full">
        <Image
          fill
          src="/image/illustration/industry-value-chain-retail.svg"
          alt=""
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}
