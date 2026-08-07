import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  reset?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  reset
}: ErrorStateProps) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border p-8 text-center">
      <AlertTriangle className="size-8 text-destructive" aria-hidden="true" />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {reset ? (
        <Button className="mt-5" onClick={reset}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
