"use client";

import {
  Phone,
  FileCheck,
  Scale,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { FadeInSection } from "../ui/fadeIn";
import { Badge } from "../ui/badge";
import { CTASection } from "./CTA";

export function ProcessStepsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Сетчатый фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <FadeInSection>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet-100 text-violet-500 border-0 text-sm">
              Процесс
            </Badge>
            <h2 className="text-primary text-2xl mb-4!">
              Как проходит процесс банкротства
            </h2>
            {/* <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Прозрачная процедура из 4 этапов к полной свободе от долгов
            </p> */}
          </div>
        </FadeInSection>

        {/* Этапы */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              number: "01",
              title: "Консультация",
              description:
                "Бесплатный анализ вашей ситуации и оценка перспектив.",
              icon: Phone,
              gradient: "grad-step-1",
              details: ["Анализ долгов", "Оценка перспектив", "План действий"],
              duration: "1 день",
            },
            {
              number: "02",
              title: "Документы",
              description: "Сбор и подготовка всех необходимых документов.",
              icon: FileCheck,
              gradient: "grad-step-2",
              details: [
                "Сбор справок",
                "Заявление в суд",
                "Работа с кредиторами",
              ],
              duration: "2–8 недель",
            },
            {
              number: "03",
              title: "Суд",
              description: "Представительство интересов в арбитражном суде.",
              icon: Scale,
              gradient: "grad-step-3",
              details: [
                "Судебные заседания",
                "Работа с управляющим",
                "Защита прав",
              ],
              duration: "6 месяцев",
            },
            {
              number: "04",
              title: "Свобода",
              description: "Полное списание долгов и начало новой жизни.",
              icon: CheckCircle2,
              gradient: "grad-step-4",
              details: ["Решение суда", "Списание долгов", "Завершение процедуры"],
              duration: "1 день",
            },
          ].map((step, index) => (
            <FadeInSection key={step.number} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="relative h-full"
              >
                <Card className="relative bg-white border-slate-100 shadow-nv-card hover:shadow-lg transition-shadow px-4 py-5 md:p-6 h-full group overflow-hidden rounded-2xl">
                  {/* Лёгкий градиент при ховере */}
                  <div
                    className={`absolute inset-0 ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />

                  {/* Номер этапа */}
                  <div className="absolute -top-2 -right-2 w-12 h-12">
                    <div
                      className={`w-full h-full rounded-full ${step.gradient} opacity-10 blur-lg`}
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${step.gradient} bg-clip-text text-transparent opacity-80`}
                    >
                      {step.number}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex gap-3 items-center mb-3">
                      {/* Иконка */}
                      <div
                        className={`inline-flex p-3 rounded-2xl ${step.gradient} shadow-md opacity-60 mb-1`}
                      >
                        <step.icon className="h-6 w-6 text-white" />
                      </div>

                      <div>
                        {/* Заголовок */}
                        <h5 className="text-primary text-lg md:text-xl mb-1!">{step.title}</h5>

                        {/* Срок */}
                        <div className="inline-flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-500 text-sm">
                            {step.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Описание */}
                    <p className="text-secondary text-sm mb-4! leading-relaxed">
                      {step.description}
                    </p>

                    {/* Детали */}
                    <div className="space-y-2">
                      {step.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start space-x-2 text-sm"
                        >
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                          <span className="text-secondary leading-relaxed">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Стрелка между карточками (desktop) */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <ArrowRight className="h-5 w-5 text-slate-300" />
                    </div>
                  )}
                </Card>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
        {/* Кнопка CTA */}
        <CTASection />
      </div>
    </section>
  );
}
