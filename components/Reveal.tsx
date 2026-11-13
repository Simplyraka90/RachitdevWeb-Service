"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`${className} transform-gpu`}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.45,
        delay: reduced ? 0 : delay / 1000, // Convert ms/number safely if needed
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}