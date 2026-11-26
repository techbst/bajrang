import { siteConfig } from "@/config/site";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span aria-hidden="true" className="inline-flex min-w-0 items-center gap-2 sm:gap-3">
      <span
        className={`shrink-0 bg-left bg-no-repeat bg-[length:auto_100%] ${inverse ? "size-12 bg-[url('/img/footer-logo.webp')]" : "size-9 bg-[url('/img/common/logo.png')] sm:size-11"}`}
      />
      <span className="min-w-0">
        <span className={`block font-bold uppercase ${inverse ? "text-xl text-white sm:text-2xl" : "text-sm whitespace-nowrap text-primary sm:text-xl"}`}>
          {siteConfig.name}
        </span>
        <span className={`block text-xs font-semibold ${inverse ? "text-white/85" : "text-slate-600"}`}>
          {inverse ? "International leader in quality automotive parts" : "Since 2009"}
        </span>
      </span>
    </span>
  );
}
