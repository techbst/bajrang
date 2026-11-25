import Image from "next/image";
import Link from "next/link";
import {
  Check,
  FileSpreadsheet,
  Globe2,
  Search,
  ShieldCheck,
  UploadCloud
} from "lucide-react";
import { Container } from "@/components/common/container";
import { PartsFinder } from "@/components/catalogue/parts-finder";
import { buttonVariants } from "@/components/ui/button";

const trustIndicators = [
  { label: "Genuine Parts", icon: ShieldCheck },
  { label: "Global Export", icon: Globe2 },
  { label: "Fast Quotations", icon: FileSpreadsheet },
  { label: "Reliable Supply", icon: Check }
];

export function Hero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="bg-slate-50 pb-8 text-white"
    >
      <div className="relative isolate bg-[#071427]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[min(55vw,22rem)] overflow-hidden lg:inset-0 lg:h-auto"
        >
          <Image
            src="/img/home/main__banner.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[76%_center] lg:object-[right_58%]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#071427] to-transparent to-55% lg:bg-[linear-gradient(90deg,rgba(7,20,39,0.98)_0%,rgba(7,20,39,0.91)_30%,rgba(7,20,39,0.65)_51%,rgba(7,20,39,0.08)_79%)]" />
        </div>
        <div>
          <Container className="relative pt-10 pb-[min(55vw,22rem)] sm:pt-14 lg:flex lg:min-h-[32rem] lg:flex-col lg:justify-center lg:pt-16 lg:pb-24">
            <div className="w-full max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-blue-200 uppercase">
                Wholesale Auto Parts &amp; Export
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 bg-blue-400 sm:w-10"
                />
              </p>
              <h1
                id="home-hero-title"
                className="mt-5 max-w-[14ch] text-[clamp(2.5rem,5.5vw,4.375rem)] leading-[1.1] font-bold tracking-normal text-balance"
              >
                Auto Parts for{" "}
                <span className="text-blue-200">Global Trade.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">
                Source genuine OEM and aftermarket parts for cars, motorcycles,
                and trucks, with export support from enquiry through dispatch.
              </p>
              <div className="mt-7 grid w-full max-w-md gap-3 sm:grid-cols-2">
                <Link
                  href="#upload"
                  className={buttonVariants({
                    className: "px-3 whitespace-nowrap"
                  })}
                >
                  Upload Your Requirement{" "}
                  <UploadCloud aria-hidden="true" className="size-4 shrink-0" />
                </Link>
                <a
                  href="#home-part-number"
                  className={buttonVariants({
                    variant: "light",
                    className: "px-3 whitespace-nowrap"
                  })}
                >
                  Search by Part Number{" "}
                  <Search aria-hidden="true" className="size-4 shrink-0" />
                </a>
              </div>
              <ul className="mt-7 flex hidden w-fit flex-wrap gap-x-5 gap-y-3 border-t border-white/20 pt-4 text-sm font-medium text-slate-100">
                {trustIndicators.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-center gap-1.5">
                    <Icon aria-hidden="true" className="size-4 text-blue-300" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </div>
      <Container className="relative z-10 -mt-8 max-w-7xl sm:-mt-10 lg:-mt-12">
        <PartsFinder inputId="home-part-number" />
      </Container>
    </section>
  );
}
