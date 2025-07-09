'use client';
// components/sections/ConsultationForm.tsx
import { motion } from 'framer-motion';

export default function ConsultationForm() {
  return (
    <section id="consultation" className="section-padding bg-gradient-to-r from-primary to-primary-dark text-neutral-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Запишитесь на бесплатную консультацию</h2>
            <p className="text-xl mb-8">
              Наши юристы анализируют вашу ситуацию и разрабатывают индивидуальный план действий
            </p>
            
            <ul className="space-y-4">
              {[
                "Консультация длится 30-40 минут",
                "Вы получаете четкий план действий",
                "Анализ рисков и перспектив",
                "Ответы на все ваши вопросы"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-white text-primary-dark p-8 rounded-xl shadow-xl"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Ваше имя</label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Иван Иванов"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">Телефон</label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              
              <div>
                <label htmlFor="debtAmount" className="block mb-2 font-medium">Сумма долга (₽)</label>
                <input
                  id="debtAmount"
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="500000"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Опишите вашу ситуацию</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Расскажите о ваших долгах и проблемах..."
                ></textarea>
              </div>
              
              <div className="bg-primary-pale p-4 rounded-lg">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 mr-2"
                  />
                  <span>Я согласен на обработку персональных данных и получение информации</span>
                </label>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-primary-dark font-bold py-4 px-6 rounded-lg transition"
              >
                Отправить заявку
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}