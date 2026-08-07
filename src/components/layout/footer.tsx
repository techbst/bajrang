import Link from "next/link";
import { Container } from "@/components/common/container";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <Container className="grid gap-6 py-8 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-semibold text-foreground">Bajrang Commerce</p>
          <p className="mt-2">Prepared for a scalable storefront and API backend.</p>
        </div>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/account">Account</Link>
      </Container>
    </footer>
  );
}
