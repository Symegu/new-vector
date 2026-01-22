// components/modals/PrivacyPolicyModal.tsx — plain текст, стиль LeadFormModal
'use client'
import { useEffect, MouseEvent } from 'react'
import { X } from 'lucide-react'

export function PrivacyPolicyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [open])

  if (!open) return null

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-overlay fixed inset-0 flex items-start justify-center bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="modal-content mt-20 md:mt-24 mb-8 bg-white rounded-2xl shadow-nv-card max-w-4xl w-full mx-4 relative flex flex-col max-h-[calc(100vh-10rem)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 z-10"
          aria-label="Закрыть окно"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 prose prose-sm sm:prose-base max-w-none">
            <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 prose prose-sm sm:prose-base max-w-none text-slate-800 leading-6">
              <h1 className="text-2xl font-bold mb-8 border-b-2 border-slate-300 pb-4 mt-0">
                Политика в отношении обработки персональных данных
              </h1>

              <h2 className="text-lg font-semibold mb-2 mt-8 border-b border-slate-200 pb-2">1. Общие положения</h2>
              <p className="mb-6 text-sm leading-6">
                1.1. Настоящая политика составлена в соответствии с требованиями Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных, предпринимаемый ИП Пантелеева Ирина Ивановна (ИНН 101400677313) (далее – Оператор).
              </p>
              <p className="mb-6 text-sm leading-6">
                1.2. Оператор обеспечивает соблюдение прав субъектов персональных данных, включая защиту частной жизни и семейной тайны.
              </p>
              <p className="mb-6 text-sm leading-6">
                1.3. Политика применяется к посетителям сайта novy-vector.online.
              </p>

              <h2 className="text-lg font-semibold mb-2 mt-8 border-b border-slate-200 pb-2">2. Перечень персональных данных</h2>
              <p className="mb-4 text-sm leading-6"><strong>2.1.</strong> Фамилия, имя, отчество;</p>
              <p className="mb-4 text-sm leading-6"><strong>2.2.</strong> Номер телефона;</p>
              <p className="mb-4 text-sm leading-6"><strong>2.3.</strong> Адрес электронной почты;</p>
              <p className="mb-6 text-sm leading-6"><strong>2.4.</strong> Обезличенные данные (cookies Google Analytics 4).</p>

              <h2 className="text-lg font-semibold mb-2 mt-8 border-b border-slate-200 pb-2">3. Цели обработки</h2>
              <p className="mb-4 text-sm leading-6"><strong>3.1.</strong> Обработка заявок и консультации по банкротству физических лиц;</p>
              <p className="mb-4 text-sm leading-6"><strong>3.2.</strong> Заключение и исполнение договоров;</p>
              <p className="mb-4 text-sm leading-6"><strong>3.3.</strong> Обратная связь с клиентами;</p>
              <p className="mb-6 text-sm leading-6"><strong>3.4.</strong> Аналитика посещаемости (обезличенная).</p>

              <h2 className="text-lg font-semibold mb-2 mt-8 border-b border-slate-200 pb-2">4. Условия хранения</h2>
              <p className="mb-4 text-sm leading-6"><strong>4.1.</strong> Хранение в PostgreSQL на серверах в РФ — 3 года или до отзыва согласия;</p>
              <p className="mb-4 text-sm leading-6"><strong>4.2.</strong> Не передаются третьим лицам (кроме судов/МФЦ по закону);</p>
              <p className="mb-6 text-sm leading-6"><strong>4.3.</strong> Защита: шифрование, доступ по ролям.</p>

              <h2 className="text-lg font-semibold mb-2 mt-8 border-b border-slate-200 pb-2">5. Права субъекта персональных данных</h2>
              <p className="mb-4 text-sm leading-6"><strong>5.1.</strong> Запросить информацию об обработке;</p>
              <p className="mb-4 text-sm leading-6"><strong>5.2.</strong> Уточнить/удалить данные;</p>
              <p className="mb-4 text-sm leading-6"><strong>5.3.</strong> Отозвать согласие: info@vector.ru («Отзыв согласия»);</p>
              <p className="mb-6 text-sm leading-6"><strong>5.4.</strong> Обратиться в Роскомнадзор.</p>

              <h2 className="text-lg font-semibold mb-2 mt-8 border-b border-slate-200 pb-2">6. Контакты Оператора</h2>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border">
                <div>
                  <p className="font-semibold mb-1">Оператор:</p>
                  <p className="text-xs">ИП Пантелеева Ирина Ивановна</p>
                  <p className="text-xs mb-2">ИНН 101400677313, г. Олонец</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Контакты:</p>
                  <p className="text-xs"><a href="mailto:info@vector.ru" className="underline hover:no-underline">info@vector.ru</a></p>
                  <p className="text-xs"><a href="tel:+79210104626" className="underline hover:no-underline">+7 (921) 010-46-26</a></p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-8 pt-6 border-t border-slate-200 italic">
                Дата публикации: 07.01.2026. Актуальная версия: novy-vector.online/privacy-policy
              </p>
          </div>
        </div>

        {/* <div className="p-6 border-t bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-medium transition-colors"
          >
            Понятно, закрыть
          </button>
        </div> */}
      </div>
    </div>
  )
}
