export default function DebtsTypes() {
    const debtTypes = [
      {
        type: "Кредитные",
        examples: ["Банковские кредиты", "Кредитные карты", "Автокредиты"]
      },
      {
        type: "Микрозаймы",
        examples: ["Займы в МФО", "Кредиты до зарплаты", "Экспресс-займы"]
      },
      {
        type: "Коммунальные",
        examples: ["Долги за ЖКХ", "Электроэнергия", "Газоснабжение"]
      },
      {
        type: "Налоговые",
        examples: ["Налог на имущество", "Транспортный налог", "НДФЛ"]
      }
    ];
  
    return (
      <section className="section-padding bg-neutral-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Какие долги можно списать</h2>
            <p className="text-xl text-primary-light max-w-2xl mx-auto">
              Банкротство позволяет списать практически любые виды долговых обязательств
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {debtTypes.map((debt, index) => (
              <div 
                key={index} 
                className="bg-primary-pale p-6 rounded-xl border border-primary-light"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{debt.type}</h3>
                <ul className="space-y-2">
                  {debt.examples.map((example, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></div>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg mb-6">
              Не списываются: алименты, возмещение вреда здоровью, долги по зарплате
            </p>
            <button className="btn-primary">
              Проверить мои долги
            </button>
          </div>
        </div>
      </section>
    );
  }