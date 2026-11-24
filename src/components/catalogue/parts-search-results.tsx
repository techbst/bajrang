"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, PackageCheck, Search } from "lucide-react";
import sampleParts from "@/data/catalogue/sample-parts.json";
import { ProductTypeBadge } from "@/components/catalogue/assembly-detail";

export function PartsSearchResults({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [productFilter, setProductFilter] = useState("All");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return sampleParts.filter((part) => {
      const matchesQuery = !normalized || `${part.partNumber} ${part.name} ${part.brand} ${part.vehicle} ${part.category}`.toLowerCase().includes(normalized);
      const matchesType = productFilter === "All" || part.productType === productFilter;
      return matchesQuery && matchesType;
    });
  }, [productFilter, query]);

  return (
    <main className="min-h-[65vh] bg-slate-50 py-10 sm:py-14">
      <div className="container container-narrow">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Parts catalogue</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Search auto parts</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Find parts by part number, name, brand or vehicle model. Trade pricing and availability are confirmed with your quote.</p>
        </div>

        <form action="/search" role="search" className="mx-auto mt-7 flex max-w-3xl flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:flex-row">
          <label htmlFor="parts-search-page" className="sr-only">Search by part number, name, brand or vehicle</label>
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input id="parts-search-page" name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search parts, part numbers, vehicles..." className="h-11 w-full rounded-lg border border-transparent pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition hover:bg-blue-800">Search <ArrowUpRight className="size-4" /></button>
        </form>

        <div className="mt-8 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">{query ? `Results for “${query}”` : "Popular parts"}</h2>
          <span className="text-sm text-slate-500">{results.length} {results.length === 1 ? "match" : "matches"}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2"><span className="mr-1 text-xs font-semibold text-slate-500">Product type</span>{["All", "OEM", "Aftermarket"].map((type) => <button key={type} type="button" onClick={() => setProductFilter(type)} aria-pressed={productFilter === type} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${productFilter === type ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"}`}>{type}</button>)}</div>
        <div className="mt-4 grid gap-3">
          {results.map((part) => <article key={part.partNumber} className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5">
            <div className="flex min-w-0 items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/5 text-primary"><PackageCheck className="size-5" /></span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-slate-900">{part.name}</h3><ProductTypeBadge productType={part.productType} /></div>
                <p className="mt-1 text-xs font-semibold tracking-wide text-primary">{part.partNumber}</p>
                <p className="mt-1 truncate text-sm text-slate-500">{part.brand} · {part.vehicle} · {part.category}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
              <div className="flex gap-4 text-xs text-slate-500"><span>MRP <strong className="text-slate-800">₹{part.mrp}</strong></span><span>MOQ <strong className="text-slate-800">{part.moq}</strong></span></div>
              <Link href={`/contact?part=${encodeURIComponent(part.partNumber)}`} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-primary/25 px-3 text-xs font-bold text-primary transition hover:bg-primary hover:text-white">Request quote <ArrowUpRight className="size-3.5" /></Link>
            </div>
          </article>)}
          {results.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-semibold text-slate-800">No matching parts found</p><p className="mt-2 text-sm text-slate-500">Try another part number or send your requirement to our team.</p><Link href="/contact" className="mt-4 inline-flex text-sm font-bold text-primary hover:underline">Send a parts enquiry</Link></div> : null}
        </div>
        <p className="mt-5 text-center text-xs text-slate-400">Sample catalogue data · prices and availability are indicative and confirmed by quote.</p>
      </div>
    </main>
  );
}
