export default function Hero() {
    return (
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-primary-pale to-neutral-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Законное списание долгов через банкротство
            </h1>
            <p className="text-xl md:text-2xl text-primary-light mb-8">
              Избавьтесь от кредитов, микрозаймов и долгов перед коллекторами по ФЗ-127
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn-primary">
                Бесплатная консультация
              </button>
              <button className="btn-secondary">
                Калькулятор банкротства
              </button>
            </div>
          </div>
        </div>
        
        {/* Декоративные элементы */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary-light rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-light rounded-full opacity-10"></div>
      </section>
    );
  }