"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };

    const enter = () => setHidden(false);
    const leave = () => setHidden(true);

    const handleHoverIn = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, .cursor-hover")
      ) {
        setHovered(true);
      }
    };

    const handleHoverOut = () => setHovered(false);

    window.addEventListener("mousemove", move);
    document.body.addEventListener("mouseenter", enter);
    document.body.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", handleHoverIn);
    document.addEventListener("mouseout", handleHoverOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseenter", enter);
      document.body.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", handleHoverIn);
      document.removeEventListener("mouseout", handleHoverOut);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovered ? 48 : 16,
        height: hovered ? 48 : 16,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-foreground/60 mix-blend-difference hidden lg:block"
    />
  );
}
