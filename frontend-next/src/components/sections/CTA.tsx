"use client";

import { ShieldCheck, HandCoins, MessageCircleHeart } from "lucide-react";
import { LeadForm } from "../forms/LeadForm";
import { Card } from "../ui/card";
import { FadeInSection } from "../ui/fadeIn";

const features = [
  {
    icon: ShieldCheck,
    title: "Личное",
    subtitle: "сопровождение",
  },
  {
    icon: HandCoins,
    title: "Рассрочка",
    subtitle: "на 12 месяцев",
  },
  {
    icon: MessageCircleHeart,
    title: "Честно объясним",
    subtitle: "перспективы дела",
  },
];

export function CTASection() {
  return (
    <section className="pb-8 md:pb-10">
      <div className="">
        <FadeInSection delay={0.5}>
          <Card className="relative w-full overflow-hidden rounded-2xl border-0 bg-light shadow-nv-card">
            {/* <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.94)_52%,rgba(30,41,59,0.92)_100%)]" /> */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_right_bottom,rgba(226,188,54,0.12),transparent_26%)]" />
            <div className="absolute inset-y-0 right-[420px] hidden xl:block w-px bg-white/10" />

            <div className="relative z-20 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_400px] gap-8 xl:gap-10 px-5 py-8 md:px-8 md:py-10 lg:px-10">
              {/* левая часть */}
              <div className="flex flex-col justify-center text-center xl:text-left">
                <div className="flex flex-col items-center gap-4 md:gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-[620px]">
                    <h3 className="text-white text-3xl md:text-4xl lg:text-[2.6rem] leading-tight mb-0">
                      Стоимость банкротства под ключ
                    </h3>
                  </div>

                  <div className="shrink-0">
                    <div className="flex items-start justify-center gap-2 xl:justify-end">
                      <span className="pt-2 text-sm md:text-base font-medium uppercase tracking-[0.08em] text-amber-200/80">
                        от
                      </span>

                      <div className="leading-none text-left">
                        <div className="text-[2.4rem] md:text-[3rem] font-semibold tracking-tight text-[var(--nv-gold)]">
                          9 990
                        </div>
                        <div className="mt-1 text-xs md:text-sm font-medium text-amber-100/85">
                          руб./мес.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.title}
                        className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white/12"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-[var(--nv-gold)]">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="mb-1 text-sm md:text-base font-semibold leading-none text-white">
                            {feature.title}
                          </p>
                          <p className="mb-0 text-sm md:text-base leading-none text-slate-200">
                            {feature.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 w-full max-w-[760px] mx-auto xl:mx-0">
                  <div className="border-t border-white/12">
                    <div className="flex items-center justify-between gap-4 py-3">
                      <span className="text-white text-base md:text-lg leading-none">
                        бесплатная консультация
                      </span>
                      <span className="shrink-0 text-[var(--nv-gold)] text-lg md:text-2xl font-semibold leading-none">
                        0 руб.
                      </span>
                    </div>

                    <div className="border-t border-white/12">
                      <div className="flex items-center justify-between gap-4 py-3">
                        <span className="text-white text-base md:text-lg leading-none">
                          банкротство под ключ
                        </span>
                        <span className="shrink-0 text-[var(--nv-gold)] text-lg md:text-2xl font-semibold leading-none">
                          от 9 990 руб.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* правая часть */}
              <div className="relative z-30 w-full max-w-[400px] mx-auto xl:mx-0">
                <div className="rounded-2xl bg-white px-5 py-5 md:px-6 md:py-6 shadow-[0_18px_60px_rgba(15,23,42,0.28)]">
                  <LeadForm
                    title=""
                    description=""
                    submitLabel="Жду звонка!"
                    submitLoadingLabel="Отправляем…"
                    buttonClassName="btn-nv-gold mt-2 w-full"
                    compact
                    showModals={true}
                  />

                  {/* <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    и даёте согласие на обработку персональных данных.
                  </p> */}
                </div>
              </div>
            </div>
          </Card>
        </FadeInSection>
      </div>
    </section>
  );
}