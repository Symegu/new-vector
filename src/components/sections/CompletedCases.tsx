'use client';

import { motion } from 'framer-motion';

export default function CompletedCases() {
  const cases = [
    { id: 1, amount: "1.2 млн ₽", description: "Списано по кредитным картам" },
    { id: 2, amount: "2.7 млн ₽", description: "Списано по микрозаймам" },
    { id: 3, amount: "3.5 млн ₽", description: "Списано по ипотеке" },
    { id: 4, amount: "98%", description: "Успешных дел" },
  ];

  const stats = [
    { value: "1200+", label: "Завершенных дел" },
    { value: "5 лет", label: "Опыта работы" },
    { value: "0₽", label: "Предоплаты" },
  ];

  return (
    <section className="section-padding bg-primary-pale">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Наши завершенные дела</h2>
          <p className="text-xl text-primary-light max-w-2xl mx-auto">
            Реальные кейсы по списанию долгов через банкротство
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {cases.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-card border border-primary-light"
            >
              <div className="text-3xl font-bold text-primary mb-2">{item.amount}</div>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary-dark text-neutral-white rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-secondary mb-2">{stat.value}</div>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}