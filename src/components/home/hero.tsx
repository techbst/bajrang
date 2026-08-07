"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowRightIcon, Check, FileSpreadsheet, Globe2, ShieldCheck, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { DragEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";

const headlines = ["Your Trusted Global Exporter of Genuine Car Parts.", "Your Trusted Global Exporter of Genuine Bike Parts.", "Your Trusted Global Exporter of Genuine Tractor & HVC Parts."];

export function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => { if (shouldReduceMotion) return; const timer = window.setInterval(() => setHeadlineIndex((index) => (index + 1) % headlines.length), 5000); return () => window.clearInterval(timer); }, [shouldReduceMotion]);
  return <section className="relative isolate overflow-hidden bg-[#f5f8fc]">
    <div
      className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(7,96,188,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(7,96,188,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
    <div className="pointer-events-none absolute -right-28 top-24 size-96 rounded-full bg-[#0760BC]/10 blur-3xl" />
    <div
      className="relative mx-auto grid max-w-[1920px] gap-12 px-6 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-12 lg:py-14">
      <div className="max-w-2xl">
        <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#0760BC]">
          <span className="h-px w-8 bg-[#0760BC]" /> Genuine spare parts · global export</div>
        <h1
          className="min-h-[7.2rem] max-w-[680px] text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-[#161616] sm:min-h-[9rem] sm:text-6xl lg:text-[4.25rem]">
          {shouldReduceMotion ? headlines[headlineIndex] : <AnimatePresence mode="wait">
            <motion.span key={headlineIndex} className="block" initial={{ opacity: 0, y: 15 }} animate={{
              opacity: 1, y: 0
            }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}>{headlines[headlineIndex]}</motion.span>
          </AnimatePresence>}</h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">Genuine spare parts sourcing and global
          export for cars, motorcycles, tractors and HCVs, with reliable pricing, availability and delivery timelines.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          variant="default"
         
        >
          <a href="#upload">
            Upload Your Requirement <UploadCloud className="size-4" />
          </a>
        </Button>
          <Button
            asChild
            variant="outline"
            
          >
            <Link href="/search">
              Search by Part Number <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <TrustIndicators />
      </div>
      <div className="relative mx-auto w-full lg:ml-auto">
        <ProductVisual />
        {/* <UploadRequirement /> */}
      </div>
    </div>
  </section>;
}

function ProductVisual() {
  return <div
    className="relative min-h-[300px] overflow-hidden text-white shadow-2xl shadow-[#0760BC]/10 sm:min-h-[390px]">
    <img src="/img/home/hero.webp" alt="Car parts" className="w-full h-full object-cover" />
  </div>;
}

function TrustIndicators() {
  return <div className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-200 pt-6 sm:grid-cols-4">
    <Trust icon={<ShieldCheck />} label="Genuine Parts" />
    <Trust icon={<Globe2 />} label="Global Export" />
    <Trust icon={<FileSpreadsheet />} label="Fast Quotations" />
    <Trust icon={<Check />} label="Reliable Supply" />
  </div>;
}
function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
    <span className="text-[#0760BC] [&>svg]:size-4">{icon}</span>{label}
  </div>;
}


