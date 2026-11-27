"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Boxes, ChevronRight, PackageSearch, Search } from "lucide-react";

type Assembly = { code: string; name: string; partCount: number };
type AssemblyGroup = { name: string; assemblies: Assembly[] };
type VehicleCatalogueData = {
  partCount: number;
  kitCount: number;
  assemblyCategoryCount: number;
  groups: AssemblyGroup[];
  kits: Assembly[];
};

export function VehicleCatalogue({
  brand,
  brandSlug,
  vehicle,
  vehicleSlug,
  thumbnailSrc,
  catalogue
}: {
  brand: string;
  brandSlug: string;
  vehicle: string;
  vehicleSlug: string;
  thumbnailSrc?: string;
  catalogue: VehicleCatalogueData;
}) {
  const [activeTab, setActiveTab] = useState<"assemblies" | "kits">("assemblies");
  const [query, setQuery] = useState("");
  const filteredGroups = useMemo(() => catalogue.groups.map((group) => ({
    ...group,
    assemblies: group.assemblies.filter((assembly) => `${assembly.code} ${assembly.name}`.toLowerCase().includes(query.trim().toLowerCase()))
  })).filter((group) => group.assemblies.length > 0), [catalogue.groups, query]);
  const filteredKits = catalogue.kits.filter((kit) => `${kit.code} ${kit.name}`.toLowerCase().includes(query.trim().toLowerCase()));
  const visibleGroups = activeTab === "assemblies"
    ? filteredGroups
    : filteredKits.length > 0 ? [{ name: "Kits", assemblies: filteredKits }] : [];
  const itemLabel = activeTab === "assemblies" ? "group" : "kit";

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container flex min-h-14 flex-wrap items-center gap-2 text-sm">
          <Link href="/" className="text-slate-500 transition-colors hover:text-primary">Home</Link><span className="text-slate-300">/</span>
          <Link href="/search" className="text-slate-500 transition-colors hover:text-primary">Catalogue</Link><span className="text-slate-300">/</span>
          <Link href={`/brands/${brandSlug}`} className="font-semibold uppercase text-slate-600 transition-colors hover:text-primary">{brand}</Link><span className="text-slate-300">/</span>
          <span className="truncate font-semibold text-slate-900">{vehicle}</span>
        </div>
      </div>
      <div className="container py-8 sm:py-10">
        <Link href={`/brands/${brandSlug}`} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary"><ArrowLeft className="size-4" /> All {brand} vehicles</Link>
        <section className="flex flex-wrap items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{brand} vehicle catalogue</p>
            <h1 className="mt-2 flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {thumbnailSrc && (
                <Image src={thumbnailSrc} alt="" width={64} height={40} className="h-10 w-16 shrink-0 rounded border border-slate-200 bg-slate-50 object-contain" />
              )}
              <span className="min-w-0">{vehicle}</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500">{catalogue.partCount.toLocaleString()} parts in catalogue · {catalogue.kitCount} {catalogue.kitCount === 1 ? "kit" : "kits"}</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <Boxes aria-hidden="true" className="size-4 text-primary" />
            {catalogue.assemblyCategoryCount} assemblies
          </div>
        </section>

        <div id="assembly-groups" className="mt-6 flex scroll-mt-24 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit rounded-xl border border-slate-200 bg-white p-1">
            <button type="button" onClick={() => setActiveTab("assemblies")} className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${activeTab === "assemblies" ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-50"}`}>Assemblies ({catalogue.assemblyCategoryCount})</button>
            {catalogue.kitCount > 0 && <button type="button" onClick={() => setActiveTab("kits")} className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${activeTab === "kits" ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-50"}`}>Kits ({catalogue.kitCount})</button>}
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assemblies or codes..." aria-label="Search assemblies or codes" className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
        </div>

        <div className="mt-5 space-y-5">
          {visibleGroups.map((group) => (
            <section key={group.name} aria-label={group.name} className="rounded-md border border-slate-200 bg-white">
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-t-md border-b border-slate-200 bg-slate-100 px-4 py-3 sm:px-5">
                <h2 className="text-base font-bold text-slate-950">{group.name}</h2>
                <span className="text-xs text-slate-600">
                  {group.assemblies.length} {itemLabel}{group.assemblies.length === 1 ? "" : "s"}
                </span>
              </header>
              <ul className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 xl:grid-cols-3">
                {group.assemblies.map((assembly) => (
                  <li key={assembly.code}>
                    <Link
                      href={`/brands/${brandSlug}/vehicles/${vehicleSlug}/assemblies/${slugify(assembly.code)}${activeTab === "kits" ? "?type=kit" : ""}`}
                      className="group grid h-full grid-cols-[minmax(0,1fr)_auto] content-start gap-x-3 gap-y-1 rounded-md border border-slate-200 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span className="col-start-1 row-start-1 font-mono text-xs font-semibold text-slate-600">{assembly.code}</span>
                      <span className="col-span-2 row-start-2 text-sm font-semibold text-slate-900 group-hover:text-primary">{assembly.name}</span>
                      <span className="col-span-2 row-start-3 text-xs text-slate-600">
                        {activeTab === "assemblies" && assembly.partCount === 0 ? "Check availability" : `${assembly.partCount} ${assembly.partCount === 1 ? "part" : "parts"}`}
                      </span>
                      <ChevronRight aria-hidden="true" className="col-start-2 row-start-1 size-4 text-slate-500 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {visibleGroups.length === 0 && <EmptySearch />}
        </div>
        <p className="mt-8 text-xs text-slate-400">Sample catalogue data · fitment and availability should be confirmed before ordering.</p>
      </div>
    </main>
  );
}

function EmptySearch() {
  return <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center"><PackageSearch className="mx-auto size-8 text-slate-300" /><p className="mt-3 font-semibold text-slate-800">No matching catalogue groups</p><p className="mt-1 text-sm text-slate-500">Try another assembly name or code.</p></div>;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
