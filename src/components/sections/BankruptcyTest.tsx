'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type AnswerOption = (number | null)[];

const questions = [
  {
    question: "Сумма ваших долгов превышает 500 000 рублей?",
    options: [
      { label: "Да, значительно", value: 1 },
      { label: "Да, немного", value: 2 },
      { label: "Нет, небольшие долги", value: 3 },
      { label: "Нет долгов", value: 4 },
      { label: "Затрудняюсь ответить", value: 5 },
    ],
  },
  {
    question: "Просрочка по платежам составляет более 3 месяцев?",
    options: [
      { label: "Да, есть просрочки", value: 1 },
      { label: "Нет просрочек", value: 2 },
      { label: "Затрудняюсь ответить", value: 3 },
      { label: "Иногда бывают просрочки", value: 4 },
      { label: "Затрудняюсь ответить", value: 5 },
    ],
  },
  {
    question:
      "У вас есть недвижимость или автомобиль?",
    options: [
      { label: "Есть недвижимость", value: 1 },
      { label: "Есть автомобиль", value: 2 },
      { label: "Нет имущества", value: 3 },
      { label: "Имущество есть, но незначительное", value: 4 },
      { label: "Затрудняюсь ответить", value: 5 }
    ],
  },
  {
    question:
      "Вы получаете официальную зарплату?",
    options: [
      { label: "Да, официально", value: 1 },
      { label: "Нет, неофициально", value: 2 },
      { label: "Затрудняюсь ответить", value: 3 },
      { label: "Работаю неофициально", value: 4 },
      { label: "Безработный(-ая)", value: 5 }
    ]
  },
  {
    question:
      "Есть ли у вас задолженность по алиментам или возмещению вреда здоровью?",
    options: [
      { label: "Есть задолженность", value: 1 },
      { label: "Нет задолженности", value: 2 },
      { label: "Затрудняюсь ответить", value: 3 },
      { label: "Погашаю задолженность", value: 4 },
      { label: "Иное/не знаю", value: 5 }
    ]
  }
];

// Логика определения результата
const getResultByAnswers = (answers: AnswerOption) => {
  const [q1, q2, q3, q4, q5] = answers;

  if (
    (q1 === 1 || q1 === 2) &&
    (q2 === 3 || q2 === 4) &&
    (q3 === 1 || q3 === 3) &&
    (q4 === 2 || q4 === 4) &&
    (q5 === 1 || q5 === 2)
  ) {
    return 'bankrupt';
  }
  return 'no';
};

export default function BankruptcyTest() {

  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [isFinished, setIsFinished] = useState(false);

  const [result, setResult] = useState<'bankrupt' | 'no' | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const [progress, setProgress] = useState(0);

  const [testPassed, setTestPassed] = useState(false);

  // Проверка куки при монтировании
  useEffect(() => {
    const passedFlag = Cookies.get('test_passed');
    if (passedFlag === 'true') {
      // Пользователь уже проходил тест
      setTestPassed(true);
    }
  }, []);

  // Обновляем прогресс при изменении ответов
  useEffect(() => {
    const totalQuestions = questions.length;
    const answeredCount = answers.filter(a => a !== null).length;
    setProgress((answeredCount / totalQuestions) * 100);
  }, [answers]);

  // Обработка выбора ответа
  const handleAnswerChange = (questionIndex: number, answer: number) => {
    if (testPassed || isFinished) return; // блокируем если тест уже пройден
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  // Переход к следующему вопросу с анимацией
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      handleFinish();
    }
  }

  // Обработчик для кнопки "Далее"/"Завершить"
  const handleNextOrFinish = () => {
    const answer = answers[currentQuestionIndex];
    if (answer === null) {
      alert('Пожалуйста, выберите ответ');
      return;
    }

    goToNextQuestion();
  }

  // Обработка завершения теста
  const handleFinish = () => {
    const resultType = getResultByAnswers(answers);

    // Записываем в куки результат и флаг прохождения
    Cookies.set('test_result', resultType, { expires: 7 });

    Cookies.set('test_passed', 'true', { expires: 7 });

    // Сохраняем все ответы в куки как JSON строку
    Cookies.set('test_answers', JSON.stringify(answers), { expires: 7 });

    setResult(resultType);

    setIsFinished(true);
  }

  // // Обработка отправки формы
  // const handleSubmit = () => {
  //   if (answers.some(a => a === null)) {
  //     alert('Пожалуйста, выберите ответы на все вопросы');
  //     return;
  //   }

  //   goToNextQuestion();
  // }

  if (testPassed && !isFinished) {
    return (
      <section className="section-padding bg-primary-dark text-neutral-white flex items-center justify-center min-h-screen">
        <div className="text-center max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-sm rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Вы уже проходили тест</h2>
          <p>Вы не можете пройти его повторно.</p>
        </div>
      </section>
    );
  }

  if (isFinished && result === 'bankrupt') {
    return (
      <section className="section-padding bg-primary-dark text-neutral-white flex items-center justify-center min-h-screen">
        <div className="text-center max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-sm rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Поздравляем!</h2>
          <p className="mb-6">Ваша ситуация подходит под процедуру банкротства. Свяжитесь с нами для консультации.</p>
        </div>
      </section>
    );
  }

  if (isFinished && result === 'no') {
    return (
      <section className="section-padding bg-primary-dark text-neutral-white flex items-center justify-center min-h-screen">
        <div className="text-center max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-sm rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Спасибо за участие</h2>
          <p>На основе ваших ответов банкротство не подходит. Если хотите пройти еще раз — обновите страницу.</p>
        </div>
      </section>
    );
  }

  // Основной рендеринг вопроса с анимацией и кнопкой отправки
  return (
    <section id="test" className="section-padding bg-primary-dark text-neutral-white relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container-custom w-full max-w-xl mx-auto px-4">

        {/* Прогресс бар */}
        <div className="w-full h-2 mb-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-secondary transition-all duration-300"
          ></div>
        </div>

        {/* Вопросы с анимацией */}
        <div
          key={currentQuestionIndex}
          className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >

          <h3 className="text-xl font-semibold mb-4">{questions[currentQuestionIndex].question}</h3>

          <div className="flex flex-col space-y-2">
            {questions[currentQuestionIndex].options.map((opt) => (
              <label key={opt.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-primary-pale/20 transition">
                <input
                  type='radio'
                  name={`question-${currentQuestionIndex}`}
                  checked={answers[currentQuestionIndex] === opt.value}
                  onChange={() => handleAnswerChange(currentQuestionIndex, opt.value)}
                  disabled={isFinished}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleNextOrFinish}
            disabled={isAnimating}
            className={`mt-6 px-6 py-3 ${answers[currentQuestionIndex] === null ? 'bg-gray-400' : 'bg-secondary hover:bg-secondary/90'} text-primary-dark font-semibold rounded-lg transition`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Завершить' : 'Далее'}
          </button>

        </div>

      </div>
    </section>
  );
}