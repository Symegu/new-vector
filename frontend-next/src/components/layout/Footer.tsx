'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });

    // setIsMobileMenuOpen(false);
  };

  return (
    <footer className="bg-nv-dark border-t border-white/10 py-6">
      <div className="nv-container space-y-6">
        {/* Верхняя часть: логотип + контакты */}
        <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-6">
          <button
            type="button"
            onClick={() => scrollToSection("contactForm")}
            className="flex min-w-0 items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src="/logo/logo-icon.svg"
              alt="Новый Вектор"
              width={48}
              height={48}
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0"
              priority
            />

            <span className="hidden sm:block h-9 w-px bg-white/80" />

            <div className="flex min-w-0 flex-col items-start leading-none">
              <span className="uppercase text-on-dark text-sm md:text-lg mt-[-3px] font-light tracking-widest whitespace-nowrap">
                НОВЫЙ ВЕКТОР
              </span>
              <span className="text-[11px] sm:text-xs lg:text-[12px]! xl:text-sm! font-light text-on-dark-secondary whitespace-nowrap">
                Банкротство физических лиц под ключ
              </span>
            </div>
          </button>

          <div className="flex flex-col xl:flex-row items-center gap-3 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <a
                href="https://vk.com/bankruptcy_new_vector"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2_40)">
                  <path d="M0.5 48C0.5 25.3726 0.5 14.0589 7.52944 7.02944C14.5589 0 25.8726 0 48.5 0H52.5C75.1274 0 86.4411 0 93.4706 7.02944C100.5 14.0589 100.5 25.3726 100.5 48V52C100.5 74.6274 100.5 85.9411 93.4706 92.9706C86.4411 100 75.1274 100 52.5 100H48.5C25.8726 100 14.5589 100 7.52944 92.9706C0.5 85.9411 0.5 74.6274 0.5 52V48Z" fill="#0077FF"/>
                  <path d="M53.7085 72.042C30.9168 72.042 17.9169 56.417 17.3752 30.417H28.7919C29.1669 49.5003 37.5834 57.5836 44.25 59.2503V30.417H55.0004V46.8752C61.5837 46.1669 68.4995 38.667 70.8329 30.417H81.5832C79.7915 40.5837 72.2915 48.0836 66.9582 51.1669C72.2915 53.6669 80.8336 60.2086 84.0836 72.042H72.2499C69.7082 64.1253 63.3754 58.0003 55.0004 57.1669V72.042H53.7085Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_2_40">
                  <rect width="100" height="100" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="https://vk.com/bankruptcy_new_vector"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light hover:text-on-dark transition-colors"
              >
                Банкротство Новый Вектор
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-light" />
              <a
                href="tel:+79675362892"
                className="text-light hover:text-on-dark transition-colors"
              >
                +7 (967) 536-28-92
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-light" />
              <a
                href="mailto:newvector.b@gmail.com"
                className="text-light hover:text-on-dark transition-colors"
              >
                newvector.b@gmail.com
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
            <Link
              href="/privacy-policy"
              className="text-light transition-colors hover:text-on-dark"
            >
              Политика конфиденциальности
            </Link>

            <Link
              href="/consent-to-processing"
              className="text-light transition-colors hover:text-on-dark"
            >
              Согласие на обработку данных
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
