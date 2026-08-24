"use client";

import { useState } from "react";
import { Send, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import MagneticButton from "./MagneticButton";
import Confetti from "./Confetti";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [confetti, setConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Message sent — I’ll be in touch soon!");
    setConfetti(true);
    setTimeout(() => {
      setStatus("");
      setConfetti(false);
    }, 4000);
  };

  return (
    <AnimatedSection
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <Confetti active={confetti} />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="max-w-xl">
            <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-4">
              Let’s create together
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-6">
              Book Naa Bea for your next project.
            </h2>
            <p className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-8">
              Open to editorial, runway, commercial, and creative collaborations.
              Tell me what you’re building and we’ll make it unforgettable.
            </p>

            <a
              href="mailto:naaabeaaa@gmail.com"
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-medium underline-offset-4 hover:underline"
            >
              naaabeaaa@gmail.com
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-surface/50 border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-muted">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl bg-background border border-white/10 px-4 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-muted">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-background border border-white/10 px-4 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-light transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-muted">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me about the project..."
                className="w-full rounded-xl bg-background border border-white/10 px-4 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-light transition-colors resize-none"
              />
            </div>

            <MagneticButton
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors cursor-hover"
            >
              Send Message
              <Send className="w-4 h-4" />
            </MagneticButton>

            {status && (
              <p className="text-sm text-accent-light">{status}</p>
            )}
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
