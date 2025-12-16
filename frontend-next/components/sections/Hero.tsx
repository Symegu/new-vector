"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Shield, Clock, Award, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HeroSection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  useEffect(() => {
    // хук нужен для корректной инициализации useScroll в браузере
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-nv-hero"
    >
      {/* Background with parallax */}
      <motion.div className="hero-bg absolute inset-0 z-0" style={{ y: heroY }}>
        <div className="absolute inset-0 bg-nv-hero-overlay" />
        <Image
          src="/hero-bg.jpg"
          alt="Юрист консультирует клиента по вопросам долгов"
          fill
          className="object-cover opacity-20"
          priority
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 nv-container text-center"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <h1 className="text-on-dark mb-6 max-w-3xl mx-auto text-5xl font-bold leading-tight tracking-tight">
            Освободитесь от долгов <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-amber-300">законно и навсегда</span>
          </h1>

          <p className="text-on-dark-secondary mb-8 max-w-2xl mx-auto text-lg font-normal leading-relaxed">
            Помогаем пройти процедуру банкротства физических лиц спокойно и
            понятно, с личным сопровождением юриста на каждом этапе.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              type="button"
              onClick={() =>
                document
                  .getElementById("quiz")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-nv-gold"
            >
              <Award className="icon-sm" />
              <span>Пройти тест</span>
            </Button>

            <Button
              type="button"
              onClick={() =>
                document
                  .getElementById("contactForm")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-nv-blue"
            >
              <Phone className="icon-sm" />
              <span>Бесплатная консультация</span>
            </Button>
          </div>

          {/* Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Shield, text: "100% законно" },
              { icon: Clock, text: "От 6 месяцев" },
              { icon: Award, text: "Личное сопровождение" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-nv-card-dark backdrop-blur-xl border border-white/8 rounded-2xl p-6 shadow-nv-card">
                  <div className="flex items-center justify-center gap-3">
                    <div className="p-2 rounded-lg grad-nv-blue-main icon-bg-blue">
                      <item.icon className="icon-sm text-on-dark" />
                    </div>
                    <span className="text-on-dark font-normal text-base">
                      {item.text}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="h-8 w-8 text-on-dark-secondary icon-light" />
      </motion.div>
    </section>
  );
}
