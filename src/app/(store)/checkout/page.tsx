import { PageHeader } from "@/components/common/page-header";
import { CheckoutSkeleton } from "@/components/skeletons/checkout-skeleton";

export default function CheckoutPage() {
  return (
    <>
      <PageHeader title="Checkout" description="Protected checkout route placeholder." />
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <CheckoutSkeleton />
      </div>
    </>
  );
}
