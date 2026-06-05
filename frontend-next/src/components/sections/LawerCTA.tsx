"use client";

import Image from "next/image";
import { LeadForm } from "../forms/LeadForm";
import { Card } from "../ui/card";
import { FadeInSection } from "../ui/fadeIn";

export function LawerCTASection() {
  return (
    <section className="pb-20 ">
      <div className="nv-container">
        <FadeInSection delay={0.5}>
  <Card className="relative w-full overflow-hidden rounded-2xl border-0 bg-nv-hero shadow-nv-card px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-10">
    {/* soft background accents */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(59,130,246,0.14),transparent_32%),radial-gradient(circle_at_right_bottom,rgba(245,158,11,0.10),transparent_26%)]" />
    

    <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-8 lg:gap-10 items-center min-h-[400px]">
      {/* left text */}
      <div className="relative max-w-[520px] xl:max-w-[380px] mx-auto text-center lg:mx-0 lg:text-left">
        <h3 className="text-white text-3xl md:text-4xl leading-tight mb-4!">
          Не откладывайте решение проблем с долгами
        </h3>

        <div className="mb-6 h-px w-64 rounded-full bg-linear-to-r from-blue-400 via-blue-300 to-amber-300 mx-auto lg:mx-0" />

        <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-4! max-w-20 mx-auto lg:mx-0">
          Получите бесплатную консультацию юриста по банкротству физических лиц.
          Разберём вашу ситуацию, оценим перспективы и подскажем, какой путь
          подойдёт именно вам.
        </p>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-[40ch] mx-auto lg:mx-0">
          Перезвоним, ответим на вопросы и&nbsp;объясним&nbsp;всё&nbsp;спокойно&nbsp;и&nbsp;понятно.
        </p>
      </div>

      {/* form */}
      <div className="relative z-30 w-full max-w-[520px] mx-auto xl:ml-0">
        <div className="rounded-2xl bg-white shadow-[0_18px_60px_rgba(15,23,42,0.28)] p-5 md:p-6 ">
          <LeadForm
            title=""
            description=""
            submitLabel="Получить консультацию"
            submitLoadingLabel="Отправляем…"
            buttonClassName="btn-nv-gold mt-2 w-full"
            compact
            showModals={true}
          />
        </div>
      </div>
    </div>

    {/* lawyer */}
    <div className="hidden pointer-events-none absolute bottom-[-100px] left-95 z-10 xl:flex">
      <div className="w-[450px]">
        <Image
          src="/heroes/hero8.png"
          alt="Юрист компании Новый Вектор"
          width={420}
          height={520}
          priority
          className="h-auto w-full object-contain object-bottom drop-shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
        />
      </div>
    </div>
  </Card>
</FadeInSection>
      </div>
    </section>
  );
}