// components/modals/ConsentModal.tsx — то же
'use client'
import { useEffect, MouseEvent } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

export function ConsentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      <div className="modal-content mt-24 md:mt-28 mb-6 bg-white rounded-2xl shadow-nv-card max-w-md w-full mx-4 relative max-h-[calc(100vh-7rem)] overflow-hidden flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 z-10"
          aria-label="Закрыть окно"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 flex-1 overflow-y-auto text-sm">
          <h2 className="text-lg font-bold mb-4 text-slate-900 text-center">Согласие на обработку <br /> персональных данных</h2>
          
          <p className="mb-4 text-slate-700 leading-relaxed">
            Я, <strong>субъект персональных данных</strong>, свободно, своей волей и в своем интересе даю{' '}
            <strong>конкретное, информированное и сознательное согласие</strong> ИП Пантелеева Ирина Ивановна 
            (ИНН 101400677313, Олонец) на обработку моих персональных данных в соответствии со ст. 9 ФЗ-152:
          </p>

          <ul className="space-y-3 mb-6 text-slate-700 list-disc pl-4">
            <li><strong>Данные:</strong> ФИО, телефон, email (из формы заявки)</li>
            <li><strong>Цели:</strong> консультации по банкротству физлиц, обратная связь, заключение договоров</li>
            <li><strong>Действия:</strong> сбор, запись, хранение (PostgreSQL, РФ, 3 года), использование, удаление</li>
            <li><strong>Передача:</strong> не третьим лицам (кроме судов/МФЦ по закону)</li>
            <li><strong>Отзыв:</strong> info@vector.ru («Отзыв согласия»)</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-xs text-blue-800 mb-2 font-medium">Основание:</p>
            <p className="text-xs text-blue-700">Ст. 6, 9 ФЗ №152 от 27.07.2006 «О персональных данных»</p>
          </div>
        </div>


        {/* <div className="p-6 border-t bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-medium transition-colors"
          >
            Понятно
          </button>
        </div> */}
      </div>
    </div>
  )
}

