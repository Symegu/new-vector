"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { AboutSection } from "../sections/About";
import { BankruptcyInfoSection } from "../sections/BankruptcyInfo";
import { ContactSection } from "../sections/Contact";
import { FAQSection } from "../sections/FAQ";
import { HeroSection } from "../sections/Hero";
import { ProcessStepsSection } from "../sections/ProcessSteps";
import { QuizSection } from "../sections/Quiz";
import { TrustBarSection } from "../sections/TrustBar";
import { LeadFormModal } from "../modals/LeadFormModal";
import { LawerCTASection } from "../sections/LawerCTA";

const SuccessStoriesSection = dynamic(
  () =>
    import("../sections/SuccessStories").then(
      (mod) => mod.SuccessStoriesSection
    ),
  {
    ssr: false,
    loading: () => (
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-4 h-7 w-36 animate-pulse rounded-full bg-slate-200" />
            <div className="mb-3 h-5 w-full max-w-2xl animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-3/4 max-w-xl animate-pulse rounded bg-slate-100" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-h-[380px] rounded-2xl border border-slate-200 bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

export function HomeClientShell() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="bg-nv-nero">
      <LeadFormModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      <main className="min-h-screen">
        <Header onOpenLeadModal={() => setIsLeadModalOpen(true)} />
        <HeroSection />
        <AboutSection />
        <BankruptcyInfoSection />
        <ProcessStepsSection />
        <TrustBarSection />
        <QuizSection />
        <SuccessStoriesSection />
        <LawerCTASection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}