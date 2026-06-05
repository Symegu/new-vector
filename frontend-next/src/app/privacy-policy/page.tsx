import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://novy-vector.ru";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description:
    "Политика в отношении обработки персональных данных юридической фирмы «Новый Вектор».",
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
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
                <li className="text-primary">Политика обработки персональных данных</li>
              </ol>
            </nav>

            <header className="mb-8 md:mb-10">
              <div className="mb-4 inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm text-secondary shadow-nv-soft ring-1 ring-slate-200/70">
                Юридическая информация
              </div>

              <h1 className="nv-title mb-4 text-4xl md:text-5xl">
                Политика в отношении обработки персональных данных
              </h1>

              <p className="nv-subtitle max-w-3xl text-base md:text-lg leading-relaxed">
                Настоящий документ определяет порядок обработки и защиты персональных
                данных посетителей сайта юридической фирмы «Новый Вектор».
              </p>
            </header>

            <article className="rounded-3xl border border-slate-200/70 bg-white shadow-nv-card">
              <div className="border-b border-slate-200/80 px-6 py-5 md:px-8">
                <p className="mb-2 text-sm text-secondary">
                  Оператор: ИП Пантелеева Ирина Ивановна
                </p>
                <p className="mb-0 text-sm text-secondary">
                  Сайт:{" "}
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
                <section className="mb-10">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    1. Общие положения
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed text-primary">
                    <p>
                      1.1. Настоящая политика составлена в соответствии с требованиями
                      Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных»
                      и определяет порядок обработки персональных данных,
                      предпринимаемый ИП Пантелеева Ирина Ивановна (ИНН 101400677313)
                      (далее — Оператор).
                    </p>
                    <p>
                      1.2. Оператор обеспечивает соблюдение прав субъектов
                      персональных данных, включая защиту частной жизни и семейной
                      тайны.
                    </p>
                    <p>
                      1.3. Политика применяется к посетителям сайта novy-vector.ru.
                    </p>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    2. Перечень персональных данных
                  </h2>
                  <ol className="space-y-3 text-base leading-relaxed text-primary">
                    <li>2.1. Фамилия, имя, отчество.</li>
                    <li>2.2. Номер телефона.</li>
                    <li>2.3. Адрес электронной почты.</li>
                    <li>2.4. Обезличенные данные (cookies Google Analytics 4).</li>
                  </ol>
                </section>

                <section className="mb-10">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    3. Цели обработки
                  </h2>
                  <ol className="space-y-3 text-base leading-relaxed text-primary">
                    <li>
                      3.1. Обработка заявок и консультации по банкротству физических
                      лиц.
                    </li>
                    <li>3.2. Заключение и исполнение договоров.</li>
                    <li>3.3. Обратная связь с клиентами.</li>
                    <li>3.4. Аналитика посещаемости (обезличенная).</li>
                  </ol>
                </section>

                <section className="mb-10">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    4. Условия хранения
                  </h2>
                  <ol className="space-y-3 text-base leading-relaxed text-primary">
                    <li>
                      4.1. Хранение в PostgreSQL на серверах в РФ — 3 года или до
                      отзыва согласия.
                    </li>
                    <li>
                      4.2. Не передаются третьим лицам (кроме судов/МФЦ по закону).
                    </li>
                    <li>4.3. Защита: шифрование, доступ по ролям.</li>
                  </ol>
                </section>

                <section className="mb-10">
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    5. Права субъекта персональных данных
                  </h2>
                  <ol className="space-y-3 text-base leading-relaxed text-primary">
                    <li>5.1. Запросить информацию об обработке.</li>
                    <li>5.2. Уточнить или удалить данные.</li>
                    <li>
                      5.3. Отозвать согласие по электронной почте:{" "}
                      <a
                        href="mailto:newvector.b@gmail.com"
                        className="underline hover:no-underline"
                      >
                        newvector.b@gmail.com
                      </a>
                      .
                    </li>
                    <li>5.4. Обратиться в Роскомнадзор.</li>
                  </ol>
                </section>

                <section>
                  <h2 className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-primary">
                    6. Контакты Оператора
                  </h2>

                  <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-primary">
                        Оператор
                      </p>
                      <p className="mb-1 text-sm text-secondary">
                        ИП Пантелеева Ирина Ивановна
                      </p>
                      <p className="mb-0 text-sm text-secondary">
                        ИНН 101400677313, г. Олонец
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-primary">
                        Контакты
                      </p>
                      <p className="mb-1 text-sm text-secondary">
                        <a
                          href="mailto:newvector.b@gmail.com"
                          className="underline hover:no-underline"
                        >
                          newvector.b@gmail.com
                        </a>
                      </p>
                      <p className="mb-0 text-sm text-secondary">
                        <a
                          href="tel:+79210104626"
                          className="underline hover:no-underline"
                        >
                          +7 (921) 010-46-26
                        </a>
                      </p>
                    </div>
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