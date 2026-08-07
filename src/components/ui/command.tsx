"use client";

import { Search } from "lucide-react";
import { Input } from "./input";

export function CommandSearch({
  placeholder = "Search...",
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className="flex items-center gap-2 rounded-md border px-3">
      <Search className="size-4 text-muted-foreground" aria-hidden="true" />
      <Input
        className="border-0 px-0 shadow-none focus-visible:ring-0"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
