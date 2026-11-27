"use client";

import { useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/common/container";
import { CountUp } from "@/components/common/count-up";
import { PartsFinder } from "@/components/catalogue/parts-finder";
import { HeroBackground } from "@/components/home/hero-background";
import { QuoteUpload } from "@/components/home/quote-upload";
import { buttonVariants } from "@/components/ui/button";
import { aboutData } from "@/data/home/about";

const slides = [
  {
    title: "Automotive Parts for Global Trade.",
    description: "Source genuine OEM and aftermarket parts for cars, motorcycles, and trucks, with export support from enquiry through dispatch."
  },
  {
    title: "Shipped From India Worldwide.",
    description: "Get wholesale automotive parts shipped to your market, with support for packaging, freight, and export documentation."
  }
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [controlsFocused, setControlsFocused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || controlsFocused) return;
    const timer = window.setTimeout(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      8000
    );
    return () => window.clearTimeout(timer);
  }, [activeSlide, controlsFocused, reduceMotion]);

  const fadeClass = (index: number) =>
    `transition-opacity duration-700 motion-reduce:transition-none ${index === activeSlide ? "opacity-100" : "opacity-0"}`;

  const textFadeClass = (index: number) =>
    `transition-[opacity,translate] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none ${index === activeSlide ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`;

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate mt-[calc(-1*var(--store-header-height))] bg-[#071427] pt-(--store-header-height) text-white"
    >
      <div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className={`absolute inset-0 ${fadeClass(0)}`}>
            <HeroBackground className="bg-[url('/img/home/mobile-hero.webp')] bg-bottom md:bg-[url('/img/home/main_bannernew.webp')] md:bg-right" />
          </div>
          <div className={`absolute inset-0 ${fadeClass(1)}`}>
            <HeroBackground className="bg-[url('/img/home/banner_cargo.webp')] bg-center" />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-[#071427]/85 via-[#071427]/55 to-transparent md:bg-[linear-gradient(90deg,rgba(7,20,39,0.9)_0%,rgba(7,20,39,0.65)_38%,transparent_80%)]" />
          <div className="absolute inset-x-0 top-0 h-(--store-header-height) bg-linear-to-b from-[#071427]/85 to-transparent" />
        </div>
        <Container className="relative pt-10 pb-[clamp(8rem,38vw,16rem)] sm:pt-12 lg:flex lg:min-h-[clamp(25rem,55svh,33rem)] lg:flex-col lg:justify-center lg:py-14">
          <div className="w-full max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-bold text-blue-200 uppercase">
              Wholesale Automotive Parts &amp; Export
              <span
                aria-hidden="true"
                className="h-px w-6 shrink-0 bg-blue-400 sm:w-10"
              />
            </p>
            <h1
              id="home-hero-title"
              className="mt-4 grid max-w-[17ch] text-[clamp(2rem,5.5vw,4.5rem)] font-bold text-balance sm:mt-5"
            >
              {slides.map(({ title }, index) => (
                <span key={title} aria-hidden={activeSlide !== index} className={`col-start-1 row-start-1 ${textFadeClass(index)}`}>
                  {title}
                </span>
              ))}
            </h1>
            <div className="mt-4 grid max-w-lg text-base text-slate-200 sm:mt-5 sm:text-lg">
              {slides.map(({ title, description }, index) => (
                <p key={title} aria-hidden={activeSlide !== index} className={`col-start-1 row-start-1 ${textFadeClass(index)} ${activeSlide === index ? "motion-safe:delay-100" : ""}`}>
                  {description}
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
              <QuoteUpload />
              <a
                href="#home-part-number"
                className={buttonVariants({
                  variant: "light",
                  className: "px-3 text-center sm:px-5"
                })}
              >
                Search by Part Number{" "}
                <Search aria-hidden="true" className="size-4 shrink-0" />
              </a>
            </div>
            <dl
              aria-label="Bajrang Auto Part in numbers"
              tabIndex={0}
              className="mt-6 flex w-fit max-w-full snap-x overflow-x-auto overscroll-x-contain rounded-xl border border-white/20 bg-slate-950/35 backdrop-blur-lg [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 sm:mt-7"
            >
              {aboutData.facts.stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex shrink-0 snap-start flex-col-reverse gap-0.5 border-r border-white/15 px-3 py-2 last:border-r-0 sm:px-4"
                >
                  <dt className="text-[11px] font-medium whitespace-nowrap text-slate-200 sm:text-xs">{label}</dt>
                  <dd className="text-xl font-semibold text-white tabular-nums sm:text-2xl">
                    <CountUp value={value} />
                  </dd>
                </div>
              ))}
            </dl>
            <div
              className="mt-2 flex items-center gap-1"
              onFocus={() => setControlsFocused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setControlsFocused(false);
              }}
            >
              {slides.map(({ title }, index) => (
                <button
                  key={title}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${title}`}
                  aria-pressed={activeSlide === index}
                  onClick={() => setActiveSlide(index)}
                  className="grid size-7 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-blue-300"
                >
                  <span aria-hidden="true" className={`h-1.5 rounded-full ${activeSlide === index ? "w-5 bg-white" : "w-2 bg-white/50"}`} />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <div className="relative -mt-6 py-5 backdrop-blur-[6px] lg:mt-0">
        <Container className="grid gap-3 xl:grid-cols-[11rem_minmax(0,1fr)] xl:items-center xl:gap-6">
          <h2 className="text-xl font-semibold">
            Find automotive parts
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
