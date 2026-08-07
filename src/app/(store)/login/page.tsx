import { DemoForm } from "@/components/common/demo-form";
import { PageHeader } from "@/components/common/page-header";

export default function LoginPage() {
  return (
    <>
      <PageHeader title="Login" description="Authentication form placeholder." />
      <div className="mx-auto w-full max-w-md px-4 pb-10 sm:px-6 lg:px-8">
        <DemoForm />
      </div>
    </>
  );
}
