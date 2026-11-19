export type TrustedSupplierData = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  stats: ReadonlyArray<{
    icon: "export" | "countries" | "parts";
    title: string;
    description: string;
  }>;
};

export const trustedSupplierData: TrustedSupplierData = {
  image: "/img/home/trusted_baj.webp",
  imageAlt: "Bajrang Auto Parts team member preparing an export order",
  title: "Your Trusted Global Auto Parts Supplier",
  description: "Delivering genuine auto parts worldwide with speed and reliability.",
  ctaLabel: "Send Your Requirement",
  ctaHref: "/contact",
  stats: [
    {
      icon: "export",
      title: "17+ Years in Global Exports",
      description: "Supplying genuine parts worldwide with trusted reliability.",
    },
    {
      icon: "countries",
      title: "50+ Countries Served",
      description: "Delivering auto parts across multiple continents with efficient logistics.",
    },
    {
      icon: "parts",
      title: "10,000+ Parts Supplied",
      description: "A wide inventory of OEM and aftermarket parts ready for bulk and custom orders.",
    },
  ],
};
