import bikeCatalogue from "@/data/catalogue/hero-assemblies.json";
import { slugifyCatalogueName } from "@/lib/catalogue-slugs";

export type AssemblyCategory = "car" | "motorcycle" | "truck";

const carGroups = [
  { name: "Engine", assemblies: [
    { code: "E-4", name: "CAM CHAIN TENSIONER", partCount: 0 },
    { code: "E-3", name: "CAM SHAFT/VALVE", partCount: 0 },
    { code: "E-6", name: "CLUTCH", partCount: 0 },
    { code: "E-6A", name: "CLUTCH", partCount: 0 },
    { code: "CAR-FLT", name: "ENGINE OIL FILTER", partCount: 0 }
  ] },
  { name: "Chassis", assemblies: [
    { code: "CAR-BRK", name: "DISC BRAKES", partCount: 0 },
    { code: "CAR-SUS", name: "STEERING & SUSPENSION", partCount: 0 }
  ] }
];

const truckGroups = [
  { name: "Drivetrain and brakes", assemblies: [
    { code: "HCV-CLT", name: "HEAVY-DUTY CLUTCH", partCount: 0 },
    { code: "HCV-BRK", name: "AIR BRAKE SYSTEM", partCount: 0 },
    { code: "HCV-AXL", name: "AXLE & DIFFERENTIAL", partCount: 0 }
  ] },
  { name: "Engine and hydraulics", assemblies: [
    { code: "HCV-FLT", name: "DIESEL FUEL FILTER", partCount: 0 },
    { code: "HCV-HYD", name: "TRACTOR HYDRAULICS", partCount: 0 }
  ] }
];

export const assemblyGroupsByCategory = {
  car: carGroups,
  motorcycle: bikeCatalogue.groups,
  truck: truckGroups
};

export function assemblyCategoryFromQuery(value: unknown): AssemblyCategory | undefined {
  return value === "car" || value === "motorcycle" || value === "truck" ? value : undefined;
}

export function assemblyCategoryForVehicleType(vehicleType: string): AssemblyCategory {
  if (vehicleType === "four-wheeler") return "car";
  return vehicleType === "two-wheeler" ? "motorcycle" : "truck";
}

export function getCatalogueAssembly(slug: string, category: AssemblyCategory) {
  return assemblyGroupsByCategory[category].flatMap(({ assemblies }) => assemblies)
    .find(({ code }) => slugifyCatalogueName(code) === slug);
}

export function assemblyCatalogueHref(code: string, category: AssemblyCategory) {
  return `/catalogue/assemblies/${slugifyCatalogueName(code)}?category=${category}`;
}
