import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
