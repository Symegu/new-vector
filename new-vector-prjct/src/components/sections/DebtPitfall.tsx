'use client';

import { motion } from 'framer-motion';

export default function DebtPitfall() {
  return (
    <section className="section-padding bg-neutral-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Почему кредиты - это финансовая пропасть?</h2>
            
            <div className="space-y-4">
              {[
                "Рост задолженности из-за высоких процентов",
                "Постоянный стресс и давление со стороны кредиторов",
                "Риск потери имущества и жилья",
                "Ограничение финансовых возможностей на годы вперед",
                "Невозможность взять новый кредит для решения текущих проблем"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-primary-pale rounded-lg border border-primary-light">
              <p className="font-semibold">Решение есть - банкротство физических лиц позволяет законно списать долги и начать жизнь с чистого листа.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}