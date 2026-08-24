"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./TiltCard";
import Lightbox from "./Lightbox";
import { galleryImages } from "../lib/images";

const categories = [
  "All",
  ...Array.from(new Set(galleryImages.map((img) => img.category))),
];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    active === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const next = () =>
    setLightbox((prev) =>
      prev === null ? null : (prev + 1) % filtered.length
    );
  const prev = () =>
    setLightbox((prev) =>
      prev === null ? null : (prev - 1 + filtered.length) % filtered.length
    );

  return (
    <section id="portfolio" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-3">
              Selected Work
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Portfolio
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  active === category
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/70 border-white/10 hover:border-white/30 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                onClick={() => openLightbox(i)}
                className="cursor-hover"
              >
                <TiltCard className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                  {img.type === "video" ? (
                    <VideoThumbnail src={img.src} alt={img.alt} />
                  ) : (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 backdrop-blur-sm text-[10px] sm:text-xs font-medium border border-white/10">
                      {img.category}
</span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={filtered}
          current={lightbox}
          onClose={closeLightbox}
          onNext={next}
          onPrev={prev}
        />
      )}
    </section>
  );
}

function VideoThumbnail({ src, alt }: { src: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={alt}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  );
}
