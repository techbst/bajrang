import { redirect } from "next/navigation";
import { ComingSoonPage } from "@/components/company/coming-soon";

const categoryTitles: Record<string, string> = {
  "car-spare-parts": "Car Spare Parts",
  "motorcycle-spare-parts": "Motorcycle Spare Parts",
  "tractor-hcv-parts": "Tractor & HCV Parts",
};

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = slug === "car-spare-parts" ? "car" : slug === "motorcycle-spare-parts" ? "motorcycle" : slug === "tractor-hcv-parts" ? "truck" : null;
  if (category) redirect(`/catalogue?category=${category}`);
  const title = categoryTitles[slug] ?? slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return <ComingSoonPage title={`${title} Catalogue`} />;
}
