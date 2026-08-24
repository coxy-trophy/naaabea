"use client";

import { motion } from "framer-motion";

export default function StatBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="flex items-center gap-3"
    >
      <div className="flex -space-x-2">
        {["NB", "NB", "NB"].map((initials, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold uppercase"
            style={{
              background: i === 0 ? "#7f1d1d" : i === 1 ? "#991b1b" : "#450a0a",
            }}
          >
            {initials}
          </div>
        ))}
      </div>
      <div className="leading-tight">
        <p className="text-2xl font-display font-semibold">50k+</p>
        <p className="text-xs text-muted">Engaged community</p>
      </div>
    </motion.div>
  );
}
