"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioImage } from "../lib/images";

export default function Lightbox({
  images,
  current,
  onClose,
  onNext,
  onPrev,
}: {
  images: PortfolioImage[];
  current: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const item = images[current];
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
        onClick={onClose}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <motion.div
          key={item.src}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl aspect-[3/4] max-h-[85vh] rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          )}
        </motion.div>

        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted">
          {current + 1} / {images.length} — {item.category}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
