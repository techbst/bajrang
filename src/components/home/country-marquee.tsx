import Heading from "@/components/ui/heading";
import Image from "next/image";

const countries = [
  { name: "Italy", code: "IT" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Indonesia", code: "ID" },
  { name: "Panama", code: "PA" },
  { name: "Japan", code: "JP" },
  { name: "U.A.E", code: "AE" },
  { name: "Kenya", code: "KE" },
  { name: "Canada", code: "CA" },
  { name: "Chile", code: "CL" },
  { name: "Singapore", code: "SG" },
  { name: "Argentina", code: "AR" },
  { name: "Vietnam", code: "VN" },
  { name: "France", code: "FR" },
  { name: "Bangladesh", code: "BD" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
];

function FlagTrack({ reverse = false, duplicate = false, compact = false }: { reverse?: boolean; duplicate?: boolean; compact?: boolean }) {
  return (
    <div className={`country-marquee-track flex w-max items-center ${reverse ? "country-marquee-track-reverse" : ""} ${compact ? "group-focus-within:[animation-play-state:paused]" : ""}`} aria-hidden={duplicate}>
      {[0, 1].map((copy) => (
        <ul key={copy} className={`flex items-center ${compact ? "min-w-[100vw] gap-1 pr-1" : "gap-8 px-4"} ${compact && copy === 1 ? "motion-reduce:hidden" : ""}`} aria-hidden={duplicate || copy === 1}>
          {countries.map((country) => (
            <li key={country.code} className={`flex shrink-0 flex-col items-center text-center ${compact ? "w-[4.5rem] grow gap-1.5" : "w-28 gap-3 sm:w-36"}`}>
              <span className={`relative block ${compact ? "h-5 w-8 overflow-hidden rounded-sm" : "h-12 w-20 sm:h-14 sm:w-24"}`}>
                <Image
                  src={`https://flagcdn.com/${compact ? "w80" : "w160"}/${country.code.toLowerCase()}.png`}
                  alt=""
                  fill
                  sizes={compact ? "32px" : "(min-width: 640px) 96px, 80px"}
                  className="object-contain"
                  unoptimized
                />
              </span>
              <span className={compact ? "text-xs whitespace-nowrap text-white/90" : "text-base text-foreground sm:text-lg"}>{country.name}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function CountryMarquee({ variant = "section" }: { variant?: "section" | "footer" }) {
  if (variant === "footer") {
    return (
      <section className="border-t border-white/25  py-5" aria-labelledby="footer-global-reach">
        <h2 id="footer-global-reach" className="px-6 text-center text-base font-semibold">
          Trusted Across 36+ Countries Worldwide
        </h2>
        <div tabIndex={0} role="region" aria-label="Countries we serve" className="country-marquee group mt-4 w-full overflow-hidden py-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white motion-reduce:overflow-x-auto">
          <FlagTrack compact />
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-primary/5 py-20" aria-label="Countries we serve">
      <div className="container">
        <Heading
          eyebrow="Global Reach"
          title="Trusted Across<br />36+ Countries Worldwide"
          subtitle="Connecting India to global markets with trusted spare parts solutions."
        />
      </div>
      <div className="country-marquee mt-12 space-y-8 overflow-hidden">
        <FlagTrack />
        <FlagTrack reverse duplicate />
      </div>
    </section>
  );
}
