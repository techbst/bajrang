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
import { HeroBackground } from "@/components/home/hero-background";
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
      className="relative isolate grid grid-cols-1 text-white"
    >
      <div className="contents">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-[min(55vw,22rem)] bottom-0 -z-10 overflow-hidden max-lg:col-start-1 max-lg:row-start-2 max-lg:row-end-3 lg:inset-0"
        >
          <HeroBackground />
          {/* <div className="absolute inset-0 bg-linear-to-b from-[#071427] via-[#071427]/30 to-[#071427]/55 lg:bg-[linear-gradient(90deg,rgba(7,20,39,0.94)_0%,rgba(7,20,39,0.7)_31%,rgba(7,20,39,0.32)_55%,transparent_78%)]" /> */}
        </div>
        <Container className="relative pt-12 pb-[min(55vw,22rem)] sm:pt-16 lg:flex lg:min-h-[31rem] lg:flex-col lg:justify-center lg:py-24 xl:min-h-[35rem]">
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
              className="mt-5 max-w-[16ch] text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.06] font-bold text-balance"
            >
              Auto Parts for <span className="text-primary">Global Trade.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">
              Source genuine OEM and aftermarket parts for cars, motorcycles,
              and trucks, with export support from enquiry through dispatch.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#upload"
                className={buttonVariants({
                  className: "px-5 whitespace-nowrap"
                })}
              >
                Upload Your Requirement{" "}
                <UploadCloud aria-hidden="true" className="size-4 shrink-0" />
              </Link>
              <a
                href="#home-part-number"
                className={buttonVariants({
                  variant: "light",
                  className: "px-5 whitespace-nowrap"
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
      <div className="py-[10px] [backdrop-filter:blur(6px)] [--dark-divider-color:#ffffff14] [-webkit-backdrop-filter:blur(62px)] [background:linear-gradient(var(--dark-divider-color),var(--dark-divider-color)),#00000047]">
        <Container className="grid gap-3 lg:grid-cols-[11rem_minmax(0,1fr)] lg:items-center lg:gap-6">
          <h2 className="text-xl leading-tight font-semibold">
            Find auto parts
          </h2>
          <PartsFinder
            inputId="home-part-number"
            glass
            className="border-0 p-0 shadow-none sm:p-0"
          />
        </Container>
      </div>
    </section>
  );
}
