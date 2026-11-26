import { ContactPage } from "@/components/company/company-pages";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Contact Bajrang Automotive",
  description:
    "Contact Bajrang Automotive for wholesale automotive parts and export enquiries."
};

export default async function ContactRoute({
  searchParams
}: {
  searchParams: Promise<{ source?: string; part?: string }>;
}) {
  const { source, part } = await searchParams;
  const sourceCart = source === "cart";
  if (sourceCart && !(await cookies()).get("session")?.value) {
    redirect("/login");
  }

  return (
    <ContactPage
      sourceCart={sourceCart}
      part={typeof part === "string" ? part : undefined}
    />
  );
}
