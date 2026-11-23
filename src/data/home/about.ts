export type CommitmentIcon = "shield" | "package" | "users" | "support";
export type HighlightIcon = "globe" | "calendar" | "UserShield" | "BanknoteArrowDown";

export type AboutData = {
  eyebrow: string;
  title: string;
  description: string;
  visual: {
    image?: string;
    overline: string;
    title: string;
    detail: string;
  };
   highlights: ReadonlyArray<{
    icon: HighlightIcon;
    value: string;
    title: string;
    description: string;
  }>;
  commitment: {
    title: string;
    items: ReadonlyArray<{
      number: string;
      text: string;
      icon: CommitmentIcon;
    }>;
  };
  facts: {
    title: string;
    stats: ReadonlyArray<{
      value: string;
      label: string;
    }>;
  };
};

export const aboutData: AboutData = {
  eyebrow: "About Bajrang Auto Parts",
  title: "<strong>Bajrang Auto Parts</strong> is a trusted Indian exporter of genuine and aftermarket automotive spare parts, serving customers in over 50 countries with competitive wholesale pricing.",
  description:
    "Bajrang Auto Parts is one of the experienced provider and leading exporter of Automotive Spare Parts from India. Our approach is to recognize that each client has their own unique set of requirements to be met. We are constantly identifying opportunities to excel in the quest to satisfy the needs of our clients. Our commitment is to achieve maximum satisfaction of our customers and that's what drives us to work daily, so our products, infrastructure and service platform are always geared to meet all the needs and expectations of our related.",
  visual: {
    image: "/img/home/center-image.webp",
    overline: "Bajrang Auto Parts",
    title: "From India To The World!",
    detail: "Quality sourcing · Export readiness · Reliable service"
  },
   highlights: [
    {
      icon: "UserShield",
      value: "Trusted Supplier",
      title: "Countries",
      description:
        "Serving customers across 50+ countries with genuine and aftermarket automotive spare parts.",
    },
    {
      icon: "BanknoteArrowDown",
      value: "Competitive Pricing",
      title: "Established",
      description:
        "Building long-term customer relationships with reliable sourcing and export services since 2009.",
    },
  ],
  commitment: {
    title: "Our Commitment",
    items: [
      {
        number: "01",
        text: "Always Striving for 100% Satisfaction of our customers",
        icon: "shield"
      },
      {
        number: "02",
        text: "Quick Procurement & Dispatch of your orders",
        icon: "package"
      },
      {
        number: "03",
        text: "Competent Staff to effectively handle your orders",
        icon: "users"
      },
      { number: "04", text: "24x7 Support & Quick response", icon: "support" }
    ]
  },
  facts: {
    title: "Our Facts and Figures",
    stats: [
      { value: "150+", label: "Happy Customers" },
      { value: "11+", label: "Years of Experience" },
      { value: "100%", label: "Cost-Effective Pricing" },
      { value: "50+", label: "Countries Served" }
    ]
  }
};
