"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, Bike, CarFront, Truck } from "lucide-react";
import Heading from "@/components/ui/heading";
import { shopByBrandData } from "@/data/home/shop-by-brand";
import { Button } from "../ui/button";

const vehicleIcons = {
  car: CarFront,
  bike: Bike,
  truck: Truck,
};

export default function ShopByBrand() {
  const { eyebrow, title, subtitle, vehicleTypes, brands, viewAllHref } = shopByBrandData;
  const [activeVehicleType, setActiveVehicleType] = useState(0);
  const activeVehicle = vehicleTypes[activeVehicleType];
  const activeBrands = brands.filter((brand) => brand.vehicleType === activeVehicle.id);

  return (
    <section className="py-15 md:py-15 lg:py-20 relative" aria-labelledby="shop-by-brand-title">
      <div className="mx-auto max-w-[1920px] px-6 sm:px-6 lg:px-12">
        <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} className="[&>h2]:text-3xl [&>h2]:leading-tight md:[&>h2]:text-4xl" />

        <div className="mb-7 grid max-w-2xl mx-auto overflow-hidden rounded-lg border border-border sm:grid-cols-3" role="tablist" aria-label="Vehicle type">
          {vehicleTypes.map((vehicleType, index) => {
            const Icon = vehicleIcons[vehicleType.icon as keyof typeof vehicleIcons];
            const isActive = index === activeVehicleType;

            return (
              <button
                key={vehicleType.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveVehicleType(index)}
                className={`flex items-center justify-center gap-3 border-b border-border py-4 px-2 text-sm font-semibold uppercase transition-colors sm:border-r sm:border-b-0 last:border-0 ${isActive ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-primary/5"
                  }`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {vehicleType.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4 four-wheeler">
          {activeBrands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="group flex min-h-32 w-[calc(50%-8px)] flex-col rounded-[10px] border border-border bg-card pt-5 px-0 duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md sm:w-[calc(33.333%-11px)] lg:w-[calc(16.666%-14px)]"
            >
              <div className="relative mx-auto h-20 w-full max-w-26">
                {typeof brand.logo === "string" ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 40vw, 15vw"
                  />
                ) : (
                  <span className="grid size-full place-items-center text-center text-xl font-bold text-primary">
                    {brand.name}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center justify-center gap-3 py-2 text-sm text-muted-foreground text-center bg-primary/5">
                <span>
                  <strong className="font-semibold text-primary">
                    {brand.parts}
                  </strong>{" "}
                  Spare Parts
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <Button
            asChild
          >
            <Link href="/search">
              View All Brands <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
      <img src="/img/home/left.webp" alt="" className="absolute bottom-0 left-0 pointer-events-none select-none max-w-[280px] -z-1" />
    </section>
  );
}
