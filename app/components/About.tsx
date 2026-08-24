"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import CountUp from "./CountUp";

const stats = [
  { value: 5, suffix: "+", label: "Years modelling" },
  { value: 12, suffix: "+", label: "Brand campaigns" },
  { value: 50, suffix: "k+", label: "Engaged community" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <AnimatedSection
      id="about"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div ref={sectionRef} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with parallax */}
          <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden">
            <motion.div style={{ y: imageY }} className="absolute inset-0">
              <Image
                src="/assets/naaabea09/naaabea09_1768590112_3811532574837727831_18489434281.jpg"
                alt="Naa Bea warm brick wall editorial"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover scale-110"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs uppercase tracking-widest text-foreground/70">
                Based in Ghana
              </p>
              <p className="text-lg font-display font-medium">Available worldwide</p>
            </div>
          </div>

          {/* Text */}
          <div className="lg:pl-8">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-accent-light text-sm font-medium uppercase tracking-widest mb-4"
            >
              About
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-8"
            >
              Style is a language I speak fluently.
            </motion.h2>

            <div className="space-y-5 text-foreground/80 text-base sm:text-lg leading-relaxed">
              {[
                "I’m Naa Bea — a model and visual storyteller passionate about bringing fashion, beauty, and culture to life in front of the lens. From editorial studios to sun-drenched streets, I work to create images that feel intentional, elegant, and alive.",
                "My portfolio spans brand campaigns, runway, beauty close-ups, and lifestyle editorials. I’m currently open to new bookings and creative collaborations.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
