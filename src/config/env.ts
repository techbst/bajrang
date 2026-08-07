import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000")
});

const serverEnvSchema = clientEnvSchema.extend({
  SERVER_API_URL: z.string().url().optional().or(z.literal("")),
  API_SECRET: z.string().optional()
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
});

export const serverEnv = serverEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  SERVER_API_URL: process.env.SERVER_API_URL,
  API_SECRET: process.env.API_SECRET
});
