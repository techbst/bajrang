import Link from "next/link";
import { Container } from "@/components/common/container";
import { assemblyCatalogueHref, assemblyCategoryFromQuery, assemblyGroupsByCategory } from "@/lib/catalogue-assemblies";
import { megaMenuConfig } from "@/components/navigation/navigation-data";

export const metadata = { title: "Assembly Groups | Bajrang Auto Part" };

export default async function AssemblyCataloguePage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const selected = assemblyCategoryFromQuery((await searchParams).category) ?? "car";
  const assemblyGroups = assemblyGroupsByCategory[selected];
  return (
    <Container className="py-10 sm:py-14">
      <Link href="/catalogue" className="text-sm font-semibold text-primary hover:underline">Parts catalogue</Link>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Assembly groups</h1>
      <p className="mt-2 text-muted-foreground">Choose an assembly, then select a vehicle brand and model.</p>
      <nav aria-label="Vehicle category" className="mt-5 flex flex-wrap gap-2">
        {megaMenuConfig.map(({ category, label }) => (
          <Link key={category} href={`/catalogue/assemblies?category=${category}`} aria-current={selected === category ? "page" : undefined} className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary aria-[current=page]:bg-secondary aria-[current=page]:text-primary">{label}</Link>
        ))}
      </nav>
      {assemblyGroups.map((group) => (
        <section key={group.name} className="mt-8" aria-label={group.name}>
          <h2 className="text-xl font-semibold">{group.name}</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.assemblies.map(({ code, name, partCount }) => (
              <li key={code}>
                <Link href={assemblyCatalogueHref(code, selected)} className="flex h-full items-center gap-3 rounded-xl border border-border bg-white p-4 hover:border-primary hover:text-primary">
                  <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs font-bold text-primary">{code}</span>
                  <span className="text-sm font-semibold">{name}{partCount > 0 && <span className="mt-1 block text-xs font-normal text-muted-foreground">{partCount} parts</span>}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}
