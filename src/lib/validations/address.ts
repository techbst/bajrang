import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().trim().min(2),
  phone: z.string().trim().min(8),
  line1: z.string().trim().min(3),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2),
  state: z.string().trim().min(2),
  postalCode: z.string().trim().min(4),
  country: z.string().trim().min(2)
});
