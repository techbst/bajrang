"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Box,
  ClipboardList,
  Clock3,
  FileCheck2,
  FileUp,
  Truck,
  UploadCloud
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  quoteFileError,
  quoteFileExtension,
  quoteFileExtensions
} from "@/lib/quote-upload";
import { catalogueCartCsv } from "@/lib/catalogue-cart-csv";
import type { CatalogueCartItem } from "@/stores/catalogue-cart-store";
import { QuoteColumnMapper } from "./quote-column-mapper";

const fields = [
  {
    name: "contact",
    label: "Contact person",
    required: true,
    type: "text",
    autoComplete: "name",
    maxLength: 120
  },
  {
    name: "company",
    label: "Company / trade name",
    required: false,
    type: "text",
    autoComplete: "organization",
    maxLength: 160
  },
  {
    name: "phone",
    label: "Phone / WhatsApp",
    required: true,
    type: "tel",
    autoComplete: "tel",
    maxLength: 40
  },
  {
    name: "email",
    label: "Email",
    required: false,
    type: "email",
    autoComplete: "email",
    maxLength: 254
  },
  {
    name: "country",
    label: "Destination country",
    required: false,
    type: "text",
    autoComplete: "country-name",
    maxLength: 100
  }
];

const quoteDetails = [
  { icon: ClipboardList, label: "Itemized quote with discount on MRP" },
  { icon: Box, label: "Estimated total weight and CBM" },
  { icon: Truck, label: "FOB or CIF freight estimate to your port" },
  { icon: FileCheck2, label: "Availability and lead time per SKU" }
];

