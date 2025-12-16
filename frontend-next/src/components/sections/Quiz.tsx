"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight, Home, Car, Building2 } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import { Card } from "../ui/card";
import { FadeInSection } from "../ui/fadeIn";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

export function QuizSection() {
  return (
    <section id="quiz" className="py-20 relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
        <FadeInSection>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200 border-0">
              Проверка ситуации
            </Badge>
            <h2 className="text-primary mb-4">
              Подходит ли вам банкротство
            </h2>
            <p className="text-secondary text-lg">
              Ответьте на несколько вопросов о долгах, просрочках и имуществе,
              чтобы получить предварительный ориентир и записаться на консультацию.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <Card className="shadow-nv-card border-slate-100">
            <Quiz />
          </Card>
        </FadeInSection>
      </div>
    </section>
  );
}

type DebtLevel = "small" | "medium" | "high";
type StepKey = "debt" | "overdue" | "enforcement" | "assets" | "ready";

type QuizAnswers = {
  debt?: "small" | "medium" | "high";
  overdue?: "no" | "yes";
  enforcement?: "no" | "yes";
  assets?: string[];
  ready?: "not_sure" | "yes" | "no";
};

type QuizResult = {
  score: number;
  level: "low" | "medium" | "high";
  title: string;
  message: string;
};

const STORAGE_KEY = "nv_quiz_result";

const steps: StepKey[] = ["debt", "overdue", "enforcement", "assets", "ready"];
const debtOptions: { value: DebtLevel; label: string }[] = [
  { value: "small", label: "До 300 000 ₽" },
  { value: "medium", label: "От 300 000 до 700 000 ₽" },
  { value: "high", label: "Более 700 000 ₽" },
];

function calculateResult(answers: QuizAnswers): QuizResult {
  let score = 0;

  if (answers.debt === "medium") score += 1;
  if (answers.debt === "high") score += 2;
  if (answers.overdue === "yes") score += 1;
  if (answers.enforcement === "yes") score += 2;
  if (answers.assets && answers.assets.length > 0) score += 1;
  if (answers.ready === "yes") score += 1;

  let level: QuizResult["level"] = "low";
  let title = "Пока рано говорить о банкротстве";
  let message =
    "По ответам не видно выраженных признаков неплатёжеспособности. Если появятся просрочки или требования кредиторов, стоит заранее обсудить ситуацию с юристом.";

  if (score >= 3 && score <= 5) {
    level = "medium";
    title = "Есть признаки проблемной задолженности";
    message =
      "Ответы показывают ощутимую долговую нагрузку и риски. Рекомендована личная консультация по банкротству и реструктуризации, чтобы оценить варианты защиты.";
  }

  if (score > 5) {
    level = "high";
    title = "Банкротство может быть актуальным";
    message =
      "По сумме долгов, просрочкам и требованиям кредиторов ваша ситуация близка к критериям банкротства. Консультация поможет понять, как законно списать долги и защитить имущество.";
  }

  return { score, level, title, message };
}

