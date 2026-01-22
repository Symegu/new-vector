'use client';

import { useState, useRef } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { CheckCircle2, AlertTriangle, X, Clock } from 'lucide-react';
import { PolicyProps } from '../layout/Footer';
import { Checkbox } from '../ui/checkbox';
import { cn } from '../ui/utils';

type LeadFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  honeypot: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

type LeadApiResponse =
  | { status: 'ok'; leadId: string; createdAt: string }
  | { status: 'duplicate'; leadId: string; createdAt: string }
  | { status: 'error'; message?: string }
  | { status: 'validation_error'; errors?: Record<string, string>; message?: string };

const QUIZ_ID_STORAGE_KEY = 'nv_quiz_result_id';

export interface LeadFormProps extends PolicyProps{
  title?: string;
  description?: string;
  submitLabel?: string;
  submitLoadingLabel?: string;
  buttonClassName?: string;
  compact?: boolean; // для квиза
  showModals?: boolean; // на главной true, в квизе можно false
  formClass?: string;
  onSuccess?: () => void;
};

function formatRuPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';

  let numbers = digits;
  if (numbers[0] === '8') numbers = '7' + numbers.slice(1);
  if (numbers[0] !== '7') numbers = '7' + numbers;
  numbers = numbers.slice(0, 11);

  const p1 = numbers.slice(1, 4);
  const p2 = numbers.slice(4, 7);
  const p3 = numbers.slice(7, 9);
  const p4 = numbers.slice(9, 11);

  let result = '+7';
  if (p1) result += ` (${p1}`;
  if (p1.length === 3) result += ')';
  if (p2) result += ` ${p2}`;
  if (p3) result += `-${p3}`;
  if (p4) result += `-${p4}`;

  return result;
}

function validateLeadForm(data: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  const name = data.name.trim();
  if (!name) {
    errors.name = 'Пожалуйста, укажите ваше имя.';
  } else if (name.length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа.';
  } else if (name.length > 100) {
    errors.name = 'Имя слишком длинное, сократите, пожалуйста.';
  }

  const phoneDigits = data.phone.replace(/\D/g, '');
  if (!phoneDigits) {
    errors.phone = 'Пожалуйста, укажите номер телефона.';
  } else if (phoneDigits.length !== 11) {
    errors.phone = 'Номер должен содержать 11 цифр.';
  } else if (!/^7\d{10}$/.test(phoneDigits) && !/^8\d{10}$/.test(phoneDigits)) {
    errors.phone = 'Сейчас работаем с российскими номерами (+7).';
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = 'Пожалуйста, укажите email.';
  } else {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      errors.email = 'Проверьте, правильно ли указан email.';
    } else if (email.length > 200) {
      errors.email = 'Email слишком длинный, сократите, пожалуйста.';
    }
  }

  if (data.message && data.message.length > 2000) {
    errors.message = 'Сообщение слишком подробное. Оставьте до 2000 символов.';
  }
  if (!data.consent) {
    // Добавим ошибку для consent, но покажем в JSX
  }
  return errors;
}

