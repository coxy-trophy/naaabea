"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play } from "lucide-react";

export default function VideoCard({
  src,
  title,
  index,
}: {
  src: string;
  title: string;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden bg-surface"
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted={muted}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/30">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Play className="w-6 h-6 fill-foreground" />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-1">
            Reel {String(index + 1).padStart(2, "0")}
          </p>
          <p className="text-sm font-medium line-clamp-1">{title}</p>
        </div>
        <button
          type="button"
          aria-label={muted ? "Unmute video" : "Mute video"}
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
          }}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          {muted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
