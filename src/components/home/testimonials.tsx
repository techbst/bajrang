"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import Heading from "@/components/ui/heading";

const testimonials = [
  {
    flagCode: "us",
    role: "Operations Manager",
    country: "USA",
    quote: "I believe that a satisfied customer is the best business strategy for a long relationship and successful business. You have proved it with your hard work and efforts. May God give you success by leaps and bounds.",
    rating: 4,
  },
  {
    flagCode: "eg",
    role: "Purchase Manager",
    country: "Egypt",
    quote: "Your innovative ideas to handle packaging of metal body parts and bumpers are very important. They helped us make damage-free deliveries to our customers and resulted in high sales and satisfaction.",
    rating: 4,
  },
  {
    flagCode: "vn",
    role: "Purchase Manager",
    country: "Vietnam",
    quote: "I am proud to say that I have been a happy Bajrang Auto Parts customer for more than 8 years. Your prompt response, export-worthy packaging, and quick delivery are valuable to our business.",
    rating: 3,
  },
  {
    flagCode: "ae",
    role: "Automotive Parts Distributor",
    country: "UAE",
    quote: "Consistently reliable supplier. Genuine parts, competitive pricing, and always delivered on time. Highly recommended for bulk imports.",
    rating: 4,
  },
  {
    flagCode: "br",
    role: "Wholesale Dealer",
    country: "Brazil",
    quote: "Great experience working with Bajrang Auto Parts. Communication is smooth and orders arrive exactly as promised.",
    rating: 3,
  },
  {
    flagCode: "om",
    role: "Spare Parts Trader",
    country: "Oman",
    quote: "Very competitive pricing and genuine products. Their team is responsive and easy to work with.",
    rating: 4,
  },
];

export function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      const bounds = slider.getBoundingClientRect();
      if (reducedMotion.matches || document.hidden || slider.matches(":hover, :focus-within") ||
          bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      moveSlide(track, 1);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-primary/5 py-20" aria-labelledby="testimonials-title">
      <div className="container">
        <div id="testimonials-title">
          <Heading
            eyebrow="Customer Reviews"
            title="What Our Customers Think"
            subtitle="Excellent 4.91 based on 225,181 reviews"
            align="center"
            className="[&>p]:mb-0"
          />
        </div>

        <div ref={sliderRef} className="relative mt-8 sm:mt-10">
          <ul
            id="testimonials-slides"
            ref={trackRef}
            tabIndex={0}
            aria-label="Customer testimonials"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial) => (
              <li
                key={`${testimonial.country}-${testimonial.role}`}
                className="flex min-h-[260px] shrink-0 basis-full snap-start flex-col rounded-xl border border-border bg-white p-5 sm:basis-[calc((100%-1rem)/2)] sm:p-6 xl:basis-[calc((100%-2rem)/3)]"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={`https://flagcdn.com/w80/${testimonial.flagCode}.png`}
                    alt={`${testimonial.country} flag`}
                    width={64}
                    height={64}
                    unoptimized
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-foreground uppercase sm:text-lg">
                      {testimonial.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">{testimonial.country}</p>
                  </div>
                </div>

                <p className="mt-6 flex-1 text-base text-muted-foreground">
                  {testimonial.quote}
                </p>

                <div className="mt-2 flex gap-1 text-2xl text-[#f59e0b]" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} aria-hidden="true" className={`size-5 ${index < testimonial.rating ? "fill-current" : ""}`} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <button type="button" aria-label="Previous review" aria-controls="testimonials-slides" onClick={() => moveSlide(trackRef.current, -1)} className="absolute top-1/2 -left-3 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-primary shadow-md hover:border-primary focus-visible:outline-2 focus-visible:outline-primary sm:-left-4 sm:size-10">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button type="button" aria-label="Next review" aria-controls="testimonials-slides" onClick={() => moveSlide(trackRef.current, 1)} className="absolute top-1/2 -right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-primary shadow-md hover:border-primary focus-visible:outline-2 focus-visible:outline-primary sm:-right-4 sm:size-10">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function moveSlide(track: HTMLUListElement | null, direction: -1 | 1) {
  const card = track?.firstElementChild;
  if (!track || !card) return;

  const end = track.scrollWidth - track.clientWidth;
  const step = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
  let left = track.scrollLeft + direction * step;
  if (direction === 1 && track.scrollLeft >= end - 1) left = 0;
  if (direction === -1 && track.scrollLeft <= 1) left = end;

  track.scrollTo({
    left,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
  });
}
