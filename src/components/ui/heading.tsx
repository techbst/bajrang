import React from "react";

interface HeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function Heading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: HeadingProps) {
  return (
    <div
      className={`
        ${align === "center" ? "text-center" : "text-left"}
        ${className}
      `}
    >
      {eyebrow && (
        <div className={`mb-3 flex ${align === "center" ? "justify-center" : "justify-start"}`}>
          <div className="flex h-6 items-center gap-3 text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
            <span className="h-px w-8 bg-[#0760bc]" aria-hidden="true" />
            {eyebrow}
            <span className="h-px w-8 bg-[#0760bc]" aria-hidden="true" />
          </div>
        </div>
      )}

      <h2
        className="text-3xl leading-tight font-bold tracking-tight text-[#171717] uppercase sm:text-4xl"
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />

      {subtitle && (
        <p className="mx-auto mt-4 mb-10 max-w-3xl text-base leading-7 text-[#4b4b4b] sm:text-lg sm:leading-8">
          {subtitle}
        </p>
      )}
    </div>
  );
}
