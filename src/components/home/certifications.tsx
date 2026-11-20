import Image from "next/image";
import Heading from "@/components/ui/heading";

const certificates = Array.from({ length: 8 }, (_, index) => ({
  src: `/img/home/cert-${index + 1}.webp`,
  name: `Certification ${index + 1}`,
}));

export function Certifications() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="certifications-title">
      <div className="container">
        <div id="certifications-title">
          <Heading
            eyebrow="Quality Standards"
            title="Certified &amp; Trusted Worldwide"
            subtitle="Recognized by leading industry authorities and compliant with global standards to ensure quality."
            align="center"
            className="[&>p]:mb-0"
          />
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-6">
          {certificates.map((certificate) => (
            <li
              key={certificate.src}
              className="group flex aspect-[16/8] items-center justify-center overflow-hidden rounded-xl border border-[#dbe6f1] bg-white p-4 shadow-[0_8px_24px_rgba(16,36,74,0.045)] transition-[box-shadow,border-color] duration-300 hover:border-primary/40 hover:shadow-[0_18px_36px_rgba(7,96,188,0.12)] sm:p-6"
            >
              <Image
                src={certificate.src}
                alt={certificate.name}
                width={600}
                height={350}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.025]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
