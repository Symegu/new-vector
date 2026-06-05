"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Shield, Clock, Award } from "lucide-react";
import { Card } from "../ui/card";

const benefits = [
  { icon: Shield, text: "100% законно" },
  { icon: Clock, text: "От 6 месяцев" },
  { icon: Award, text: "Личное сопровождение" },
];

export function HeroBenefits() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="hidden max-w-4xl grid-cols-1 gap-4 md:grid md:grid-cols-3">
        {benefits.map((item, index) => (
          <m.div
            key={item.text}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.35,
              delay: index * 0.08,
              ease: "easeOut",
            }}
          >
            <Card className="rounded-2xl border border-white/8 bg-nv-card-dark p-6 shadow-nv-card backdrop-blur-xl">
              <div className="flex items-center justify-center gap-3">
                <div className="icon-bg-blue grad-nv-blue-main rounded-lg p-2">
                  <item.icon className="icon-sm text-on-dark" />
                </div>
                <span className="text-base font-normal text-on-dark">
                  {item.text}
                </span>
              </div>
            </Card>
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
}