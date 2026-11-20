"use client";

import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  ClipboardList,
  FileText,
  PackageCheck,
  SearchCheck,
  Truck,
} from "lucide-react";
import Heading from "@/components/ui/heading";

const steps = [
  { title: "Enquiry", description: "Share your parts list, brands, or delivery needs with our team.", icon: ClipboardList },
  { title: "Quotation", description: "Review clear pricing, availability, and estimated lead times.", icon: FileText },
  { title: "Order Confirmation", description: "We confirm your order details before processing begins.", icon: BadgeCheck },
  { title: "Quality Inspection", description: "Parts are checked against specifications before packing.", icon: SearchCheck },
  { title: "Packaging", description: "Each order is packed securely for safe international transit.", icon: PackageCheck },
  { title: "Dispatch", description: "Your shipment leaves with the required export documents.", icon: Truck },
];

export function Operations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateActiveStep = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const bounds = section.getBoundingClientRect();
        if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) {
          setActiveStep(-1);
          setScrollProgress(0);
          return;
        }

        const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (bounds.height * 0.9)));
        setScrollProgress(progress);
        setActiveStep(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
      });
    };

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f9fd] py-20" aria-labelledby="operations-title">
      <div className="container">
        <div id="operations-title">
          <Heading
            eyebrow="Our Operations"
            title="Inside Our Operations"
            subtitle="Our warehouse departments are designed to handle inventory, quality, and shipping with seamless coordination."
            align="center"
            className="[&>p]:mb-0"
          />
        </div>

        <div
          className="relative mx-auto mt-10 mb-8 grid w-full grid-cols-6 items-center"
          role="group"
          aria-label="Operations workflow progress"
        >
          <span aria-hidden="true" className="absolute left-[8.333%] right-[8.333%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#dbe8f5]" />
          <span
            aria-hidden="true"
            className="absolute left-[8.333%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${scrollProgress * 83.334}%` }}
          />
          {steps.map(({ title }, index) => (
            <div key={title} className="relative flex justify-center">
              <span
                className={`relative z-10 grid size-8 place-items-center rounded-full border-2 border-white text-[11px] font-bold transition-all duration-300 sm:size-9 sm:text-xs ${index <= activeStep ? "scale-105 bg-primary text-white shadow-[0_0_0_1px_#0760bc,0_4px_12px_rgba(7,96,188,0.25)]" : "bg-white text-[#7d8da3] shadow-[0_0_0_1px_#cbd8e6]"}`}
                aria-label={`${title}${index === activeStep ? ", current step" : ""}`}
              >
                {index + 1}
              </span>
            </div>
          ))}
        </div>

        <ol className="mt-0 grid gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-0">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <li
              key={title}
              aria-current={index === activeStep ? "step" : undefined}
              className={`group relative flex min-h-[260px] flex-col border bg-white p-5 shadow-[0_10px_30px_rgba(16,36,74,0.055)] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(7,96,188,0.13)] sm:p-6 xl:min-h-[280px] ${index === activeStep ? "border-2 border-primary bg-[#fbfdff] shadow-[0_16px_36px_rgba(7,96,188,0.16)]" : "border-[#dbe6f1]"} ${index === 0 ? "rounded-xl xl:rounded-l-xl xl:rounded-r-none" : index === steps.length - 1 ? "rounded-xl xl:rounded-r-xl xl:rounded-l-none" : "rounded-xl xl:rounded-none"}`}
            >
              <span aria-hidden="true" className={`absolute -top-[50px] left-1/2 hidden h-[50px] w-px -translate-x-1/2 transition-colors xl:block ${index <= activeStep ? "bg-primary" : "bg-[#cbd8e6]"}`} />
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 transition-colors ${index === activeStep ? "bg-primary" : "bg-[#e7eff8]"}`} />
              <div className="flex items-center justify-between">
                <span className={`grid size-12 place-items-center rounded-xl transition-colors ${index === activeStep ? "bg-primary text-white" : "bg-[#edf5fd] text-primary group-hover:bg-primary group-hover:text-white"}`}>
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                </span>
                <span className="text-sm font-bold tracking-[0.14em] text-[#9aabc0]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 pt-2">
                <span className="mb-3 block h-0.5 w-9 rounded-full bg-primary/70" aria-hidden="true" />
                <h3 className="text-lg leading-snug font-bold text-[#101b34] sm:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#526176]">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
