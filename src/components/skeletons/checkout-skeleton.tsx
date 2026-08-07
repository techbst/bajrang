import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
