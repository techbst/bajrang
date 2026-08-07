"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");

  return (
    <form action="/search" className={`relative ${compact ? "w-full" : "w-full max-w-[280px]"}`} role="search">
      <label htmlFor={compact ? "mobile-part-search" : "part-search"} className="sr-only">Search by part number</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        id={compact ? "mobile-part-search" : "part-search"}
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by part number"
        className="h-10 w-full border border-slate-200 bg-slate-50/80 pl-9 pr-9 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0760BC] focus:bg-white focus:ring-2 focus:ring-[#0760BC]/10"
      />
      {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"><X className="size-4" /></button> : null}
    </form>
  );
}
