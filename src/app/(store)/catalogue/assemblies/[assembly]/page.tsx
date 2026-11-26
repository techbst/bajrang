import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { brandGroups, megaMenuConfig } from "@/components/navigation/navigation-data";
import { assemblyCategoryFromQuery, getCatalogueAssembly } from "@/lib/catalogue-assemblies";
import { getCatalogueBrand } from "@/lib/catalogue-data";

export default async function AssemblyBrandPage({ params, searchParams }: {
  params: Promise<{ assembly: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const [{ assembly: slug }, { category }] = await Promise.all([params, searchParams]);
  const selected = assemblyCategoryFromQuery(category) ?? megaMenuConfig.find((item) => getCatalogueAssembly(slug, item.category))?.category;
  if (!selected) notFound();
  const assembly = getCatalogueAssembly(slug, selected);
  if (!assembly) notFound();
  const menu = megaMenuConfig.find((item) => item.category === selected);
  if (!menu) notFound();
  const brands = brandGroups[menu.key].filter(({ slug }) => getCatalogueBrand(slug));

  return (
    <Container className="py-10 sm:py-14">
      <Link href={`/catalogue/assemblies?category=${selected}`} className="text-sm font-semibold text-primary hover:underline">All assembly groups</Link>
      <div className="mt-4 flex items-center gap-3">
        <span className="shrink-0 rounded-lg bg-secondary px-3 py-2 text-sm font-bold text-primary">{assembly.code}</span>
        <h1 className="text-3xl font-bold sm:text-4xl">{assembly.name}</h1>
      </div>
      <p className="mt-3 text-muted-foreground">Choose a vehicle brand to browse models and variants for this assembly.</p>

          <section className="mt-8" aria-label={menu.label}>
            <h2 className="text-xl font-semibold">{menu.label}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {brands.map((brand) => (
                <li key={brand.slug}>
                  <Link href={`/brands/${brand.slug}?assembly=${slug}#models-heading`} className="flex h-full items-center gap-3 rounded-xl border border-border bg-white p-3 text-sm font-semibold hover:border-primary hover:text-primary sm:p-4">
                    <Image src={brand.short} alt="" width={40} height={32} className="h-8 w-10 shrink-0 object-contain" />
                    <span>{brand.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
    </Container>
  );
}
