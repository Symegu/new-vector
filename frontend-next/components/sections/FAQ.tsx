'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { FadeInSection } from '@/components/ui/fadeIn'

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative py-20 bg-linear-to-br from-slate-100 via-blue-50 to-slate-100 overflow-hidden"
    >
      {/* background */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-slate-50 to-blue-50" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              FAQ
            </Badge>
            <h2 className="text-slate-900 mb-4">
              Частые вопросы о банкротстве
            </h2>
            <p className="text-slate-600 text-lg">
              Кратко и простым языком о том, что волнует перед началом процедуры
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <Card className="bg-white border-slate-200 shadow-nv-card p-6 sm:p-8">
            <Accordion
              type="single"
              collapsible
              className="space-y-3 sm:space-y-4"
            >
              <AccordionItem
                value="item-1"
                className="border-b border-slate-200"
              >
                <AccordionTrigger className="text-slate-900 hover:text-blue-700 text-left text-lg">
                  Сколько стоит процедура банкротства?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base">
                  Итоговая стоимость зависит от вашей ситуации: количества
                  кредиторов, наличия имущества и выбранной процедуры. Обычно
                  сумма включает госпошлину, услуги финансового управляющего и
                  юридическое сопровождение, а условия и порядок оплаты
                  фиксируются заранее.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-b border-slate-200"
              >
                <AccordionTrigger className="text-slate-900 hover:text-blue-700 text-left text-lg">
                  Какие долги нельзя списать через банкротство?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base">
                  Как правило, не списываются алименты, компенсация вреда жизни
                  и здоровью, отдельные штрафы и обязательства по решениям
                  суда, а также текущие платежи, возникшие уже во время
                  процедуры. Большинство кредитов, займов и просроченных
                  долгов, наоборот, могут быть списаны.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border-b border-slate-200"
              >
                <AccordionTrigger className="text-slate-900 hover:text-blue-700 text-left text-lg">
                  Сколько времени занимает процедура?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base">
                  В среднем процедура банкротства физического лица занимает от
                  нескольких месяцев до года. Срок зависит от загруженности
                  суда, количества кредиторов и особенностей дела, и на
                  консультации заранее проговариваются возможные этапы и паузы.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border-b border-slate-200"
              >
                <AccordionTrigger className="text-slate-900 hover:text-blue-700 text-left text-lg">
                  Можно ли сохранить единственное жильё?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base">
                  В большинстве случаев единственное пригодное для постоянного
                  проживания жильё защищено законом и не подлежит реализации.  
                  Исключения возможны, например, при ипотеке именно этого жилья
                  или признаках злоупотребления, поэтому каждую ситуацию
                  нужно разбирать отдельно с юристом.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border-b border-slate-200"
              >
                <AccordionTrigger className="text-slate-900 hover:text-blue-700 text-left text-lg">
                  Какие последствия будут после банкротства?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base">
                  В течение ряда лет сохраняются ограничения: при оформлении
                  новых кредитов нужно сообщать о банкротстве, могут действовать
                  ограничения на руководящие должности и повторное обращение за
                  процедурой. При этом основная цель банкротства — снять
                  непосильную долговую нагрузку и вернуть вам финансовую
                  стабильность.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-none">
                <AccordionTrigger className="text-slate-900 hover:text-blue-700 text-left text-lg">
                  Что происходит с коллекторами и звонками кредиторов?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base">
                  После запуска процедуры требования кредиторов переходят в
                  установленный законом порядок, прекращаются исполнительные
                  действия и начисление новых неустоек. Давление в виде
                  постоянных звонков теряет смысл, а взаимодействие с
                  кредиторами берут на себя уполномоченные участники процесса.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </FadeInSection>
      </div>
    </section>
  )
}
