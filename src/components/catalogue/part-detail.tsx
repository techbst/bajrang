"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, ChevronRight, Minus, Plus, ShoppingCart, Wrench } from "lucide-react";
import { ProductTypeBadge } from "@/components/catalogue/assembly-detail";
import type { AssemblyPart } from "@/lib/catalogue-assembly-parts";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";
import { useCartStore } from "@/stores/cart-store";

export function PartDetail({
  brand,
  brandSlug,
  vehicle,
  vehicleSlug,
  assemblyCode,
  assemblyName,
  part,
  supportedVehicles,
  relatedParts,
  isDemo,
  isKit
}: {
  brand: string;
  brandSlug: string;
  vehicle: string;
  vehicleSlug: string;
  assemblyCode: string;
  assemblyName: string;
  part: AssemblyPart;
  supportedVehicles: string[];
  relatedParts: AssemblyPart[];
  isDemo: boolean;
  isKit: boolean;
}) {
  const addItem = useCatalogueCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [quantity, setQuantity] = useState(part.quantity);
  const [added, setAdded] = useState(false);
  const [showAllVehicles, setShowAllVehicles] = useState(false);
  const assemblyHref = `/brands/${brandSlug}/vehicles/${vehicleSlug}/assemblies/${slugify(assemblyCode)}${isKit ? "?type=kit" : ""}`;

  function addToCart() {
    addItem({ partNumber: part.partNumber, description: part.name, productType: part.productType, brand, vehicle, assemblyCode, assemblyName }, quantity);
    setAdded(true);
    openCart();
  }

  function addRemainingAssemblyParts() {
    relatedParts.filter((relatedPart) => relatedPart.partNumber !== part.partNumber).forEach((relatedPart) => {
      addItem({ partNumber: relatedPart.partNumber, description: relatedPart.name, productType: relatedPart.productType, brand, vehicle, assemblyCode, assemblyName }, relatedPart.quantity);
    });
    setAdded(true);
    openCart();
  }

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="border-b border-slate-200 bg-white"><div className="container flex min-h-14 flex-wrap items-center gap-2 text-sm"><Link href="/" className="text-slate-500 hover:text-primary">Home</Link><ChevronRight className="size-3.5 text-slate-300" /><Link href="/search" className="text-slate-500 hover:text-primary">Catalogue</Link><ChevronRight className="size-3.5 text-slate-300" /><Link href={`/brands/${brandSlug}`} className="text-slate-500 hover:text-primary">{brand}</Link><ChevronRight className="size-3.5 text-slate-300" /><Link href={`/brands/${brandSlug}/vehicles/${vehicleSlug}`} className="max-w-[25vw] truncate text-slate-500 hover:text-primary">{vehicle}</Link><ChevronRight className="size-3.5 text-slate-300" /><Link href={assemblyHref} className="text-slate-500 hover:text-primary">{assemblyCode}</Link><ChevronRight className="size-3.5 text-slate-300" /><span className="font-semibold text-slate-900">{part.partNumber}</span></div></div>

      <div className="container grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:py-10">
        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-bold text-primary">{brand} Part</span><ProductTypeBadge productType={part.productType} /></div><h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{part.partNumber}</h1><p className="mt-2 text-lg font-semibold text-slate-700">{part.name}</p><p className="mt-3 text-sm text-slate-500">{brand} {vehicle} · Ref #{part.ref} in assembly</p></div><div className="grid size-14 place-items-center rounded-xl bg-primary/[0.06] text-primary"><Wrench className="size-6" /></div></div>
            {isDemo && <p className="mt-4 rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">Demo part. The part number and fitment are illustrative.</p>}
            <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6">
              <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Qty required</p><div className="mt-2 flex h-10 items-center rounded-lg border border-slate-200"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="grid size-9 place-items-center text-slate-500 hover:text-primary"><Minus className="size-4" /></button><span className="min-w-8 text-center text-sm font-bold">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)} className="grid size-9 place-items-center text-slate-500 hover:text-primary"><Plus className="size-4" /></button></div></div>
              <button type="button" onClick={addToCart} className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"><ShoppingCart className="size-4" /> Add to Cart</button>
            </div>
            {added ? <div role="status" className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><span className="inline-flex items-center gap-2"><Check className="size-4" /> Added to your cart.</span><Link href="/cart" className="font-bold underline underline-offset-2">View cart</Link></div> : null}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="font-bold text-slate-900">Assembly diagram</h3><p className="mt-1 text-sm text-slate-500">{assemblyCode} {assemblyName} · Ref #{part.ref}</p></div><Link href={assemblyHref} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Full assembly <ArrowUpRight className="size-4" /></Link></div>
            <div className="relative mt-5 grid min-h-56 place-items-center overflow-hidden rounded-xl border border-blue-100 bg-[linear-gradient(135deg,#f8fbff,#e9f2fc)]">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(7,96,188,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(7,96,188,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative flex flex-col items-center text-center"><span className="grid size-24 place-items-center rounded-full border-2 border-dashed border-primary/30 bg-white text-primary shadow-sm"><Wrench className="size-10" /></span><p className="mt-4 text-sm font-bold text-slate-700">{part.partNumber}</p><p className="mt-1 text-xs text-slate-500">Ref #{part.ref} · illustrative catalogue view</p></div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3"><div><h3 className="font-bold text-slate-900">Supported vehicles</h3><p className="mt-1 text-sm text-slate-500">{supportedVehicles.length} sample vehicle applications</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{brand}</span></div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">{(showAllVehicles ? supportedVehicles : supportedVehicles.slice(0, 8)).map((supportedVehicle, index) => <Link key={`${supportedVehicle}-${index}`} href={`/brands/${brandSlug}/vehicles/${slugify(supportedVehicle)}`} className={`flex items-start gap-3 transition-colors hover:border-primary/30 hover:bg-primary/[0.03] ${supportedVehicle === vehicle ? "border-primary/30 bg-primary/[0.03]" : "border-slate-100"}`}><span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-primary">{brand.charAt(0)}</span><span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">{supportedVehicle === vehicle ? "Current" : brand}</span><span className="mt-1 block text-xs font-semibold leading-5 text-slate-700">{brand} {supportedVehicle}</span></span></Link>)}</div>
            {supportedVehicles.length > 8 ? <button type="button" onClick={() => setShowAllVehicles((current) => !current)} className="mt-3 text-sm font-bold text-primary hover:underline">{showAllVehicles ? "Show fewer vehicles" : `Show ${supportedVehicles.length - 8} more vehicles`}</button> : null}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-900">Part of assembly</h3><Link href={assemblyHref} className="mt-4 block rounded-xl bg-slate-50 p-4 transition hover:bg-primary/[0.04]"><span className="block text-xs font-bold text-primary">{assemblyCode}</span><span className="mt-1 block text-sm font-bold text-slate-800">{assemblyName}</span><span className="mt-2 block text-xs text-slate-500">{relatedParts.length} sample parts in this assembly</span></Link><button type="button" onClick={addRemainingAssemblyParts} className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-primary/25 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"><ShoppingCart className="size-4" />Add remaining assembly parts</button></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-900">Related parts</h3><div className="mt-3 divide-y divide-slate-100">{relatedParts.filter((item) => item.partNumber !== part.partNumber).slice(0, 6).map((item) => <Link key={item.partNumber} href={`${assemblyHref}/parts/${encodeURIComponent(item.partNumber)}`} className="block py-3 transition-colors hover:text-primary"><span className="block text-xs font-bold">{item.partNumber}</span><span className="mt-1 block text-xs text-slate-500">{item.name}</span></Link>)}</div><Link href={assemblyHref} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">View all parts <ArrowUpRight className="size-3.5" /></Link></section>
        </aside>
      </div>
    </main>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
