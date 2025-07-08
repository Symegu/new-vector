export default function WhyChooseUs() {
    const reasons = [
      {
        title: "Профессиональные юристы",
        description: "Наши специалисты с опытом работы более 5 лет в сфере банкротства"
      },
      {
        title: "Фиксированная стоимость",
        description: "Цена известна заранее и не меняется в процессе работы"
      },
      {
        title: "Без предоплаты",
        description: "Оплата только после успешного завершения процедуры"
      },
      {
        title: "Конфиденциальность",
        description: "Полная анонимность и защита ваших персональных данных"
      }
    ];
  
    return (
      <section className="section-padding bg-neutral-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-primary-light max-w-2xl mx-auto">
              Профессиональное сопровождение банкротства с гарантией результата
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div 
                key={index} 
                className="bg-neutral-white p-6 rounded-xl shadow-card border border-primary-pale"
              >
                <div className="w-12 h-12 bg-primary-pale rounded-full flex items-center justify-center mb-4">
                  <CheckIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-secondary-dark">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  }