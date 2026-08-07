export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

export type Money = {
  amount: number;
  currency: CurrencyCode;
};

export type ProductStatus = "draft" | "active" | "archived";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: ProductStatus;
  price: Money;
  compareAtPrice?: Money;
  images: ProductImage[];
  categoryIds: string[];
  brand?: Brand;
  variants: ProductVariant[];
  inventory: Inventory;
  rating?: AggregateRating;
};

export type ProductImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  parentId?: string;
  image?: ProductImage;
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  name: string;
  price: Money;
  attributes: ProductAttribute[];
  inventory: Inventory;
};

export type ProductAttribute = {
  name: string;
  value: string;
};

export type Inventory = {
  sku?: string;
  quantity: number;
  isAvailable: boolean;
};

export type Cart = {
  id: string;
  items: CartItem[];
  subtotal: Money;
  discountTotal?: Money;
  shippingTotal?: Money;
  taxTotal?: Money;
  total: Money;
};

export type CartItem = {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
  image?: ProductImage;
};

export type Coupon = {
  code: string;
  discount: Money;
};

export type Order = {
  id: string;
  number: string;
  customerId: string;
  items: OrderItem[];
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  total: Money;
  shippingAddress: Address;
  billingAddress: Address;
};

export type OrderItem = CartItem;

export type Address = {
  id?: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Customer = {
  id: string;
  email: string;
  name: string;
  phone?: string;
};

export type Payment = {
  provider: "razorpay" | "stripe" | "paypal" | "cod";
  status: "pending" | "authorized" | "captured" | "failed" | "refunded";
};

export type ShippingMethod = {
  id: string;
  name: string;
  price: Money;
  estimatedDays?: string;
};

export type Review = {
  id: string;
  productId: string;
  rating: number;
  title?: string;
  body?: string;
  authorName: string;
};

export type AggregateRating = {
  ratingValue: number;
  reviewCount: number;
};

export type Wishlist = {
  id: string;
  productIds: string[];
};
