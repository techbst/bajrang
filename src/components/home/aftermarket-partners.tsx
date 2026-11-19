"use client";

import { useState } from "react";
import Image from "next/image";
import { Bike, CarFront, Truck } from "lucide-react";
import Heading from "@/components/ui/heading";
import { aftermarketPartnersData } from "@/data/home/aftermarket-partners";

const vehicleIcons = {
  car: CarFront,
  bike: Bike,
  truck: Truck,
};

export function AftermarketPartners() {
  const { title, subtitle, vehicleTypes, partners } = aftermarketPartnersData;
  const [activeVehicleType, setActiveVehicleType] = useState(0);
  const activeVehicle = vehicleTypes[activeVehicleType];
  const activePartners = partners.filter((partner) => partner.vehicleType === activeVehicle.id);

  return (
    <section className="relative py-20" aria-labelledby="aftermarket-partners-title">
      <div className="mx-auto max-w-[1920px] px-6 sm:px-6 lg:px-12">
        <div id="aftermarket-partners-title">
          <Heading
            title={title}
            subtitle={subtitle}
          />
        </div>

        <div className="mx-auto mb-7 grid max-w-4xl overflow-hidden rounded-lg border border-border sm:grid-cols-3" role="tablist" aria-label="Vehicle type">
          {vehicleTypes.map((vehicleType, index) => {
            const Icon = vehicleIcons[vehicleType.icon as keyof typeof vehicleIcons];
            const isActive = index === activeVehicleType;

            return (
              <button
                key={vehicleType.id}
                type="button"
                role="tab"
                id={`aftermarket-tab-${vehicleType.id}`}
                aria-selected={isActive}
                aria-controls="aftermarket-partner-list"
                onClick={() => setActiveVehicleType(index)}
                className={`flex items-center justify-center gap-2 whitespace-nowrap border-b border-border px-2 py-4 text-xs font-semibold uppercase transition-colors sm:gap-3 sm:text-sm sm:border-r sm:border-b-0 last:border-0 ${isActive ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-primary/5"}`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {vehicleType.label}
              </button>
            );
          })}
        </div>

        <ul
          id="aftermarket-partner-list"
          role="tabpanel"
          aria-labelledby={`aftermarket-tab-${activeVehicle.id}`}
          className="flex flex-wrap justify-center gap-4"
        >
          {activePartners.map((partner) => (
            <li
              key={partner.name}
              className="group flex min-h-40 w-[calc(50%-8px)] flex-col rounded-lg border border-border bg-card px-0 pt-5 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_45px_rgba(7,96,188,0.12)] sm:w-[calc(33.333%-11px)] lg:w-[calc(16.666%-14px)]"
            >
              <div className="relative mx-auto h-24 w-full max-w-32 sm:h-28">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 40vw, 15vw"
                />
              </div>
              <div className="mt-5 flex items-center justify-center gap-3 bg-primary/5 py-2 text-center text-sm text-muted-foreground">
                <span>
                  <strong className="font-semibold text-primary">{partner.parts}</strong> Spare Parts
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
