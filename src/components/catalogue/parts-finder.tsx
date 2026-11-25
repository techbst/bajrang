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

const fieldClass =
  "h-11 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2.5 font-medium text-slate-900 focus-visible:outline-2 focus-visible:outline-primary disabled:bg-slate-100 disabled:text-slate-600";

export function PartsFinder({
  inputId,
  className
}: {
  inputId?: string;
  className?: string;
}) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const models = brandVehicles[brand as keyof typeof brandVehicles] ?? [];

  return (
    <form
      action="/search"
      role="search"
      aria-label="Find auto parts"
      className={cn(
        "rounded-xl border border-white/15 bg-white p-3.5 text-base text-slate-900 shadow-lg sm:p-5 sm:text-sm",
        className
      )}
    >
      <div className="grid grid-cols-1 items-end gap-3 rounded-lg border border-slate-300 p-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)_auto] lg:gap-0">
        <label className="grid min-w-0 gap-1 font-semibold lg:border-e lg:border-slate-300 lg:px-4">
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
        <label className="grid min-w-0 gap-1 font-semibold lg:border-e lg:border-slate-300 lg:px-4">
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
        <label className="grid min-w-0 gap-1 font-semibold lg:px-4">
          Part number or name
          <input
            id={inputId}
            name="q"
            type="search"
            className={`${fieldClass} scroll-mt-28`}
            placeholder="e.g. Brake shoe"
          />
        </label>
        <Button type="submit" className="h-11">
          <Search aria-hidden="true" className="size-4" /> Search
        </Button>
      </div>
    </form>
  );
}
