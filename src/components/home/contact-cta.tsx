import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section
      className="bg-white pb-16 sm:pb-20"
      aria-labelledby="contact-cta-title"
    >
      <div className="container">
        <div className="grid items-center justify-items-center gap-6 rounded-2xl bg-[linear-gradient(180deg,#0066A8_0%,#004877_100%)] p-5 text-center text-white shadow-[0_18px_45px_rgba(4,62,103,0.2)] sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:justify-items-start lg:gap-12 lg:text-left">
          <div>
            <h2
              id="contact-cta-title"
              className="text-xl leading-tight font-semibold text-balance uppercase sm:text-2xl"
            >
              Need Help Finding the Right Product?
            </h2>
            <p className="mt-3 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
              Our Parts Experts Can Help. Call for immediate assistance.
            </p>
          </div>

          <Button
            asChild
            variant="light"
            className="max-w-full gap-3 px-4 sm:gap-4 sm:px-6"
          >
            <Link href="/contact">
              Send Requirement
              <ArrowRight
                aria-hidden="true"
                className="size-5 shrink-0 sm:size-6"
              />
            </Link>
          </Button>

          <a
            href="tel:+919718346347"
            className="text-center lg:min-w-56 lg:text-right"
          >
            <span className="block text-2xl font-semibold uppercase">
              +91 971-8346-347
            </span>
            <span className="mt-2 block text-sm leading-6 text-white/90 sm:text-base">
              Call us between 10 AM – 7 PM
              <span className="block text-xs sm:text-sm">GMT (+05:30)</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
