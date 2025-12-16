"use client";

import { motion } from "framer-motion";
import React from "react";

type FadeInSectionProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function FadeInSection({
  children,
  delay = 0,
  className,
}: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}