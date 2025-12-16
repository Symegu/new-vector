"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  Shield,
  Clock,
  Users,
  TrendingDown,
  CheckCircle2,
  Star,
  Target,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Card } from "../ui/card";


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

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-slate-50 to-blue-50" />
      <div className="absolute top-20 right-20 w-96 h-96 orb-nv-blue rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 orb-nv-amber rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 nv-container">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full border-amber-200 px-3 py-1 text-xs font-medium mb-4 bg-amber-100 text-amber-500 hover:bg-amber-200 border-0"
            >
              {/* <Star className="h-4 w-4 text-green-700 animate-pulse" /> */}
              <span className="text-md text-amber-500">О компании</span>
            </motion.div>
            <h2 className="text-primary mb-6 text-3xl md:text-4xl font-semibold">
              Почему выбирают «Новый Вектор»
            </h2>
            <p className="text-secondary max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
            style={{margin: '0 auto 1rem'}}>
              С 2015 года помогаем людям законно избавиться от долгов. Основной
              специалист — юрист с опытом более 25 лет в гражданском и
              банкротном праве.
            </p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Левая колонка: визуал и цифры */}
          <FadeInSection delay={0.1}>
            <div className="space-y-6">
              {/* Основная карточка с фото */}
              <div className="relative rounded-3xl overflow-hidden shadow-nv-card group">
                <Image
                  src="/about-main.jpg"
                  alt="Консультация в компании Новый Вектор"
                  width={1080}
                  height={720}
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent" />

                {/* бейдж опыта */}
                <motion.div
                  className="absolute top-6 left-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-white rounded-2xl p-4 shadow-nv-soft">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-nv-soft opacity-60">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl text-primary leading-none mb-1">
                          25+ лет
                        </div>
                        <div className="text-xs text-secondary">
                          юридической практики
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* нижняя полоса с показателями */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-nv-soft border border-white/50">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          value: "с 2015 г.",
                          label: "в банкротстве",
                          icon: TrendingDown,
                        },
                        {
                          value: "100+",
                          label: "завершённых дел",
                          icon: Users,
                        },
                        {
                          value: "лично",
                          label: "ведём каждое дело",
                          icon: CheckCircle2,
                        },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="text-center"
                        >
                          <stat.icon className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                          <div className="text-lg text-primary mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs text-secondary">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* две маленькие карточки */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-100 shadow-nv-soft">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl mb-4 opacity-60">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 mb-2">
                      С 2015 года
                    </div>
                    <div className="text-sm text-secondary">
                      специализируемся на банкротстве физических лиц
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-100 shadow-nv-soft">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl mb-4 opacity-60">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 mb-2">
                      100%
                    </div>
                    <div className="text-sm text-secondary">
                      конфиденциальность и защита персональных данных
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </FadeInSection>

          {/* Правая колонка: табы */}
          <FadeInSection delay={0.2}>
            <Tabs defaultValue="why" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-slate-100 p-1.5 rounded-2xl shadow-nv-soft">
                <TabsTrigger
                  value="why"
                  className="rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-50 data-[state=active]:to-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-nv-soft transition-all"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Почему мы
                </TabsTrigger>
                <TabsTrigger
                  value="how"
                  className="rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-50 data-[state=active]:to-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-nv-soft transition-all"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Как работаем
                </TabsTrigger>
                <TabsTrigger
                  value="results"
                  className="rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-50 data-[state=active]:to-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-nv-soft transition-all"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Подход
                </TabsTrigger>
              </TabsList>

              {/* Почему мы */}
              <TabsContent value="why" className="space-y-6">
                <Card className="bg-white border-slate-100 shadow-nv-soft p-8">
                  <div className="flex items-start space-x-4">
                    {/* <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-nv-soft">
                      <Star className="h-6 w-6 text-white" />
                    </div> */}
                    <div className="flex-1">
                      <h3 className="text-primary mb-3">Более 10 лет опыта</h3>
                      <p className="text-secondary leading-relaxed">
                        Наша команда опытных юристов специализируется исключительно
                        на банкротстве физических лиц.
                      </p>
                    </div>
                  </div>
                  {/* <Separator className="my-2" /> */}
                  <h3 className="text-primary mb-4">
                    Личное сопровождение и глубокая экспертиза
                  </h3>
                  <p className="text-secondary mb-6 leading-relaxed">
                    Мы не сетевая компания и не работаем «конвейером». Каждое
                    дело ведётся персонально: от первой консультации до
                    завершения процедуры банкротства.
                  </p>

                  <div className="space-y-4">
                    {[
                      { label: "Вовлечённость в дело", value: 95 },
                      { label: "Удовлетворённость клиентов", value: 90 },
                      { label: "Прозрачность и понятность условий", value: 100 },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-secondary">{item.label}</span>
                          <span className="text-primary">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Как работаем */}
              <TabsContent value="how" className="space-y-6">
                <Card className="bg-white border-slate-100 shadow-nv-soft p-8">
                  <div className="flex items-start space-x-4">
                    {/* <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-nv-soft">
                      <Target className="h-6 w-6 text-white" />
                    </div> */}
                    <div className="flex-1">
                      <h3 className="text-primary mb-3">
                        Прозрачный и понятный процесс
                      </h3>
                      <p className="text-secondary leading-relaxed">
                        Объясняем каждый шаг простым языком. Вы понимаете, что
                        сейчас происходит с делом и что будет дальше.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        step: "01",
                        title: "Консультация и анализ",
                        text: "Бесплатно разбираем вашу ситуацию, объясняем варианты и риски.",
                        gradient: "grad-step-1",
                      },
                      {
                        step: "02",
                        title: "Подготовка документов",
                        text: "Помогаем собрать и правильно оформить полный пакет документов.",
                        gradient: "grad-step-2",
                      },
                      {
                        step: "03",
                        title: "Сопровождение в суде",
                        text: "Представляем ваши интересы на всех заседаниях и взаимодействуем с кредиторами.",
                        gradient: "grad-step-3",
                      },
                      {
                        step: "04",
                        title: "Решение и новая страница",
                        text: "После завершения процедуры вы получаете решение суда и освобождаетесь от долгов.",
                        gradient: "grad-step-4",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative pl-16"
                      >
                        <div className="absolute left-0 top-0">
                          <div
                            className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.gradient} flex items-center justify-center shadow-nv-soft opacity-60`}
                          >
                            <span className="text-on-dark font-semibold text-sm">
                              {item.step}
                            </span>
                          </div>
                        </div>
                        {index < 3 && (
                          <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-blue-200 to-transparent" />
                        )}
                        <div>
                          <h5 className="text-primary mb-2">{item.title}</h5>
                          <p className="text-secondary leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Подход / результаты без цифр "с потолка" */}
              <TabsContent value="results" className="space-y-6">
                <Card className="bg-white border-slate-100 shadow-nv-soft p-6">
                  <h3 className="text-primary">
                    Подход, которому доверяют
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    К нам приходят по рекомендациям: люди делятся опытом,
                    потому что чувствуют поддержку, ясность и реальную помощь
                    в сложной финансовой ситуации.
                  </p>

                  {/* <Separator className="my-2" /> */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        number: "Банкротство под ключ",
                        label: "от первой консультации до решения суда",
                        icon: TrendingDown,
                      },
                      {
                        number: "Семейная команда",
                        label: "личное участие и контроль за каждым делом",
                        icon: Users,
                      },
                      {
                        number: "Понятные условия",
                        label: "фиксированная стоимость, без скрытых платежей",
                        icon: Shield,
                      },
                      {
                        number: "Онлайн‑формат",
                        label: "консультации и сопровождение дистанционно",
                        icon: Clock,
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-4 text-left bg-linear-to-br from-slate-50 to-blue-50 border-slate-100 hover:shadow-nv-card transition-all group h-full">
                          <div className="flex items-start gap-3">
                            <div className="inline-flex p-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 group-hover:scale-110 transition-transform">
                              <stat.icon className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                              <div className="text-mb font-medium text-primary mb-1">
                                {stat.number}
                              </div>
                              <div className="text-sm text-secondary">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
