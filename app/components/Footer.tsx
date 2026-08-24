"use client";

import Link from "next/link";
import { Star, ArrowUp } from "lucide-react";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socials = [
  { icon: InstagramIcon, href: "https://instagram.com/naaabea09", label: "Instagram" },
  { icon: XIcon, href: "https://x.com/naaabea09", label: "X" },
  { icon: TikTokIcon, href: "https://tiktok.com/@naaabea09", label: "TikTok" },
];

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 py-12 sm:py-16 bg-background">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <Link href="#home" className="flex items-center gap-2 group">
            <Star className="w-5 h-5 fill-foreground text-foreground group-hover:scale-110 transition-transform" />
            <span className="text-lg font-semibold tracking-tight">Naa Abea Benjamin-Addy</span>
          </Link>

          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-white/10 transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>

          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-white/10 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-8 text-center sm:text-left text-sm text-muted">
          © {new Date().getFullYear()} Naa Abea Benjamin-Addy. All rights reserved.
          <span className="block sm:inline mt-1 sm:mt-0 sm:before:content-['·_']">
            Built with ❤️ by Hexacodelabs
          </span>
        </p>
      </div>
    </footer>
  );
}
