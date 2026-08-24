"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const brands = [
  "Blush by Benewa",
  "MESA",
  "Malcom Prince",
  "PopDeri",
  "Mark Slick",
  "Seams by Darkoah",
  "Wild Cutei",
];

export default function Featured() {
  return (
    <AnimatedSection className="py-16 sm:py-20 border-y border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <p className="text-center text-sm uppercase tracking-widest text-muted mb-8">
          Trusted by creators &amp; brands
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </AnimatedSection>
  );
}

function MarqueeTrack() {
  return (
    <motion.div
      initial={{ x: "0%" }}
      animate={{ x: "-100%" }}
      transition={{
        repeat: Infinity,
        duration: 25,
        ease: "linear",
      }}
      className="flex shrink-0 items-center gap-x-12 px-6"
    >
      {brands.map((brand) => (
        <span
          key={brand}
          className="text-xl sm:text-2xl font-display text-foreground/30 whitespace-nowrap hover:text-foreground/80 transition-colors cursor-default"
        >
          {brand}
        </span>
      ))}
    </motion.div>
  );
}
