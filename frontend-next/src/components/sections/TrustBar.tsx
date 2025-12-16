"use client";

import { Shield, Award, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

export function TrustBarSection() {
  return (
    <section className="py-8 md:py-10 border-y border-slate-200/60">
      <div className="nv-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              text: "Полная конфиденциальность",
              className: "grad-step-1",
            },
            {
              icon: Award,
              text: "В банкротстве с 2015 года",
              className: "grad-step-1",
            },
            {
              icon: Clock,
              text: "Быстрая связь 7 дней в неделю",
              className: "grad-step-1",
            },
            {
              icon: Users,
              text: "Личное сопровождение юриста",
              className: "grad-step-1",
            },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-md transition-all group"
            >
              <div
                className={`p-3 rounded-xl shadow-md ${item.className} opacity-60`}
              >
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <span className="nv-subtitle text-secondary sm:text-base">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
