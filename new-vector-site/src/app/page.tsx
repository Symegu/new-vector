
// app/page.tsx
import Head from 'next/head';
import Link from 'next/link';
import '@/app/globals.css';

// Заглушка для SEO-данных
async function fetchSeoData() {
  return {
    title: "Юридическая помощь по банкротству физических лиц | СПб",
    description: "Профессиональное сопровождение процедуры банкротства. Списание долгов законно. Первичная консультация бесплатно!",
    keywords: "банкротство физ лиц, списание долгов, закон о банкротстве, финансовая несостоятельность, процедура банкротства"
  };
}

export default async function Home() {
  const seoData = await fetchSeoData();

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
      </Head>
      
      <main className="container mx-auto py-8 px-4">
        {/* Герой-секция */}
        <section className="bg-blue-50 rounded-xl p-8 mb-12 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Банкротство физических лиц в Санкт-Петербурге
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Законное списание долгов через процедуру банкротства. 
            Избавьтесь от кредитов, микрозаймов и долгов перед коллекторами.
          </p>
          <Link 
            href="#consultation" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Бесплатная консультация
          </Link>
        </section>

        {/* Услуги */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
            Наши услуги по банкротству
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Полное сопровождение",
                desc: "От подачи заявления до списания долгов",
                price: "от 50 000 ₽"
              },
              {
                title: "Консультация юриста",
                desc: "Анализ вашей ситуации и план действий",
                price: "Бесплатно"
              },
              {
                title: "Подготовка документов",
                desc: "Сбор и оформление необходимых бумаг",
                price: "от 15 000 ₽"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-blue-800 mb-3">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.desc}</p>
                <div className="font-bold text-lg">{service.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Этапы процедуры */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
            Этапы процедуры банкротства
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              "Консультация и анализ документов",
              "Подготовка заявления в арбитражный суд",
              "Назначение финансового управляющего",
              "Реструктуризация долгов или реализация имущества",
              "Завершение процедуры и списание долгов"
            ].map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Форма консультации */}
        <section id="consultation" className="bg-blue-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Бесплатная консультация юриста
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Оставьте заявку и наш специалист свяжется с вами в течение 15 минут
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Ваше имя" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <input 
                type="tel" 
                placeholder="Телефон" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <textarea 
                placeholder="Опишите вашу ситуацию" 
                className="w-full p-3 border border-gray-300 rounded-lg h-32"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              Получить консультацию
            </button>
          </form>
        </section>
      </main>
    </>
  );
}