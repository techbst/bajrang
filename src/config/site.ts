export const siteConfig = {
  name: "Bajrang Commerce",
  description: "A secure, scalable eCommerce foundation built with Next.js.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  links: {
    products: "/products",
    categories: "/category",
    search: "/search",
    cart: "/cart",
    account: "/account"
  }
} as const;
