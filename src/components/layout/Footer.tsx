export default function Footer() {
    return (
      <footer className="bg-primary-dark text-neutral-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ЮрБанкрот</h3>
              <p className="text-primary-pale">
                Профессиональное юридическое сопровождение процедуры банкротства физических лиц
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2">
                {['Банкротство физлиц', 'Списание долгов', 'Юридические консультации', 'Защита от коллекторов'].map((service, i) => (
                  <li key={i}><a href="#" className="text-primary-pale hover:text-secondary transition">{service}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <address className="not-italic text-primary-pale">
                <p>СПб, Невский пр-т, д. 100</p>
                <p className="mt-2">+7 (812) 123-45-67</p>
                <p className="mt-2">info@ur-bankrot.ru</p>
              </address>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Часы работы</h4>
              <p className="text-primary-pale">
                Пн-Пт: 9:00 - 20:00<br />
                Сб: 10:00 - 18:00<br />
                Вс: выходной
              </p>
            </div>
          </div>
          
          <div className="border-t border-primary-light mt-12 pt-8 text-center text-primary-pale">
            © {new Date().getFullYear()} ЮрБанкрот. Все права защищены.
          </div>
        </div>
      </footer>
    );
  }