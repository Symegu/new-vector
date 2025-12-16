"use client";

import { motion } from "framer-motion";
import {
  Scale,
  DollarSign,
  Clock,
  TrendingDown,
  FileCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Phone,
  Briefcase,
  Home,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";


function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export function BankruptcyInfoSection() {
  return (
    <section
      id="bankruptcy-info"
      className="relative py-20 overflow-hidden"
    >
      {/* background */}
      {/* <div className="absolute inset-0 bg-linear-to-tr from-white via-slate-50 to-blue-50" /> */}
      {/* <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" /> */}
      {/* <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      /> */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <Badge className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-100 to-amber-100 text-blue-700 hover:from-blue-200 hover:to-amber-200 border-0 px-6 py-3 rounded-full shadow-nv-soft text-md">
              {/* <div className="w-2 h-2 bg-blue-500 rounded-full" /> */}
              <span>Банкротство и работа с долгами</span>
            </Badge>
            {/* <p className="text-secondary max-w-2xl mx-auto text-lg">
              Узнайте, подходите ли вы под процедуру банкротства, и какие
              долги в вашей ситуации реально можно списать законным путём.
            </p> */}
          </div>
        </FadeInSection>

        {/* Main Feature Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Criteria Card */}
          <FadeInSection delay={0.2}>
            <Card className="bg-white border-slate-100 shadow-nv-card hover:shadow-nv-card transition-all p-8 h-full relative overflow-hidden group ">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start space-x-4 mb-8">
                  {/* <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl blur-xl opacity-50" />
                    <div className="relative p-4 rounded-2xl bg-linear-to-br from-blue-600 to-blue-500 shadow-nv-soft">
                      <Scale className="h-8 w-8 text-white" />
                    </div>
                  </div> */}
                  <div>
                    <h3 className="text-primary mb-2">Основные критерии</h3>
                    <p className="text-secondary">
                      Признаки, при которых имеет смысл рассматривать
                      процедуру банкротства.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: DollarSign,
                      title: "Сумма задолженности",
                      text: "Существенная общая нагрузка по долгам, когда выплаты становятся неподъёмными.",
                      className: "grad-step-1",
                    },
                    {
                      icon: Clock,
                      title: "Просрочки по платежам",
                      text: "Регулярные задержки и невозможность вносить платежи вовремя.",
                      className: "grad-step-2",
                    },
                    {
                      icon: TrendingDown,
                      title: "Платёжеспособность",
                      text: "Дохода и имущества не хватает, чтобы закрыть все обязательства.",
                      className: "grad-step-3",
                    },
                    {
                      icon: FileCheck,
                      title: "Исполнительные производства",
                      text: "Требования приставов и кредиторов, растущее давление взысканий.",
                      className: "grad-step-4",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: 0.15 * index, duration: 0.4 }}
                      className="group/item flex items-start space-x-4 p-4 rounded-xl bg-white hover:shadow-nv-soft"
                    >
                      <div
                        className={`p-3 rounded-xl ${item.className} shadow-nv-soft opacity-60`}
                      >
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-primary mb-1">{item.title}</h4>
                        <p className="text-secondary text-sm">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </FadeInSection>

          {/* CTA & Steps Card */}
          <div className="space-y-8">
            <FadeInSection delay={0.4}>
              <Card className="relative bg-light border-0 shadow-nv-card p-8 text-white overflow-hidden">
                {/* Decorative elements */}
                {/* <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" /> */}

                <div className="relative z-10">
                  <div className="flex gap-3 items-center mb-4">
                    <div className="inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="text-on-dark">Бесплатная консультация</h3>
                  </div>
                  <p className="mb-6 text-on-dark-secondary">
                    Обсудим вашу ситуацию, объясним варианты и поможем
                    понять, подходит ли вам банкротство или реструктуризация.
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      "Анализ долгов и обязательств",
                      "Оценка перспектив процедуры",
                      "Пошаговый план действий",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-amber-400" />
                        <span className="text-on-dark-secondary text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="btn-nv-gold w-full group"
                  >
                    <span className="flex items-center justify-center gap-2 text-lg">
                      Записаться на консультацию
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </Card>
            </FadeInSection>

            <FadeInSection delay={0.5}>
              <Card className="bg-white border-slate-100 shadow-nv-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-primary">Этапы работы</h3>
                  <Badge className="bg-linear-to-r from-blue-100 to-amber-100 text-blue-700 border-0">
                    4 шага
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Консультация", icon: Phone },
                    { title: "Подготовка документов", icon: FileCheck },
                    { title: "Судебный процесс", icon: Scale },
                    { title: "Списание долгов", icon: CheckCircle2 },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-blue-100 to-amber-100 flex items-center justify-center">
                        <span className="text-blue-700">{index + 1}</span>
                      </div>
                      <div className="flex items-center space-x-3 flex-1">  
                        <span className="text-secondary">
                          {step.title}
                        </span>
                      </div>
                      <step.icon className="h-4 w-4 text-blue-600" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </FadeInSection>
          </div>
        </div>

        {/* Debts List - Full Width Feature */}
        <FadeInSection delay={0.6}>
          <Card className="bg-white border-slate-100 shadow-nv-card hover:shadow-nv-card transition-all p-8 h-full relative overflow-hidden">
            <div className=" bg-white ">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  {/* <div className="absolute inset-0 bg-amber-300 rounded-2xl opacity-40" />
                    <div className="relative">
                      <div className="inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                        <FileCheck className="h-6 w-6 text-amber-500 drop-shadow-lg" />
                      </div>
                    </div> */}
                </div>
                <div>
                  <h3 className="text-primary mb-2">
                    Какие долги можно списать
                  </h3>
                  <p className="text-secondary">
                    В рамках процедуры обычно списываются необеспеченные
                    долги: кредиты, займы, коммунальные задолженности,
                    налоги и штрафы.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 pt-0">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Briefcase,
                    title: "Кредиты и займы",
                    items: [
                      "Потребительские кредиты",
                      "Кредитные карты",
                      "Займы МФО",
                    ],
                    gradient: "grad-step-1",
                  },
                  {
                    icon: Home,
                    title: "Коммунальные платежи",
                    items: [
                      "Задолженность по ЖКХ",
                      "Электроэнергия и услуги связи",
                      "Взносы на капремонт",
                    ],
                    gradient: "grad-step-1",
                  },
                  {
                    icon: Scale,
                    title: "Налоги и штрафы",
                    items: [
                      "Налоговые задолженности",
                      "Административные штрафы",
                      "Пени и неустойки",
                    ],
                    gradient: "grad-step-1",
                  },
                ].map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="group/item p-6 rounded-xl bg-linear-to-br from-slate-50 to-blue-50 border border-slate-100 hover:border-blue-300 transition-all h-full">
                      <div className="flex items-center gap-4">
                        <div
                          className={`inline-flex p-3 rounded-xl bg-linear-to-br ${category.gradient} shadow-nv-soft mb-4 group-hover:scale-110 transition-transform opacity-60`}
                        >
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <h5 className="text-primary mb-4">
                          {category.title}
                        </h5>
                      </div>
                      <ul className="space-y-3">
                        {category.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start space-x-2"
                          >
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-secondary text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </FadeInSection>
        {/* Bottom CTA Bar */}
                <FadeInSection delay={0.8}>
                  <div className="mt-12 text-center">
                    <Card className="inline-block bg-nv-hero border-0 shadow-nv-card p-8 w-full">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                          <h3 className="text-on-dark mb-2">
                            Не уверены, подходит ли вам банкротство?
                          </h3>
                          <p className="text-on-dark-secondary">
                            Пройдите короткий тест и получите предварительный
                            ответ за пару минут.
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            document
                              .getElementById("quiz")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="btn-nv-gold shrink-0 text-lg">
                          <span className="flex items-center gap-2">
                            Пройти тест
                            <ArrowRight />
                          </span>
                        </Button>
                      </div>
                    </Card>
                  </div>
                </FadeInSection>
      </div>
    </section>
  );
}
