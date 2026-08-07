import { PageHeader } from "@/components/common/page-header";
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Products",
  description: "Browse products once the catalog API is connected.",
  path: "/products"
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        description="Catalog page placeholder prepared for server-rendered product listings."
      />
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <ProductGridSkeleton />
      </div>
    </>
  );
}
