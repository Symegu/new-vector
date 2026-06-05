import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://novy-vector.ru";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description:
    "Согласие на обработку персональных данных для отправки заявки на сайте юридической фирмы «Новый Вектор».",
  alternates: {
    canonical: `${siteUrl}/consent-to-processing`,
  },
};

export default function ConsentToProcessingPage() {
  return (
    <main className="bg-nv-section-light min-h-screen">
      <section className="nv-section pt-32 md:pt-36">
        <div className="nv-container">
          <div className="mx-auto max-w-4xl">
            <nav
              aria-label="Хлебные крошки"
              className="mb-6 text-sm text-secondary"
            >
              <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
                <li>
                  <Link href="/" className="hover:underline">
                    Главная
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-primary">Согласие на обработку персональных данных</li>
              </ol>
            </nav>

            <header className="mb-8 md:mb-10">
              <div className="mb-4 inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm text-secondary shadow-nv-soft ring-1 ring-slate-200/70">
                Юридическая информация
              </div>

              <h1 className="nv-title mb-4 text-4xl md:text-5xl">
                Согласие на обработку персональных данных
              </h1>

              <p className="nv-subtitle max-w-3xl text-base md:text-lg leading-relaxed">
                Документ описывает согласие субъекта персональных данных на обработку
                сведений, передаваемых через формы сайта.
              </p>
            </header>

            <article className="rounded-3xl border border-slate-200/70 bg-white shadow-nv-card">
              <div className="border-b border-slate-200/80 px-6 py-5 md:px-8">
                <p className="mb-2 text-sm text-secondary">
                  Оператор: ИП Пантелеева Ирина Ивановна
                </p>
                <p className="mb-0 text-sm text-secondary">
                  Документ действует для форм на сайте{" "}
                  <a
                    href={siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    {siteUrl}
                  </a>
                </p>
              </div>

              <div className="px-6 py-8 md:px-8 md:py-10">
                <section className="mb-8">
                  <div className="space-y-4 text-base leading-relaxed text-primary">
                    <p>
                      Я, субъект персональных данных, свободно, своей волей и в своем
                      интересе даю конкретное, информированное и сознательное согласие
                      ИП Пантелеева Ирина Ивановна (ИНН 101400677313, г. Олонец) на
                      обработку моих персональных данных в соответствии со ст. 9
                      Федерального закона от 27.07.2006 №152-ФЗ «О персональных
                      данных».
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    1. Перечень персональных данных
                  </h2>
                  <ul className="space-y-3 text-base leading-relaxed text-primary">
                    <li>Фамилия, имя, отчество.</li>
                    <li>Номер телефона.</li>
                    <li>Адрес электронной почты.</li>
                    <li>Иные сведения, добровольно указанные в форме обращения.</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    2. Цели обработки
                  </h2>
                  <ul className="space-y-3 text-base leading-relaxed text-primary">
                    <li>Консультации по банкротству физических лиц и помощи с долгами.</li>
                    <li>Обратная связь по заявке.</li>
                    <li>Подготовка, заключение и исполнение договоров.</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    3. Действия с персональными данными
                  </h2>
                  <ul className="space-y-3 text-base leading-relaxed text-primary">
                    <li>Сбор.</li>
                    <li>Запись.</li>
                    <li>Систематизация.</li>
                    <li>Хранение.</li>
                    <li>Использование.</li>
                    <li>Уточнение, изменение и удаление в случаях, предусмотренных законом.</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    4. Условия хранения и передачи
                  </h2>
                  <ul className="space-y-3 text-base leading-relaxed text-primary">
                    <li>Данные хранятся в PostgreSQL на серверах, расположенных в РФ.</li>
                    <li>Срок хранения — до 3 лет или до отзыва согласия, если иное не требуется законом.</li>
                    <li>Передача третьим лицам не осуществляется, кроме случаев, прямо предусмотренных законодательством РФ.</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    5. Отзыв согласия
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed text-primary">
                    <p>
                      Согласие может быть отозвано субъектом персональных данных путем
                      направления письменного или электронного обращения Оператору.
                    </p>
                    <p>
                      Адрес для отзыва согласия:{" "}
                      <a
                        href="mailto:newvector.b@gmail.com"
                        className="underline hover:no-underline"
                      >
                        newvector.b@gmail.com
                      </a>
                      .
                    </p>
                  </div>
                </section>

                <section>
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                    <p className="mb-2 text-sm font-medium text-blue-900">
                      Правовое основание
                    </p>
                    <p className="mb-0 text-sm leading-relaxed text-blue-800">
                      Ст. 6 и ст. 9 Федерального закона от 27.07.2006 №152-ФЗ
                      «О персональных данных».
                    </p>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}