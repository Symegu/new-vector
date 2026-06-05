"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroScrollIndicator() {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="icon-light h-8 w-8 text-on-dark-secondary" />
      </m.div>
    </LazyMotion>
  );
}