import Link from "next/link";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { SectionEyebrow } from "@/components/common/section-eyebrow";

const quickBrands = [
  { label: "Hero", href: "/brands/hero" },
  { label: "Honda", href: "/brands/honda-motorcycle" },
  { label: "Bajaj", href: "/brands/bajaj" },
  { label: "Maruti Suzuki", href: "/brands/maruti-suzuki" },
];

export function PartsFinder() {
  return (
    <section className="relative isolate overflow-hidden border-y border-slate-200 bg-[#f6f9fd] py-12 sm:py-16 lg:py-18" aria-label="Parts search">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 size-80 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="container container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow align="center">Parts finder</SectionEyebrow>
          <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[2.75rem]">Search our auto parts range</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">Find the right part by number, product name, or vehicle brand.</p>
        </div>

        <div className="mx-auto mt-7 max-w-5xl rounded-2xl border border-slate-200/90 bg-white p-3 shadow-[0_18px_50px_rgba(16,36,74,0.09)] sm:mt-9 sm:p-5">
          <form action="/search" role="search" className="grid gap-2 sm:grid-cols-[170px_minmax(0,1fr)_152px] sm:gap-0 sm:rounded-xl sm:border sm:border-slate-200 sm:bg-white sm:p-1.5">
            <label className="relative"><span className="sr-only">Search by</span><select name="by" defaultValue="part-number" className="h-[52px] w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 sm:rounded-lg sm:border-0 sm:bg-white"><option value="part-number">Part number</option><option value="part-name">Part name</option><option value="brand">Brand</option></select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500"/></label>
            <label htmlFor="home-parts-search" className="sr-only">Enter a part number, name, or brand</label>
            <div className="relative min-w-0 sm:border-l sm:border-slate-200"><Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary" aria-hidden="true"/><input id="home-parts-search" name="q" placeholder="Enter a part number, part name, or brand" className="h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-12 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition hover:border-slate-300 focus:border-primary focus:ring-4 focus:ring-primary/10 sm:rounded-none sm:border-0 sm:focus:ring-0"/></div>
            <button className="site-action inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(7,96,188,0.2)] sm:rounded-lg" type="submit">Search parts <ArrowRight className="size-4"/></button>
          </form>
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 px-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start"><span className="mr-1 w-full text-center text-[11px] font-semibold text-slate-500 sm:w-auto sm:text-left">Popular brands</span>{quickBrands.map((brand) => <Link key={brand.label} href={brand.href} className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary/30 hover:bg-blue-50 hover:text-primary">{brand.label}</Link>)}</div>
            <Link href="/catalogue" className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-blue-800">Browse full catalogue <ArrowRight className="size-3.5"/></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
