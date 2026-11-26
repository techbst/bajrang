import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { maxQuoteFileBytes, quoteFileError, quoteFileExtension } from "@/lib/quote-upload";

export const runtime = "nodejs";

const maxRequestBytes = maxQuoteFileBytes + 64 * 1024;
const fieldsSchema = z.object({
  contact: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160),
  phone: z.string().trim().max(40).refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }),
  email: z.union([z.literal(""), z.email().max(254)]),
  country: z.string().trim().max(100),
  notes: z.string().trim().max(2000)
});

export async function POST(request: Request) {
  const type = request.headers.get("content-type");
  if (!request.body || !type?.toLowerCase().startsWith("multipart/form-data;")) {
    return Response.json({ error: "Attach your parts list using the quote form." }, { status: 400 });
  }

  let received = 0;
  let tooLarge = false;
  const stream = request.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      received += chunk.byteLength;
      if (received > maxRequestBytes) {
        tooLarge = true;
        controller.error(new Error("Quote request too large"));
      } else {
        controller.enqueue(chunk);
      }
    }
  }));

  let form: FormData;
  try {
    form = await new Response(stream, { headers: { "Content-Type": type } }).formData();
  } catch {
    return Response.json(
      { error: tooLarge ? "Choose a file no larger than 10 MB." : "The upload could not be read. Try again." },
      { status: tooLarge ? 413 : 400 }
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Attach a file to continue." }, { status: 400 });
  const fileError = quoteFileError(file);
  const extension = quoteFileExtension(file.name);
  if (fileError || !extension) return Response.json({ error: fileError ?? "Choose a supported file." }, { status: 400 });

  const details = fieldsSchema.safeParse({
    contact: form.get("contact"),
    company: form.get("company") ?? "",
    phone: form.get("phone"),
    email: form.get("email") ?? "",
    country: form.get("country") ?? "",
    notes: form.get("notes") ?? ""
  });
  if (!details.success) {
    return Response.json({ error: "Check your contact name, phone number, email, and field lengths." }, { status: 400 });
  }

  const id = randomUUID();
  const storage = path.resolve(/*turbopackIgnore: true*/ process.env.QUOTE_UPLOAD_DIR || ".quote-requests");
  let staging: string | undefined;
  try {
    await mkdir(storage, { recursive: true, mode: 0o700 });
    staging = await mkdtemp(path.join(storage, ".pending-"));
    await writeFile(path.join(staging, `parts-list${extension}`), Buffer.from(await file.arrayBuffer()), { mode: 0o600 });
    await writeFile(path.join(staging, "request.json"), JSON.stringify({
      id,
      receivedAt: new Date().toISOString(),
      ...details.data,
      file: { name: path.basename(file.name).slice(0, 255), size: file.size, savedAs: `parts-list${extension}` }
    }, null, 2), { mode: 0o600 });
    await rename(staging, path.join(/*turbopackIgnore: true*/ storage, id));
  } catch {
    if (staging) await rm(staging, { recursive: true, force: true }).catch(() => {});
    return Response.json({ error: "The request could not be saved. Please retry or send the file on WhatsApp." }, { status: 500 });
  }
  return Response.json({ id }, { status: 201 });
}
