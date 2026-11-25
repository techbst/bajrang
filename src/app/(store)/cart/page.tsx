import { cookies } from "next/headers";
import { CatalogueCartPage } from "@/components/catalogue/catalogue-cart-page";

export default async function CartPage() {
  const session = (await cookies()).get("session")?.value;
  return <CatalogueCartPage isAuthenticated={Boolean(session)} />;
}
