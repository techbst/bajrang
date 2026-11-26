import { notFound } from "next/navigation";
import { BrandCatalogue } from "@/components/catalogue/brand-catalogue";
import { getBrandCatalogue, getCatalogueBrand } from "@/lib/catalogue-data";
import { assemblyCategoryForVehicleType, getCatalogueAssembly } from "@/lib/catalogue-assemblies";

export default async function BrandPage({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ assembly?: string | string[] }>;
}) {
  const [{ slug }, { assembly }] = await Promise.all([params, searchParams]);
  const brand = getCatalogueBrand(slug);
  if (!brand) notFound();
  const catalogue = getBrandCatalogue(slug, brand);
  const category = assemblyCategoryForVehicleType(brand.vehicleType);

  return (
    <BrandCatalogue
      brand={brand.name}
      brandSlug={slug}
      logo={brand.logo}
      partCount={brand.parts}
      catalogue={catalogue}
      assembly={typeof assembly === "string" ? getCatalogueAssembly(assembly, category) : undefined}
      assemblyCategory={category}
    />
  );
}
