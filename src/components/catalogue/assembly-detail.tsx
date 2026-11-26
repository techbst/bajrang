"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import { ArrowUpRight, Check, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";
import { useCartStore } from "@/stores/cart-store";
import type { AssemblyPart } from "@/lib/catalogue-assembly-parts";

export function AssemblyDetail({
  brand,
  brandSlug,
  vehicle,
  vehicleSlug,
  assemblyCode,
  assemblyName,
  partCount,
  parts,
  isDemo
}: {
  brand: string;
  brandSlug: string;
  vehicle: string;
  vehicleSlug: string;
  assemblyCode: string;
  assemblyName: string;
  partCount: number;
  parts: AssemblyPart[];
  isDemo: boolean;
}) {
  const addItem = useCatalogueCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [added, setAdded] = useState(false);
  const [productFilter, setProductFilter] = useState("All");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const visibleParts = parts.filter((part) => productFilter === "All" || part.productType === productFilter);

  function addPart(part: AssemblyPart, quantity = quantities[part.partNumber] ?? part.quantity) {
    addItem({ partNumber: part.partNumber, description: part.name, productType: part.productType, brand, vehicle, assemblyCode, assemblyName }, quantity);
    setAdded(true);
    openCart();
  }

  function addAllParts() {
    parts.forEach((part) => addPart(part));
  }

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <Breadcrumbs brand={brand} brandSlug={brandSlug} vehicle={vehicle} vehicleSlug={vehicleSlug} assembly={assemblyCode} />
      <div className="container grid gap-7 py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-10">
        <div className="min-w-0">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionEyebrow>{brand} · Assembly</SectionEyebrow>
            <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
              <div><h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{assemblyCode} {assemblyName}</h1><p className="mt-2 text-sm text-slate-500">{brand} {vehicle}{partCount > 0 ? ` · ${partCount} ${isDemo ? "demo parts" : "parts"}` : ""}</p></div>
              {parts.length > 0 ? (<button type="button" onClick={addAllParts} className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-blue-800"><ShoppingCart className="size-4" /> Add all {parts.length} sample parts</button>) : (<Link href="/contact" className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-white">Request availability</Link>)}
            </div>
            {isDemo && (
              <p className="mt-4 rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                Demo parts for testing the catalogue and cart. Part numbers, quantities, and fitment are illustrative.
              </p>
            )}
            {added ? <div role="status" className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><span className="inline-flex items-center gap-2"><Check className="size-4" /> Parts added to your cart.</span><Link href="/cart" className="font-bold underline underline-offset-2">View cart</Link></div> : null}
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6"><div><h2 className="text-base font-semibold text-slate-800">Parts in this assembly</h2><p className="mt-1 text-xs text-slate-500">{partCount > 0 ? `${partCount} ${isDemo ? "demo parts" : "listed parts"}` : "Availability on request"}</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Ref · Part · Description</span></div>
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-6"><span className="mr-1 text-xs font-semibold text-slate-500">Product type</span>{["All", "OEM", "Aftermarket"].map((type) => <button key={type} type="button" onClick={() => setProductFilter(type)} aria-pressed={productFilter === type} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${productFilter === type ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"}`}>{type}</button>)}</div>
            <div className="divide-y divide-slate-100">
              {visibleParts.map((part) => <div key={part.partNumber} className="grid gap-3 px-4 py-4 sm:grid-cols-[36px_minmax(0,1fr)_90px_140px] sm:items-center sm:px-6">
                <span className="grid size-9 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{part.ref}</span>
                <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><Link href={`${assemblyPath(brandSlug, vehicleSlug, assemblyCode)}/parts/${encodeURIComponent(part.partNumber)}`} className="text-sm font-bold text-primary hover:underline">{part.partNumber}</Link><ProductTypeBadge productType={part.productType} /></div><p className="mt-1 text-sm text-slate-700">{part.name}</p></div>
                <span className="text-xs text-slate-500">Qty required: {part.quantity}</span>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex h-9 items-center rounded-lg border border-slate-200">
                    <button type="button" aria-label={`Decrease ${part.partNumber} quantity`} onClick={() => setQuantities((current) => ({ ...current, [part.partNumber]: Math.max(1, (current[part.partNumber] ?? part.quantity) - 1) }))} className="grid size-8 place-items-center text-slate-500 hover:text-primary"><Minus className="size-3.5" /></button>
                    <span className="min-w-6 text-center text-xs font-semibold">{quantities[part.partNumber] ?? part.quantity}</span>
                    <button type="button" aria-label={`Increase ${part.partNumber} quantity`} onClick={() => setQuantities((current) => ({ ...current, [part.partNumber]: (current[part.partNumber] ?? part.quantity) + 1 }))} className="grid size-8 place-items-center text-slate-500 hover:text-primary"><Plus className="size-3.5" /></button>
                  </div>
                  <button type="button" aria-label={`Add ${part.partNumber} to cart`} onClick={() => addPart(part)} className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/5 text-primary transition-colors hover:bg-primary hover:text-white"><ShoppingCart className="size-4" /></button>
                </div>
              </div>)}
              {visibleParts.length === 0 ? <p className="px-5 py-10 text-center text-sm text-slate-500">{parts.length === 0 ? "No parts are listed for this vehicle and assembly. Request availability to check fitment." : `No ${productFilter.toLowerCase()} products in this sample assembly.`}</p> : null}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-800">For this vehicle</h2>
            <p className="mt-1 text-xs text-slate-500">Browse the model catalogue</p>
            <Link href={`/brands/${brandSlug}/vehicles/${vehicleSlug}`} className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 transition hover:bg-primary/5 hover:text-primary"><span className="line-clamp-2">{brand} {vehicle}</span><ArrowUpRight className="size-4 shrink-0" /></Link>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h6 className="font-bold text-slate-900">Related assemblies</h6>
            <div className="mt-3 divide-y divide-slate-100">
              {[["E-3", "CAM SHAFT/VALVE"], ["E-6", "CLUTCH"], ["E-6A", "CLUTCH"], ["E-6B", "CLUTCH (3 LUG)"]].map(([code, name]) => <Link key={code} href={`/brands/${brandSlug}/vehicles/${vehicleSlug}/assemblies/${slugify(code)}`} className="flex items-center justify-between gap-3 py-3 text-xs hover:text-primary"><span><strong className="text-slate-800">{code}</strong><span className="ml-2 text-slate-500">{name}</span></span><ChevronRight className="size-3.5 shrink-0" /></Link>)}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function Breadcrumbs({ brand, brandSlug, vehicle, vehicleSlug, assembly }: { brand: string; brandSlug: string; vehicle: string; vehicleSlug: string; assembly: string }) {
  return <div className="border-b border-slate-200 bg-white"><div className="container flex min-h-14 flex-wrap items-center gap-2 text-sm"><Link href="/" className="text-slate-500 hover:text-primary">Home</Link><ChevronRight className="size-3.5 text-slate-300" /><Link href={`/brands/${brandSlug}`} className="text-slate-500 hover:text-primary">{brand}</Link><ChevronRight className="size-3.5 text-slate-300" /><Link href={`/brands/${brandSlug}/vehicles/${vehicleSlug}`} className="max-w-[35vw] truncate text-slate-500 hover:text-primary">{vehicle}</Link><ChevronRight className="size-3.5 text-slate-300" /><span className="font-semibold text-slate-900">{assembly}</span></div></div>;
}

function assemblyPath(brandSlug: string, vehicleSlug: string, code: string) {
  return `/brands/${brandSlug}/vehicles/${vehicleSlug}/assemblies/${slugify(code)}`;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ProductTypeBadge({ productType }: { productType?: string }) {
  const normalized = productType?.toLowerCase();
  const isOem = normalized === "oem";
  const isAftermarket = normalized === "aftermarket";
  const label = isOem ? "OEM" : isAftermarket ? "Aftermarket" : "Type pending";
  const style = isOem ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : isAftermarket ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200" : "bg-slate-100 text-slate-600";
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style}`}>{label}</span>;
}
