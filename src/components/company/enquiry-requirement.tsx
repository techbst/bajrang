"use client";

import { useState } from "react";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";

export function EnquiryRequirement({
  sourceCart,
  part
}: {
  sourceCart: boolean;
  part?: string;
}) {
  const items = useCatalogueCartStore((state) => state.items);
  const [draft, setDraft] = useState<string>();
  const cartText = items
    .map(
      ({ partNumber, description, quantity }) =>
        `${partNumber} — ${description} — Qty ${quantity}`
    )
    .join("\n");
  const initialValue = sourceCart
    ? cartText
    : part
      ? `Part number: ${part}`
      : "";

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
      Parts or product requirement
      <textarea
        name="message"
        rows={5}
        required
        value={draft ?? initialValue}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Part numbers, brands, quantities, destination market..."
        className="focus:border-primary focus:ring-primary/15 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2"
      />
    </label>
  );
}
