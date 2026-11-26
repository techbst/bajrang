"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import type { CatalogueCartItem } from "@/stores/catalogue-cart-store";
import { catalogueCartCsv } from "@/lib/catalogue-cart-csv";

const textField = z.string().max(500);
const itemsSchema = z
  .array(
    z.object({
      partNumber: textField,
      description: textField,
      productType: textField.optional(),
      brand: textField,
      vehicle: textField,
      assemblyCode: textField,
      assemblyName: textField,
      quantity: z.number().int().positive()
    })
  )
  .min(1)
  .max(1000);

export async function exportCatalogueCart(items: CatalogueCartItem[]) {
  if (!(await cookies()).get("session")?.value) {
    return { error: "Sign in to export your parts list." };
  }

  const parsed = itemsSchema.safeParse(items);
  if (!parsed.success)
    return { error: "The parts list could not be exported." };

  return { csv: catalogueCartCsv(parsed.data) };
}
