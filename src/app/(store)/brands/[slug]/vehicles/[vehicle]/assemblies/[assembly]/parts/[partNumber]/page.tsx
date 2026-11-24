import { notFound } from "next/navigation";
import { PartDetail } from "@/components/catalogue/part-detail";
import heroAssemblyParts from "@/data/catalogue/hero-assembly-parts.json";
import heroAssemblies from "@/data/catalogue/hero-assemblies.json";
import heroCatalogue from "@/data/catalogue/hero.json";
import sampleParts from "@/data/catalogue/sample-parts.json";
import { getBrandCatalogue, getCatalogueBrand, titleFromCatalogueSlug } from "@/lib/catalogue-data";

export default async function PartPage({ params }: { params: Promise<{ slug: string; vehicle: string; assembly: string; partNumber: string }> }) {
  const { slug, vehicle: vehicleSlug, assembly: assemblySlug, partNumber } = await params;
  const brand = getCatalogueBrand(slug);
  if (!brand) notFound();

  const assembly = heroAssemblies.groups.flatMap((group) => group.assemblies).find((item) => slugify(item.code) === assemblySlug);
  const kit = heroAssemblies.kits.find((item) => slugify(item.code) === assemblySlug);
  const selectedAssembly = assembly ?? kit;
  if (!selectedAssembly) notFound();

  const source = getBrandCatalogue(slug, brand);
  const vehicleName = source.models.flatMap((model) => model.variants).find((variant) => slugify(variant) === vehicleSlug) ?? titleFromCatalogueSlug(vehicleSlug);
  const parts = slug === "hero" && selectedAssembly.code === "E-4"
    ? heroAssemblyParts.parts
    : sampleParts.map((part, index) => ({ ref: index + 1, partNumber: part.partNumber, name: part.name, quantity: 1, productType: part.productType }));
  const part = parts.find((item) => item.partNumber === partNumber);
  if (!part) notFound();
  const supportedVehicles = Array.from(new Set([
    ...heroAssemblyParts.supportedVehicles,
    ...heroCatalogue.models.flatMap((model) => model.variants)
  ])).slice(0, 45);

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
  />;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

