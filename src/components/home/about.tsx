import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  Cog,
  Globe2,
  BanknoteArrowDown,
  UserShield
} from "lucide-react";
import { aboutData } from "@/data/home/about";
import { ScrollReveal } from "./scroll-reveal";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import Heading from "@/components/ui/heading";
const highlightIcons = {
  globe: Globe2,
  calendar: CalendarDays,
  UserShield: UserShield,
  BanknoteArrowDown: BanknoteArrowDown
};
export function About() {
  return (
    <section
      className="relative isolate overflow-hidden bg-primary/5 py-20"
      aria-labelledby="about-title "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 hidden h-56 w-2/5 bg-[url('/img/home/about-title-map.svg')] bg-cover bg-top-left mask-[linear-gradient(to_left,transparent,black)] lg:block xl:h-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-10 hidden h-56 w-2/5 bg-[url('/img/home/about-title-map.svg')] bg-cover bg-top-right mask-[linear-gradient(to_right,transparent,black)] lg:block xl:h-60"
      />
      <div className="container">
        <ScrollReveal>
          <header id="about-title">
            <Heading
              eyebrow="About Us"
              title={aboutData.eyebrow}
              subtitle={aboutData.title}
              align="center"
              className="[&>p]:mb-0"
            />
          </header>
        </ScrollReveal>
        <div className="mt-8 grid min-w-0 gap-4 md:mt-10 lg:mt-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-5">
          <ScrollReveal className="grid min-w-0">
            <AboutIntroCard />
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="grid min-w-0">
            <AboutImage />
          </ScrollReveal>
          <ScrollReveal delay={0.18} className="grid min-w-0">
            <CommitmentCard />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function AboutIntroCard() {
  return (
    <article className="flex min-w-0 flex-col rounded-[20px] bg-[#fff] p-7 lg:min-h-[420px] xl:p-9">
      <span className="text-secondary-foreground grid">
        <Cog className="size-10" />
      </span>
      <p className="mt-5 text-base text-foreground/85 sm:text-lg">
        {aboutData.description}
      </p>
      <ul className="my-6 flex flex-wrap gap-2">
        {aboutData.highlights.map(({ icon, value }) => {
          const Icon = highlightIcons[icon];

          return (
            <li key={value} className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
              <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
              {value}
            </li>
          );
        })}
      </ul>

      <a
        href="/who-we-are"
        className="mt-auto inline-flex w-fit items-center gap-3 pt-7 text-sm font-bold text-foreground transition hover:text-[#0760BC]"
      >
        Read More
        <span className="grid size-9 place-items-center rounded-full bg-[#161616] text-white transition">
          <ArrowUpRight className="size-4" />
        </span>
      </a>
    </article>
  );
}

function AboutImage() {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-[20px] bg-[#161616] sm:min-h-[360px]">
      {aboutData.visual.image && (
        <Image
          src={aboutData.visual.image}
          alt={aboutData.visual.overline}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 36vw, 100vw"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#000000]/95 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-7 text-white xl:p-9">
        <p className="text-[10px] font-bold text-white/75 uppercase">
          {aboutData.visual.overline}
        </p>
        <p className="mt-2 text-xl font-semibold sm:text-2xl">
          {aboutData.visual.title}
        </p>
      </div>
    </div>
  );
}

function CommitmentCard() {
  return (
    <article className="min-w-0 rounded-[20px] bg-white p-7 xl:p-9">
      <SectionEyebrow>{aboutData.commitment.title}</SectionEyebrow>
      <ul className="mt-6 divide-y divide-slate-200">
        {aboutData.commitment.items.map((item) => (
          <li
            key={item.number}
            className="group grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4 sm:py-5"
          >
            <span className="text-primary border-primary/10 group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border bg-white pt-0.5 text-xs font-bold group-hover:text-white">
              {item.number}
            </span>
            <p className="min-w-0 text-sm font-medium text-slate-800 sm:text-[16px]">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
