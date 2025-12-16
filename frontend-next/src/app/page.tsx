"use client";
import { useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { AboutSection } from "../components/sections/About";
import { BankruptcyInfoSection } from "../components/sections/BankruptcyInfo";
import { ContactSection } from "../components/sections/Contact";
import { FAQSection } from "../components/sections/FAQ";
import { HeroSection } from "../components/sections/Hero";
import { ProcessStepsSection } from "../components/sections/ProcessSteps";
import { QuizSection } from "../components/sections/Quiz";
import { SuccessStoriesSection } from "../components/sections/SuccessStories";
import { TrustBarSection } from "../components/sections/TrustBar";
import { LeadFormModal } from "../components/forms/LeadFormModal";


export default function Home() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  return (
    <div className="bg-nv-nero">
      <LeadFormModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
        
      <main className="min-h-screen">
        {/* Шапка и навигация */}        
        <Header onOpenLeadModal={() => setIsLeadModalOpen(true)} />
        {/* Главный экран */}
        <HeroSection />

        {/* О компании */}
        <AboutSection />

        {/* О банкротстве */}
        <BankruptcyInfoSection />
        {/* Как всё проходит (процесс) */}
        <ProcessStepsSection />

        {/* Полоса доверия */}
        <TrustBarSection />
        
        {/* Подходит ли вам процедура (тест) */}
        <QuizSection />

        {/* Истории клиентов и отзывы */}
        <SuccessStoriesSection />

        {/* Блок вопросов и ответов */}
        <FAQSection />

        {/* Контакты и форма заявки */}
        <ContactSection />

        {/* Подвал */}
        <Footer />
      </main>
    </div>
  );
}
