export default function Header() {
    return (
      <header className="bg-primary-dark text-neutral-white py-4 sticky top-0 z-50">
        <div className="container-custom flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Новый вектор</h1>
            <p className="text-xs opacity-80">Юридическая помощь с гарантией результата</p>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {['Услуги', 'О компании', 'Этапы', 'Отзывы', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-secondary transition">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div>
            <a href="tel:+78121234567" className="font-semibold flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2" />
              +7 (812) 123-45-67
            </a>
          </div>
        </div>
      </header>
    );
  }
  
  function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    );
  }