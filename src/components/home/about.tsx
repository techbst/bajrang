import Image from "next/image";
import { ArrowUpRight, CalendarDays, Cog, Globe2, BanknoteArrowDown, UserShield } from "lucide-react";
import { aboutData } from "@/data/home/about";
import { AboutReveal } from "./about-reveal";
const highlightIcons = {
  globe: Globe2,
  calendar: CalendarDays,
  UserShield: UserShield,
  BanknoteArrowDown: BanknoteArrowDown
};
export function About() {
  return (
    <section
      className="overflow-hidden bg-white py-20"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-[1920px] px-6 sm:px-6 lg:px-12">
        <AboutReveal>
          <header className="grid grid-cols-[4fr_8fr]">
            <div className="flex gap-3 text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
              <div className="flex items-center gap-3 h-6">
              {/* <span className="h-px w-8 bg-[#0760BC]" aria-hidden="true" /> */}
              {aboutData.eyebrow}
              <span className="h-px w-8 bg-[#0760BC]" aria-hidden="true" />
              </div>
            </div>
            <div
              id="about-title"
              className="text-4xl leading-[1.5] font_regular tracking-[-0.04em] text-[#161616] sm:text-5xl lg:text-[30px]"
              dangerouslySetInnerHTML={{
                __html: aboutData.title,
              }}
            />
          </header>
        </AboutReveal>
        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)_minmax(0,0.9fr)] lg:gap-5">
          <AboutReveal>
            <AboutIntroCard />
          </AboutReveal>
          <AboutReveal delay={0.12}>
            <AboutImage />
          </AboutReveal>
          <AboutReveal delay={0.18}>
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
    <article className="flex min-h-[360px] flex-col bg-[#f5f8fc] p-7 sm:min-h-[420px] sm:p-9 rounded-[20px]">
      <span className="grid text-secondary-foreground">
        <Cog className="size-10" />
      </span>
      <div className="mt-8 line-clamp-4 text-base leading-8 font-medium text-secondary-foreground text-[16px] sm:text-[20px]">
        {aboutData.description}
      </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  {aboutData.highlights.map((item) => {
    const Icon = highlightIcons[item.icon];

    return (
      <div
        key={item.title}
        className="mt-7 group flex gap-2 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white border border-primary/10 text-[#0760BC] transition-all duration-300 group-hover:bg-[#0760BC] group-hover:text-white">
          <Icon className="size-4" strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold leading-4 text-secondary-foreground">
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
    <div className="relative min-h-[360px] overflow-hidden bg-[#161616] sm:min-h-[420px] rounded-[20px]">
      {aboutData.visual.image && (
        <Image
          src={aboutData.visual.image}
          alt={aboutData.visual.overline}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#000000]/95 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
        <p className="text-[10px] font-bold tracking-[0.22em] text-white/75 uppercase">
          {aboutData.visual.overline}
        </p>
        <p className="mt-2 text-2xl leading-tight font-semibold tracking-[-0.03em]">
          {aboutData.visual.title}
        </p>
      </div>
    </div>
  );
}

function CommitmentCard() {
  return (
    <article className="min-h-[360px] bg-[#f5f8fc] p-7 sm:min-h-[420px] sm:p-9 rounded-[20px]">
      <p className="text-[11px] font-bold tracking-[0.24em] text-[#0760BC] uppercase">
        {aboutData.commitment.title}
      </p>
      <ul className="mt-6 divide-y divide-slate-200">
        {aboutData.commitment.items.map((item) => (
          <li
            key={item.number}
            className="group grid grid-cols-[2.5rem_1fr] gap-4 py-5 first:pt-0 last:pb-0 items-center"
          >
            <span className="pt-0.5 text-xs font-bold text-primary flex border border-primary/10 items-center justify-center rounded-full w-10 h-10 bg-white group-hover:bg-primary  group-hover:text-white ">
              {item.number}
            </span>
            <p className="text-sm leading-6 font-medium text-slate-800 sm:text-[16px] max-w-[88%]">
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
      <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 max-w-[70%] mx-auto">
        {aboutData.facts.stats.map((stat, index) => (
          <AboutReveal
            key={stat.label}
            delay={index * 0.07}
            className="min-w-0"
          >
            <div className=" text-center">
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-secondary-foreground sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-[10px] font-bold tracking-[0.18em] text-secondary-foreground uppercase">
                {stat.label}
              </dt>
              
            </div>
          </AboutReveal>
        ))}
      </dl>
    </div>
  );
}
