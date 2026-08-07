import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className
      )}
    >
      <PackageOpen className="size-8 text-muted-foreground" aria-hidden="true" />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
