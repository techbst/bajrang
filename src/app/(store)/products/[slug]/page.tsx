import { PageHeader } from "@/components/common/page-header";
import { ProductDetailSkeleton } from "@/components/skeletons/product-detail-skeleton";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  return {
    title: slug
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  return (
    <>
      <PageHeader
        title={slug}
        description="Product detail route ready for dynamic metadata and structured data."
      />
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <ProductDetailSkeleton />
      </div>
    </>
  );
}
