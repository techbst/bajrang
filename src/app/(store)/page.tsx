import { About } from "@/components/home/about";
import Category from "@/components/home/category";
import { Hero } from "@/components/home/hero";
import ShopByBrand from "@/components/home/shop-by-brand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Category />
      <ShopByBrand />
    </>
  );
}