export function QuoteUpload({
  cartItems
}: {
  cartItems?: CatalogueCartItem[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={
            cartItems ? "h-11 justify-between px-3" : "px-3 text-center sm:px-5"
          }
        >
          {cartItems ? "Submit quote request" : "Upload Your Requirement"}
          {cartItems ? (
            <ArrowRight aria-hidden="true" className="size-4" />
          ) : (
            <UploadCloud aria-hidden="true" className="size-4 shrink-0" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="text-foreground md:[&>button:last-child]:bg-secondary md:[&>button:last-child]:text-foreground max-h-[calc(100dvh-2rem)] max-w-4xl overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-2xl [&>button:last-child]:grid [&>button:last-child]:size-8 [&>button:last-child]:place-items-center [&>button:last-child]:rounded-full [&>button:last-child]:bg-white/15 [&>button:last-child]:text-white">
        <QuoteUploadForm
          cartItems={cartItems}
          onImported={() => {
            setOpen(false);
            router.push("/cart");
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function QuoteUploadForm({
  cartItems,
  onImported
}: {
  cartItems?: CatalogueCartItem[];
  onImported: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [skipMapping, setSkipMapping] = useState(false);
  const [fileVersion, setFileVersion] = useState(0);
  const mapFile =
    file && !skipMapping && quoteFileExtension(file.name) !== ".pdf";

  function chooseFile(selected?: File) {
    if (!selected) return;
    const issue = quoteFileError(selected);
    setFile(issue ? null : selected);
    setError(issue ?? "");
    setSkipMapping(false);
    setFileVersion((current) => current + 1);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || mapFile || (!file && !cartItems?.length)) return;
    const data = new FormData(event.currentTarget);
    const attachment = cartItems
      ? new File([catalogueCartCsv(cartItems)], "bajrang-cart-parts.csv", {
          type: "text/csv"
        })
      : file;
    if (!attachment) return;
    data.set("file", attachment);
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        body: data
      });
      const result = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !result.id) {
        setError(
          result.error ?? "The request could not be saved. Please try again."
        );
        return;
      }
      setReceipt(result.id);
    } catch {
      setError(
        "The request could not be saved. Please retry or send the file on WhatsApp."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative isolate grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:grid-rows-[auto_1fr]">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 hidden w-2/5 bg-linear-to-br from-slate-950 to-[#0c3964] md:block"
      />
      <header className="bg-linear-to-br from-slate-950 to-[#0c3964] p-6 pr-12 text-white sm:p-8 md:col-start-1 md:row-start-1 md:bg-none md:pr-6">
        <p className="mb-4 text-xs font-bold text-blue-200 uppercase">
          Request a quote
        </p>
        <DialogTitle className="text-2xl font-semibold sm:text-3xl">
          {cartItems ? "Send your cart." : "Drop your parts list."}
          <span className="mt-3 block text-[clamp(1.75rem,3.7vw,2.75rem)] font-bold text-balance text-blue-300">
            We’ll price it in 24 hours.
          </span>
        </DialogTitle>
        <DialogDescription className="mt-4 max-w-sm text-sm text-slate-200 sm:text-base">
          {cartItems
            ? "Share your contact details to send the parts in your cart to Bajrang Automotive."
            : "Upload your BOM to Bajrang Automotive for an export quote with pricing, weights, and freight estimates."}
        </DialogDescription>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
          <Clock3 aria-hidden="true" className="size-4 text-blue-300" /> No
          account needed
        </p>
      </header>

      {receipt ? (
        <div
          role="status"
          className="border-primary/15 bg-secondary m-6 self-start rounded-xl border p-5 md:col-start-2 md:row-span-2 md:row-start-1 md:mt-12"
        >
          <FileCheck2 aria-hidden="true" className="text-primary size-6" />
          <p className="mt-3 text-lg font-semibold">Quote request received</p>
          <p className="text-muted-foreground mt-2 text-sm break-all">
            Reference {receipt}
          </p>
          <DialogClose asChild>
            <Button type="button" className="mt-4">
              Done
            </Button>
          </DialogClose>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="min-w-0 space-y-4 p-5 sm:p-7 md:col-start-2 md:row-span-2 md:row-start-1 md:pt-12"
        >
          {cartItems ? (
            <p className="border-primary/15 bg-secondary rounded-xl border p-4 text-sm font-medium">
              {cartItems.length} {cartItems.length === 1 ? "part" : "parts"}{" "}
              from your cart will be attached to the quote request.
            </p>
          ) : (
            <label
              className={`focus-within:outline-primary flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-dashed px-4 py-5 text-center focus-within:outline-2 focus-within:outline-offset-2 ${dragging ? "border-primary bg-secondary" : "border-primary/40 bg-secondary/40 hover:bg-secondary"}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                chooseFile(event.dataTransfer.files[0]);
              }}
            >
              <span className="border-primary/10 text-primary mb-2 grid size-11 place-items-center rounded-xl border bg-white shadow-sm">
                <FileUp aria-hidden="true" className="size-5" />
              </span>
              <span className="max-w-full text-sm font-semibold break-all">
                {file?.name ?? "Drop your BOM here, or click to browse"}
              </span>
              <span className="text-muted-foreground text-xs">
                {file
                  ? `${(file.size / 1024).toFixed(1)} KB · Click to replace`
                  : "Excel (.xlsx, .xls), CSV, or PDF · max 10 MB"}
              </span>
              <input
                type="file"
                aria-label="Attach your parts list"
                accept={quoteFileExtensions.join(",")}
                className="sr-only"
                onChange={(event) => {
                  chooseFile(event.currentTarget.files?.[0]);
                  event.currentTarget.value = "";
                }}
              />
            </label>
          )}

          {mapFile ? (
            <QuoteColumnMapper
              key={fileVersion}
              file={file}
              onSkip={() => setSkipMapping(true)}
              onImported={onImported}
            >
              <QuoteTerms />
            </QuoteColumnMapper>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                {fields.map(({ name, label, required, ...inputProps }) => (
                  <label key={name} className="grid gap-1 text-sm font-medium">
                    <span>
                      {label}
                      {required ? (
                        " *"
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          {" "}
                          (optional)
                        </span>
                      )}
                    </span>
                    <Input
                      name={name}
                      required={required}
                      {...inputProps}
                      className="h-10 min-w-0 bg-slate-50 focus-visible:bg-white"
                    />
                  </label>
                ))}
                <label className="grid gap-1 text-sm font-medium sm:col-span-2">
                  <span>
                    Notes for our team{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </span>
                  <textarea
                    name="notes"
                    rows={2}
                    maxLength={2000}
                    className="border-input focus-visible:ring-ring w-full resize-y rounded-md border bg-white px-3 py-2 outline-none focus-visible:ring-2"
                  />
                </label>
              </div>
              <QuoteTerms />
              {error && (
                <p role="alert" className="text-sm text-red-700">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                disabled={(!file && !cartItems?.length) || pending}
                className="w-full justify-between px-4"
              >
                {pending
                  ? "Submitting…"
                  : file || cartItems?.length
                    ? "Request a quote"
                    : "Attach a file to continue"}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </>
          )}
          <p className="text-muted-foreground text-sm">
            Prefer WhatsApp?{" "}
            <a
              className="text-primary font-semibold underline"
              href="https://wa.me/919810772076"
            >
              Send your file on WhatsApp
            </a>
            .
          </p>
        </form>
      )}

      <ul className="border-border bg-secondary/40 grid content-start gap-3 border-t p-5 text-sm sm:p-7 md:col-start-1 md:row-start-2 md:border-white/15 md:bg-transparent md:px-8 md:pt-5 md:text-white/90">
        {quoteDetails.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5">
            <Icon
              aria-hidden="true"
              className="text-primary size-4 shrink-0 md:text-blue-300"
            />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuoteTerms() {
  return (
    <p className="text-muted-foreground text-xs">
      By submitting, you agree to our{" "}
      <Link className="text-primary underline" href="/terms-of-use">
        Terms
      </Link>{" "}
      and{" "}
      <Link className="text-primary underline" href="/privacy-policy">
        Privacy Policy
      </Link>
      . We use the details you provide to reply to your request.
    </p>
  );
}
