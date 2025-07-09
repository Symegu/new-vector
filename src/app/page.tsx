import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Achievements from '@/components/sections/Achievements';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import WhoCanBankrupt from '@/components/sections/WhoCanBankrupt';
import DebtsTypes from '@/components/sections/DebtsTypes';
import BankruptcyTest from '@/components/sections/BankruptcyTest';
import CompletedCases from '@/components/sections/CompletedCases';
import CostCalculator from '@/components/sections/CostCalculator';
import ProcessSection from '@/components/sections/ProcessSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import DebtPitfall from '@/components/sections/DebtPitfall';
import Testimonials from '@/components/sections/Testimonials';
import ConsultationForm from '@/components/sections/ConsultationForm';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/layout/Footer';


export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-white text-primary-dark">
      <Header />
      <main>
        <Hero />
        <Achievements />
        <WhyChooseUs />
        <WhoCanBankrupt />
        <DebtsTypes />
        <BankruptcyTest />
        <CompletedCases />
        <CostCalculator />
        <ProcessSection />
        <BenefitsSection />
        <DebtPitfall />
        <Testimonials />
        <ConsultationForm />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}