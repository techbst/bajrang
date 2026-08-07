"use client";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-10">
      <ErrorState reset={reset} />
    </Container>
  );
}
