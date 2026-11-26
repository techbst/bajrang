"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Boxes, PackageSearch, Search } from "lucide-react";

type Assembly = { code: string; name: string; partCount: number };
type AssemblyGroup = { name: string; assemblyCount: number; assemblies: Assembly[] };
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
  catalogue
}: {
  brand: string;
  brandSlug: string;
  vehicle: string;
  vehicleSlug: string;
  catalogue: VehicleCatalogueData;
}) {
  const [activeTab, setActiveTab] = useState<"assemblies" | "kits">("assemblies");
  const [query, setQuery] = useState("");
  const filteredGroups = useMemo(() => catalogue.groups.map((group) => ({
    ...group,
    assemblies: group.assemblies.filter((assembly) => `${assembly.code} ${assembly.name}`.toLowerCase().includes(query.trim().toLowerCase()))
  })).filter((group) => group.assemblies.length > 0), [catalogue.groups, query]);
  const filteredKits = catalogue.kits.filter((kit) => `${kit.code} ${kit.name}`.toLowerCase().includes(query.trim().toLowerCase()));

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
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{brand} vehicle catalogue</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{vehicle}</h1>
              <p className="mt-2 text-sm text-slate-500">{catalogue.partCount.toLocaleString()} parts in catalogue · {catalogue.kitCount} kits</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600"><Boxes className="size-4 text-primary" /> {catalogue.assemblyCategoryCount} assemblies</div>
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

        {activeTab === "assemblies" ? <div className="mt-7 space-y-8">
          {filteredGroups.map((group) => <section key={group.name} aria-label={`${group.name} assemblies`}>
            <div className="mb-3 flex items-center justify-between"><h2 className="text-xl font-bold text-slate-900">{group.name}</h2><span className="text-xs font-medium text-slate-500">{group.assemblyCount} groups</span></div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {group.assemblies.map((assembly) => <Link key={assembly.code} href={`/brands/${brandSlug}/vehicles/${vehicleSlug}/assemblies/${slugify(assembly.code)}`} className="group flex min-h-28 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary/[0.06] text-sm font-bold text-primary">{assembly.code}</span>
                  <div className="min-w-0"><h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-900 group-hover:text-primary">{assembly.name}</h3><p className="mt-1 text-xs text-slate-500">{assembly.partCount > 0 ? `${assembly.partCount} parts` : "Check availability"}</p></div>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-slate-400 transition group-hover:text-primary" />
              </Link>)}
            </div>
          </section>)}
          {filteredGroups.length === 0 ? <EmptySearch /> : null}
        </div> : <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredKits.map((kit) => <Link key={kit.code} href={`/brands/${brandSlug}/vehicles/${vehicleSlug}/assemblies/${slugify(kit.code)}?type=kit`} className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-primary/30 hover:shadow-md"><div className="flex items-center justify-between"><span className="text-xs font-bold text-primary">{kit.code}</span><ArrowUpRight className="size-4 text-slate-400 group-hover:text-primary" /></div><h6 className="mt-4  font-bold !text-sm text-slate-900 group-hover:text-primary">{kit.name}</h6><p className="mt-2 text-sm text-slate-500">{kit.partCount} parts in kit</p></Link>)}
          {filteredKits.length === 0 ? <EmptySearch /> : null}
        </div>}
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
