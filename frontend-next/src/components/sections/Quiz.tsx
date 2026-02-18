"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight, Home, Car, Building2 } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import { Card } from "../ui/card";
import { FadeInSection } from "../ui/fadeIn";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { LeadForm } from "../forms/LeadForm";

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
          <Card className="border-slate-100">
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


const RESULT_STORAGE_KEY = "nv_quiz_result";
const QUIZ_ID_STORAGE_KEY = "nv_quiz_result_id";

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

function buildReadableAnswers(a: QuizAnswers): string[] {
  const list: string[] = [];

  if (a.debt) {
    list.push(
      a.debt === "small"
        ? "Долг: до 300 000 ₽"
        : a.debt === "medium"
        ? "Долг: 300 000–700 000 ₽"
        : "Долг: более 700 000 ₽",
    );
  }

  if (a.overdue) {
    list.push(
      a.overdue === "yes"
        ? "Просрочки: есть / платить тяжело"
        : "Просрочки: нет, плачу вовремя",
    );
  }

  if (a.enforcement) {
    list.push(
      a.enforcement === "yes"
        ? "Есть решения суда / исполнительные производства"
        : "Решений суда и приставов пока нет",
    );
  }

  if (a.assets && a.assets.length > 0) {
    const map: Record<string, string> = {
      flat: "Квартира",
      house: "Дом / дача",
      car: "Автомобиль",
      no_assets: "Ценного имущества нет",
    };
    list.push(
      "Имущество: " +
        a.assets
          .map((v) => map[v] || v)
          .join(", "),
    );
  }

  if (a.ready) {
    const mapReady: Record<NonNullable<QuizAnswers["ready"]>, string> = {
      not_sure: "Пока просто изучает варианты",
      yes: "Готов(а) подробно обсудить банкротство",
      no: "Скорее хочет рассмотреть другие решения",
    };
    list.push("Настрой: " + mapReady[a.ready]);
  }

  return list;
}

