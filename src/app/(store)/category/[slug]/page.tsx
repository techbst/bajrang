import { PageHeader } from "@/components/common/page-header";
import { CategorySkeleton } from "@/components/skeletons/category-skeleton";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <>
      <PageHeader title={slug} description="Category route prepared for filtered products." />
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <CategorySkeleton />
      </div>
    </>
  );
}
