import { ProductCardSkeleton } from "./product-card-skeleton";

export function ProductGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
