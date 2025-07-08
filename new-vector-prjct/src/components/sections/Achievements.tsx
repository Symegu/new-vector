export default function Achievements() {
    const stats = [
      { value: '1200+', label: 'Завершенных дел' },
      { value: '98%', label: 'Успешных банкротств' },
      { value: '5 лет', label: 'Опыта работы' },
      { value: '0₽', label: 'Предоплаты' },
    ];
    
    return (
      <section className="py-16 bg-primary text-neutral-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold mb-2 text-secondary">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }