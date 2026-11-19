import { About } from "@/components/home/about";
import Category from "@/components/home/category";
import { Hero } from "@/components/home/hero";
import ShopByBrand from "@/components/home/shop-by-brand";
import { TrustedSupplier } from "@/components/home/trusted-supplier";
import { AftermarketPartners } from "@/components/home/aftermarket-partners";
import { WhyChoose } from "@/components/home/why-choose";
import { CountryMarquee } from "@/components/home/country-marquee";
import { CargoBanner } from "@/components/home/cargo-banner";
import { ExportProcess } from "@/components/home/export-process";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Category />
      <ShopByBrand />
      <TrustedSupplier />
      <AftermarketPartners />
      <WhyChoose />
      <CountryMarquee />
      <CargoBanner />
      <ExportProcess />
    </>
  );
}
