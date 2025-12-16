'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
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
          <p className="text-light text-xs md:text-sm">
            © 2025 «Новый Вектор». Все права защищены.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="text-light hover:text-on-dark text-xs md:text-sm transition-colors"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="text-light hover:text-on-dark text-xs md:text-sm transition-colors"
            >
              Согласие на обработку данных
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
