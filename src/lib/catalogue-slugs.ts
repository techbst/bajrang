export function slugifyCatalogueName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function aftermarketSlug(name: string, vehicleType: string) {
  const normalizedName = name.toLowerCase();
  if (normalizedName === "honda" && vehicleType === "motorcycles") return "honda-motorcycle";
  if (normalizedName === "tata" && vehicleType === "tractors") return "tata-hcv";
  if (normalizedName === "mahindra" && vehicleType === "tractors") return "mahindra-hcv";
  return slugifyCatalogueName(name);
}