export function LeadForm({
  onOpenPrivacy,
  onOpenConsent,
  title = 'Записаться на консультацию',
  description = 'Оставьте контакты, и юрист свяжется с вами, чтобы аккуратно разобрать ситуацию с долгами.',
  submitLabel = 'Отправить',
  submitLoadingLabel = 'Отправляем…',
  buttonClassName = 'btn-nv-gold w-full py-7 text-xl rounded-xl shadow-nv-card',
  formClass = '',
  compact = false,
  showModals = true,
}: LeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
    honeypot: '',
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [consentError, setConsentError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [backendMessage, setBackendMessage] = useState<string | undefined>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [inlineInfo, setInlineInfo] = useState<string | null>(null);

  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleChange =
    (field: keyof LeadFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const raw = e.target.value;
      const value = field === 'phone' ? formatRuPhone(raw) : raw;

      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  const handleConsentChange = (checked: boolean) => {
    setValues((prev) => ({ ...prev, consent: checked }));
    setConsentError(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineInfo(null);
    setBackendMessage(undefined);
    setConsentError(false);

    if (honeypotRef.current?.value) {
      console.warn('Honeypot filled - spam detected');
      setInlineInfo('Обнаружена подозрительная активность. Попробуйте позже.');
      return;
    }
    
    if (!values.consent) {
      setConsentError(true);
      setInlineInfo('Требуется согласие с обработкой данных для отправки.');
      return;
    }

    const newErrors = validateLeadForm(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (!values.consent) setConsentError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      let quizResultId: string | undefined;

      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(QUIZ_ID_STORAGE_KEY);
        if (stored) {
          quizResultId = stored;
        }
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/public/leads`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.name,
            phone: values.phone,
            email: values.email,
            message: values.message,
            consent: values.consent,
            honeypot: values.honeypot,
            quizResultId,
          }),
        },
      );

      const data = (await res.json().catch(() => null)) as
        | LeadApiResponse
        | null;

      const apiStatus = data?.status;

      if (apiStatus === 'ok') {
        setValues({ name: '', phone: '', email: '', message: '', consent: false, honeypot: '' });
        setErrors({});
        if (showModals) {
          setShowSuccessModal(true);
        } else {
          setInlineInfo('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        }
      } else if (apiStatus === 'duplicate') {
        if (showModals) {
          setShowDuplicateModal(true);
        } else {
          setInlineInfo('Заявка с этим телефоном и email уже в работе. Мы свяжемся по ранее оставленным данным.');
        }
      } else if (apiStatus === 'validation_error') {
        const fieldErrors = (data?.errors || {}) as Record<string, string>;
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      } else {
        const msg =
          data?.message ||
          'Не удалось отправить заявку. Попробуйте чуть позже или свяжитесь с нами по телефону.';
        setBackendMessage(msg);
        if (showModals) {
          setShowErrorModal(true);
        } else {
          setInlineInfo(msg);
        }
      }
    } catch {
      const msg =
        'Произошла техническая ошибка. Пожалуйста, попробуйте позже или позвоните нам.';
      setBackendMessage(msg);
      if (showModals) {
        setShowErrorModal(true);
      } else {
        setInlineInfo(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputSize = compact ? 'h-10 text-sm' : 'h-14 text-lg';
  const textareaSize = compact ? 'text-sm py-2' : 'text-lg py-4';

  const isFormValid = () => {
    const name = values.name.trim();
    const email = values.email.trim();
    const phoneDigits = values.phone.replace(/\D/g, '');

    return (
      name.length >= 2 &&
      phoneDigits.length === 11 &&
      /^7\d{10}$/.test(phoneDigits) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      values.consent
    );
  };

  return (
    <div className={`${formClass}`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-center">
        {title && (
          <h2 className={compact ? 'text-lg font-semibold text-primary' : 'text-xl font-semibold text-primary'}>
            {title}
          </h2>
        )}
        {description && (
          <p className={compact ? 'text-secondary text-sm' : 'text-secondary text-sm'}>
            {description}
          </p>
        )}
        {/* Honeypot поле (скрыто) */}
        <input
          ref={honeypotRef}
          name="honeypot"
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          onChange={(e) => setValues((prev) => ({ ...prev, honeypot: e.target.value }))}
        />

        <div className="space-y-3 mt-2">
          <div>
            <label className="block text-sm text-secondary mb-1">
              Имя *
            </label>
            <Input
              value={values.name}
              onChange={handleChange('name')}
              placeholder="Как к вам обращаться"
              className={`bg-slate-50 border-slate-200 text-primary placeholder:text-slate-400 rounded-xl px-4 ${inputSize} ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">
              Телефон *
            </label>
            <Input
              type="tel"
              value={values.phone}
              onChange={handleChange('phone')}
              placeholder="+7 (___) ___-__-__"
              className={`bg-slate-50 border-slate-200 text-primary placeholder:text-slate-400 rounded-xl px-4 ${inputSize} ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">
              Email *
            </label>
            <Input
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              placeholder="ivan@example.com"
              className={`bg-slate-50 border-slate-200 text-primary placeholder:text-slate-400 rounded-xl px-4 ${inputSize} ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">
              Комментарий (по желанию)
            </label>
            <Textarea
              rows={compact ? 3 : 4}
              value={values.message}
              onChange={handleChange('message')}
              placeholder={
                compact
                  ? 'Например: сумма долгов, количество кредиторов.'
                  : 'Например: общая сумма долгов, сколько кредиторов, есть ли просрочки или приставы.'
              }
              className={`bg-slate-50 border-slate-200 text-primary placeholder:text-slate-400 resize-none rounded-xl px-4 ${textareaSize} ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600">{errors.message}</p>
            )}
          </div>
           {/* Чекбокс consent */}
          <div className="flex items-start space-x-2 pt-1">
            <Checkbox
              id="consent"
              checked={values.consent}
              onCheckedChange={handleConsentChange}
              className={consentError ? 'border-red-500 [&>div]:data-[state=checked]:bg-red-500' : ''}
            />
            <label
              htmlFor="consent"
              className="text-sm text-secondary leading-relaxed cursor-pointer select-none flex-1"
            >
              Согласен(а) с{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenConsent?.();
                }}
                className="underline text-gold-400 hover:no-underline text-sm"
              >
                обработкой персональных данных
              </button>{' '}
              и{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPrivacy?.();
                }}
                className="underline text-gold-400 hover:no-underline text-sm"
              >
                политикой конфиденциальности
              </button>
              .
            </label>
          </div>
          {consentError && (
            <p className="text-xs text-red-600 pl-6">Необходимо согласие для отправки.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid()}
          className={cn(
    buttonClassName,
    'disabled:opacity-70 disabled:cursor-not-allowed',
    !isFormValid() && 'opacity-70 cursor-not-allowed border-slate-300'
  )}
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? submitLoadingLabel : submitLabel}
          </span>
        </button>

        {inlineInfo && (
          <p className="text-xs text-center text-secondary">{inlineInfo}</p>
        )}

        <p className="text-xs text-muted mt-1 text-center">
          Отправляя форму, вы даете согласие на{' '}
          <button onClick={onOpenConsent} className="underline text-gold-400 hover:no-underline font-medium text-xs">
            обработку персональных данных
          </button>{' '}
          согласно{' '}
          <button onClick={onOpenPrivacy} className="underline text-gold-400 hover:no-underline font-medium text-xs">
            политике конфиденциальности
          </button>.{' '}
          <span className="font-medium text-gold-400">Данные защищены и не передаются третьим лицам.</span>
        </p>
      </form>

      {/* Модалки только если showModals === true */}
      {showModals && showSuccessModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-nv-card max-w-md w-full mx-4 p-6 relative">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center space-y-3 mt-2">
              <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>
              <h4 className="text-lg font-semibold text-primary">
                Спасибо, заявка принята
              </h4>
              <p className="text-sm text-secondary">
                Вы оставили контакты семейной юридической команды «Новый Вектор».
                Юрист свяжется с вами, чтобы спокойно разобрать ситуацию и
                подобрать законный способ избавиться от долгов.
              </p>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="mt-2 px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Хорошо
              </button>
            </div>
          </div>
        </div>
      )}

      {showModals && showDuplicateModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-nv-card max-w-md w-full mx-4 p-6 relative">
            <button
              type="button"
              onClick={() => setShowDuplicateModal(false)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center space-y-3 mt-2">
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Clock className="h-7 w-7 text-amber-500" />
              </div>
              <h4 className="text-lg font-semibold text-primary">
                Ваша заявка уже в работе
              </h4>
              <p className="text-sm text-secondary">
                Мы уже получили обращение с этим телефоном и email.
                Юрист свяжется с вами по ранее оставленным контактам.
                Если хотите уточнить детали быстрее — позвоните нам или
                загляните в офис, это безопасно и конфиденциально.
              </p>
              <button
                type="button"
                onClick={() => setShowDuplicateModal(false)}
                className="mt-2 px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}

      {showModals && showErrorModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-nv-card max-w-md w-full mx-4 p-6 relative">
            <button
              type="button"
              onClick={() => setShowErrorModal(false)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center space-y-3 mt-2">
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-red-500" />
              </div>
              <h4 className="text-lg font-semibold text-primary">
                Не получилось отправить заявку
              </h4>
              <p className="text-sm text-secondary">
                {backendMessage ||
                  'Произошла непредвиденная ошибка. Пожалуйста, попробуйте ещё раз чуть позже.'}
              </p>
              <p className="text-xs text-slate-500">
                Можно сразу позвонить юристу по номеру +7 (921) 010‑46‑26
                или прийти в офис «Новый Вектор» в Олонце — консультация проходит
                конфиденциально.
              </p>
              <button
                type="button"
                onClick={() => setShowErrorModal(false)}
                className="mt-2 px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
