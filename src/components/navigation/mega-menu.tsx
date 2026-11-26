"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { getAssemblyMenuLinks, type BrandItem } from "./navigation-data";
import type { AssemblyCategory } from "@/lib/catalogue-assemblies";

export function MegaMenu({ label, href, category, description, brands, onNavigate }: { label: string; href: string; category: AssemblyCategory; description: string; brands: BrandItem[]; onNavigate: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute left-0 right-0 top-full z-50 hidden rounded-b-xl border-t xl:block border-slate-100 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
      <div className="mx-auto grid max-w-[1920px] gap-8 px-6 py-7 lg:grid-cols-[220px_1fr] lg:px-12">
        <div className="border-r border-slate-100 pr-6">
          <span className="text-[10px] font-bold uppercase text-[#0760BC]">Parts catalog</span>
          <h3 className="mt-3 text-xl font-semibold text-foreground">{label}</h3>
          <p className="mt-2 text-sm text-secondary-foreground/70">{description}</p>
          <Link href={href} onNavigate={onNavigate} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0760BC]">Explore catalog <ArrowUpRight className="size-4" /></Link>
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-sm font-semibold text-foreground">Assembly groups</p>
            <ul className="mt-2 space-y-1">
              {getAssemblyMenuLinks(category).map((assembly) => (
                <li key={assembly.code}>
                  <Link href={assembly.href} onNavigate={onNavigate} className="flex items-center gap-2 rounded-md py-1.5 text-xs hover:text-primary hover:underline">
                    <span className="shrink-0 rounded bg-secondary px-1.5 py-1 font-bold text-primary">{assembly.code}</span>
                    <span className="font-medium">{assembly.name}{assembly.partCount > 0 && <span className="block font-normal text-muted-foreground">{assembly.partCount} parts</span>}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/catalogue/assemblies?category=${category}`} onNavigate={onNavigate} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              View all <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {brands.map((brand) => <Link key={brand.slug} href={`/brands/${brand.slug}`} onNavigate={onNavigate} className="group flex justify-between flex-col align-middle items-center gap-0 border border-transparent transition hover:border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0760BC]">
            <span className="relative my-6 block h-14 w-[100px]">
              <Image src={brand.short} alt="" fill sizes="100px" className="object-contain" />
            </span>
            <span className="text-[10px] font-medium text-secondary-foreground uppercase group-hover:text-[#0760BC] bg-slate-100 block w-full text-center pt-[6px] pb-[5px] px-[2px]">{brand.name}</span>
            {/* <ArrowUpRight className="ml-auto size-3.5 text-slate-300 opacity-0 transition group-hover:opacity-100" /> */}
          </Link>)}
        </div>
      </div>
    </motion.div>
  );
}
