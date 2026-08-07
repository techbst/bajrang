import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold tracking-normal">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page may have moved or is not available.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Go home</Link>
      </Button>
    </Container>
  );
}
