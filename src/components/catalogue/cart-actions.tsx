"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Download, LogIn, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportCatalogueCart } from "@/lib/catalogue-cart-export";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";
import { QuoteUpload } from "@/components/home/quote-upload";

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
  const hasImportedParts = items.some((item) => item.source === "bom");

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
    <div className="mt-5 space-y-3">
      {!isAuthenticated && !hasImportedParts && (
        <div className="rounded-xl border border-primary/15 bg-secondary/60 p-3.5">
          <p className="text-sm font-semibold text-foreground">Sign in to continue</p>
          <p className="mt-1 text-xs text-muted-foreground">Sign in to submit a quote request or download your parts list.</p>
          <Button asChild className="mt-3 h-10 w-full justify-between px-3">
            <Link href="/login" onClick={onNavigate}>
              Log in <LogIn aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      )}
      <div className="grid gap-2">
        {hasImportedParts ? (
          onNavigate ? (
            <Button asChild className="h-11 justify-between px-3">
              <Link href="/cart" onClick={onNavigate}>Submit quote request <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </Button>
          ) : <QuoteUpload cartItems={items} />
        ) : isAuthenticated ? (
          <Button asChild className="h-11 justify-between px-3">
            <Link href="/contact?source=cart#enquiry-form" onClick={onNavigate}>
              Submit quote request <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" className="h-11 justify-between px-3" disabled>
            Submit quote request <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        )}
        {(isAuthenticated || !hasImportedParts) && (
          <Button type="button" variant="outline" className="h-11 justify-between px-3" onClick={download} disabled={!isAuthenticated || exporting || !items.length}>
            {exporting ? "Downloading…" : "Download parts list"} <Download aria-hidden="true" className="size-4" />
          </Button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-center text-xs text-red-700">
          {error}
        </p>
      )}
      <div className="border-t border-border pt-2">
        <button type="button" onClick={clear} className="inline-flex min-h-9 items-center gap-2 rounded text-sm font-medium text-muted-foreground hover:text-red-700 focus-visible:outline-2 focus-visible:outline-primary">
          <Trash2 aria-hidden="true" className="size-4" /> Clear cart
        </button>
      </div>
    </div>
  );
}
