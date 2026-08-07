import { z } from "zod";

export const cartMutationSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional(),
  quantity: z.number().int().positive()
});
