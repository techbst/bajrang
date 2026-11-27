import Image from "next/image";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fieldClassName =
  "h-11 rounded-md border-[#dbe3ec] bg-white text-sm text-[#172033] placeholder:text-[#64748b] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring";

export function QuoteRequest() {
  return (
    <section id="upload" className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="quote-request-title">
      <div className="container grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="relative z-10 w-full min-w-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-[#f1f5f9] sm:aspect-[16/10] lg:aspect-[690/475] lg:max-w-[690px]">
            <Image
              src="/img/home/form_sbu.webp"
              alt="Bajrang Auto Part support team helping customers with parts enquiries"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[center_24%]"
            />
          </div>

          <div className="mt-7  sm:mt-8">
            <p className="text-base text-muted-foreground sm:text-lg">
              We help importers and distributors source genuine OEM and aftermarket automotive parts with ease, accuracy, and competitive pricing.
            </p>

            <div className="mt-6 grid gap-3 sm:gap-4 xl:grid-cols-2">
              <a href="mailto:info@bajrangautoparts.com" className="group flex min-w-0 items-center gap-3 text-sm sm:text-base border border-[#dbe3ec] rounded-md p-4 hover:bg-[#f1f5f9] transition-colors">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#edf5fd] text-primary transition-colors bg-primary text-white">
                  <Mail aria-hidden="true" className="size-5 " />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-muted-foreground uppercase">General Enquiries</span>
                  <span className="mt-1 block break-all font-semibold text-[#172033]">info@bajrangautoparts.com</span>
                </span>
              </a>
              <a href="tel:+919718346347" className="group flex min-w-0 items-center gap-3 text-sm sm:text-base border border-[#dbe3ec] rounded-md p-4 hover:bg-[#f1f5f9] transition-colors">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#edf5fd] text-primary transition-colors bg-primary text-white">
                  <Phone aria-hidden="true" className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-muted-foreground uppercase">Customer Sales Enquiries</span>
                  <span className="mt-1 block font-semibold text-[#172033]">+91 971-8346-347</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative isolate w-full min-w-0 lg:z-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-[90px] z-0 hidden h-[305px] w-full max-w-full bg-contain bg-left-top bg-no-repeat opacity-[0.12] brightness-0 lg:block"
            style={{ backgroundImage: "url('/img/home/h2_map-1.svg')" }}
          />

          <div className="relative z-10">
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Sourcing genuine automotive parts shouldn’t be complicated. We provide a complete export solution—from product selection to global delivery—ensuring quality, transparency, and timely shipments for your business.
            </p>

            <form
              action="mailto:Exports@Bajrangautoparts.In"
              method="post"
              encType="text/plain"
              className="mt-6 block w-full min-w-0 rounded-xl border border-border bg-white p-4 shadow-[0_12px_32px_rgba(16,36,74,0.08)] sm:mt-8 sm:p-6 lg:relative lg:z-20 lg:mt-16 lg:p-7"
            >
              <h2 id="quote-request-title" className="text-[clamp(1.5rem,4vw,1.875rem)] font-bold text-foreground uppercase">
                Request a Quote
              </h2>

              <div className="mt-6 grid min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <Input className={fieldClassName} name="name" placeholder="Your Name" aria-label="Your name" autoComplete="name" required />
                <Input className={fieldClassName} name="email" type="email" placeholder="Email Address" aria-label="Email address" autoComplete="email" required />
                <Input className={fieldClassName} name="phone" type="tel" placeholder="Phone" aria-label="Phone number" autoComplete="tel" required />
                <div className="relative min-w-0">
                  <select name="category" aria-label="Product category" defaultValue="" required className={`${fieldClassName} w-full appearance-none border px-3 pr-10 text-muted-foreground [&:valid]:text-[#172033]`}>
                    <option value="" disabled>Product Category</option>
                    <option>Car Spare Parts</option>
                    <option>Motorcycle Spare Parts</option>
                    <option>Tractor &amp; HCV Parts</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="relative min-w-0">
                  <select name="brandType" aria-label="Brand type" defaultValue="" required className={`${fieldClassName} w-full appearance-none border px-3 pr-10 text-muted-foreground [&:valid]:text-[#172033]`}>
                    <option value="" disabled>Brand (OEM / Aftermarket)</option>
                    <option>OEM</option>
                    <option>Aftermarket</option>
                    <option>Either</option>
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <Input className={fieldClassName} name="partDetails" placeholder="Part Details / Inquiry" aria-label="Part details or inquiry" />
                <textarea
                  name="message"
                  placeholder="Type Your Message"
                  aria-label="Your message"
                  rows={5}
                  className="min-h-32 min-w-0 resize-y rounded-md border border-[#dbe3ec] bg-white px-3 py-3 text-sm text-[#172033] outline-none placeholder:text-[#64748b] focus-visible:ring-2 focus-visible:ring-ring md:col-span-2"
                />
              </div>

              <Button type="submit" className="mt-6 w-full gap-3 sm:w-auto">
                Send your Quote
                <span aria-hidden="true" className="text-lg">→</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
