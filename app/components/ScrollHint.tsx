"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ScrollHintProps {
  className?: string;
}

export default function ScrollHint({ className = "" }: ScrollHintProps) {
  return (
    <motion.a
      href="#portfolio"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className={`group flex flex-col items-center gap-2 transition-colors ${className}`}
    >
      <span className="text-xs tracking-wide uppercase">Explore</span>
      <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-current/10 transition-all">
        <ArrowDown className="w-4 h-4 animate-float" />
      </div>
    </motion.a>
  );
}
