import { z } from "zod";
import { addressSchema } from "./address";

export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  paymentProvider: z.enum(["razorpay", "stripe", "paypal", "cod"])
});
