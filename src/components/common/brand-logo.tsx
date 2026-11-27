import Image from "next/image";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return inverse ? (
    <Image
      src="/img/footer-logo-white.webp"
      alt=""
      width={560}
      height={160}
      className="h-auto w-[280px] max-w-full sm:w-[340px]"
    />
  ) : (
    <Image
      src="/img/common/logo.png"
      alt=""
      width={1461}
      height={221}
      sizes="(min-width: 1536px) 320px, (min-width: 640px) 288px, 240px"
      className="h-auto w-60 max-w-full sm:w-72 2xl:w-80"
      priority
    />
  );
}
