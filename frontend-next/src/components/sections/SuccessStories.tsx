"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { FadeInSection } from "../ui/fadeIn";
import { Badge } from "../ui/badge";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Story = {
  title: string;
  before: string;
  after: string;
  quote: string;
  person: string;
  image: string;
  colorFrom: string;
  colorTo: string;
};

const stories: Story[] = [
  {
    title: "Кредиты и МФО без просвета",
    before:
      "Несколько потребительских кредитов и займов МФО, часть платежей шла за счёт новых займов, начались регулярные просрочки и звонки коллекторов.",
    after:
      "После консультации запущена процедура банкротства. Взыскания приостановлены, по решению суда основная задолженность и пени списаны.",
    quote:
      "Наконец-то появилось чувство, что ситуация под контролем, а не наоборот. Спасибо за поддержку на каждом этапе!",
    person: "Анна, 40 лет, Петрозаводск",
    image: "/testimonials/1.jpg",
    colorFrom: "from-blue-100",
    colorTo: "to-blue-50",
  },
  {
    title: "Закрывшийся бизнес и долги ИП",
    before:
      "После закрытия малого бизнеса остались долги по кредитам и налогам. Пошли требования банков и уведомления от налоговой.",
    after:
      "Подготовлен пакет документов, введена процедура банкротства. Часть требований кредиторов оспорена, по оставшимся долгам получено списание.",
    quote:
      "Было страшно признавать, что сам не справляюсь. Поддержка юриста помогла пройти все этапы спокойно. Спасибо!",
    person: "Сергей, 45 лет, Олонец",
    image: "/testimonials/2.jpg",
    colorFrom: "from-emerald-100",
    colorTo: "to-emerald-50",
  },
  {
    title: "Защита единственного жилья",
    before:
      "Семья с единственной квартирой и крупной задолженностью по кредитам и коммунальным платежам. Страх потерять жильё.",
    after:
      "В рамках процедуры долги по кредитам и части коммунальных платежей списаны. Единственное жильё сохранено как неподлежащее реализации по закону.",
    quote:
      "После консультации стало понятно, что закон действительно защищает единственное жильё, и стало гораздо спокойнее. Спасибо за помощь!",
    person: "Ольга, 38 лет, Сегежа",
    image: "/testimonials/3.jpg",
    colorFrom: "from-amber-100",
    colorTo: "to-amber-50",
  },
  {
    title: "Поручительство за близких",
    before:
      "Поручительство по кредиту родственника, который перестал вносить платежи. Банк предъявил требования к поручителю в полном объёме.",
    after:
      "Проведён анализ документов и запущена процедура банкротства поручителя. Требования кредитора включены в реестр, по завершении процедуры задолженность списана.",
    quote:
      "Было ощущение, что расплачиваюсь за чужую ошибку. После консультации стало ясно, что есть законный путь выйти из ситуации.",
    person: "Ирина, 52 года, Лодейное Поле",
    image: "/testimonials/1.jpg",
    colorFrom: "from-sky-100",
    colorTo: "to-slate-50",
  },
  {
    title: "Кредиты после развода",
    before:
      "Общие кредиты, оформленные в браке, после развода остались на одном человеке. Доход снизился, начались просрочки и иски от кредиторов.",
    after:
      "Собраны доказательства реального финансового положения, введена процедура банкротства. Часть требований кредиторов снижена, остаток списан по завершении процедуры.",
    quote:
      "Казалось, что долговой клубок после развода никогда не распутается. С юристом удалось спокойно пройти все этапы и закрыть вопрос.",
    person: "Алексей, 36 лет, Костомукша",
    image: "/testimonials/1.jpg",
    colorFrom: "from-indigo-100",
    colorTo: "to-blue-50",
  },
];

export function SuccessStoriesSection() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16 flex flex-col items-center">
            <Badge className="inline-flex items-center rounded-full px-3 py-1 font-medium mb-4 bg-nv-badge text-blue-700 border-0 text-sm">
              Истории и отзывы
            </Badge>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg w-full">
              Примеры типичных ситуаций и отзывы людей, которые прошли процедуру
              вместе с «Новым Вектором».
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="relative">
            <button
              type="button"
              aria-label="Предыдущий отзыв"
              className="success-stories-prev hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Следующий отзыв"
              className="success-stories-next hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <Swiper
              modules={[Navigation, Pagination, A11y]}
              loop={stories.length > 3}
              speed={600}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={24}
              navigation={{
                prevEl: ".success-stories-prev",
                nextEl: ".success-stories-next",
              }}
              pagination={{
                clickable: true,
                el: ".success-stories-pagination",
              }}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                },
              }}
              className="pb-6"
            >
              {stories.map((story) => (
                <SwiperSlide key={story.title} className="h-auto">
                  <Card className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow px-4 py-5 md:p-6 min-h-[420px] md:min-h-[380px] flex flex-col h-full">
                    <div className="flex items-center space-x-4 mb-6">
                      {/* <div
                        className="w-16 h-16 rounded-full border-4 border-blue-100 bg-center bg-cover bg-no-repeat flex-shrink-0"
                        style={{
                          backgroundImage: `url(${story.image})`,
                        }}
                      /> */}
                      <div>
                        <h4 className="text-slate-900">{story.title}</h4>
                        <p className="text-slate-500 text-xs mt-1">
                          {story.person}
                        </p>
                        <div className="flex space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 text-amber-500 fill-amber-500!"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-xl bg-gradient-to-br ${story.colorFrom} ${story.colorTo} mb-4 space-y-3`}
                    >
                      <div>
                        <div className="inline-flex items-center gap-2 mb-1">
                          <span className="h-1.5 w-6 rounded-full bg-slate-400" />
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                            До обращения
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-700">
                          {story.before}
                        </p>
                      </div>

                      <div className="h-px bg-white/60" />

                      <div>
                        <div className="inline-flex items-center gap-2 mb-1">
                          <span className="h-1.5 w-6 rounded-full bg-emerald-500" />
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                            После сопровождения
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-emerald-900">
                          {story.after}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="rounded-xl bg-slate-50 px-4 py-3 border border-slate-100">
                        <div className="flex items-center gap-2 text-blue-800 mb-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <Quote className="h-4 w-4" />
                          </div>
                          <span className="text-[11px] uppercase tracking-wide font-semibold">
                            Отзыв клиента
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {story.quote}
                        </p>
                      </div>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="success-stories-pagination flex justify-center gap-2 mt-2 md:mt-4" />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}