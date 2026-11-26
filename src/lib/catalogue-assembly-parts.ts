import heroAssemblyParts from "@/data/catalogue/hero-assembly-parts.json";
import sampleParts from "@/data/catalogue/sample-parts.json";

export type AssemblyPart = {
  ref: number;
  partNumber: string;
  name: string;
  quantity: number;
  productType: string;
};

export type AssemblyPartsQuery = {
  brand: { slug: string; name: string };
  vehicle: { slug: string; name: string };
  assembly: { code: string; name: string };
};

export type AssemblyPartsResult = {
  parts: AssemblyPart[];
  source: "catalogue" | "demo";
};

const swiftCamshaftDemoParts: AssemblyPart[] = [
  { ref: 1, partNumber: "DEMO-SW-E3-001", name: "Intake camshaft", quantity: 1, productType: "OEM" },
  { ref: 2, partNumber: "DEMO-SW-E3-002", name: "Exhaust camshaft", quantity: 1, productType: "OEM" },
  { ref: 3, partNumber: "DEMO-SW-E3-003", name: "Intake valve", quantity: 8, productType: "OEM" },
  { ref: 4, partNumber: "DEMO-SW-E3-004", name: "Exhaust valve", quantity: 8, productType: "Aftermarket" },
  { ref: 5, partNumber: "DEMO-SW-E3-005", name: "Valve stem seal", quantity: 16, productType: "Aftermarket" }
];

const sampleCategories: Record<string, string> = {
  "CAR-FLT": "Filters",
  "E-6": "Clutch",
  "E-6A": "Clutch",
  "E-6B": "Clutch",
  "K-05": "Brakes"
};

const demoPartNames: Record<string, readonly string[]> = {
  "E-3": ["Intake camshaft", "Exhaust camshaft", "Intake valve", "Exhaust valve", "Valve stem seal"],
  "E-4": ["Timing chain tensioner", "Timing chain guide", "Tensioner gasket", "Mounting bolt set"],
  "E-6": ["Clutch disc", "Pressure plate", "Release bearing", "Clutch mounting hardware"],
  "CAR-FLT": ["Engine oil filter", "Oil filter housing", "Housing seal", "Drain plug washer"],
  "CAR-BRK": ["Brake disc", "Brake pad set", "Caliper guide pin", "Caliper mounting bolt"],
  "CAR-SUS": ["Outer tie rod end", "Control arm bushing", "Stabilizer link", "Ball joint"],
  "HCV-CLT": ["Heavy-duty clutch disc", "Clutch pressure plate", "Release bearing", "Pilot bearing", "Clutch fork"],
  "HCV-BRK": ["Air brake chamber", "Slack adjuster", "Air hose coupling", "Brake lining set"],
  "HCV-AXL": ["Differential bearing", "Axle shaft seal", "Pinion flange", "Differential cover gasket"],
  "HCV-FLT": ["Diesel fuel filter element", "Fuel filter housing", "Water separator seal", "Drain valve"],
  "HCV-HYD": ["Hydraulic pump seal kit", "Hydraulic filter element", "Return hose", "Control valve O-ring kit"]
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Route loaders share this query and response shape so an API can replace the local source.
export async function loadAssemblyParts({ brand, vehicle, assembly }: AssemblyPartsQuery): Promise<AssemblyPartsResult> {
  if (brand.slug === "hero" && assembly.code === "E-4") {
    return { parts: heroAssemblyParts.parts, source: "catalogue" };
  }

  const vehicleKey = normalize(vehicle.name);
  if (brand.slug === "denso" && vehicleKey === "swift2021" && assembly.code === "E-3") {
    return { parts: swiftCamshaftDemoParts, source: "demo" };
  }

  const listedParts = sampleParts
    .filter((part) => part.brand === brand.name && part.category === sampleCategories[assembly.code] &&
      part.vehicle.split(",").some((model) => vehicleKey.startsWith(normalize(model))))
    .map((part, index) => ({ ref: index + 1, partNumber: part.partNumber, name: part.name, quantity: 1, productType: part.productType }));

  if (listedParts.length > 0) return { parts: listedParts, source: "catalogue" };

  const templateCode = assembly.code.replace(/^E-6[AB]$/, "E-6");
  const names = demoPartNames[templateCode] ?? [
    `${assembly.name} component`,
    `${assembly.name} service kit`,
    `${assembly.name} mounting hardware`
  ];
  const prefix = `DEMO-${brand.slug}-${vehicle.slug}-${assembly.code}`.toUpperCase();
  return {
    source: "demo",
    parts: names.map((name, index) => ({
      ref: index + 1,
      partNumber: `${prefix}-${String(index + 1).padStart(3, "0")}`,
      name,
      quantity: 1,
      productType: index === 0 ? "OEM" : "Aftermarket"
    }))
  };
}
