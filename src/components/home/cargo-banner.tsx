import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const ports = [
  "Mumbai Port",
  "JNPT (Nhava Sheva)",
  "Chennai Port",
  "Tughlakabad ICD",
  "Mundra Port",
  "Kolkata Port",
];

export function CargoBanner() {
  return (
    <section className="relative isolate min-h-[680px] overflow-hidden sm:min-h-[620px] lg:min-h-[560px]" aria-labelledby="cargo-banner-title">
      <Image
        src="/img/home/banner_cargo.webp"
        alt="Cargo ship departing a busy Indian seaport"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        priority={false}
      />
      <div className="absolute inset-0 -z-10 bg-black/10" aria-hidden="true" />

      <div className="container flex min-h-[inherit] items-center py-10 sm:py-12">
        <div className="w-full max-w-[540px] rounded-xl bg-[linear-gradient(153.32deg,#000000_-65.62%,rgba(0,0,0,0.09)_76.12%)] p-6 text-white shadow-[0px_4px_24px_-1px_#00234300] backdrop-blur-[50px] sm:p-8 lg:p-10">
          <h2 id="cargo-banner-title" className="text-3xl font-bold uppercase sm:text-4xl">
            Shipped From India to Global Markets
          </h2>
          <p className="mt-5 text-base text-white/95 sm:text-lg">
            Our export network leverages India’s leading ports and logistics channels for efficient worldwide shipments.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3" aria-label="Ports and logistics hubs">
            {ports.map((port) => (
              <li key={port} className="flex min-h-12 items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium sm:text-sm">
                <CircleCheck className="size-5 shrink-0 fill-white text-[#08778d]" aria-hidden="true" />
                {port}
              </li>
            ))}
          </ul>

          <Button asChild variant="light" className="mt-6 gap-4">
            <Link href="/contact">
              Request A Call
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
