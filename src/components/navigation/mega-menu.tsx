"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BrandItem } from "./navigation-data";

export function MegaMenu({ label, href, description, brands }: { label: string; href: string; description: string; brands: BrandItem[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.2 }} className="absolute left-0 right-0 top-full z-50 border-t border-slate-100 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
      <div className="mx-auto grid max-w-[1920px] gap-8 px-6 py-7 lg:grid-cols-[220px_1fr] lg:px-12">
        <div className="border-r border-slate-100 pr-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#0760BC]">Parts catalog</span>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#161616]">{label}</h3>
          <p className="mt-2 text-sm leading-6 text-secondary-foreground/70">{description}</p>
          <Link href={href} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0760BC] hover:gap-2">Explore catalog <ArrowUpRight className="size-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {brands.map((brand) => <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group flex justify-center flex-col align-middle items-center gap-0 border border-transparent transition hover:border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0760BC]">
            <span className="my-3 flex h-[80px] w-[100px] items-center justify-center">
              <Image src={brand.short} alt={`${brand.name} logo`} width={100} height={60} className="max-h-[56px] w-full object-contain transition-transform duration-300 group-hover:scale-105" />
            </span>
            <span className="text-[10px] font-medium text-secondary-foreground uppercase tracking-[1px] group-hover:text-[#0760BC] bg-slate-100 block w-full text-center pt-[6px] pb-[5px] px-[2px]">{brand.name}</span>
            {/* <ArrowUpRight className="ml-auto size-3.5 text-slate-300 opacity-0 transition group-hover:opacity-100" /> */}
          </Link>)}
        </div>
      </div>
    </motion.div>
  );
}