async function saveQuizResultOnBackend(result: QuizResult, answersReadable: string[]) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  try {
    const res = await fetch(`${apiUrl}/api/public/quiz-results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: result.score,
        level: result.level,
        title: result.title,
        message: result.message,
        answers: answersReadable,
      }),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as { id?: string };
    if (data?.id && typeof window !== "undefined") {
      window.localStorage.setItem(QUIZ_ID_STORAGE_KEY, data.id);
      return data.id;
    }
    return null;
  } catch {
    return null;
  }
}


export function Quiz() {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });

  useEffect(() => {
    setIsHydrated(true);

    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(RESULT_STORAGE_KEY);
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

  const handleNext = async () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      const res = calculateResult(answers);
      setResult(res);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(res));
      }
      const readable = buildReadableAnswers(answers);
      await saveQuizResultOnBackend(res, readable);
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

  if (isHydrated && result) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Итог квиза */}
        <div className="rounded-2xl bg-white p-6 md:p-8 flex flex-col justify-between shadow-nv-soft">
          <div className="flex items-center mb-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 mr-2" />
            <span className="text-lg font-medium text-emerald-700">
              Результат вашего теста
            </span>
          </div>
          <div className="bg-nv-badge p-8 rounded-xl">
            <h4 className="text-primary mb-3">
              {result.title}
            </h4>
            <p className="text-secondary mb-4">{result.message}</p>
          </div>
          <div className="">
            <p className="text-xs text-muted">
              Этот тест носит ориентировочный характер и не заменяет
              индивидуальную юридическую консультацию. Окончательное решение
              принимается после анализа документов и вашей ситуации.
            </p>
          </div>
        </div>

        {/* Форма записи на консультацию */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 flex flex-col gap-4 shadow-nv-soft">
      <LeadForm
            title="Записаться на консультацию"
            description="Оставьте контакты, и юрист «Нового Вектора» свяжется с вами, чтобы обсудить результат теста и подобрать бережное решение по долгам."
            submitLabel="Отправить и получить консультацию"
            submitLoadingLabel="Отправляем…"
            buttonClassName="btn-nv-blue mt-2"
            compact
            showModals={true} onOpenPrivacy={function (): void {
              throw new Error("Function not implemented.");
            } } onOpenConsent={function (): void {
              throw new Error("Function not implemented.");
            } }      />
</div>
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
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Примерная сумма ваших долгов
            </h3>
            <p className="text-sm text-secondary mb-4">
              Учитывайте кредиты, займы, задолженности по налогам и ЖКХ.
            </p>

            <div className="flex flex-col gap-2">
              {debtOptions.map((opt) => {
                const selected = answers.debt === opt.value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, debt: opt.value }))
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition
                      ${
                        selected
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-slate-200 bg-slate-50/40 hover:border-emerald-400 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* точка-селектор */}
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border
                          ${
                            selected
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 bg-white"
                          }`}
                      >
                        {selected && (
                          <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="text-primary">{opt.label}</span>
                    </div>

                    {/* маленькая подсказка справа, чтобы блоки чуть отличались визуально */}
                    {/* <span className="text-[11px] text-slate-500">
                      {opt.value === "small"
                        ? "Небольшая нагрузка"
                        : opt.value === "medium"
                        ? "Существенный долг"
                        : "Крупная задолженность"}
                    </span> */}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {currentStep === "overdue" && (
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Есть ли просрочки по платежам
            </h3>
            <p className="text-sm text-secondary mb-4">
              В том числе по кредитам, займам, налогам или ЖКХ.
            </p>

            <div className="flex flex-col gap-2">
              {[
                {
                  value: "no" as const,
                  label: "Плачу вовремя, просрочек нет",
                  // hint: "Ситуация под контролем, но важно следить за нагрузкой.",
                },
                {
                  value: "yes" as const,
                  label: "Есть просрочки / платить стало тяжело",
                  // hint: "Лучше обсудить с юристом, чтобы не усугубить ситуацию.",
                },
              ].map((opt) => {
                const selected = answers.overdue === opt.value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, overdue: opt.value }))
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition
                      ${
                        selected
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-slate-200 bg-slate-50/40 hover:border-emerald-400 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border
                          ${
                            selected
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 bg-white"
                          }`}
                      >
                        {selected && (
                          <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="text-primary">{opt.label}</span>
                    </div>

                    {/* <span className="hidden sm:block text-[11px] text-slate-500 ml-4">
                      {opt.hint}
                    </span> */}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {currentStep === "enforcement" && (
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Требования от кредиторов и приставов
            </h3>
            <p className="text-sm text-secondary mb-4">
              Были ли решения суда, исполнительные производства или активные звонки и письма от взыскателей.
            </p>

            <div className="flex flex-col gap-2">
              {[
                {
                  value: "no" as const,
                  label: "Пока нет решений суда и приставов",
                  hint: "Важно не доводить до суда, можно обсудить ситуацию заранее.",
                },
                {
                  value: "yes" as const,
                  label: "Есть решения суда / исполнительные производства",
                  hint: "Это серьёзный сигнал, стоит обсудить защиту и списание долгов.",
                },
              ].map((opt) => {
                const selected = answers.enforcement === opt.value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, enforcement: opt.value }))
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition
                      ${
                        selected
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-slate-200 bg-slate-50/40 hover:border-emerald-400 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border
                          ${
                            selected
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 bg-white"
                          }`}
                      >
                        {selected && (
                          <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="text-primary">{opt.label}</span>
                    </div>

                    {/* <span className="hidden sm:block text-[11px] text-slate-500 ml-4">
                      {opt.hint}
                    </span> */}
                  </button>
                );
              })}
            </div>
          </div>
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
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Насколько вы готовы рассматривать банкротство
            </h3>
            <p className="text-sm text-secondary mb-4">
              Ответ нужен, чтобы понять, как лучше построить консультацию.
            </p>

            <div className="flex flex-col gap-2">
              {[
                {
                  value: "not_sure" as const,
                  label: "Пока просто изучаю варианты",
                  hint: "Можно задать любые вопросы без обязательств.",
                },
                {
                  value: "yes" as const,
                  label: "Готов(а) обсудить процедуру подробно",
                  hint: "Подберём безопасный план списания долгов.",
                },
                {
                  value: "no" as const,
                  label: "Скорее хочу рассмотреть другие решения",
                  hint: "Обсудим альтернативы банкротству и мягкие варианты.",
                },
              ].map((opt) => {
                const selected = answers.ready === opt.value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        ready: opt.value as QuizAnswers["ready"],
                      }))
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition
                      ${
                        selected
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-slate-200 bg-slate-50/40 hover:border-emerald-400 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border
                          ${
                            selected
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 bg-white"
                          }`}
                      >
                        {selected && (
                          <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="text-primary">{opt.label}</span>
                    </div>

                    {/* <span className="hidden sm:block text-[11px] text-slate-500 ml-4">
                      {opt.hint}
                    </span> */}
                  </button>
                );
              })}
            </div>
          </div>
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
