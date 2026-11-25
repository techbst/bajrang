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
import { AboutReveal } from "./about-reveal";
import { CountUp } from "@/components/common/count-up";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
const highlightIcons = {
  globe: Globe2,
  calendar: CalendarDays,
  UserShield: UserShield,
  BanknoteArrowDown: BanknoteArrowDown
};
export function About() {
  return (
    <section
      className="overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
      aria-labelledby="about-title"
    >
      <div className="container">
        <AboutReveal>
          <header className="grid min-w-0 gap-4 sm:grid-cols-[minmax(140px,1fr)_minmax(0,2fr)] sm:items-start sm:gap-6 lg:gap-10">
            <SectionEyebrow className="min-w-0">
              {aboutData.eyebrow}
            </SectionEyebrow>
            <div
              id="about-title"
              className="font_regular min-w-0 text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.2] tracking-[-0.04em] text-[#161616]"
              dangerouslySetInnerHTML={{
                __html: aboutData.title
              }}
            />
          </header>
        </AboutReveal>
        <div className="mt-8 grid min-w-0 gap-4 md:mt-10 lg:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-5">
          <AboutReveal className="grid min-w-0">
            <AboutIntroCard />
          </AboutReveal>
          <AboutReveal delay={0.12} className="grid min-w-0">
            <AboutImage />
          </AboutReveal>
          <AboutReveal delay={0.18} className="grid min-w-0">
            <CommitmentCard />
          </AboutReveal>
        </div>
        <Facts />
      </div>
    </section>
  );
}

function AboutIntroCard() {
  return (
    <article className="flex min-w-0 flex-col rounded-[20px] bg-[#f5f8fc] p-7 lg:min-h-[420px] xl:p-9">
      <span className="text-secondary-foreground grid">
        <Cog className="size-10" />
      </span>
      <div className="text-secondary-foreground mt-5 line-clamp-4 text-[15px] leading-7 font-medium sm:mt-8 sm:text-lg sm:leading-8">
        {aboutData.description}
      </div>

      <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 sm:gap-2 lg:grid-cols-1 xl:grid-cols-2">
        {aboutData.highlights.map((item) => {
          const Icon = highlightIcons[item.icon];

          return (
            <div
              key={item.title}
              className="group mt-4 flex min-w-0 items-center gap-2 transition-all duration-300 hover:-translate-y-1 sm:mt-5"
            >
              <div className="border-primary/10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-white text-[#0760BC] transition-all duration-300 group-hover:bg-[#0760BC] group-hover:text-white">
                <Icon className="size-4" strokeWidth={1.8} />
              </div>

              <div className="flex min-w-0">
                <div className="min-w-0">
                  <span className="text-secondary-foreground text-xs leading-4 font-bold sm:text-[13px]">
                    {item.value}
                    {/* {item.title} */}
                  </span>
                </div>

                {/* <p className="mt-1 line-clamp-1 text-sm leading-5 text-slate-500">
            {item.description}
          </p> */}
              </div>
            </div>
          );
        })}
      </div>

      <a
        href="/who-we-are"
        className="mt-auto inline-flex w-fit items-center gap-3 pt-7 text-sm font-bold text-[#161616] transition hover:text-[#0760BC]"
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
        <p className="text-[10px] font-bold tracking-[0.22em] text-white/75 uppercase">
          {aboutData.visual.overline}
        </p>
        <p className="mt-2 text-xl leading-tight font-semibold tracking-[-0.03em] sm:text-2xl">
          {aboutData.visual.title}
        </p>
      </div>
    </div>
  );
}

function CommitmentCard() {
  return (
    <article className="min-w-0 rounded-[20px] bg-[#f5f8fc] p-7 xl:p-9">
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
            <p className="min-w-0 text-sm leading-6 font-medium text-slate-800 sm:text-[16px]">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Facts() {
  return (
    <div className="mt-1">
      <dl className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:gap-6 lg:grid-cols-4">
        {aboutData.facts.stats.map((stat, index) => (
          <AboutReveal
            key={stat.label}
            delay={index * 0.07}
            className="min-w-0"
          >
            <div className="text-center">
              <dd className="text-secondary-foreground mt-2 text-[clamp(1.75rem,5vw,2.25rem)] font-semibold tracking-[-0.04em]">
                <CountUp value={stat.value} />
              </dd>
              <dt className="text-secondary-foreground mt-2 text-[10px] font-bold tracking-[0.08em] uppercase sm:text-xs sm:tracking-[0.12em]">
                {stat.label}
              </dt>
            </div>
          </AboutReveal>
        ))}
      </dl>
    </div>
  );
}
