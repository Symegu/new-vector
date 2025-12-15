'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Phone, Mail, MapPin, Clock, CheckCircle2, Shield } from 'lucide-react'
import { FadeInSection } from '@/components/ui/fadeIn'
import { ConsultationForm } from '../forms/ConsultationForm'
import { Card } from '../ui/card'

export function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background with blur effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-nv-hero" />
        <Image
          src="/form-bg.jpg"
          alt="Business workspace"
          fill
          className="w-full h-full object-cover opacity-15 blur-md"
        />

        {/* Animated gradient orbs - Brand colors */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-16 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full mb-6 border border-white/20"
            >
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span>Бесплатная консультация</span>
            </motion.div>

            <h1 className="text-on-dark mb-6">
              Начните новую жизнь
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-amber-300">
                без долгов сегодня
              </span>
            </h1>
            <p className="text-on-dark-secondary text-xl max-w-3xl mx-auto">
              Оставьте заявку, и юрист аккуратно оценит вашу ситуацию и предложит
              возможные варианты решения
            </p>
          </div>
        </FadeInSection>

        {/* Form + contacts + map + benefit cards */}
        <ConsultationForm />

        {/* Benefit Cards (desktop + tablet only) */}
        <FadeInSection delay={0.4}>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12">
            {[
              {
                icon: Shield,
                text: 'Работаем строго по закону',
              },
              {
                icon: Clock,
                text: 'Подстраиваемся под ваш график',
              },
              {
                icon: CheckCircle2,
                text: 'Реальные решения без обещаний чудес',
              },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
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
        </FadeInSection>
      </div>
    </section>
  )
}
