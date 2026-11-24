import { StoreShell } from "@/components/layout/store-shell";
import { cookies } from "next/headers";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const session = (await cookies()).get("session")?.value;
  return <StoreShell isAuthenticated={Boolean(session)}>{children}</StoreShell>;
}
