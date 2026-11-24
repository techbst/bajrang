import { notFound } from "next/navigation";
import { BrandCatalogue } from "@/components/catalogue/brand-catalogue";
import { getBrandCatalogue, getCatalogueBrand } from "@/lib/catalogue-data";

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getCatalogueBrand(slug);
  if (!brand) notFound();
  const catalogue = getBrandCatalogue(slug, brand);

  return (
    <BrandCatalogue
      brand={brand.name}
      brandSlug={slug}
      logo={brand.logo}
      partCount={brand.parts}
      catalogue={catalogue}
    />
  );
}
