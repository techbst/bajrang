import { notFound } from "next/navigation";
import { AssemblyDetail } from "@/components/catalogue/assembly-detail";
import heroAssemblies from "@/data/catalogue/hero-assemblies.json";
import { getBrandCatalogue, getCatalogueBrand, titleFromCatalogueSlug } from "@/lib/catalogue-data";
import { assemblyCategoryForVehicleType, getCatalogueAssembly } from "@/lib/catalogue-assemblies";
import { loadAssemblyParts } from "@/lib/catalogue-assembly-parts";

export default async function AssemblyPage({ params, searchParams }: {
  params: Promise<{ slug: string; vehicle: string; assembly: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const [{ slug, vehicle: vehicleSlug, assembly: assemblySlug }, { type }] = await Promise.all([params, searchParams]);
  const brand = getCatalogueBrand(slug);
  if (!brand) notFound();

  const source = getBrandCatalogue(slug, brand);
  const vehicleName = source.models.flatMap((model) => model.variants).find((variant) => slugify(variant) === vehicleSlug) ?? titleFromCatalogueSlug(vehicleSlug);
  const category = assemblyCategoryForVehicleType(brand.vehicleType);
  const catalogueAssembly = type === "kit"
    ? (category === "motorcycle" ? heroAssemblies.kits.find((item) => slugify(item.code) === assemblySlug) : undefined)
    : getCatalogueAssembly(assemblySlug, category);
  if (!catalogueAssembly) notFound();

  const { parts, source: partsSource } = await loadAssemblyParts({
    brand,
    vehicle: { slug: vehicleSlug, name: vehicleName },
    assembly: catalogueAssembly
  });

  return <AssemblyDetail
    brand={brand.name}
    brandSlug={slug}
    vehicle={vehicleName}
    vehicleSlug={vehicleSlug}
    assemblyCode={catalogueAssembly.code}
    assemblyName={catalogueAssembly.name}
    partCount={parts.length}
    isDemo={partsSource === "demo"}
    parts={parts}
  />;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

