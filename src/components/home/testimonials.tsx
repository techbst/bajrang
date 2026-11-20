import Image from "next/image";
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
    role: "Auto Parts Distributor",
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
  return (
    <section className="bg-[#f5f9fd] py-16 sm:py-20" aria-labelledby="testimonials-title">
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

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {testimonials.map((testimonial) => (
            <li
              key={`${testimonial.country}-${testimonial.role}`}
              className="flex min-h-[290px] flex-col rounded-xl border border-border bg-white p-5 shadow-[0_8px_24px_rgba(16,36,74,0.045)] sm:p-6"
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
                  <h3 className="text-base leading-snug font-bold text-[#171717] uppercase sm:text-lg">
                    {testimonial.role}
                  </h3>
                  <p className="mt-1 text-sm text-[#526176] sm:text-base">{testimonial.country}</p>
                </div>
              </div>

              <p className="mt-6 flex-1 text-base leading-7 text-[#4b4b4b]">
                {testimonial.quote}
              </p>

              <div className="mt-2 flex gap-1 text-2xl leading-none text-[#f59e0b]" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} aria-hidden="true">{index < testimonial.rating ? "★" : "☆"}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
