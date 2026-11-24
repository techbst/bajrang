import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, CarFront, ChevronDown, Search, Truck, Wrench } from "lucide-react";
import { Container } from "@/components/common/container";
import { brandGroups } from "@/components/navigation/navigation-data";
import { CatalogueSelector } from "@/components/catalogue/catalogue-selector";
import { CompanyCta } from "@/components/company/company-cta";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import brandVehicles from "@/data/catalogue/brand-vehicles.json";

type CategoryKey = "car" | "motorcycle" | "truck";
const categories: Record<CategoryKey, { label: string; group: keyof typeof brandGroups; description: string; icon: typeof CarFront }> = {
  car: { label: "Car parts", group: "car", description: "Source car spares by brand and vehicle model.", icon: CarFront },
  motorcycle: { label: "Motorcycle parts", group: "motorcycle", description: "Browse two-wheeler parts by make and model.", icon: Wrench },
  truck: { label: "Truck & HCV parts", group: "tractor", description: "Find parts for trucks, commercial vehicles, and tractors.", icon: Truck },
};

export function CatalogueLanding({ category = "motorcycle" }: { category?: string }) {
  const selected = (category in categories ? category : "motorcycle") as CategoryKey;
  const details = categories[selected];
  const Icon = details.icon;
  const brands = brandGroups[details.group];

  return (
    <main className="bg-[#f6f9fc] pb-16 sm:pb-20">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image src="/img/home/main__banner.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,10,25,0.98)_0%,rgba(2,10,25,0.88)_42%,rgba(2,10,25,0.3)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(7,96,188,0.5),transparent_55%)]" />
        <Container className="grid gap-10 py-12 sm:py-16 lg:min-h-[500px] lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-14 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-blue-100"><BadgeCheck className="size-4"/> Bajrang Auto Parts · B2B catalogue</span>
            <h1 className="mt-5 max-w-2xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">Find the right part for your business</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Browse parts by vehicle brand and model, or search by part number and name. Our team can also help source items not yet listed.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://wa.me/919718346347" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-md shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-700">WhatsApp our team <ArrowRight className="size-4"/></a>
              <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-lg border border-white/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10">Contact us</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Catalogue highlights">
            {[
              { value: "114,425+", label: "Parts published", icon: Boxes },
              { value: "50+", label: "Markets served", icon: Truck },
              { value: "OEM", label: "Genuine supply", icon: BadgeCheck },
              { value: "B2B", label: "Wholesale focus", icon: Wrench },
            ].map(({ value, label, icon: StatIcon }) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5"><StatIcon className="size-5 text-blue-300"/><p className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{value}</p><p className="mt-1 text-xs text-slate-300 sm:text-sm">{label}</p></div>)}
          </div>
        </Container>
      </section>

      <Container className="pt-8 sm:pt-10">
        <section aria-labelledby="parts-search-title" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(16,36,74,0.07)] sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><SectionEyebrow>Search catalogue</SectionEyebrow><h2 id="parts-search-title" className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">Search by part number, name, or brand</h2></div><p className="max-w-md text-sm leading-6 text-slate-500">Have an OEM number or product description? Search the catalogue or send it to our team.</p></div>
          <form action="/search" role="search" className="mt-5 grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)_auto]"><label htmlFor="catalogue-search" className="sr-only">Search part number, part name, or brand</label><label className="relative"><span className="sr-only">Search by</span><select name="by" defaultValue="part-number" className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"><option value="part-number">Part number</option><option value="part-name">Part name</option><option value="brand">Brand</option></select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500"/></label><div className="relative min-w-0"><Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"/><input id="catalogue-search" name="q" placeholder="Enter a part number, name, or brand" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"/></div><button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800">Search parts <ArrowRight className="size-4"/></button></form>
          <div className="mt-5 border-t border-slate-100 pt-5"><p className="text-sm font-semibold text-slate-800">Or browse by vehicle</p><CatalogueSelector brands={brands}/></div>
        </section>

        <section className="mt-10" aria-labelledby="browse-brand-title">
          <div><SectionEyebrow>Browse by brand</SectionEyebrow><h2 id="browse-brand-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Choose a vehicle maker</h2><p className="mt-2 text-sm text-slate-600">{details.description}</p></div>
          <nav aria-label="Vehicle category" className="mt-5 grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-white p-1 sm:mt-6 sm:gap-2 sm:p-1.5">{Object.entries(categories).map(([key, value]) => <Link key={key} href={`/catalogue?category=${key}`} aria-current={selected === key ? "page" : undefined} className={`flex min-h-10 items-center justify-center rounded-lg px-2 py-2 text-center text-[11px] leading-tight font-semibold transition-colors sm:min-h-11 sm:px-4 sm:text-sm ${selected === key ? "bg-primary text-white shadow-sm" : "text-slate-600 hover:bg-blue-50 hover:text-primary"}`}>{value.label}</Link>)}</nav>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brands.map((brand) => {
              const models = brandVehicles[brand.slug as keyof typeof brandVehicles] ?? [];
              return <article key={brand.slug} className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(16,36,74,0.045)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_36px_rgba(7,96,188,0.11)]">
                <Link href={`/brands/${brand.slug}`} className="flex min-w-0 items-center gap-4" aria-label={`Browse ${brand.name} parts`}><span className="relative grid size-14 shrink-0 place-items-center rounded-xl bg-slate-50 p-2"><Image src={brand.short} alt={`${brand.name} logo`} fill sizes="56px" className="object-contain p-2"/></span><span className="min-w-0"><span className="block truncate text-base font-bold text-slate-900 group-hover:text-primary">{brand.name}</span><span className="mt-1 block text-xs text-slate-500">{models.length ? `${models.length} vehicle models` : "Browse catalogue"}</span></span></Link>
                {models.length ? <div className="mt-4 border-t border-slate-100 pt-3"><p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">Popular models</p><div className="mt-2 flex flex-wrap gap-1.5">{models.slice(0, 3).map((model) => <Link key={model} href={`/brands/${brand.slug}/vehicles/${slugify(model)}`} className="max-w-full truncate rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600 transition-colors hover:bg-blue-50 hover:text-primary">{model}</Link>)}</div></div> : null}
                <Link href={`/brands/${brand.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">Browse parts <ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></Link>
              </article>;
            })}
            {selected === "motorcycle" ? <article className="flex min-h-[190px] flex-col justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5"><div><span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-amber-700">COMING SOON</span><h3 className="mt-4 text-base font-bold text-slate-900">KTM</h3><p className="mt-1 text-xs leading-5 text-slate-500">Ask us about sourcing availability.</p></div><Link href="/contact?brand=KTM" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">Enquire <ArrowRight className="size-4"/></Link></article> : null}
          </div>
        </section>

        <CompanyCta eyebrow="Can't find your part?" title="Send us a part number or vehicle detail" description="We can check additional OEM and aftermarket sourcing options for your business." label="Send an enquiry" className="mt-10" />
      </Container>
    </main>
  );
}

function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
