"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import ScrollHint from "./ScrollHint";
import { heroImage } from "../lib/images";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const moveX = useMotionValue(0);
  const moveY = useMotionValue(0);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const handleMove = (e: MouseEvent) => {
      moveX.set((e.clientX - centerX) * 0.02);
      moveY.set((e.clientY - centerY) * 0.02);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduced, moveX, moveY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.05]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-hero-fallback"
    >
      {/* Deep burgundy gradient base */}
      <div className="absolute inset-0 bg-hero-fallback" />

      {/* Animated gradient mesh overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Giant name typography behind the portrait */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="absolute inset-0 hidden sm:flex flex-col items-center justify-center pointer-events-none select-none z-0"
      >
        <h1 className="flex flex-col items-center font-display text-[13vw] md:text-[12vw] lg:text-[11vw] font-semibold uppercase leading-[0.78] tracking-[-0.04em] text-white/[0.14] text-center">
          <span className="block">Naa Abea</span>
          <span className="block">Benjamin-Addy</span>
        </h1>
      </motion.div>

      {/* Mobile hero — clean magazine layout */}
      <div className="absolute inset-0 flex sm:hidden flex-col z-0">
        {/* Top role tag */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute top-[14vh] left-0 right-0 text-center text-[11px] uppercase tracking-[0.25em] text-foreground/60 pointer-events-none"
        >
          Model · Creative · Storyteller
        </motion.p>

        {/* Name above portrait */}
        <motion.div
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[17vh] left-0 right-0 flex flex-col items-center pointer-events-none select-none"
        >
          <h1 className="font-display text-[14vw] font-semibold uppercase leading-[0.85] tracking-[-0.02em] text-white/[0.24] text-center">
            <span className="block">Naa Abea</span>
            <span className="block">Benjamin-Addy</span>
          </h1>
        </motion.div>

        {/* Portrait */}
        <motion.div
          style={{ x: moveX }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 h-[74vh] pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2"
        >
          <ScrollHint className="text-foreground/60 hover:text-foreground scale-90" />
        </motion.div>
      </div>

      {/* Desktop portrait with mouse parallax */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="absolute inset-0 z-10 hidden sm:flex items-end justify-center pointer-events-none"
      >
        <div className="relative w-[58vw] md:w-[46vw] lg:w-[36vw] h-[82vh]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 58vw, (max-width: 1024px) 46vw, 36vw"
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Foreground content — desktop only */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-20 hidden sm:flex max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 min-h-screen flex-col justify-between pt-20 sm:pt-28 pb-8 sm:pb-12"
      >
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between"
        >
          <div className="max-w-xs">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/60 leading-relaxed">
              Model · Creative · Storyteller
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
              Based in
            </p>
            <p className="text-sm font-medium text-foreground">Accra, Ghana</p>
          </div>
        </motion.div>

        {/* Bottom copy + scroll hint */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block max-w-md text-center sm:text-left"
          >
            <p className="text-foreground text-2xl sm:text-3xl md:text-4xl font-display font-medium leading-[1.1]">
              Where presence speaks volumes.
            </p>
            <p className="mt-2 sm:mt-3 text-sm text-foreground/60 leading-relaxed">
              A curated visual diary of campaigns, editorials, and moments
              captured in front of the lens.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollHint className="text-foreground/70 hover:text-foreground" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
