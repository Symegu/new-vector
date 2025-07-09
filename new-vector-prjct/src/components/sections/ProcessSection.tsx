'use client';

// components/sections/ProcessSection.tsx
import { motion } from 'framer-motion';

export default function ProcessSection() {
  const steps = [
    {
      step: 1,
      title: "Консультация",
      description: "Анализ вашей ситуации и оценка возможности банкротства"
    },
    {
      step: 2,
      title: "Подготовка документов",
      description: "Сбор необходимых документов и составление заявления"
    },
    {
      step: 3,
      title: "Подача заявления",
      description: "Официальное обращение в арбитражный суд"
    },
    {
      step: 4,
      title: "Процедура банкротства",
      description: "Реализация имущества или реструктуризация долгов"
    },
    {
      step: 5,
      title: "Списание долгов",
      description: "Полное освобождение от долговых обязательств"
    }
  ];

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Этапы процедуры банкротства</h2>
          <p className="text-xl text-primary-light max-w-2xl mx-auto">
            Процесс проходит в несколько этапов под контролем финансового управляющего
          </p>
        </div>
        
        <div className="relative">
          {/* Линия процесса */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 p-6">
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-4xl font-bold text-accent mb-4">{step.step}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </motion.div>
                </div>
                
                <div className="md:w-1/2 flex justify-center">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {step.step}
                  </motion.div>
                </div>
                
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}