import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList, LaptopMinimalCheck, PackageCheck, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

const steps = [
  {
    title: "Inquiry & Requirement Analysis",
    description: "Send part numbers, brand names, photos, or Excel requirement list for quick review.",
    icon: ClipboardList,
  },
  {
    title: "Quotation & Order Confirmation",
    description: "Receive a detailed quotation with pricing, stock status, and delivery timelines.",
    icon: LaptopMinimalCheck,
  },
  {
    title: "Quality Check & Secure Packaging",
    description: "Packed safely using export-grade standards to prevent damage during transit.",
    icon: PackageCheck,
  },
  {
    title: "Global Shipping & Delivery",
    description: "Your order is dispatched via air or sea freight with full documentation and tracking.",
    icon: Ship,
  },
];

const partnerLogos = [
  { name: "Bosch", src: "/img/brands/our-term-1.webp" },
  { name: "Denso", src: "/img/brands/our-term-2.webp" },
  { name: "Nissan", src: "/img/brands/nissan.svg" },
  { name: "NGK", src: "/img/brands/our-term-4.webp" },
];

export function ExportProcess() {
  return (
    <section className="bg-white py-20" aria-labelledby="export-process-title">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
          <div>
            <div id="export-process-title">
              <Heading
                eyebrow="Our Export Process"
                title={'Fast, Reliable &amp; Transparent<br /><span class="text-primary">Export Process</span>'}
                subtitle="A simple, end-to-end process that ensures speed, quality, and complete transparency in every export."
                align="left"
                className="[&>p]:mx-0 [&>p]:mb-0"
              />
            </div>
            <Button asChild className="mt-8 gap-4">
              <Link href="/contact">
                Send Requirement
                <ArrowRight aria-hidden="true" className="size-6" />
              </Link>
            </Button>
          </div>

         <ol className="relative space-y-8 before:absolute before:top-8 before:bottom-8 before:left-4 before:z-0 before:w-0.5 before:bg-blue-200 sm:space-y-10 sm:before:left-4">
            {steps.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="relative grid grid-cols-[30px_50px_1fr] items-center gap-3 sm:grid-cols-[40px_50px_1fr] sm:gap-5">
                <span className="z-10 grid size-8 place-items-center rounded-full bg-[#0874e5] text-lg font-bold text-white shadow-sm sm:size-8 sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-[45px] place-items-center rounded-2xl bg-blue-50 text-[#10244a] sm:size-16">
                  <Icon aria-hidden="true" className="text-primary size-6 sm:size-8" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 border-l border-slate-300 pl-4 sm:pl-8">
                  <h3 className="text-base leading-snug font-bold text-[#101b34] sm:text-xl">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#29354b] sm:text-base sm:leading-7">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mt-16 flex flex-col items-center gap-6 overflow-hidden rounded-lg bg-[#eef6ff] px-6 py-6 sm:px-9 lg:flex-row lg:gap-8">
          <div aria-hidden="true" className="pointer-events-none absolute right-0 -bottom-20 size-56 opacity-40 sm:size-52 lg:size-70">
            <Image
              src="/img/home/export-globe.svg"
              alt=""
              fill
              sizes="(min-width: 1024px) 384px, 288px"
              className="object-contain"
            />
          </div>
          <ul className="relative z-10 flex items-center justify-center -space-x-3" aria-label="Selected aftermarket partners">
            {partnerLogos.map((partner) => (
              <li key={partner.name} className="grid size-14 place-items-center overflow-hidden rounded-full border-2 border-white bg-white p-2 sm:size-16">
                <Image src={partner.src} alt={partner.name} width={120} height={64} className="max-h-10 w-full object-contain" />
              </li>
            ))}
          </ul>
          <p className="relative z-10 max-w-xl text-center text-base leading-6 font-bold text-[#101b34] uppercase sm:text-lg sm:leading-7 lg:text-left">
            We partner with over 100+ OEM and aftermarket brands worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
