import { notFound } from "next/navigation";
import { AssemblyDetail } from "@/components/catalogue/assembly-detail";
import heroAssemblyParts from "@/data/catalogue/hero-assembly-parts.json";
import heroAssemblies from "@/data/catalogue/hero-assemblies.json";
import sampleParts from "@/data/catalogue/sample-parts.json";
import { getBrandCatalogue, getCatalogueBrand, titleFromCatalogueSlug } from "@/lib/catalogue-data";

export default async function AssemblyPage({ params, searchParams }: {
  params: Promise<{ slug: string; vehicle: string; assembly: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const [{ slug, vehicle: vehicleSlug, assembly: assemblySlug }, { type }] = await Promise.all([params, searchParams]);
  const brand = getCatalogueBrand(slug);
  if (!brand) notFound();

  const source = getBrandCatalogue(slug, brand);
  const vehicleName = source.models.flatMap((model) => model.variants).find((variant) => slugify(variant) === vehicleSlug) ?? titleFromCatalogueSlug(vehicleSlug);
  const catalogueAssembly = (type === "kit" ? heroAssemblies.kits : heroAssemblies.groups.flatMap((group) => group.assemblies)).find((item) => slugify(item.code) === assemblySlug);
  if (!catalogueAssembly) notFound();

  const isHeroE4 = slug === "hero" && catalogueAssembly.code === "E-4";
  const parts = isHeroE4
    ? heroAssemblyParts.parts
    : sampleParts.map((part, index) => ({ ref: index + 1, partNumber: part.partNumber, name: part.name, quantity: 1, productType: part.productType }));

  return <AssemblyDetail
    brand={brand.name}
    brandSlug={slug}
    vehicle={vehicleName}
    vehicleSlug={vehicleSlug}
    assemblyCode={catalogueAssembly.code}
    assemblyName={catalogueAssembly.name}
    partCount={catalogueAssembly.partCount}
    parts={parts}
  />;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

