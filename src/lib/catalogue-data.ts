import heroCatalogue from "@/data/catalogue/hero.json";
import sampleModels from "@/data/catalogue/sample-models.json";
import brandVehicles from "@/data/catalogue/brand-vehicles.json";
import { shopByBrandData } from "@/data/home/shop-by-brand";
import { aftermarketPartnersData } from "@/data/home/aftermarket-partners";
import { aftermarketSlug } from "@/lib/catalogue-slugs";

export type CatalogueBrand = { name: string; parts: number; vehicleType: string; logo: string; slug: string };
type VehicleModel = { name: string; type: string; variantCount: number; variants: string[] };

export type BrandCatalogueData = {
  vehicleGroup: string;
  modelCount: number;
  variantCount: number;
  fastMovingPartCount: number;
  partGroupCount: number;
  description: string;
  models: VehicleModel[];
};

export function getCatalogueBrand(slug: string): CatalogueBrand | undefined {
  const listedBrand = shopByBrandData.brands.find((item) => item.href === `/brands/${slug}`);
  if (listedBrand) return { ...listedBrand, slug };

  const partner = aftermarketPartnersData.partners.find((item) => aftermarketSlug(item.name, item.vehicleType) === slug);
  if (!partner) return undefined;

  const vehicleType = partner.vehicleType === "cars" ? "four-wheeler" : partner.vehicleType === "motorcycles" ? "two-wheeler" : "hvc-wheeler";
  return { name: partner.name, parts: partner.parts, vehicleType, logo: partner.logo, slug };
}

export function getBrandCatalogue(slug: string, brand: CatalogueBrand): BrandCatalogueData {
  if (slug === "hero") return heroCatalogue;

  const groupKey = brand.vehicleType as keyof typeof sampleModels;
  const group = sampleModels[groupKey];
  const names = brandVehicles[slug as keyof typeof brandVehicles] ?? group.models.map((model) => model.name);
  const tractorBrands = ["new-holland", "tafe", "farmtrac"];
  const models = names.map((name, index): VehicleModel => {
    const isTractor = tractorBrands.includes(slug) || /tractor|farm/i.test(name);
    const type = brand.vehicleType === "four-wheeler"
      ? "Cars"
      : brand.vehicleType === "two-wheeler"
        ? ["piaggio", "suzuki"].includes(slug) && /vespa|aprilia|access|burgman|avenis/i.test(name) ? "Scooters" : "Motorcycles"
        : isTractor ? "Tractors" : "Commercial Vehicles";
    const variantCount = 2 + (index % 4);
    return {
      name,
      type,
      variantCount,
      variants: [`${name} (${2021 + (index % 3)})`, `${name} ${index % 2 ? "Deluxe" : "Standard"} (${2023 + (index % 2)})`]
    };
  });

  return {
    vehicleGroup: group.vehicleGroup,
    modelCount: models.length,
    variantCount: models.reduce((total, model) => total + model.variantCount, 0),
    fastMovingPartCount: brand.parts,
    partGroupCount: Math.max(12, Math.round(brand.parts / 5)),
    description: `Sample ${brand.name} catalogue organized by vehicle model. Browse common service parts and request availability for your requirements.`,
    models
  };
}

export function titleFromCatalogueSlug(value: string) {
  return value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
