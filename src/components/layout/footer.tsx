import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/common/container";
import { SocialIcons } from "@/components/common/socialmedia";

const quickLinks = [
  { label: "Who We Are", href: "/about/who-we-are" },
  { label: "Our Recognitions", href: "/about/recognitions" },
  { label: "Our Hard Workship", href: "/about/hard-workship" },
  { label: "Car Spare Parts", href: "/category/car-spare-parts" },
  { label: "Motorcycle Spare Parts", href: "/category/motorcycle-spare-parts" },
  { label: "Tractor & HCV Parts", href: "/category/tractor-hcv-parts" },
];

const policyLinks = [
  { label: "Return Policy", href: "/return-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Terms Of Use", href: "/terms-of-use" },
  { label: "Buyers Policy", href: "/buyers-policy" },
  { label: "Sellers Policy", href: "/sellers-policy" },
];

export function Footer() {
  return (
    <footer className="bg-[#0066a8] text-white">
      <Container className="grid gap-x-10 gap-y-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1.25fr_0.9fr_0.9fr] lg:gap-x-12 lg:py-16">
        <div>
          <Link href="/" aria-label="Bajrang Auto Parts home" className="inline-block">
            <Image
              src="/img/footer-logo.webp"
              alt="Bajrang Auto Parts — International Leader in Quality Auto Parts"
              width={560}
              height={160}
              className="h-auto w-[280px] sm:w-[340px]"
            />
          </Link>
          <div className="mt-8 flex gap-5 text-base leading-8 sm:text-lg">
            <MapPin aria-hidden="true" className="mt-1 size-6 shrink-0" />
            <p>Khasra No. 579, 585, 588, 595, 600, 607, Near DJB Office, Kadipur Village, Delhi-110036, India</p>
          </div>
          <SocialIcons
            wrapperClassName="mt-8 gap-3"
            itemClassName="size-12 border border-white/80 transition hover:bg-white hover:text-[#0066a8]"
            iconClassName="size-5"
          />
        </div>

        <div>
          <h3 className="!text-xl font-bold ">Need Help? Contact Us</h3>
          <div className="mt-8 space-y-7 text-base sm:text-lg">
            <div className="flex gap-4">
              <Phone aria-hidden="true" className="mt-1 size-6 shrink-0" />
              <p className="font-light">Call Us Between 10 AM - 7 PM<br /><a className="mt-2 inline-block !text-xl font-bold " href="tel:+919718346347">+91-9718346347</a></p>
            </div>
            <div className="flex gap-4">
              <MessageCircle aria-hidden="true" className="mt-1 size-6 shrink-0" />
              <p className="font-light"><a className="font-bold" href="https://wa.me/919810772076">Chat with us on WhatsApp</a><br /><a className="mt-2 inline-block" href="https://wa.me/919810772076">981-0772-076</a></p>
            </div>
            <div className="flex gap-4">
              <Mail aria-hidden="true" className="mt-1 size-6 shrink-0" />
              <p className="font-light"><span className="font-bold">Email Id</span><br /><a className="mt-2 inline-block break-all" href="mailto:Exports@Bajrangautoparts.In">Exports@Bajrangautoparts.In</a></p>
            </div>
          </div>
        </div>

        <FooterLinks title="Quick Links" links={quickLinks} />
        <FooterLinks title="Policy" links={policyLinks} />
      </Container>

      <div className="mx-auto max-w-[1920px] px-6 pb-7 sm:px-6 lg:px-10">
        <div className="border-t border-white/50 pt-5 text-center text-sm sm:text-lg">
          Copyright {new Date().getFullYear()} © | All Rights Reserved | Bajrang Auto Parts
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <nav aria-label={title}>
      <h3 className="!text-xl font-bold ">{title}</h3>
      <ul className="mt-8 space-y-5 text-base sm:text-lg">
        {links.map((link) => (
          <li key={link.label}>
            <Link className="transition font-light hover:text-white/75" href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
