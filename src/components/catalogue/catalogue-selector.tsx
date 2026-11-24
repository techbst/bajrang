"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import brandVehicles from "@/data/catalogue/brand-vehicles.json";
import type { BrandItem } from "@/components/navigation/navigation-data";

export function CatalogueSelector({ brands }: { brands: BrandItem[] }) {
  const initialBrand = brands.find((brand) => brand.slug === "hero") ?? brands[0];
  const [brandSlug, setBrandSlug] = useState(initialBrand?.slug ?? "");
  const [model, setModel] = useState("");
  const selectedBrand = brands.find((brand) => brand.slug === brandSlug) ?? initialBrand;
  const models = useMemo(() => {
    if (!brandSlug) return [];
    return brandVehicles[brandSlug as keyof typeof brandVehicles] ?? [];
  }, [brandSlug]);
  const selectedModel = models.includes(model) ? model : models.find((name) => /destini/i.test(name)) ?? models[0] ?? "";
  const partsHref = selectedBrand && selectedModel
    ? `/brands/${selectedBrand.slug}/vehicles/${slugify(selectedModel)}`
    : selectedBrand ? `/brands/${selectedBrand.slug}` : "/catalogue";

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(16,36,74,0.07)] sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <label className="grid min-w-0 gap-2 text-sm font-semibold text-slate-700">Brand
          <span className="relative"><select value={brandSlug} onChange={(event) => { setBrandSlug(event.target.value); setModel(""); }} className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10">{brands.map((brand) => <option key={brand.slug} value={brand.slug}>{brand.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500"/></span>
        </label>
        <label className="grid min-w-0 gap-2 text-sm font-semibold text-slate-700">Model
          <span className="relative"><select value={selectedModel} onChange={(event) => setModel(event.target.value)} disabled={!models.length} className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:bg-slate-50">{models.length ? models.map((name) => <option key={name} value={name}>{name}</option>) : <option value="">Contact us for model availability</option>}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500"/></span>
        </label>
        <Link href={partsHref} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-md">Browse parts <ArrowRight className="size-4"/></Link>
      </div>
    </div>
  );
}

function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
