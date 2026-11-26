import Image from "next/image";
import { Container } from "@/components/common/container";

const certificates = Array.from({ length: 8 }, (_, index) => ({
  src: `/img/home/cert-${index + 1}.webp`,
  name: `Certification ${index + 1}`
}));

export function Certifications() {
  return (
    <section
      className="bg-white py-20"
      aria-labelledby="certifications-title"
    >
      <Container>
        {/* <h2 id="certifications-title" className="mb-3 text-sm font-semibold text-slate-900">
          Certified &amp; Trusted Worldwide
        </h2> */}
      </Container>
      <div className="country-marquee overflow-x-auto motion-safe:overflow-hidden">
        <div className="country-marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className={`flex min-w-[100vw] gap-3 pr-3 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
            >
              {certificates.map((certificate) => (
                <li
                  key={certificate.src}
                  className="flex h-20 w-36 flex-[1_0_auto] items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 sm:h-24 sm:w-44 xl:w-56"
                >
                  <Image
                    src={certificate.src}
                    alt={copy === 0 ? certificate.name : ""}
                    width={600}
                    height={350}
                    sizes="(min-width: 1920px) 12.5vw, (min-width: 1280px) 224px, (min-width: 640px) 176px, 144px"
                    className="size-full object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
