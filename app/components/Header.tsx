"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, Heart, User, Menu, X, ArrowRight } from "lucide-react";
import SocialCapsule from "./SocialCapsule";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 py-5 text-white">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo + language */}
          <div className="flex items-center gap-4">
            <Link href="#home" className="flex items-center gap-2 group">
              <Star className="w-5 h-5 fill-current text-current group-hover:scale-110 transition-transform" />
              <span className="text-base sm:text-lg font-semibold tracking-tight whitespace-nowrap">
                <span className="hidden sm:inline">Naa Abea Benjamin-Addy</span>
                <span className="sm:hidden">Naa Bea.</span>
              </span>
            </Link>
            <button className="hidden sm:flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors">
              ENG
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Desktop pill nav */}
          <nav className="hidden md:flex items-center rounded-full px-2 py-1.5 bg-white/10 backdrop-blur-md border border-white/20">
            {navItems.map((item) => {
              const isActive = item.label === "Home";
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="#contact"
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
            >
              Contact
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Social capsule */}
          <SocialCapsule />

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              aria-label="Favourites"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              aria-label="Profile"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="md:hidden absolute top-20 left-4 right-4 bg-surface/95 backdrop-blur-xl text-foreground border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-lg font-medium hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-foreground text-background font-medium"
              >
                Contact
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
