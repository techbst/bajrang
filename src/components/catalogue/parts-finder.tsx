"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import brandVehicles from "@/data/catalogue/brand-vehicles.json";
import { brandGroups } from "@/components/navigation/navigation-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const brandGroupLabels = {
  car: "Cars",
  motorcycle: "Motorcycles",
  tractor: "Trucks, HCVs & tractors"
};

const baseFieldClass =
  "h-11 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2.5 font-medium text-slate-900 focus-visible:outline-2 focus-visible:outline-primary disabled:bg-slate-100 disabled:text-slate-600";

export function PartsFinder({
  inputId,
  className,
  glass = false
}: {
  inputId?: string;
  className?: string;
  glass?: boolean;
}) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const models = brandVehicles[brand as keyof typeof brandVehicles] ?? [];
  const fieldClass = cn(
    baseFieldClass,
    glass &&
      "scheme-dark border-white/30 bg-slate-950/30 text-white placeholder:text-slate-300 focus-visible:outline-blue-300 disabled:bg-slate-950/20 disabled:text-slate-300"
  );
  const vehicleLabelClass = cn(
    "grid min-w-0 gap-1 font-semibold  lg:border-slate-300 lg:px-4",
    glass && "lg:border-white/20"
  );

  return (
    <form
      action="/search"
      role="search"
      aria-label="Find auto parts"
      className={cn(
        "rounded-xl border border-white/15 bg-white p-3.5 text-base text-slate-900 shadow-lg sm:p-5 sm:text-sm",
        glass && "bg-transparent text-white",
        className
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-end gap-3 rounded-lg border border-slate-300 p-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)_auto] lg:gap-0",
          glass && "border-0 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto]"
        )}
      >
        <label className={vehicleLabelClass}>
          Brand
          <select
            name="brand"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
              setModel("");
            }}
            className={fieldClass}
          >
            <option value="">All brands</option>
            {Object.entries(brandGroupLabels).map(([group, label]) => (
              <optgroup key={group} label={label}>
                {brandGroups[group].map(({ name, slug }) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className={vehicleLabelClass}>
          Model
          <select
            name="model"
            value={model}
            onChange={(event) => setModel(event.target.value)}
            disabled={!models.length}
            className={fieldClass}
          >
            <option value="">
              {brand ? "All models" : "Select a brand first"}
            </option>
            {models.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label
          className={cn(
            "grid min-w-0 gap-1 font-semibold lg:px-4",
            glass && "lg:border-s lg:border-white/40"
          )}
        >
          Part number or name
          <input
            id={inputId}
            name="q"
            type="search"
            className={`${fieldClass} scroll-mt-28`}
            placeholder="e.g. Brake shoe"
          />
        </label>
        <Button
          type="submit"
          className={cn("h-11", glass && "lg:min-w-36 xl:min-w-44")}
        >
          <Search aria-hidden="true" className="size-4" /> Search
        </Button>
      </div>
    </form>
  );
}
