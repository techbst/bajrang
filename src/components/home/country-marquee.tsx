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

function FlagTrack({ reverse = false, duplicate = false }: { reverse?: boolean; duplicate?: boolean }) {
  return (
    <div className={`country-marquee-track flex w-max items-center ${reverse ? "country-marquee-track-reverse" : ""}`} aria-hidden={duplicate}>
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex items-center gap-8 px-4" aria-hidden={duplicate || copy === 1}>
          {countries.map((country) => (
            <li key={`${copy}-${country.name}`} className="flex w-28 shrink-0 flex-col items-center gap-3 text-center sm:w-36">
              <Image
                src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
                alt={duplicate ? "" : `${country.name} flag`}
                width={96}
                height={64}
                className="h-12 w-20 object-contain sm:h-14 sm:w-24"
                unoptimized
              />
              <span className="text-base text-[#171717] sm:text-lg">{country.name}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function CountryMarquee() {
  return (
    <section className="overflow-hidden py-20" aria-label="Countries we serve">
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
