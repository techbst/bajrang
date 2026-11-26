"use client";

import { ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  guessQuoteColumns,
  mapQuoteRows,
  maxSheetRows,
  quoteColumns,
  readQuoteSheet,
  type QuoteColumnMap
} from "@/lib/quote-sheet";
import { useCatalogueCartStore } from "@/stores/catalogue-cart-store";

export function QuoteColumnMapper({
  file,
  onSkip,
  onImported,
  children
}: {
  file: File;
  onSkip: () => void;
  onImported: () => void;
  children: ReactNode;
}) {
  const [rows, setRows] = useState<string[][]>([]);
  const [error, setError] = useState("");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [mapping, setMapping] = useState<QuoteColumnMap>({
    partNumber: "",
    description: "",
    quantity: ""
  });
  const imported = useRef(false);
  const addImportedItems = useCatalogueCartStore(
    (state) => state.addImportedItems
  );

  useEffect(() => {
    let active = true;
    readQuoteSheet(file)
      .then((parsed) => {
        if (!active) return;
        setRows(parsed);
        setMapping(guessQuoteColumns(parsed[0]));
      })
      .catch((reason: unknown) => {
        if (active)
          setError(
            reason instanceof Error
              ? reason.message
              : "This sheet could not be read."
          );
      });
    return () => {
      active = false;
    };
  }, [file]);

  const dataRows = hasHeaders ? rows.slice(1) : rows;
  const columnCount = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const headers = Array.from(
    { length: columnCount },
    (_, index) => (hasHeaders ? rows[0]?.[index] : "") || `Column ${index + 1}`
  );
  const selected = Object.values(mapping).filter(Boolean);
  const mapped =
    Boolean(mapping.partNumber && mapping.quantity) &&
    new Set(selected).size === selected.length;
  const preview = mapped ? mapQuoteRows(dataRows, mapping) : [];
  const validRows = preview.filter((row) => row.valid);
  const canImport = validRows.length > 0 && dataRows.length <= maxSheetRows;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">Map your columns</h3>
        {rows.length > 0 && (
          <label className="inline-flex items-center gap-2 text-xs font-medium">
            <input
              type="checkbox"
              checked={hasHeaders}
              className="accent-primary size-4"
              onChange={(event) => {
                const checked = event.target.checked;
                setHasHeaders(checked);
                setMapping(guessQuoteColumns(checked ? rows[0] : []));
              }}
            />
            First row is headers
          </label>
        )}
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error} You can send the file as-is.
        </p>
      )}
      {!error && !rows.length && (
        <p role="status" className="text-muted-foreground text-sm">
          Reading your sheet…
        </p>
      )}
      {rows.length > 0 && (
        <>
          <p className="text-muted-foreground text-xs break-words">
            {file.name} · data rows detected: {dataRows.length}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {quoteColumns.map(({ key, label, required }) => {
              const example =
                mapping[key] === ""
                  ? ""
                  : dataRows.find((row) => row[Number(mapping[key])])?.[
                      Number(mapping[key])
                    ];
              return (
                <label
                  key={key}
                  className="grid min-w-0 content-start gap-1 text-sm font-medium"
                >
                  <span>
                    {label}
                    {required ? " *" : " (optional)"}
                  </span>
                  <select
                    value={mapping[key]}
                    onChange={(event) =>
                      setMapping({ ...mapping, [key]: event.target.value })
                    }
                    className="border-input h-10 w-full min-w-0 rounded-md border bg-white px-2 text-xs"
                  >
                    <option value="">
                      {required ? "Choose a column" : "None"}
                    </option>
                    {headers.map((header, index) => (
                      <option key={index} value={index}>
                        {header}
                        {dataRows[0]?.[index] ? ` — ${dataRows[0][index]}` : ""}
                      </option>
                    ))}
                  </select>
                  {example && (
                    <span className="text-muted-foreground text-xs font-normal break-words">
                      e.g. {example}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
          {preview.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold">Preview</h4>
              <div className="border-border max-h-52 overflow-auto rounded-lg border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary sticky top-0">
                    <tr>
                      <th className="px-2.5 py-2">Part Number</th>
                      <th className="px-2.5 py-2">Description</th>
                      <th className="px-2.5 py-2">Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {preview.slice(0, 12).map((row, index) => (
                      <tr
                        key={index}
                        className={
                          row.valid ? undefined : "bg-red-50 text-red-800"
                        }
                      >
                        <td className="max-w-40 px-2.5 py-2 font-medium break-words">
                          {row.partNumber || "Missing"}
                        </td>
                        <td className="min-w-24 px-2.5 py-2 break-words">
                          {row.description || "—"}
                        </td>
                        <td className="px-2.5 py-2">
                          {row.quantityText || "Missing"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {preview.length > 12 && (
                <p className="text-muted-foreground mt-1 text-xs">
                  Showing the first 12 rows.
                </p>
              )}
            </div>
          )}
          {!mapped && (
            <p className="text-muted-foreground text-xs">
              Choose separate columns for the part number and quantity. Each
              column can be used once.
            </p>
          )}
          {mapped && validRows.length < dataRows.length && (
            <p className="text-xs text-red-800">
              {dataRows.length - validRows.length} rows will be skipped because
              a part number or quantity is missing or invalid, or a cell is too
              long.
            </p>
          )}
          {dataRows.length > maxSheetRows && (
            <p className="text-xs text-red-800">
              For more than 1,000 rows, send the original file as-is.
            </p>
          )}
        </>
      )}
      <p className="text-muted-foreground text-xs">
        We’ll collect your contact details when you submit the cart.
      </p>
      {children}
      <Button
        type="button"
        disabled={!canImport}
        className="w-full justify-between px-4"
        onClick={() => {
          if (!canImport || imported.current) return;
          imported.current = true;
          addImportedItems(validRows);
          onImported();
        }}
      >
        Add {validRows.length} {validRows.length === 1 ? "item" : "items"} to
        cart <ShoppingCart aria-hidden="true" className="size-4" />
      </Button>
      <button
        type="button"
        className="text-primary block text-sm font-semibold underline"
        onClick={onSkip}
      >
        Skip the wizard — send the file as-is
      </button>
    </div>
  );
}
