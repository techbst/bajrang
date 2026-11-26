export const siteConfig = {
  name: "Bajrang Automotive",
  description: "Maruti Suzuki Genuine Spare Parts - Exporters of Maruti Parts, Hyundai Parts, Mahindra Parts, Tata Spares, Suzuki Parts and Ashok Leyland Parts India",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bajrangautoparts.com",
  links: {
    products: "/products",
    categories: "/category",
    search: "/search",
    cart: "/cart",
    account: "/account"
  }
} as const;
