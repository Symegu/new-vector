'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, Users, Clock, Lock, Target, Award } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeInSection } from '@/components/ui/fadeIn'

const benefits = [
  {
    icon: ShieldCheck,
    title: "Полная безопасность",
    description: "Все процедуры строго по закону. Никаких рисков для вас и имущества. Защищаем ваши интересы на каждом этапе.",
    image: "/benefits/shield-office.jpg"
  },
  {
    icon: Users,
    title: "Семейная команда",
    description: "Личный юрист ведёт дело от начала до конца. Без конвейеров и передачи между менеджерами.",
    image: "/benefits/team-meeting.jpg"
  },
  {
    icon: Clock,
    title: "6-8 месяцев",
    description: "Полное списание долгов без затяжных процессов. Опытные юристы ускоряют процедуру.",
    image: "/benefits/calendar-check.jpg"
  },
  {
    icon: Lock,
    title: "100% конфиденциально",
    description: "Ваши данные под надёжной защитой. Никто не узнает о процедуре банкротства.",
    image: "/benefits/lock-safe.jpg"
  },
  {
    icon: Target,
    title: "Индивидуальный подход",
    description: "Уникальная стратегия под вашу ситуацию. Анализируем все детали перед началом.",
    image: "/benefits/target-strategy.jpg"
  },
  {
    icon: Award,
    title: "Гарантия результата",
    description: "Проверенный подход с высоким процентом успешных решений суда.",
    image: "/benefits/award-success.jpg"
  }
]

export function BenefitsSection() {
  const { scrollYProgress } = useScroll()
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" id="benefits">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: yBackground }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: "url('/benefits-bg.jpg')",
            transform: 'translateZ(0) translate3d(0,0,0)' // hardware acceleration
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-blue-900/50 to-slate-900/70" />
      </motion.div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-20 lg:mb-28">
            <Badge className="mb-6 px-4 py-2 bg-amber-400/20 border-amber-400/40 text-amber-100 backdrop-blur-sm text-sm font-medium tracking-wide">
              Преимущества
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
              Почему нас выбирают
            </h2>
            <p className="text-xl md:text-2xl text-slate-200/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Реальные истории успеха, проверенный подход и личное сопровождение на каждом этапе
            </p>
          </div>
        </FadeInSection>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group"
            >
              <Card className="bg-white/95 backdrop-blur-xl border-white/60 shadow-2xl hover:shadow-3xl h-full overflow-hidden group-hover:-translate-y-3 transition-all duration-700 border-0">
                {/* Image with overlay and icon */}
                <div className="relative h-40 lg:h-48 overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                  <Image 
                    src={benefit.image}
                    alt={benefit.title}
                    fill 
                    className="object-cover hover:object-right-top transition-object duration-700"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  
                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300 border border-white/50">
                    <benefit.icon className="h-7 w-7 text-amber-600 drop-shadow-md" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-lg mb-6">
                    {benefit.description}
                  </p>
                  
                  {/* Gold accent line */}
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 rounded-full mx-auto lg:mx-0 group-hover:w-32 transition-all duration-300" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Bar */}
        <FadeInSection delay={0.8}>
          <Card className="mt-20 lg:mt-28 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl hover:shadow-3xl border-0 backdrop-blur-xl">
            <div className="p-8 lg:p-12 text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Готовы освободиться от долгов?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Начните с бесплатной консультации. Проанализируем вашу ситуацию и подскажем оптимальный путь.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg h-14 flex items-center gap-3"
                >
                  Бесплатная консультация
                </button>
                <button 
                  onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 rounded-2xl font-semibold hover:bg-white/30 hover:border-white/60 transition-all duration-300 text-lg h-14 flex items-center gap-3"
                >
                  Пройти тест
                </button>
              </div>
            </div>
          </Card>
        </FadeInSection>
      </div>
    </section>
  )
}
