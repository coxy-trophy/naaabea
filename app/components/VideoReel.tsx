"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import VideoCard from "./VideoCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    src: "/assets/naaabea09/naaabea09_1766339494_3792651293014129860_18489434281.mp4",
    title: "Behind the scenes",
  },
  {
    src: "/assets/naaabea09/naaabea09_1765562192_3786132192800297526_18489434281.mp4",
    title: "Studio moments",
  },
  {
    src: "/assets/naaabea09/naaabea09_1773947456_3856472938799211250_18489434281.mp4",
    title: "Campaign cut",
  },
  {
    src: "/assets/naaabea09/naaabea09_1787495234_3970117319033740771_18489434281.mp4",
    title: "Runway energy",
  },
  {
    src: "/assets/naaabea09/wildcutei_1786996309_3965931332557080564_328940905.mp4",
    title: "Street style",
  },
  {
    src: "/assets/naaabea09/seams_bydarkoah_1783093003_3933188477183702740_7264509579.mp4",
    title: "Fashion film",
  },
];

export default function VideoReel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 400;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-3">
            Motion
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]">
            Video Reel
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-10 pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video, i) => (
          <div key={video.src} className="snap-start">
            <VideoCard src={video.src} title={video.title} index={i} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
