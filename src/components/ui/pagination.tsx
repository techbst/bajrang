import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

type PaginationProps = {
  previousHref?: string;
  nextHref?: string;
};

export function Pagination({ previousHref, nextHref }: PaginationProps) {
  return (
    <nav className="flex items-center justify-between" aria-label="Pagination">
      <Button asChild variant="outline" aria-disabled={!previousHref}>
        <Link href={previousHref ?? "#"}>
          <ChevronLeft className="size-4" aria-hidden="true" />
          Previous
        </Link>
      </Button>
      <Button asChild variant="outline" aria-disabled={!nextHref}>
        <Link href={nextHref ?? "#"}>
          Next
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </Button>
    </nav>
  );
}
