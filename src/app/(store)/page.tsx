import { About } from "@/components/home/about";
import Category from "@/components/home/category";
import { Hero } from "@/components/home/hero";
import ShopByBrand from "@/components/home/shop-by-brand";
import { TrustedSupplier } from "@/components/home/trusted-supplier";
import { AftermarketPartners } from "@/components/home/aftermarket-partners";
import { WhyChoose } from "@/components/home/why-choose";
import { CargoBanner } from "@/components/home/cargo-banner";
import { ExportProcess } from "@/components/home/export-process";
import { Operations } from "@/components/home/operations";
import { Certifications } from "@/components/home/certifications";
import { ContactCta } from "@/components/home/contact-cta";
import { Testimonials } from "@/components/home/testimonials";
import { QuoteRequest } from "@/components/home/quote-request";
import { ScrollReveal } from "@/components/home/scroll-reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Certifications />
      <About />
      <Category />
      <ShopByBrand />
      <TrustedSupplier />
      <AftermarketPartners />
      <WhyChoose />
      {/* <CargoBanner /> */}
      {/* <ExportProcess /> */}
      <Operations />
      <ContactCta />
      <Testimonials />
      {/* <QuoteRequest /> */}
    </>
  );
}
