import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <p className={cn("inline-flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-primary uppercase", className)}>
      {align === "center" && <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#0760bc]" />}
      {children}
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#0760bc]" />
    </p>
  );
}
