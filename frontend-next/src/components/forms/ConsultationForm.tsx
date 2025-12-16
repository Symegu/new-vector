'use client'

import { useState } from 'react'
import {
  Users,
  Phone,
  Mail,
  FileCheck,
  ArrowRight,
  MapPin,
  Clock,
} from 'lucide-react'
import { Card } from '../ui/card'
import { FadeInSection } from '../ui/fadeIn'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'


type ContactFormData = {
  name: string
  phone: string
  email: string
  message: string
}

export function ConsultationForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/leads`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'landing_contact',
            ...formData,
          }),
        }
      )

      if (res.ok) {
        setStatus('success')
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeInSection delay={0.3}>
      <div className="max-w-5xl mx-auto" id="contactForm">
        <Card className="bg-white/95 backdrop-blur-xl border-white/20 shadow-nv-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Form Side */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-primary mb-2">Заполните форму</h3>
                <p className="text-secondary">
                  Мы свяжемся с вами, чтобы обсудить детали и ответить на вопросы.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-primary mb-3 flex items-center space-x-2"
                  >
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>Ваше имя *</span>
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Иван Иванов"
                    required
                    className="bg-slate-50 border-slate-200 text-primary placeholder:text-slate-400 h-14 text-lg px-5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-primary block mb-3 flex items-center space-x-2"
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>Телефон *</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+7 (999) 123-45-67"
                    required
                    className="bg-slate-50 border-slate-200 text-primary placeholder:text-slate-400 h-14 text-lg px-5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-primary block mb-3 flex items-center space-x-2"
                  >
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>Email *</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="ivan@example.com"
                    required
                    className="bg-slate-50 border-slate-200 text-primary placeholder:text-slate-400 h-14 text-lg px-5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-primary block mb-3 flex items-center space-x-2"
                  >
                    <FileCheck className="h-4 w-4 text-blue-600" />
                    <span>Опишите вашу ситуацию</span>
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Расскажите о задолженности, количестве кредиторов и других важных моментах"
                    rows={4}
                    className="bg-slate-50 border-slate-200 text-primary placeholder:text-slate-400 resize-none px-5 py-4 text-lg rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-nv-gold w-full py-7 text-xl rounded-xl shadow-nv-card disabled:opacity-70 disabled:cursor-not-allowed my-7"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isSubmitting ? 'Отправляем…' : 'Получить консультацию'}
                    <ArrowRight />
                  </span>
                </button>

                {status === 'success' && (
                  <p className="text-emerald-600 text-xs text-center">
                    Заявка отправлена. Мы свяжемся с вами в ближайшее рабочее время.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-xs text-center">
                    Не удалось отправить заявку. Попробуйте ещё раз или позвоните по телефону.
                  </p>
                )}

                <p className="text-muted text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  и обработкой персональных данных.
                </p>
              </form>
            </div>

            {/* Info + Map Side */}
            <div className="bg-light p-8 md:p-12 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col gap-8 h-full">
                {/* Контакты */}
                <h3 className="mb-8 text-on-dark">Контакты</h3>
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
  )
}
