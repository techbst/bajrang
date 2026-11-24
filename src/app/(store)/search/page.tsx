import { PartsSearchResults } from "@/components/catalogue/parts-search-results";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <PartsSearchResults initialQuery={q} />;
}
