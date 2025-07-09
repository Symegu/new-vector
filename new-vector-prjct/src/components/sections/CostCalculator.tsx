'use client';
// components/sections/CostCalculator.tsx
import { motion } from 'framer-motion';

export default function CostCalculator() {
  // Статические данные для демонстрации
  const basePrice = 50000;
  const propertyFee = 20000;
  const creditorsFee = 10000;
  const totalPrice = basePrice + propertyFee + creditorsFee;
  const installmentPrice = Math.round(totalPrice / 3);

  return (
    <section id="calculator" className="section-padding bg-neutral-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Калькулятор стоимости банкротства</h2>
          <p className="text-xl text-primary-light max-w-2xl mx-auto">
            Примерная стоимость процедуры банкротства
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-pale p-8 rounded-xl"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">
                  Сумма долга: <span className="font-bold">500 000 ₽</span>
                </label>
                <div className="w-full h-2 bg-gray-300 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>50 000 ₽</span>
                  <span>5 000 000 ₽</span>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-2">
                  Количество объектов имущества: 2
                </label>
                <div className="flex space-x-4">
                  {['Нет имущества', '1 объекта', '2 объекта', '3+ объекта'].map((text, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 rounded-lg transition ${
                        i === 2 
                          ? 'bg-primary text-white' 
                          : 'bg-white'
                      }`}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-2">
                  Количество кредиторов: 4
                </label>
                <div className="flex items-center">
                  <button className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center opacity-50">
                    -
                  </button>
                  <span className="mx-4 text-xl">4</span>
                  <button className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center opacity-50">
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-primary-dark text-neutral-white p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-6">Пример расчета стоимости</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span>Базовая стоимость:</span>
                <span className="font-bold">50 000 ₽</span>
              </div>
              
              <div className="flex justify-between">
                <span>Доплата за имущество (2):</span>
                <span className="font-bold">+20 000 ₽</span>
              </div>
              
              <div className="flex justify-between">
                <span>Доплата за кредиторов (более 3):</span>
                <span className="font-bold">+10 000 ₽</span>
              </div>
              
              <div className="border-t border-gray-600 pt-4 mt-4 flex justify-between text-xl">
                <span>Итого:</span>
                <span className="font-bold text-secondary">80 000 ₽</span>
              </div>
            </div>
            
            <div className="bg-secondary/10 p-4 rounded-lg mb-8">
              <p className="mb-3">В стоимость включено:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Полное юридическое сопровождение</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Подготовка всех документов</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Представительство в суде</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary-pale/20 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Рассрочка на 3 месяца:</h4>
              <div className="flex items-center justify-between">
                <span>Ежемесячный платеж:</span>
                <span className="font-bold text-lg">26 667 ₽</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}