export function Quiz() {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  useEffect(() => {
    setIsHydrated(true);

    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as QuizResult;
      setResult(parsed);
    } catch {
      // ignore
    }
  }, []);

  const currentStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      const res = calculateResult(answers);
      setResult(res);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
      }
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const toggleAsset = (value: string) => {
    setAnswers((prev) => {
      const prevArr = prev.assets || [];

      if (value === "no_assets") {
        return prevArr.length === 1 && prevArr[0] === "no_assets"
          ? { ...prev, assets: [] }
          : { ...prev, assets: ["no_assets"] };
      }

      const filtered = prevArr.filter((v) => v !== "no_assets");

      return filtered.includes(value)
        ? { ...prev, assets: filtered.filter((v) => v !== value) }
        : { ...prev, assets: [...filtered, value] };
    });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead from quiz:", { leadForm, result, answers });
  };

  if (isHydrated && result) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Итог квиза */}
        <div className="rounded-2xl bg-slate-50 p-6 md:p-8 flex flex-col">
          <div className="flex items-center mb-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 mr-2" />
            <span className="text-sm font-medium text-emerald-700">
              Результат вашего теста
            </span>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-3">
            {result.title}
          </h3>
          <p className="text-secondary mb-4">{result.message}</p>
          <div className="mt-auto">
            <p className="text-xs text-muted">
              Этот тест носит ориентировочный характер и не заменяет
              индивидуальную юридическую консультацию. Окончательное решение
              принимается после анализа документов и вашей ситуации.
            </p>
          </div>
        </div>

        {/* Форма записи на консультацию */}
        <form
          onSubmit={handleLeadSubmit}
          className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 flex flex-col gap-4 shadow-nv-soft"
        >
          <h3 className="text-xl font-semibold text-primary">
            Записаться на консультацию
          </h3>
          <p className="text-secondary text-sm">
            Оставьте контакты, и юрист «Нового Вектора» свяжется с вами,
            чтобы обсудить результат теста и подобрать безопасное решение по долгам.
          </p>
          <div className="space-y-3 mt-2">
            <div>
              <label className="block text-sm text-secondary mb-1">
                Имя
              </label>
              <Input
                value={leadForm.name}
                onChange={(e) =>
                  setLeadForm((f) => ({ ...f, name: e.target.value }))
                }
                required
                placeholder="Как к вам обращаться"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">
                Телефон
              </label>
              <Input
                type="tel"
                value={leadForm.phone}
                onChange={(e) =>
                  setLeadForm((f) => ({ ...f, phone: e.target.value }))
                }
                required
                placeholder="+7 (921) 010-46-26"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">
                Комментарий (по желанию)
              </label>
              <Textarea
                rows={3}
                value={leadForm.comment}
                onChange={(e) =>
                  setLeadForm((f) => ({ ...f, comment: e.target.value }))
                }
                placeholder="Например: сумма долгов, количество кредиторов, важные детали."
              />
            </div>
          </div>
          <button type="submit" className="btn-nv-blue mt-2">
            <span className="flex items-center justify-center gap-2">
              Отправить и получить консультацию
              {/* <ArrowRight /> */}
            </span>
          </button>
          <p className="text-[11px] text-muted mt-1">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
            Данные не передаются третьим лицам.
          </p>
        </form>
      </div>
    );
  }

  // Экран пошагового теста
  return (
    <div className="space-y-6 bg-white p-3 md:p-6 lg:p-8 rounded-2xl">
      <div>
        <div className="flex items-center justify-between mb-2 text-sm text-secondary">
          <span>
            Шаг {stepIndex + 1} из {steps.length}
          </span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="border border-slate-100 rounded-2xl bg-white p-6 md:p-8 space-y-6">
        {currentStep === "debt" && (
          <>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Примерная сумма ваших долгов
            </h3>
            <p className="text-sm text-secondary mb  -4">
              Учитывайте кредиты, займы, задолженности по налогам и ЖКХ.
            </p>
            <div className="grid gap-3">
              {debtOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, debt: opt.value }))
                  }
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                    answers.debt === opt.value
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}

        {currentStep === "overdue" && (
          <>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Есть ли просрочки по платежам
            </h3>
            <p className="text-sm text-secondary mb-4">
              В том числе по кредитам, займам, налогам или ЖКХ.
            </p>
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, overdue: "no" }))
                }
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                  answers.overdue === "no"
                    ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"
                }`}
              >
                Плачу вовремя, просрочек нет
              </button>
              <button
                type="button"
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, overdue: "yes" }))
                }
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                  answers.overdue === "yes"
                    ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"
                }`}
              >
                Есть просрочки / платить стало тяжело
              </button>
            </div>
          </>
        )}

        {currentStep === "enforcement" && (
          <>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Требования от кредиторов и приставов
            </h3>
            <p className="text-sm text-secondary mb-4">
              Были ли решения суда, исполнительные производства или активные
              звонки и письма от взыскателей.
            </p>
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, enforcement: "no" }))
                }
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                  answers.enforcement === "no"
                    ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"
                }`}
              >
                Пока нет решений суда и приставов
              </button>
              <button
                type="button"
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, enforcement: "yes" }))
                }
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                  answers.enforcement === "yes"
                    ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"
                }`}
              >
                Есть решения суда / исполнительные производства
              </button>
            </div>
          </>
        )}

        {currentStep === "assets" && (
          <>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Какое имущество у вас есть
            </h3>
            <p className="text-sm text-secondary mb-4">
              Можно выбрать несколько вариантов. Информация нужна, чтобы
              понять, как лучше защитить имущество в процедуре.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { value: "flat", label: "Квартира (жильё)", icon: Home },
                { value: "house", label: "Дом / дача", icon: Building2 },
                { value: "car", label: "Автомобиль", icon: Car },
                { value: "no_assets", label: "Ценного имущества нет" },
              ].map((opt) => {
                const selected =
                  answers.assets?.includes(opt.value) ||
                  (opt.value === "no_assets" &&
                    answers.assets?.length === 1 &&
                    answers.assets[0] === "no_assets");
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleAsset(opt.value)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition ${
                      selected
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {Icon && (
                      <Icon className="h-4 w-4 text-slate-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {currentStep === "ready" && (
          <>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Насколько вы готовы рассматривать банкротство
            </h3>
            <p className="text-sm text-secondary mb-4">
              Ответ нужен, чтобы понять, как лучше построить консультацию.
            </p>
            <div className="grid gap-3">
              {[
                { value: "not_sure", label: "Пока просто изучаю варианты" },
                {
                  value: "yes",
                  label: "Готов(а) обсудить процедуру подробно",
                },
                {
                  value: "no",
                  label: "Скорее хочу рассмотреть другие решения",
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      ready: opt.value as QuizAnswers["ready"],
                    }))
                  }
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                    answers.ready === opt.value
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={stepIndex === 0}
          className={`border border-slate-300 px-4 py-2 ${
            stepIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleBack}
        >
          Назад
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="btn-nv-blue text-white"
        >
          <span className="flex items-center gap-2">
            {stepIndex === steps.length - 1
              ? "Получить результат"
              : "Далее"}
            <ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}
