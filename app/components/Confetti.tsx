"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<{ id: number; x: number; color: string; delay: number; drift: number; rotation: number }[]>([]);
  const seededRef = useRef(false);

  const seed = useCallback(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    const colors = ["#f2e8e0", "#7f1d1d", "#991b1b", "#450a0a", "#d4a373"];
    const newPieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 30,
      rotation: Math.random() * 720 - 360,
    }));
    setPieces(newPieces);
    const timer = setTimeout(() => {
      setPieces([]);
      seededRef.current = false;
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!active) return;
    return seed();
  }, [active, seed]);

  return (
    <AnimatePresence>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            x: `${p.x + p.drift}vw`,
            rotate: p.rotation,
            opacity: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.8,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="fixed top-0 left-0 w-2 h-3 z-[300] pointer-events-none"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </AnimatePresence>
  );
}
