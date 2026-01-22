'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export interface PolicyProps {
  onOpenPrivacy: () => void
  onOpenConsent: () => void
}

export function Footer({ onOpenPrivacy, onOpenConsent }: PolicyProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-nv-dark border-t border-white/10 py-6">
      <div className="nv-container space-y-6">
        {/* Верхняя часть: логотип + контакты */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <button
            type="button"
            onClick={() => handleScroll('contactForm')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo/logo-icon.svg"
              alt="Новый Вектор"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
            <span className="uppercase text-on-dark text-lg font-light tracking-wider">
              НОВЫЙ ВЕКТОР
            </span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-light" />
              <a
                href="tel:+79210104626"
                className="text-light hover:text-on-dark transition-colors"
              >
                +7 (921) 010-46-26
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-light" />
              <a
                href="mailto:info@vector.ru"
                className="text-light hover:text-on-dark transition-colors"
              >
                info@vector.ru
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-light" />
              <span className="text-light">
                г. Олонец / г. Петрозаводск
              </span>
            </div>
          </div>
        </div>

        {/* Нижняя полоска: копирайт + политики */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-light text-xs md:text-sm mb-0!">
            © 2025 «Новый Вектор». Все права защищены.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onOpenPrivacy()}
              style={{
                color: 'inherit',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                padding: 0,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#your-gold-color'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={() => onOpenConsent()}
              style={{
                color: 'inherit',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                padding: 0,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#your-gold-color'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              Согласие на обработку данных
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
