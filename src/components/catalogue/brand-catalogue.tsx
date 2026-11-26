"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Bike, Boxes, CarFront, Search, ShieldCheck, Tractor, Truck } from "lucide-react";
import { SectionEyebrow } from "@/components/common/section-eyebrow";

import type { BrandCatalogueData } from "@/lib/catalogue-data";
import { assemblyCatalogueHref, type AssemblyCategory } from "@/lib/catalogue-assemblies";
import { slugifyCatalogueName } from "@/lib/catalogue-slugs";

export function BrandCatalogue({
  brand,
  brandSlug,
  logo,
  partCount,
  catalogue,
  assembly,
  assemblyCategory
}: {
  brand: string;
  brandSlug: string;
  logo?: string;
  partCount?: number;
  catalogue?: BrandCatalogueData;
  assembly?: { code: string; name: string };
  assemblyCategory: AssemblyCategory;
}) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const searchTerm = query.trim().toLowerCase();
  const models = useMemo(() => {
    return (catalogue?.models ?? []).filter((model) => {
      const matchesFilter = activeFilter === "All" || model.type === activeFilter;
      const text = `${model.name} ${model.variants.join(" ")}`.toLowerCase();
      return matchesFilter && text.includes(searchTerm);
    });
  }, [activeFilter, catalogue, searchTerm]);
  const filters = ["All", ...new Set(catalogue?.models.map((model) => model.type) ?? [])];
  const photoCredits = (catalogue?.models ?? []).flatMap(({ name, image }) =>
    image?.credit ? [{ name, ...image.credit }] : []
  );

  return (
    <div className="min-h-[70vh] bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container flex min-h-14 items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search parts, part numbers, vehicles..." className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-20 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10" aria-label="Search parts, part numbers, vehicles" />
            <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-1 text-[10px] font-medium text-slate-500 sm:inline">Ctrl + K</kbd>
          </div>
          <Link href="/" className="hidden shrink-0 text-sm font-medium text-slate-500 transition-colors hover:text-primary sm:inline">Home</Link>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <Link href="/search" className="hidden shrink-0 text-sm font-medium text-slate-500 transition-colors hover:text-primary sm:inline">Catalogue</Link>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <span className="shrink-0 text-sm font-bold uppercase tracking-wide text-slate-900">{brand}</span>
        </div>
      </div>

      <main className="container py-8 sm:py-12">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary"><ArrowLeft className="size-4" /> Back to home</Link>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <SectionEyebrow>Parts catalogue</SectionEyebrow>
              <div className="mt-3 flex items-center gap-4">
                {logo ? <div className="relative h-12 w-20 shrink-0"><Image src={logo} alt={`${brand} logo`} fill className="object-contain object-left" /></div> : null}
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{brand} Parts</h1>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                {catalogue ? `${catalogue.modelCount} models (${catalogue.variantCount} variants)` : "Genuine and aftermarket parts for your business"}
                {catalogue ? <span className="ml-2 text-slate-400">· {catalogue.vehicleGroup}</span> : null}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
              <Stat icon={<Boxes className="size-4" />} value={partCount ?? "—"} label="Parts listed" />
              <Stat icon={<ShieldCheck className="size-4" />} value="B2B" label="Trade supply" />
            </div>
          </div>
        </section>

        {catalogue ? (
          <>
            <section className="mt-6 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <SectionEyebrow>Fast moving parts</SectionEyebrow>
                  <h2 className="mt-2 text-xl font-bold text-slate-950">{catalogue.fastMovingPartCount.toLocaleString()} parts</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{catalogue.description}</p>
                </div>
                <Link href={`/search?q=${encodeURIComponent(`${brand} fast moving parts`)}`} className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-blue-800">Browse fast movers <ArrowUpRight className="size-4" /></Link>
              </div>
              <p className="mt-5 border-t border-primary/10 pt-4 text-xs font-medium text-slate-500">{catalogue.partGroupCount} part groups · {catalogue.vehicleGroup} · filter by the model you service</p>
            </section>

            <section className="mt-8" aria-labelledby="models-heading">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 id="models-heading" className="scroll-mt-24 text-2xl font-bold tracking-tight text-slate-950">Models & variants</h2>
                  {assembly ? (
                    <p className="mt-1 text-sm text-slate-500">
                      Choose a variant for <Link href={assemblyCatalogueHref(assembly.code, assemblyCategory)} className="font-semibold text-primary hover:underline">{assembly.name}</Link>.
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-slate-500">Browse compatible parts by model and variant.</p>
                  )}
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search models or variant codes..." aria-label="Search models or variant codes" className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter models by vehicle type">
                {filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${activeFilter === filter ? "border-primary bg-(--primary) text-white" : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"}`}>{filter}{filter === "All" ? ` (${catalogue.variantCount})` : ` (${catalogue.models.filter((model) => model.type === filter).reduce((total, model) => total + model.variantCount, 0)})`}</button>)}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {models.map((model) => {
                  const variants = model.name.toLowerCase().includes(searchTerm)
                    ? model.variants
                    : model.variants.filter((variant) => variant.toLowerCase().includes(searchTerm));

                  return (
                    <article key={model.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                      <div className="flex items-center gap-3">
                        {model.image ? (
                          <div className="relative aspect-[3/2] w-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                            <Image
                              src={model.image.src}
                              alt={model.image.alt}
                              fill
                              sizes="96px"
                              unoptimized={model.image.src.startsWith("https://")}
                              className="object-contain"
                            />
                          </div>
                        ) : <VehicleTypeIcon type={model.type} />}
                        <div className="min-w-0">
                          <h3 className="font-bold text-foreground">{model.name}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">{model.type} · {model.variantCount} variants</p>
                        </div>
                      </div>
                      <ul className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                        {variants.map((variant) => (
                          <li key={variant}>
                            <Link
                              href={`/brands/${brandSlug}/vehicles/${slugifyCatalogueName(variant)}${assembly ? `/assemblies/${slugifyCatalogueName(assembly.code)}` : ""}`}
                              className="inline-flex min-h-8 items-center rounded-full border border-primary/15 bg-secondary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              {variant}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
                {models.length === 0 ? <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center"><p className="font-semibold text-slate-800">No models match your search</p><p className="mt-1 text-sm text-slate-500">Try another model name or variant code.</p></div> : null}
              </div>
              {photoCredits.length > 0 && (
                <details className="mt-4 text-xs text-muted-foreground">
                  <summary className="w-fit cursor-pointer">Image credits</summary>
                  <ul className="mt-2 space-y-1">
                    {photoCredits.map(({ name, author, sourceUrl, license, licenseUrl }) => (
                      <li key={name}>
                        {name} by <a href={sourceUrl} className="underline">{author}</a>
                        {" · "}
                        <a href={licenseUrl} className="underline">{license}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </section>
          </>
        ) : (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-950">Browse {brand} parts</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Our {brand} catalogue is being organized by vehicle model. Search the current parts list or send your requirement to our sourcing team.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/search?q=${encodeURIComponent(brand)}`} className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-blue-800">Search {brand} parts <ArrowUpRight className="size-4" /></Link>
              <Link href="/contact" className="inline-flex h-11 items-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary">Request availability</Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const vehicleIcons: Record<string, typeof CarFront> = {
  Cars: CarFront,
  "Commercial Vehicles": Truck,
  Tractors: Tractor,
  Motorcycles: Bike,
  Scooters: Bike,
  Electric: Bike
};

function VehicleTypeIcon({ type }: { type: string }) {
  const Icon = vehicleIcons[type] ?? CarFront;
  return (
    <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
      <Icon className="size-5" />
    </span>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: string | number; label: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
    <div className="flex items-center gap-2 text-primary">{icon}<span className="text-lg font-bold text-slate-900">{value}</span></div>
    <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
  </div>;
}
