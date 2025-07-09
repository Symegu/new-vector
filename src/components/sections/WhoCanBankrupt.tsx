export default function WhoCanBankrupt() {
    return (
      <section className="section-padding bg-primary-dark text-neutral-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Кто может списать долги по ФЗ-127</h2>
              <p className="text-lg mb-8">
                Закон о банкротстве физических лиц позволяет списать долги при соблюдении определенных условий
              </p>
              
              <ul className="space-y-4">
                {[
                  "Долг более 500 000 рублей",
                  "Просрочка платежей более 3 месяцев",
                  "Отсутствие возможности погасить долги",
                  "Наличие официального статуса неплатежеспособности"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-secondary mr-2 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-primary-light/10 p-8 rounded-xl">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 border-2 border-dashed rounded-xl w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }