import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function CartPage() {
  return (
    <>
      <PageHeader title="Cart" description="Cart route prepared for user-specific data." />
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <EmptyState title="Your cart is empty" />
      </div>
    </>
  );
}
