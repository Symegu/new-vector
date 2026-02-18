"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

type HeaderProps = {
  onOpenLeadModal: () => void;
};

export function Header({ onOpenLeadModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled
          ? "bg-nv-dark-soft backdrop-blur-xl shadow-nv-header border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="nv-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("contactForm")}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { id: "about", label: "О нас" },
              { id: "quiz", label: "Тест" },
              { id: "testimonials", label: "Отзывы" },
              { id: "faq", label: "Вопросы" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-on-dark-secondary hover:text-on-dark transition-colors text-md font-normal"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Contact Info + CTA */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2 text-on-dark-secondary">
              <Phone className="icon-sm shrink-0 icon-light" />
              <span className="whitespace-nowrap text-sm font-normal">
                +7 (921) 010-46-26
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenLeadModal}
              className="btn-nv-blue"
            >
              Консультация
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-on-dark p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Открыть меню"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 bg-nv-dark-soft backdrop-blur-xl rounded-lg mt-2 mb-4 border border-white/10">
            <nav className="flex flex-col gap-3 px-4">
              {[
                { id: "about", label: "О компании" },
                { id: "bankruptcy-info", label: "О банкротстве" },
                { id: "process", label: "Как всё проходит" },
                { id: "testimonials", label: "Истории клиентов" },
                { id: "faq", label: "Вопросы и ответы" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-on-dark-secondary hover:text-on-dark text-left transition-colors py-2 text-sm font-normal"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-on-dark-secondary shrink-0">
                  <Phone className="icon-sm shrink-0 icon-light" />
                  <span className="underline text-sm font-normal">
                    +7 (921) 010-46-26
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenLeadModal}
                  className="btn-nv-blue"
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
