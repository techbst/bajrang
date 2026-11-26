import heroCatalogue from "@/data/catalogue/hero.json";
import sampleModels from "@/data/catalogue/sample-models.json";
import brandVehicles from "@/data/catalogue/brand-vehicles.json";
import { shopByBrandData } from "@/data/home/shop-by-brand";
import { aftermarketPartnersData } from "@/data/home/aftermarket-partners";
import { aftermarketSlug } from "@/lib/catalogue-slugs";

export type CatalogueBrand = { name: string; parts: number; vehicleType: string; logo: string; slug: string };
export type VehicleModel = {
  name: string;
  type: string;
  variantCount: number;
  variants: string[];
  image?: {
    src: string;
    alt: string;
    credit?: { author: string; sourceUrl: string; license: string; licenseUrl: string };
  } | null;
};

const marutiModelImages: Record<string, NonNullable<VehicleModel["image"]>> = {
  Swift: {
    src: "/img/vehicles/swift.jpg",
    alt: "White Suzuki Swift GLX, front three-quarter view",
    credit: {
      author: "Mr.choppers",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2022_Suzuki_Swift_1.2_GLX_Automatic_in_Pure_White,_front_right.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/"
    }
  },
  Baleno: {
    src: "/img/vehicles/baleno.jpg",
    alt: "Suzuki Baleno hatchback",
    credit: {
      author: "Haysnawri10",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2021_Suzuki_Baleno.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
    }
  }
};

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
      image: slug === "maruti-suzuki" ? marutiModelImages[name] : undefined,
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
