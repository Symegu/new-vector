"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

type HeaderProps = {
  onOpenLeadModal: () => void;
};

const desktopNavItems = [
  { id: "about", label: "О нас" },
  { id: "quiz", label: "Тест" },
  { id: "testimonials", label: "Отзывы" },
  { id: "faq", label: "Вопросы" },
];

const mobileNavItems = [
  { id: "about", label: "О компании" },
  { id: "bankruptcy-info", label: "О банкротстве" },
  { id: "testimonials", label: "Истории клиентов" },
  { id: "faq", label: "Вопросы и ответы" },
];

export function Header({ onOpenLeadModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });

    setIsMobileMenuOpen(false);
  };

  const handleAnchorClick = (id: string) => {
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-nv-dark-soft backdrop-blur-xl shadow-nv-header border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="nv-container">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          <button
            type="button"
            onClick={() => handleAnchorClick("hero")}
            className="flex min-w-0 items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-300"
            aria-label="Перейти к началу страницы"
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

          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 2xl:gap-12" aria-label="Основная навигация">
            {desktopNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchorClick(item.id);
                }}
                className="text-on-dark-secondary hover:text-on-dark transition-colors duration-300 lg:text-[14px]! xl:text-[16px]! 2xl:text-base font-normal"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className="flex items-center gap-2 text-on-dark-secondary">
              <Phone className="icon-xs shrink-0 icon-light" />
              <a
                href="tel:+79210104626"
                className="whitespace-nowrap text-sm xl:text-[15px] font-normal hover:text-on-dark transition-colors duration-300"
              >
                +7 (921) 010-46-26
              </a>
            </div>
            <button
              type="button"
              onClick={onOpenLeadModal}
              className="btn-nv-blue px-4 xl:px-6"
            >
              Консультация
            </button>
          </div>

          <button
            type="button"
            className="lg:hidden flex h-10 w-10 items-center justify-center text-on-dark rounded-lg hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden py-4 bg-nv-dark-soft backdrop-blur-xl rounded-lg mt-2 mb-4 border border-white/10"
          >
            <nav className="flex flex-col gap-3 px-4" aria-label="Мобильная навигация">
              {mobileNavItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick(item.id);
                  }}
                  className="text-on-dark-secondary hover:text-on-dark text-left transition-colors duration-300 py-2 text-sm font-normal"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="flex items-center gap-2 text-on-dark-secondary">
                  <Phone className="icon-sm shrink-0 icon-light" />
                  <a
                    href="tel:+79210104626"
                    className="underline text-sm font-normal whitespace-nowrap"
                  >
                    +7 (921) 010-46-26
                  </a>
                </div>

                <button
                  type="button"
                  onClick={onOpenLeadModal}
                  className="btn-nv-blue max-w-30 w-full md:w-20 justify-center"
                >
                  Консультация
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}