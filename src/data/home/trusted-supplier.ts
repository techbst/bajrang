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
  imageAlt: "Bajrang Auto Part team member preparing an export order",
  title: "Your Trusted Global Automotive Parts Supplier",
  description: "Delivering genuine automotive parts worldwide with speed and reliability.",
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
      description: "Delivering automotive parts across multiple continents with efficient logistics.",
    },
    {
      icon: "parts",
      title: "10,000+ Parts Supplied",
      description: "A wide inventory of OEM and aftermarket parts ready for bulk and custom orders.",
    },
  ],
};
