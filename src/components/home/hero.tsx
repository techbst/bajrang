import Image from "next/image";
import { SectionEyebrow } from "@/components/common/section-eyebrow";
import Link from "next/link";
import { ArrowRight, Check, FileSpreadsheet, Globe2, ShieldCheck, Truck, UploadCloud } from "lucide-react";

const vehicleTiles = [
  { title: "Car parts", detail: "Passenger vehicles", image: "/img/home/car-spare-parts.webp", href: "/catalogue?category=car" },
  { title: "Motorcycle parts", detail: "Two-wheelers", image: "/img/home/bike-spare-parts.webp", href: "/catalogue?category=motorcycle" },
  { title: "Truck & HCV", detail: "Commercial vehicles", image: "/img/home/hcv-spare-parts.webp", href: "/catalogue?category=truck" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8fc]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(7,96,188,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(7,96,188,0.055)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-24 size-96 rounded-full bg-[#0760BC]/10 blur-3xl" />
      <div className="container relative grid gap-9 py-11 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 lg:py-16">
        <div className="max-w-2xl">
          <SectionEyebrow>Wholesale auto parts <span className="px-1">{"·"}</span> Global export</SectionEyebrow>
          <h1 className="mt-5 max-w-[650px] text-[clamp(2.35rem,5.4vw,4.35rem)] leading-[1.04] font-bold tracking-[-0.045em] text-[#111827]">Reliable auto parts supply for <span className="text-primary">global businesses.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">Source genuine OEM and aftermarket parts for cars, motorcycles, trucks, and HCVs, with export support from enquiry through dispatch.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="#upload" className="site-action inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(7,96,188,0.2)]">Upload Your Requirement <UploadCloud className="size-4" /></Link>
            <Link href="/search" className="site-action inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary">Search by Part Number <ArrowRight className="size-4" /></Link>
          </div>
          <TrustIndicators />
        </div>
        <div className="relative mx-auto w-full max-w-[680px] lg:ml-auto"><ProductVisual /></div>
      </div>
    </section>
  );
}

function ProductVisual() {
  return (
    <div className="grid min-h-[360px] grid-cols-2 grid-rows-2 gap-3 sm:min-h-[460px] sm:gap-4">
      {vehicleTiles.map((tile) => <Link key={tile.title} href={tile.href} className="group relative isolate min-h-[170px] overflow-hidden rounded-2xl bg-slate-300 shadow-[0_14px_35px_rgba(15,23,42,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <Image src={tile.image} alt={`${tile.title} for wholesale export`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/85 via-slate-950/5 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5"><span className="block text-sm font-bold text-white sm:text-base">{tile.title}</span><span className="mt-1 block text-xs text-white/75">{tile.detail}</span></span>
        <span aria-hidden="true" className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-white/30 bg-slate-950/25 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"><ArrowRight className="size-4" /></span>
      </Link>)}
      <div className="flex min-h-[170px] flex-col justify-between rounded-2xl bg-[#0760BC] p-4 text-white shadow-[0_14px_35px_rgba(7,96,188,0.2)] sm:p-6">
        <span className="text-[10px] font-bold tracking-[0.18em] text-white/75 uppercase sm:text-xs">Built for trade</span>
        <div><p className="text-xl leading-tight font-bold tracking-tight sm:text-2xl">One partner.<br />Global parts.</p><p className="mt-2 text-xs leading-5 text-white/80 sm:text-sm">Reliable sourcing for your business.</p></div>
        <div className="flex items-center gap-2 text-xs font-semibold text-white/90"><Truck className="size-4"/> Export-ready support</div>
      </div>
    </div>
  );
}

function TrustIndicators() {
  return <div className="mt-8 grid max-w-xl grid-cols-2 gap-x-5 gap-y-3 border-t border-slate-200 pt-5 sm:mt-9 sm:grid-cols-4">
    <Trust icon={<ShieldCheck />} label="Genuine parts" />
    <Trust icon={<Globe2 />} label="Global export" />
    <Trust icon={<FileSpreadsheet />} label="Fast quotations" />
    <Trust icon={<Check />} label="Reliable supply" />
  </div>;
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><span className="text-primary [&>svg]:size-4">{icon}</span>{label}</div>;
}
