"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";
import { ProductTypeBadge } from "@/components/catalogue/assembly-detail";

import { CartActions } from "@/components/catalogue/cart-actions";

export function CatalogueCartPage({ isAuthenticated }: { isAuthenticated: boolean }) {
  const items = useCatalogueCartStore((state) => state.items);
  const setQuantity = useCatalogueCartStore((state) => state.setQuantity);
  const removeItem = useCatalogueCartStore((state) => state.removeItem);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="min-h-[65vh] bg-slate-50 py-9 sm:py-12">
      <div className="container container-narrow">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Parts enquiry list</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Cart ({items.length})</h1><p className="mt-2 text-sm text-slate-500">Review requested quantities before sending your enquiry.</p></div><Link href="/search" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="size-4" /> Continue browsing</Link></div>

        {items.length === 0 ? <div className="mt-7 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center"><ShoppingBag className="mx-auto size-10 text-slate-300" /><h2 className="mt-4 text-lg font-bold text-slate-900">Your parts list is empty</h2><p className="mt-2 text-sm text-slate-500">Browse a vehicle catalogue and add the parts you need.</p><Link href="/search" className="mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-blue-800">Browse parts</Link></div> : (
          <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="divide-y divide-slate-100">
                {items.map((item) => <article key={item.id} className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5">
                  <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold tracking-wide text-slate-900">{item.partNumber}</p>{item.source === "bom" ? <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-primary">Imported BOM</span> : <ProductTypeBadge productType={item.productType} />}</div><p className="mt-1 text-sm text-slate-700">{item.description}</p>{item.source !== "bom" && <p className="mt-2 truncate text-xs text-slate-500">{item.brand} {item.vehicle} · {item.assemblyCode}</p>}</div>
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="flex h-9 items-center rounded-lg border border-slate-200"><button type="button" aria-label={`Decrease ${item.partNumber} quantity`} onClick={() => setQuantity(item.id, item.quantity - 1)} className="grid size-8 place-items-center text-slate-500 hover:text-primary"><Minus className="size-3.5" /></button><span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span><button type="button" aria-label={`Increase ${item.partNumber} quantity`} onClick={() => setQuantity(item.id, item.quantity + 1)} className="grid size-8 place-items-center text-slate-500 hover:text-primary"><Plus className="size-3.5" /></button></div>
                    <button type="button" aria-label={`Remove ${item.partNumber}`} onClick={() => removeItem(item.id)} className="grid size-9 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"><Trash2 className="size-4" /></button>
                  </div>
                </article>)}
              </div>
            </section>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 className="text-lg font-bold text-slate-900">Enquiry summary</h2><div className="mt-5 space-y-3 border-y border-slate-100 py-4 text-sm"><div className="flex justify-between text-slate-600"><span>Parts</span><strong className="text-slate-900">{items.length}</strong></div><div className="flex justify-between text-slate-600"><span>Total quantity</span><strong className="text-slate-900">{totalQuantity}</strong></div></div><p className="mt-4 text-xs leading-5 text-slate-500">Pricing, MOQ and export availability will be confirmed by our team.</p><CartActions isAuthenticated={isAuthenticated} /></aside>
          </div>
        )}
        <p className="mt-5 text-center text-xs text-slate-400">Sample cart is saved in this browser for demonstration.</p>
      </div>
    </main>
  );
}
