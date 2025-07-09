'use client';

// components/sections/FAQSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "Сколько длится процедура банкротства?",
      answer: "Процедура банкротства обычно занимает от 6 до 9 месяцев. В сложных случаях может продлиться до года."
    },
    {
      question: "Какие последствия у банкротства?",
      answer: "После завершения процедуры списываются все долги, но накладываются ограничения: нельзя занимать руководящие должности в банках, повторно объявлять банкротство в течение 5 лет."
    },
    {
      question: "Могут ли забрать единственное жилье?",
      answer: "Нет, единственное жилье не подлежит изъятию в рамках процедуры банкротства, за исключением ипотечного жилья."
    },
    {
      question: "Сколько стоит процедура банкротства?",
      answer: "Стоимость зависит от сложности дела и начинается от 50 000 рублей. Точную стоимость вы можете рассчитать с помощью нашего калькулятора."
    },
    {
      question: "Можно ли списать долги по алиментам?",
      answer: "Нет, долги по алиментам, возмещению вреда здоровью и жизни, а также уголовные штрафы не списываются при банкротстве."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-neutral-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
          <p className="text-xl text-primary-light max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о банкротстве физических лиц
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6 border-b border-gray-200 pb-6">
              <button
                className="w-full flex justify-between items-center text-left font-semibold text-lg focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-6 h-6 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}