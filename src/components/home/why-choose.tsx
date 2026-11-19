import Image from "next/image";
import Heading from "@/components/ui/heading";

const reasons = [
  {
    title: "100% Genuine Parts",
    description: "We supply verified OEM and high-quality aftermarket parts to ensure durability and performance.",
  },
  {
    title: "Competitive Pricing",
    description: "Optimized sourcing and bulk supply help you get the best value without compromising quality.",
  },
  {
    title: "100+ Brand Collaborations",
    description: "Working with leading OEM and aftermarket brands to ensure authenticity and quality.",
  },
  {
    title: "Trusted by Global Clients",
    description: "Long-term relationships built with distributors and importers across 36+ countries.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-20" aria-labelledby="why-choose-title">
      <div className="mx-auto grid max-w-[1920px] items-stretch gap-10 px-6 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-12">
        <figure className="group relative aspect-[4/3] overflow-hidden rounded-md lg:aspect-auto">
          <Image
            src="/img/home/why-choose.webp"
            alt="Bajrang warehouse team handling an export shipment"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />
          <figcaption className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
            <p className="text-lg font-medium sm:text-2xl">Inside Bajrang Warehouse</p>
            <p className="mt-4 text-2xl leading-tight font-bold uppercase sm:text-4xl">14,000 Sq.Ft of Organized Excellence</p>
          </figcaption>
        </figure>

        <div>
          <div id="why-choose-title">
            <Heading
              title="Why Businesses<br />Choose Us Globally"
              subtitle="Delivering consistency, quality, and speed—so your supply chain never slows down."
              align="left"
            />
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li
                key={reason.title}
                className="group rounded-lg border border-border bg-white p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_45px_rgba(7,96,188,0.12)] sm:p-7"
              >
                <h3 className="!text-xl leading-tight font-bold text-[#171717] uppercase sm:text-2xl transition-colors duration-300 group-hover:text-primary">
                  {reason.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#4b4b4b] sm:text-lg sm:leading-8">
                  {reason.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
