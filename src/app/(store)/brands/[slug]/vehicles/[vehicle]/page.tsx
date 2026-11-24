import { notFound } from "next/navigation";
import { VehicleCatalogue } from "@/components/catalogue/vehicle-catalogue";
import heroAssemblies from "@/data/catalogue/hero-assemblies.json";
import { getBrandCatalogue, getCatalogueBrand, titleFromCatalogueSlug } from "@/lib/catalogue-data";

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
  const vehicleCatalogue = {
    ...heroAssemblies,
    partCount: slug === "hero" ? heroAssemblies.partCount : brand.parts,
  };

  return <VehicleCatalogue brand={brand.name} brandSlug={slug} vehicle={vehicleName} vehicleSlug={vehicleSlug} catalogue={vehicleCatalogue} />;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

