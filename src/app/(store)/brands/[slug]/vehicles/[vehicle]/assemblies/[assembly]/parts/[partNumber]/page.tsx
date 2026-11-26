import { notFound } from "next/navigation";
import { PartDetail } from "@/components/catalogue/part-detail";
import heroAssemblyParts from "@/data/catalogue/hero-assembly-parts.json";
import heroAssemblies from "@/data/catalogue/hero-assemblies.json";
import heroCatalogue from "@/data/catalogue/hero.json";
import { getBrandCatalogue, getCatalogueBrand, titleFromCatalogueSlug } from "@/lib/catalogue-data";
import { assemblyCategoryForVehicleType, getCatalogueAssembly } from "@/lib/catalogue-assemblies";
import { loadAssemblyParts } from "@/lib/catalogue-assembly-parts";

export default async function PartPage({ params }: { params: Promise<{ slug: string; vehicle: string; assembly: string; partNumber: string }> }) {
  const { slug, vehicle: vehicleSlug, assembly: assemblySlug, partNumber } = await params;
  const brand = getCatalogueBrand(slug);
  if (!brand) notFound();

  const category = assemblyCategoryForVehicleType(brand.vehicleType);
  const assembly = getCatalogueAssembly(assemblySlug, category);
  const kit = category === "motorcycle" ? heroAssemblies.kits.find((item) => slugify(item.code) === assemblySlug) : undefined;
  const selectedAssembly = assembly ?? kit;
  if (!selectedAssembly) notFound();

  const source = getBrandCatalogue(slug, brand);
  const vehicleName = source.models.flatMap((model) => model.variants).find((variant) => slugify(variant) === vehicleSlug) ?? titleFromCatalogueSlug(vehicleSlug);
  const { parts, source: partsSource } = await loadAssemblyParts({
    brand,
    vehicle: { slug: vehicleSlug, name: vehicleName },
    assembly: selectedAssembly
  });
  const part = parts.find((item) => item.partNumber === partNumber);
  if (!part) notFound();
  const supportedVehicles = slug === "hero" && selectedAssembly.code === "E-4" ? Array.from(new Set([
    ...heroAssemblyParts.supportedVehicles,
    ...heroCatalogue.models.flatMap((model) => model.variants)
  ])).slice(0, 45) : [vehicleName];

  return <PartDetail
    brand={brand.name}
    brandSlug={slug}
    vehicle={vehicleName}
    vehicleSlug={vehicleSlug}
    assemblyCode={selectedAssembly.code}
    assemblyName={selectedAssembly.name}
    part={part}
    supportedVehicles={supportedVehicles}
    relatedParts={parts}
    isDemo={partsSource === "demo"}
    isKit={!assembly}
  />;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

