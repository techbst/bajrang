import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border bg-card p-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
