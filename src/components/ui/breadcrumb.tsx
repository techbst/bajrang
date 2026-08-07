import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 ? (
              <ChevronRight className="size-4" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
