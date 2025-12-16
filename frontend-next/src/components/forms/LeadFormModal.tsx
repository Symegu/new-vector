'use client';

import { LeadForm } from './LeadForm';
import { X } from 'lucide-react';
import { MouseEvent, useEffect } from 'react';

type LeadFormModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LeadFormModal({ open, onClose }: LeadFormModalProps) {
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[160] flex items-start justify-center bg-slate-900/60 backdrop-blur-sm "
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="mt-24 md:mt-28 mb-6 bg-white rounded-2xl shadow-nv-card max-w-lg w-full mx-4 relative max-h-[calc(100vh-7rem)] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          aria-label="Закрыть окно"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8">
          {/* <h3 className="text-primary text-xl font-semibold mb-2">
            Запись на консультацию
          </h3>
          <p className="text-secondary text-sm mb-4">
            Заполните короткую форму — семейная команда «Нового Вектора»
            свяжется с вами, чтобы в спокойном режиме разобрать ситуацию с долгами.
          </p> */}

          <LeadForm
            title={undefined}
            description={undefined}
            submitLabel="Записаться на консультацию"
            submitLoadingLabel="Отправляем…"
            buttonClassName="btn-nv-blue w-full py-3 text-sm rounded-xl mt-2"
            compact
            showModals={false}
            onSuccess={onClose} // закрыть модалку после успешной отправки
          />
        </div>
      </div>
    </div>
  );
}
