import { redirect } from "next/navigation";
import { PartsSearchResults } from "@/components/catalogue/parts-search-results";
import { brandGroups } from "@/components/navigation/navigation-data";
import brandVehicles from "@/data/catalogue/brand-vehicles.json";
import { slugifyCatalogueName } from "@/lib/catalogue-slugs";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; brand?: string; model?: string }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const brand = Object.values(brandGroups)
    .flat()
    .find(({ slug }) => slug === params.brand);
  const models = brand
    ? (brandVehicles[brand.slug as keyof typeof brandVehicles] ?? [])
    : [];
  const model = models.find((name) => name === params.model);
  const brandHref = brand ? `/brands/${brand.slug}` : undefined;
  const catalogueHref = model
    ? `${brandHref}/vehicles/${slugifyCatalogueName(model)}`
    : brandHref;

  if (!query && catalogueHref) redirect(catalogueHref);

  return (
    <PartsSearchResults
      key={JSON.stringify([query, brand?.slug, model])}
      initialQuery={query}
      brand={brand}
      model={model}
      catalogueHref={catalogueHref}
    />
  );
}
