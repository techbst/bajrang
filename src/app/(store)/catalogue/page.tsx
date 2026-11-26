import { CatalogueLanding } from "@/components/catalogue/catalogue-landing";

export const metadata = {
  title: "Automotive Parts Catalogue | Bajrang Automotive",
  description: "Find car, motorcycle, truck, and HCV parts by brand, vehicle, part number, or name.",
};

export default async function CataloguePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = "motorcycle" } = await searchParams;
  return <CatalogueLanding category={category} />;
}
