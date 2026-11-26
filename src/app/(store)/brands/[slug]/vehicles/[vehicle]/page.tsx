import { notFound } from "next/navigation";
import { VehicleCatalogue } from "@/components/catalogue/vehicle-catalogue";
import heroAssemblies from "@/data/catalogue/hero-assemblies.json";
import { getBrandCatalogue, getCatalogueBrand, titleFromCatalogueSlug } from "@/lib/catalogue-data";
import { assemblyCategoryForVehicleType, assemblyGroupsByCategory } from "@/lib/catalogue-assemblies";
import { loadAssemblyParts } from "@/lib/catalogue-assembly-parts";

export default async function VehiclePage({ params }: { params: Promise<{ slug: string; vehicle: string }> }) {
  const { slug, vehicle: vehicleSlug } = await params;
  const brand = getCatalogueBrand(slug);
  if (!brand) notFound();

  const source = getBrandCatalogue(slug, brand);
  const model = source.models.flatMap((item) => [
    { model: item.name, variant: item.name },
    ...item.variants.map((variant) => ({ model: item.name, variant })),
  ]).find(({ model, variant }) => slugify(variant) === vehicleSlug || slugify(model) === vehicleSlug);
  const vehicleName = model?.variant ?? titleFromCatalogueSlug(vehicleSlug);
  const category = assemblyCategoryForVehicleType(brand.vehicleType);
  const withPartCount = async (assembly: { code: string; name: string; partCount: number }) => {
    const { parts } = await loadAssemblyParts({ brand, vehicle: { slug: vehicleSlug, name: vehicleName }, assembly });
    return { ...assembly, partCount: parts.length };
  };
  const groups = await Promise.all(assemblyGroupsByCategory[category].map(async (group) => ({
    name: group.name,
    assemblyCount: group.assemblies.length,
    assemblies: await Promise.all(group.assemblies.map(withPartCount))
  })));
  const kits = category === "motorcycle" ? await Promise.all(heroAssemblies.kits.map(withPartCount)) : [];
  const vehicleCatalogue = {
    groups,
    partCount: slug === "hero" ? heroAssemblies.partCount : brand.parts,
    assemblyCategoryCount: groups.reduce((total, group) => total + group.assemblyCount, 0),
    kitCount: kits.length,
    kits
  };

  return <VehicleCatalogue brand={brand.name} brandSlug={slug} vehicle={vehicleName} vehicleSlug={vehicleSlug} catalogue={vehicleCatalogue} />;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

