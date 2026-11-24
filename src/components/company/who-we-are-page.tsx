import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, Globe2, Handshake, ShieldCheck, Warehouse } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { CompanyCta } from "@/components/company/company-cta";
import companyPages from "@/data/company-pages.json";

const principles = [
  { title: "Integrity", text: "Clear communication and dependable business practices at every stage.", icon: Handshake },
  { title: "Quality focus", text: "Careful attention to product specifications, checks, and export packing.", icon: ShieldCheck },
  { title: "Partnership", text: "Long-term relationships shaped around each buyer's sourcing needs.", icon: Globe2 },
];
const sectionIcons = [Handshake, Boxes, Warehouse];

export function WhoWeAreDetailPage() {
  const page = companyPages.whoWeAre;
  return (
    <main className="bg-[#f6f9fc] pb-16 sm:pb-20">
      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <Container className="grid gap-9 py-10 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14 lg:py-16">
          <div className="max-w-2xl">
            <SectionEyebrow>{page.eyebrow}</SectionEyebrow>
            <h1 className="mt-3 text-3xl leading-tight font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem]">{page.title}</h1>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{page.intro}</p>
            <Link href="/contact" className="site-action mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white">Discuss your sourcing needs <ArrowRight className="size-4" /></Link>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-slate-200 sm:min-h-[390px]">
            <Image src="/img/home/trusted_baj.webp" alt="Bajrang Auto Parts team preparing products for customers" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7"><p className="text-xs font-bold tracking-[0.16em] text-white/75 uppercase">Bajrang Auto Parts</p><p className="mt-2 text-xl font-bold text-white sm:text-2xl">Export experience since 2009</p></div>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14 lg:py-16">
        <section aria-labelledby="who-we-are-work-title">
          <div className="max-w-2xl"><SectionEyebrow>What we do</SectionEyebrow><h2 id="who-we-are-work-title" className="mt-2 text-2xl leading-tight font-bold tracking-tight text-slate-950 sm:text-3xl">A complete sourcing partner for automotive businesses</h2><p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">From product selection to export coordination, we help buyers manage the details behind a dependable parts order.</p></div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {page.sections.slice(0, 2).map((section, index) => {
              const Icon = sectionIcons[index] ?? Boxes;
              return <article key={section.title} className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(16,36,74,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_38px_rgba(7,96,188,0.11)] sm:p-7">
                <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Icon className="size-5" /></span>
                <h3 className="mt-5 text-lg leading-snug font-bold text-slate-900">{section.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{section.body}</p>
              </article>;
            })}
          </div>
        </section>

        <section className="mt-12 grid overflow-hidden rounded-2xl bg-slate-950 shadow-[0_16px_40px_rgba(16,36,74,0.12)] lg:mt-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[230px] lg:min-h-[320px]"><Image src="/img/home/why-choose.webp" alt="Automotive parts warehouse operation" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/40"/></div>
          <div className="flex flex-col justify-center p-6 text-white sm:p-9 lg:p-11"><SectionEyebrow className="text-blue-300">Our journey</SectionEyebrow><h2 className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">From a Delhi beginning to global supply</h2><p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{page.sections[2].body}</p><div className="mt-6 flex flex-wrap gap-3"><span className="rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold">Established 2009</span><span className="rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold">50+ countries served</span></div></div>
        </section>

        <section className="mt-14 sm:mt-16" aria-labelledby="principles-title">
          <div className="max-w-2xl"><SectionEyebrow>What matters to us</SectionEyebrow><h2 id="principles-title" className="mt-2 text-2xl leading-tight font-bold tracking-tight text-slate-950 sm:text-3xl">The principles behind every partnership</h2></div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">{principles.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_38px_rgba(7,96,188,0.11)]"><span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-primary"><Icon className="size-5" /></span><h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}</div>
        </section>

        <CompanyCta title="Tell us what your business needs" label="Contact our team" eyebrow="Let's work together" className="mt-12" />
      </Container>
    </main>
  );
}
