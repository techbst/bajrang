import { Container } from "@/components/common/container";
import { PageSkeleton } from "@/components/skeletons/page-skeleton";

export default function Loading() {
  return (
    <Container className="py-10">
      <PageSkeleton />
    </Container>
  );
}
