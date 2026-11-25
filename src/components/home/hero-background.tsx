"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue
} from "framer-motion";

export function HeroBackground() {
  const { scrollY } = useScroll();
  const scrollOffset = useTransform(scrollY, [0, 640], ["0px", "-64px"]);
  const backgroundOffset = useSpring(scrollOffset, {
    stiffness: 100,
    damping: 22
  });
  const backgroundStyle: MotionStyle & {
    "--hero-background-offset": MotionValue<string>;
  } = { "--hero-background-offset": backgroundOffset };

  return (
    <motion.div
      className="absolute inset-0 bg-[url('/img/home/mobile-hero.webp')] bg-cover bg-bottom bg-no-repeat md:bg-[url('/img/home/main_bannernew.webp')] md:bg-right lg:motion-safe:-bottom-16 lg:motion-safe:translate-y-[var(--hero-background-offset)]"
      style={backgroundStyle}
    />
  );
}
