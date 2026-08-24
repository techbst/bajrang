import React from "react";

interface HeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  linePosition?: "both" | "left" | "right" | "none";
  className?: string;
}

export default function Heading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  linePosition = "both",
  className = "",
}: HeadingProps) {
  const showLeftLine =
    linePosition === "both" || linePosition === "left";

  const showRightLine =
    linePosition === "both" || linePosition === "right";

  return (
    <div
      className={`
        ${align === "center" ? "text-center" : "text-left"}
        ${className}
      `}
    >
      {eyebrow && (
        <div
          className={`
            flex gap-3 text-[11px] font-bold tracking-[0.24em]
            text-primary uppercase
            ${align === "center" ? "justify-center" : "justify-start"}
          `}
        >
          <div className="flex items-center gap-3 h-6">

            {showLeftLine && (
              <span
                className="h-px w-8 bg-[#0760BC]"
                aria-hidden="true"
              />
            )}

            {eyebrow}

            {showRightLine && (
              <span
                className="h-px w-8 bg-[#0760BC]"
                aria-hidden="true"
              />
            )}

          </div>
        </div>
      )}

      <h2
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />

      {subtitle && (
        <p className="mt-2 mb-[40px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}