"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportCatalogueCart } from "@/lib/catalogue-cart-export";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";

export function CartActions({
  isAuthenticated,
  onNavigate
}: {
  isAuthenticated: boolean;
  onNavigate?: () => void;
}) {
  const items = useCatalogueCartStore((state) => state.items);
  const clear = useCatalogueCartStore((state) => state.clear);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  async function download() {
    if (!isAuthenticated || exporting || !items.length) return;
    setExporting(true);
    setError("");
    try {
      const result = await exportCatalogueCart(items);
      if (result.error) {
        setError(result.error);
        return;
      }
      const url = URL.createObjectURL(
        new Blob([result.csv ?? ""], { type: "text/csv;charset=utf-8" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "bajrang-parts-enquiry.csv";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("The parts list could not be exported. Try again.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="mt-4 grid gap-2">
      {isAuthenticated ? (
        <Button asChild>
          <Link href="/contact?source=cart#enquiry-form" onClick={onNavigate}>
            Submit Enquiry <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      ) : (
        <Button type="button" disabled>
          Submit Enquiry <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      )}
      <Button
        type="button"
        variant="outline"
        onClick={download}
        disabled={!isAuthenticated || exporting || !items.length}
      >
        <FileSpreadsheet aria-hidden="true" className="size-4" />
        {exporting ? "Exporting…" : "Export Excel"}
      </Button>
      {!isAuthenticated && (
        <Link
          href="/login"
          onClick={onNavigate}
          className="text-primary text-center text-xs font-semibold hover:underline"
        >
          Sign in to submit an enquiry or export
        </Link>
      )}
      {error && (
        <p role="alert" className="text-center text-xs text-red-700">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={clear}
        className="min-h-9 text-sm font-semibold text-slate-600 hover:text-red-700"
      >
        Clear Cart
      </button>
    </div>
  );
}
