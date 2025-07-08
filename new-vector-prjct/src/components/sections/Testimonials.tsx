import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ирина Смирнова",
      position: "Списано 1.8 млн ₽",
      content: "После потери работы не смогла платить по кредитам. Долг рос, начали звонить коллекторы. Обратилась в 'Новый Вектор' - через 8 месяцев долги полностью списаны. Огромное спасибо за профессионализм!",
      rating: 5
    },
    {
      id: 2,
      name: "Дмитрий Волков",
      position: "Списано 2.3 млн ₽",
      content: "Накопил несколько микрозаймов и кредитных карт. Юристы компании провели процедуру банкротства, сохранили мою квартиру. Теперь я свободен от долгов и могу строить жизнь заново.",
      rating: 5
    },
    {
      id: 3,
      name: "Ольга Козлова",
      position: "Списано 3.1 млн ₽",
      content: "Банкротство казалось чем-то страшным, но специалисты 'Нового Вектора' все подробно объяснили и сопровождали на всех этапах. Результат превзошел ожидания - все долги списаны законно.",
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-primary-dark text-neutral-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Отзывы наших клиентов</h2>
          <p className="text-xl text-primary-pale max-w-2xl mx-auto">
            Реальные истории людей, избавившихся от долгового бремени
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white/10 backdrop-blur-sm h-full p-6 rounded-xl border border-white/20">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-secondary' : 'text-gray-500'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-primary-pale">{testimonial.position}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}