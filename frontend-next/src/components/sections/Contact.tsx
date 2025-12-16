'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Phone, Mail, MapPin, Clock, CheckCircle2, Shield } from 'lucide-react'
// import { ConsultationForm } from '../forms/ConsultationForm'
import { Card } from '../ui/card'
import { FadeInSection } from '../ui/fadeIn'
import { LeadForm } from '../forms/LeadForm'

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
        <FadeInSection delay={0.3}>
          <div className="max-w-5xl mx-auto" id="contactForm">
            <Card className="bg-white/95 backdrop-blur-xl border-blue-600 shadow-nv-card overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <LeadForm
                  title="Заполните форму"
                  description="Расскажите в двух словах о долгах. Юрист лично свяжется с вами, чтобы предложить безопасный вариант решения."
                  submitLabel="Получить консультацию"
                  submitLoadingLabel="Отправляем…"
                  buttonClassName="btn-nv-gold w-full py-7 text-xl rounded-xl shadow-nv-card"
                  formClass='p-8 md:p-12'
                />
                {/* Info + Map Side */}
                <div className="bg-light p-8 md:p-12 text-white relative overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-8 h-full">
                    {/* Контакты */}
                    {/* <h3 className="mb-8 text-on-dark">Контакты</h3> */}
                    <div className="space-y-5">
                      <div className="flex flex-col items-start space-x-3 gap-2">
                        <div className='flex items-center gap-2'>
                          <Phone className="h-5 w-5 text-blue-200" />
                          <p className="text-on-dark-secondary text-blue-200"
                            style={{margin: '0'}}
                          >Телефон</p>
                        </div>
                        <a
                            href="tel:+79210104626"
                            className="text-lg text-on-dark"
                          >
                            +7 (921) 010-46-26
                          </a>
                      </div>

                      <div className="flex flex-col items-start space-x-3 gap-2">
                        <div className='flex items-center gap-2'>
                          <Mail className="h-5 w-5 text-blue-200" />
                          <p className="text-on-dark-secondary text-blue-200"
                            style={{margin: '0'}}
                          >Email</p>
                        </div>
                          <a
                            href="mailto:info@vector.ru"
                            className="text-lg text-on-dark"
                          >
                            info@vector.ru
                          </a>
                      </div>

                      <div className="flex flex-col items-start space-x-3 gap-2">
                        <div className='flex items-center gap-2'>
                          <Clock className="h-5 w-5 text-blue-200" />
                          <p className="text-on-dark-secondary text-blue-200"
                            style={{margin: '0'}}>Режим работы</p>
                        </div>
                          <p className="text-lg text-on-dark" style={{margin: '0'}}>Ежедневно 9:00 – 21:00</p>
                      </div>

                      <div className="flex flex-col items-start space-x-3 gap-2">
                        <div className='flex items-center gap-2'>
                          <MapPin className="h-5 w-5 text-blue-200" />
                          <p className="text-on-dark-secondary text-blue-200"
                            style={{margin: '0'}}>Адрес филиала 1</p>
                        </div>
                          <p className="text-lg text-on-dark" style={{margin: '0'}}>
                            Олонец, офис «Новый Вектор»
                          </p>
                      </div>

                      {/* <div className="flex items-center space-x-3 opacity-70">
                        <MapPin className="h-5 w-5 text-blue-200" />
                        <div>
                          <p className="text-sm text-blue-200">Адрес филиала 2</p>
                          <p className="text-lg text-on-dark">
                            Будущий офис (адрес уточняется)
                          </p>
                        </div>
                      </div> */}
                    </div>

                    {/* Карта */}
                    <div className="mt-auto">
                      <div className="rounded-2xl overflow-hidden border border-white/20 shadow-nv-soft bg-slate-900/40">
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          {/* Ссылки от Яндекса можно оставить для атрибуции, 
                              но скрыть визуально, если нужно, через sr-only */}
                          <a
                            href="https://yandex.ru/maps/org/novy_vektor/87852798729/?utm_medium=mapframe&utm_source=maps"
                            style={{
                              color: '#eee',
                              fontSize: 12,
                              position: 'absolute',
                              top: 0,
                            }}
                          >
                            Новый вектор
                          </a>
                          <a
                            href="https://yandex.ru/maps/20129/olonets/category/legal_services/184105630/?utm_medium=mapframe&utm_source=maps"
                            style={{
                              color: '#eee',
                              fontSize: 12,
                              position: 'absolute',
                              top: 14,
                            }}
                          >
                            Юридические услуги в Олонце
                          </a>
                          <a
                            href="https://yandex.ru/maps/20129/olonets/category/bankruptcy_of_individuals/93680225448/?utm_medium=mapframe&utm_source=maps"
                            style={{
                              color: '#eee',
                              fontSize: 12,
                              position: 'absolute',
                              top: 28,
                            }}
                          >
                            Банкротство физических лиц в Олонце
                          </a>
                          <iframe
                            src="https://yandex.ru/map-widget/v1/org/novy_vektor/87852798729/?ll=32.972673%2C60.977810&z=16.49"
                            width="100%"
                            height="360"
                            frameBorder="1"
                            allowFullScreen={true}
                            style={{ position: 'relative' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </FadeInSection>

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
