export type BrandItem = {
  name: string;
  slug: string;
  short: string;
};

export const aboutLinks = [
  { label: "Who We Are", href: "/about/who-we-are" },
  { label: "Our Recognitions", href: "/about/recognitions" },
  { label: "Our Hard Workship", href: "/about/hard-workship" }
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
    ["Bajaj", "bajaj", "/img/brands/bajaj.svg"],
    ["Hero", "hero", "/img/brands/hero.svg"],
    ["Tvs", "tvs", "/img/brands/tvs.svg"],
    ["Honda", "honda", "/img/brands/honda.svg"],
    ["Suzuki", "suzuki", "/img/brands/suzuki.svg"],
    ["Yahama", "yahama", "/img/brands/yahama.svg"],
    ["Royal Enfield", "royal-enfield", "/img/brands/royal-enfield.svg"],
    ["Piaggio", "piaggio", "/img/brands/piaggio.svg"]
  ].map(([name, slug, short]) => ({ name, slug, short })),
  tractor: [
    ["Mahindra", "mahindra", "/img/brands/mahindra.svg"],
    ["Ashok Leyland", "ashok-leyland", "/img/brands/ashok-leyland.svg"],
    ["Force", "force", "/img/brands/force.svg"],
    ["SML ISUZU", "sml-isuzu", "/img/brands/sml-isuzu.svg"],
    ["New Holland", "new-holland", "/img/brands/new-holland.svg"],
    ["Tafe", "tafe", "/img/brands/tafe.svg"],
    ["Farmtrac", "farmtrac", "/img/brands/farmtrac.svg"],
    ["Eicher", "eicher", "/img/brands/eicher.svg"]
  ].map(([name, slug, short]) => ({ name, slug, short }))
};

export const megaMenuConfig = [
  {
    key: "car",
    label: "Car Spare Parts",
    href: "/car-spare-parts",
    description: "Genuine parts for passenger and commercial vehicles."
  },
  {
    key: "motorcycle",
    label: "Motorcycle Spare Parts",
    href: "/motorcycle-spare-parts",
    description: "Reliable components for every ride."
  },
  {
    key: "tractor",
    label: "Tractor & HCV Parts",
    href: "/tractor-hcv-parts",
    description: "Hard-working parts for demanding applications."
  }
] as const;
