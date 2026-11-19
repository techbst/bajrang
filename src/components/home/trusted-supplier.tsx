import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TrustedSupplierData } from "@/data/home/trusted-supplier";
import { trustedSupplierData } from "@/data/home/trusted-supplier";
import { Button } from "@/components/ui/button";

const statIcons = {
  export: "/img/home/trusted-icons/trusted-1.svg",
  countries: "/img/home/trusted-icons/trusted-2.svg",
  parts: "/img/home/trusted-icons/trusted-3.svg",
};

type TrustedSupplierProps = {
  data?: TrustedSupplierData;
};

export function TrustedSupplier({ data = trustedSupplierData }: TrustedSupplierProps) {
  return (
    <section className="grid overflow-hidden bg-[linear-gradient(180deg,#0066A8_0%,#004877_100%)] text-white  lg:grid-cols-[25%_35%_40%]" aria-labelledby="trusted-supplier-title">
      <div className="relative">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          sizes="(min-width: 1024px) 27vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-start px-7 py-5 sm:px-12 lg:px-15 lg:py-15 ">
        <h2 id="trusted-supplier-title" className="text-3xl leading-tight font-bold tracking-tight text-white uppercase sm:text-4xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/95 sm:text-lg sm:leading-8">
          {data.description}
        </p>
        <Button
          asChild
          variant="light"
          className="mt-10 h-auto w-fit gap-5 rounded-lg px-6 py-3 text-base font-semibold sm:px-6"
        >
          <Link href={data.ctaHref}>
            {data.ctaLabel}
            <ArrowRight aria-hidden="true" className="size-6" />
          </Link>
        </Button>
      </div>

      <ul className="flex flex-col justify-center gap-9 px-7 pb-12 sm:px-12 lg:gap-12 lg:px-8 lg:py-15 ">
        {data.stats.map((stat) => {
          const icon = statIcons[stat.icon];
          return (
            <li key={stat.title} className="grid grid-cols-[72px_1fr] items-start gap-5 sm:grid-cols-[96px_1fr] sm:gap-7">
              <span className="grid size-[72px] place-items-center rounded-full bg-white/5 text-white sm:size-24">
                <Image src={icon} alt="" width={56} height={56} className="size-9 object-contain sm:size-12" />
              </span>
              <div>
                <h4 className="!text-xl leading-tight font-bold sm:!text-2xl">{stat.title}</h4>
                <p className="mt-3 text-base leading-7 text-white/95 sm:text-lg sm:leading-8">{stat.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
