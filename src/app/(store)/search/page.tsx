import { DemoForm } from "@/components/common/demo-form";
import { PageHeader } from "@/components/common/page-header";

export default function SearchPage() {
  return (
    <>
      <PageHeader title="Search" description="Search architecture placeholder." />
      <div className="mx-auto w-full max-w-3xl px-4 pb-10 sm:px-6 lg:px-8">
        <DemoForm />
      </div>
    </>
  );
}
