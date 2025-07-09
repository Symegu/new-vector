'use client';
// components/sections/BankruptcyTest.tsx
import { motion } from 'framer-motion';

export default function BankruptcyTest() {
  const questions = [
    "Сумма ваших долгов превышает 500 000 рублей?",
    "Просрочка по платежам составляет более 3 месяцев?",
    "У вас есть недвижимость или автомобиль?",
    "Вы получаете официальную зарплату?",
    "Есть ли у вас задолженность по алиментам или возмещению вреда здоровью?"
  ];
  
  return (
    <section id="test" className="section-padding bg-primary-dark text-neutral-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Проверьте возможность банкротства</h2>
          <p className="text-xl text-primary-pale max-w-2xl mx-auto">
            Ответьте на 5 вопросов, чтобы узнать, подходит ли вам процедура банкротства
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Вопрос 1 из 5</span>
              <span>20%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-secondary h-2.5 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-8 text-center">{questions[0]}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="bg-secondary hover:bg-secondary/90 text-primary-dark font-bold py-4 px-6 rounded-lg transition cursor-pointer"
            >
              Да
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="bg-primary-pale/20 hover:bg-primary-pale/30 text-neutral-white font-bold py-4 px-6 rounded-lg transition cursor-pointer"
            >
              Нет
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}