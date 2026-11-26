import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/common/section-eyebrow";

type CompanyCtaProps = {
  title: string;
  description?: string;
  label: string;
  href?: string;
  eyebrow?: string;
  className?: string;
};

export function CompanyCta({
  title,
  description,
  label,
  href = "/contact",
  eyebrow = "Bajrang Automotive",
  className = "",
}: CompanyCtaProps) {
  return (
    <section className={`mt-10 flex flex-col gap-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:p-7 ${className}`}>
      <div className="max-w-3xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 className="mt-2 text-xl leading-snug font-bold text-slate-950 sm:text-2xl">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{description}</p> : null}
      </div>
      <Link href={href} className="site-action inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#064d96]">
        {label}<ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
