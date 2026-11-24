import React from "react";
import { SectionEyebrow } from "@/components/common/section-eyebrow";

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
          <SectionEyebrow align={align}>{eyebrow}</SectionEyebrow>
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
