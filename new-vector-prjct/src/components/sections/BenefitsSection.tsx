'use client';

import { motion } from 'framer-motion';

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Финансовая свобода",
      description: "Избавление от долгового бремени и возобновление финансовой стабильности"
    },
    {
      title: "Защита от коллекторов",
      description: "Прекращение звонков, писем и визитов коллекторских агентств"
    },
    {
      title: "Сохранение имущества",
      description: "Законная защита необходимого имущества от изъятия"
    },
    {
      title: "Возобновление кредитной истории",
      description: "Возможность начать финансовую жизнь с чистого листа"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-neutral-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Выгоды списания долгов</h2>
          <p className="text-xl text-primary-pale max-w-2xl mx-auto">
            Что вы получите после успешного завершения процедуры банкротства
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
            >
              <div className="text-4xl font-bold text-secondary mb-4">{index + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}