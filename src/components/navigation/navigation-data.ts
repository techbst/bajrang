export type BrandItem = {
  name: string;
  slug: string;
  short: string;
};

export const aboutLinks = [
  { label: "Who We Are", href: "/about/who-we-are" },
  { label: "Our Recognitions", href: "/about/recognitions" },
  { label: "Our Operations", href: "/about/hard-workship" }
];

export const brandGroups: Record<string, BrandItem[]> = {
  car: [
    ["Hyundai", "hyundai", "/img/brands/hyundai.svg"],
    ["Maruti Suzuki", "maruti-suzuki", "/img/brands/maruti-suzuki.svg"],
    ["Ford", "ford", "/img/brands/ford.svg"],
    ["Nissan", "nissan", "/img/brands/nissan.svg"],
    ["Honda", "honda", "/img/brands/honda.svg"],
    ["Chevrolet", "chevrolet", "/img/brands/chevrolet.svg"],
    ["Mahindra", "mahindra", "/img/brands/mahindra.svg"],
    ["Tata", "tata", "/img/brands/tata.svg"],
    ["Volkswagen", "volkswagen", "/img/brands/volkswagen.svg"],
    ["Renault", "renault", "/img/brands/renault.svg"],
    ["Kia", "kia", "/img/brands/kia.svg"],
    ["Toyota", "toyota", "/img/brands/toyota.svg"]
  ].map(([name, slug, short]) => ({ name, slug, short })),
  motorcycle: [
    ["Bajaj", "bajaj", "/img/brands/bike-1.webp"],
    ["Hero", "hero", "/img/brands/bike-2.webp"],
    ["TVS", "tvs", "/img/brands/bike-3.webp"],
    ["Honda", "honda-motorcycle", "/img/brands/bike-4.webp"],
    ["Suzuki", "suzuki", "/img/brands/bike-5.webp"],
    ["Yamaha", "yamaha", "/img/brands/bike-6.webp"],
    ["Royal Enfield", "royal-enfield", "/img/brands/bike-7.webp"],
    ["Piaggio", "piaggio", "/img/brands/bike-8.webp"]
  ].map(([name, slug, short]) => ({ name, slug, short })),
  tractor: [
    ["Tata", "tata-hcv", "/img/brands/tracktor-1.webp"],
    ["Mahindra", "mahindra-hcv", "/img/brands/tracktor-2.webp"],
    ["Ashok Leyland", "ashok-leyland", "/img/brands/tracktor-3.webp"],
    ["Force", "force", "/img/brands/tracktor-4.webp"],
    ["SML ISUZU", "sml-isuzu", "/img/brands/tracktor-5.webp"],
    ["New Holland", "new-holland", "/img/brands/tracktor-6.webp"],
    ["TAFE", "tafe", "/img/brands/tracktor-7.webp"],
    ["Farmtrac", "farmtrac", "/img/brands/tracktor-8.webp"],
    ["Eicher", "eicher", "/img/brands/tracktor-9.webp"]
  ].map(([name, slug, short]) => ({ name, slug, short }))
};

export const megaMenuConfig = [
  {
    key: "car",
    label: "Car Spare Parts",
    href: "/catalogue?category=car",
    description: "Genuine parts for passenger and commercial vehicles."
  },
  {
    key: "motorcycle",
    label: "Motorcycle Spare Parts",
    href: "/catalogue?category=motorcycle",
    description: "Reliable components for every ride."
  },
  {
    key: "tractor",
    label: "Tractor & HCV Parts",
    href: "/catalogue?category=truck",
    description: "Hard-working parts for demanding applications."
  }
] as const;
