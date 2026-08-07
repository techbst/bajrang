import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/ecommerce";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];

  return (
    <article className="overflow-hidden rounded-lg border bg-card">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-muted">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : null}
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="secondary">{product.status}</Badge>
            <h3 className="mt-2 line-clamp-2 font-medium">{product.name}</h3>
          </div>
          <Button variant="ghost" size="icon" aria-label="Save to wishlist">
            <Heart className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <p className="font-semibold">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: product.price.currency
          }).format(product.price.amount)}
        </p>
        <Button className="w-full" type="button">
          Add to cart
        </Button>
      </div>
    </article>
  );
}
