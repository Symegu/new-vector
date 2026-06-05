"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Award, Phone } from "lucide-react";
import { Button } from "../ui/button";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.18 + index * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const interactiveMotion = {
  whileHover: { y: -2, scale: 1.015 },
  whileTap: { y: 0, scale: 0.985 },
};

export function HeroButtons() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
        <m.div
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          {...interactiveMotion}
          className="flex"
        >
          <Button
            type="button"
            onClick={() => scrollToSection("quiz")}
            className="btn-nv-gold w-full sm:w-auto"
          >
            <Award className="icon-sm" />
            <span>Пройти тест</span>
          </Button>
        </m.div>

        <m.div
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          {...interactiveMotion}
          className="flex"
        >
          <Button
            type="button"
            onClick={() => scrollToSection("contactForm")}
            className="btn-nv-blue w-full sm:w-auto"
          >
            <Phone className="icon-sm" />
            <span>Бесплатная консультация</span>
          </Button>
        </m.div>
      </div>
    </LazyMotion>
  );
}