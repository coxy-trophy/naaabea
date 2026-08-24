"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function SplitText({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { y: "110%", opacity: 0, rotateX: -40 },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        delay,
      }
    );
  }, [reduced, delay]);

  const words = children.split(" ");

  return (
    <h1
      ref={containerRef}
      className={className}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em] align-bottom"
        >
          <span
            className={`word inline-block ${reduced ? "" : "will-change-transform"}`}
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}
