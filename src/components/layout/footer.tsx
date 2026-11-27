import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/common/container";
import { BrandLogo } from "@/components/common/brand-logo";
import { siteConfig } from "@/config/site";
import { SocialIcons } from "@/components/common/socialmedia";
import { CountryMarquee } from "@/components/home/country-marquee";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Who We Are", href: "/about/who-we-are" },
  { label: "Our Recognitions", href: "/about/recognitions" },
  { label: "Our Operations", href: "/about/hard-workship" },
  { label: "Contact Us", href: "/contact" },
  { label: "Car Spare Parts", href: "/catalogue?category=car" },
  { label: "Motorcycle Spare Parts", href: "/catalogue?category=motorcycle" },
  { label: "Truck & HCV Parts", href: "/catalogue?category=truck" },
];

const policyLinks = [
  { label: "Return Policy", href: "/return-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Terms Of Use", href: "/terms-of-use" },
  { label: "Buyers Policy", href: "/buyers-policy" },
  { label: "Sellers Policy", href: "/sellers-policy" },
];

const trustPoints = [
  {
    title: "Genuine & Trusted Products",
    description: "Authentic and certified spare parts to ensure reliability.",
  },
  {
    title: "Global Supply Network",
    description: "Trusted by businesses across the USA, Europe, Asia, and the Middle East.",
  },
  {
    title: "Trusted by B2B Clients",
    description: "Long-term partnerships built on trust, transparency, and consistency.",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0066a8] text-white">
      <section className="bg-[#171717]" aria-label="Why customers trust Bajrang Auto Part">
        <div className="container grid sm:grid-cols-3">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="flex gap-4 border-b border-white/25 last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 py-5 sm:last:border-r-0 lg:gap-5 lg:px-4"
            >
              <BadgeCheck aria-hidden="true" className="mt-0.5 size-9 shrink-0 fill-white text-[#171717] sm:size-12" strokeWidth={2.5} />
              <div>
                <h2 className="!text-md leading-tight font-bold text-white uppercase ">
                  {point.title}
                </h2>
                <p className="mt-2 max-w-md text-sm  text-white/90 sm:text-sm ">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Container className="grid items-start gap-x-8 gap-y-9 py-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,0.85fr)_minmax(0,0.85fr)] lg:gap-x-10 lg:py-14">
        <div className="min-w-0 lg:mt-[-25px]">
          <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block max-w-full">
            <BrandLogo inverse />
          </Link>
          <p className="mt-4 max-w-sm text-base text-white/90">
            Bajrang Auto Part supplies genuine and aftermarket automotive parts from India to wholesalers and distributors in over 50 countries.
          </p>
          <div className="mt-5 flex gap-5 text-base sm:text-lg">
            <MapPin aria-hidden="true" className="mt-1 size-6 shrink-0" />
            <p>Khasra No. 579, 585, 588, 595, 600, 607, Near DJB Office, Kadipur Village, Delhi-110036, India</p>
          </div>
          <SocialIcons
            wrapperClassName="mt-5 flex-wrap gap-2"
            itemClassName="size-9 border border-white/80 transition hover:bg-white hover:text-[#0066a8]"
            iconClassName="size-3.5"
          />
        </div>

        <div className="min-w-0">
          <h3 className="!text-xl font-bold ">Need Help? Contact Us</h3>
          <div className="mt-5 space-y-5 text-base">
            <div className="flex gap-4">
              <Phone aria-hidden="true" className="mt-1 size-6 shrink-0" />
              <p className="font-light">Call Us Between 10 AM - 7 PM<br /><a className="mt-2 inline-block !text-xl font-bold " href="tel:+919718346347">+91-9718346347</a></p>
            </div>
            <a href="https://wa.me/919810772076" className="group flex w-fit items-start gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <Image src="/img/whatsapp.svg" alt="" width={36} height={36} className="size-9 shrink-0" />
              <span>
                <span className="block font-bold group-hover:underline">Chat with us on WhatsApp</span>
                <span className="mt-1 block font-light">9810772076</span>
              </span>
            </a>
            <div className="flex gap-4">
              <Mail aria-hidden="true" className="mt-1 size-6 shrink-0" />
              <p className="font-light"><span className="font-bold">Email</span><br /><a className="mt-1 inline-block break-all" href="mailto:exports@bajrangautoparts.in">exports@bajrangautoparts.in</a></p>
            </div>
          </div>
        </div>

        <FooterLinks title="Quick Links" links={quickLinks} />
        <FooterLinks title="Policy" links={policyLinks} />
      </Container>

      <CountryMarquee variant="footer" />

      <div className="pb-5">
        <div className="border-t border-white/50 pt-5 font-semibold text-center text-md ">
          Copyright {new Date().getFullYear()} © | All Rights Reserved | Bajrang Auto Part
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <nav aria-label={title}>
      <h3 className="!text-xl font-bold ">{title}</h3>
      <ul className="mt-5 space-y-3 text-base">
        {links.map((link) => (
          <li key={link.label}>
            <Link className="transition font-light hover:text-white/75" href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
