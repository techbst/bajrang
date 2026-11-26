import Image from "next/image";
import { BadgeCheck, Globe2, Handshake, Tags } from "lucide-react";
import Heading from "@/components/ui/heading";

const reasons = [
  {
    title: "100% Genuine Parts",
    description: "Source verified OEM parts and quality aftermarket alternatives for your market.",
    icon: BadgeCheck,
  },
  {
    title: "Competitive Pricing",
    description: "Get competitive wholesale pricing through bulk supply and an established sourcing network.",
    icon: Tags,
  },
  {
    title: "100+ Brand Collaborations",
    description: "Choose from a wide range of parts through our relationships with OEM and aftermarket brands.",
    icon: Handshake,
  },
  {
    title: "Trusted by Global Clients",
    description: "We work with distributors and importers across 36+ countries.",
    icon: Globe2,
  },
];

export function WhyChoose() {
  return (
    <section className="bg-white py-20" aria-labelledby="why-choose-title">
      <div className="container grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto">
          <Image
            src="/img/home/why-choose.webp"
            alt="Bajrang warehouse team handling an export shipment"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />
          <figcaption className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
            <p className="text-sm font-medium text-white/90 sm:text-base">Inside Bajrang Warehouse</p>
            <p className="mt-2 text-2xl font-bold sm:text-3xl">14,000 sq. ft. of warehouse space</p>
          </figcaption>
        </figure>

        <div>
          <div id="why-choose-title">
            <Heading
              eyebrow="Why Choose Us"
              title="Why Businesses Choose Bajrang"
              subtitle="Reliable parts sourcing, consistent quality, and timely dispatch help keep your supply chain moving."
              align="left"
              className="[&>p]:mx-0 [&>p]:mb-0"
            />
          </div>
          <ul className="mt-6 grid list-none gap-3 sm:grid-cols-2 sm:gap-4">
            {reasons.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="h-full rounded-xl border border-border bg-white p-5"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
