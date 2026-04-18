"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

type OptionScore = {
  audit?: number;
  standard?: number;
  enterprise?: number;
  platform?: number;
  support?: number;
};

type Option = {
  label: string;
  score: OptionScore;
};

type Q = {
  id: string;
  title: string;
  help?: string;
  options: Option[];
};

const questions: Q[] = [
  {
    id: "size",
    title: "Сколько сотрудников в компании?",
    options: [
      { label: "До 20", score: { audit: 1 } },
      { label: "20–50", score: { audit: 2, standard: 3 } },
      { label: "50–100", score: { standard: 3, enterprise: 2, platform: 2 } },
      { label: "100–200", score: { enterprise: 3, platform: 3 } },
      { label: "Более 200", score: { enterprise: 2, platform: 3 } },
    ],
  },
  {
    id: "pain",
    title: "Какая главная боль сейчас?",
    options: [
      {
        label: "Не понимаем, с чего начать",
        score: { audit: 5 },
      },
      {
        label: "CRM не работает / нет CRM",
        score: { standard: 4, enterprise: 1 },
      },
      {
        label: "Уникальные процессы — коробка не подходит",
        score: { enterprise: 4, platform: 2 },
      },
      {
        label: "Нужна своя платформа / личный кабинет",
        score: { platform: 5 },
      },
      {
        label: "Всё работает, но нужна команда на развитие",
        score: { support: 5 },
      },
    ],
  },
  {
    id: "now",
    title: "Что сейчас стоит у вас?",
    options: [
      { label: "Только Excel / Notion", score: { audit: 1, standard: 2 } },
      { label: "amoCRM / HubSpot", score: { enterprise: 3 } },
      { label: "Битрикс24, но не используется", score: { audit: 3, standard: 2 } },
      { label: "1С + зоопарк инструментов", score: { platform: 3, enterprise: 2 } },
      { label: "Самописная система", score: { platform: 2, support: 2 } },
    ],
  },
  {
    id: "budget",
    title: "Бюджет на проект?",
    options: [
      { label: "До 100 000 ₽", score: { audit: 5 } },
      { label: "100 000 – 300 000 ₽", score: { standard: 4, audit: 1 } },
      { label: "300 000 – 700 000 ₽", score: { enterprise: 4, platform: 1 } },
      { label: "700 000 – 1 500 000 ₽", score: { platform: 4, enterprise: 2 } },
      { label: "Ещё не считали", score: { audit: 3 } },
    ],
  },
];

type Product = "audit" | "standard" | "enterprise" | "platform" | "support";

const productInfo: Record<
  Product,
  { title: string; term: string; price: string; summary: string }
> = {
  audit: {
    title: "Начните с системного аудита",
    term: "5–10 рабочих дней",
    price: "30 000 ₽",
    summary:
      "По вашим ответам — на руках не хватает карты проблем. Аудит даёт её + план с приоритетами и бюджетом.",
  },
  standard: {
    title: "Подойдёт внедрение Битрикс24 «Стандарт»",
    term: "3–5 недель",
    price: "180 000 ₽",
    summary:
      "Нужна рабочая CRM под продажи. Настройка воронки, интеграции, роботы, обучение команды.",
  },
  enterprise: {
    title: "Вам нужен Битрикс24 «Энтерпрайз»",
    term: "6–10 недель",
    price: "от 450 000 ₽",
    summary:
      "Есть уникальные процессы, нужны кастомные BP, интеграции с 1С и миграция с другой CRM.",
  },
  platform: {
    title: "Оптимально — разработка платформы",
    term: "8–16 недель",
    price: "от 600 000 ₽",
    summary:
      "Коробка не закрывает задачу. Нужна кастомная платформа под вашу бизнес-модель.",
  },
  support: {
    title: "Нужна подписка «Поддержка и развитие»",
    term: "ежемесячно",
    price: "от 40 000 ₽/мес",
    summary:
      "Система уже есть — её нужно держать и развивать командой без штатного техдиректора.",
  },
};

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OptionScore[]>([]);
  const done = step >= questions.length;

  const result = useMemo<Product>(() => {
    const totals: Record<Product, number> = {
      audit: 0,
      standard: 0,
      enterprise: 0,
      platform: 0,
      support: 0,
    };
    for (const a of answers) {
      (Object.keys(totals) as Product[]).forEach((k) => {
        totals[k] += a[k] ?? 0;
      });
    }
    const sorted = (Object.keys(totals) as Product[]).sort(
      (a, b) => totals[b] - totals[a],
    );
    return sorted[0] ?? "audit";
  }, [answers]);

  const choose = (opt: Option) => {
    setAnswers((a) => [...a.slice(0, step), opt.score, ...a.slice(step + 1)]);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section className="section relative border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="center" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Калькулятор / квиз"
          title="4 вопроса — и рекомендованный продукт"
          subtitle="Никаких email за результат. Просто подсказка, с чего начать — и сколько это обычно стоит."
        />

        <FadeIn className="mt-14">
          <div className="max-w-3xl mx-auto p-8 lg:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center justify-between mb-8">
              <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                {done
                  ? `Готово · ${questions.length} / ${questions.length}`
                  : `Шаг ${step + 1} / ${questions.length}`}
              </div>
              <div className="h-1 w-40 rounded-full bg-[var(--bg)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={false}
                  animate={{
                    width: `${Math.min(100, ((done ? questions.length : step) / questions.length) * 100)}%`,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={questions[step].id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-[22px] lg:text-[26px] font-semibold tracking-tight leading-[1.2] text-[var(--text)]">
                    {questions[step].title}
                  </h3>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => choose(opt)}
                        className="group text-left p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-alt)] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[14.5px] text-[var(--text)]">
                            {opt.label}
                          </span>
                          <ArrowRight
                            size={15}
                            className="text-[var(--text-dim)] group-hover:text-[var(--accent-hover)] transition-colors"
                          />
                        </div>
                      </button>
                    ))}
                  </div>

                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className="mt-6 text-[13px] text-[var(--text-muted)] hover:text-[var(--text)]"
                    >
                      ← Назад
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-hover)] mb-3">
                    Рекомендация
                  </div>
                  <h3 className="text-[24px] lg:text-[30px] font-semibold tracking-tight leading-[1.15] text-[var(--text)]">
                    {productInfo[result].title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="mono inline-flex h-7 px-2.5 items-center rounded-md border border-[var(--border)] text-[12px] text-[var(--text-muted)]">
                      срок: {productInfo[result].term}
                    </span>
                    <span className="mono inline-flex h-7 px-2.5 items-center rounded-md border border-[var(--border)] text-[12px] text-[var(--price)]">
                      {productInfo[result].price}
                    </span>
                  </div>
                  <p className="mt-5 text-[15px] leading-[1.65] text-[var(--text-muted)]">
                    {productInfo[result].summary}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[var(--accent)] text-white text-[14.5px] font-medium hover:bg-[var(--accent-hover)] transition-colors"
                    >
                      Обсудить задачу
                      <ArrowRight size={15} />
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-[var(--border)] bg-transparent text-[14.5px] text-[var(--text)] hover:border-[var(--border-strong)] hover:bg-[var(--surface)] transition-colors"
                    >
                      <RotateCcw size={14} />
                      Пройти заново
                    </button>
                  </div>
                  <p className="mt-8 mono text-[11px] text-[var(--text-dim)]">
                    Это эвристика, не КП. Точная цена и срок — после первого
                    30-минутного созвона.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
