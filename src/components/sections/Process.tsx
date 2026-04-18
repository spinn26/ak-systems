"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

const steps = [
  {
    n: "01",
    title: "Бриф и аудит",
    time: "1 день — бесплатно / 5–10 дней — платный аудит",
    body: "Разбираемся в задаче. Если запрос простой — хватит часового созвона. Если сложный — предлагаем платный аудит за 30 000 ₽.",
  },
  {
    n: "02",
    title: "Коммерческое предложение с фиксированной ценой",
    time: "2–3 дня",
    body: "Готовим КП с чётким скоупом, сроком, ценой. Никаких «от и до». Если цена не подходит — предлагаем вариант дешевле с урезанным скоупом.",
  },
  {
    n: "03",
    title: "Договор и старт",
    time: "1 день",
    body: "Работаем по договору. Предоплата 50%. Этапы с промежуточной приёмкой.",
  },
  {
    n: "04",
    title: "Разработка и еженедельные демо",
    time: "по плану",
    body: "Раз в неделю — демо прогресса. Вы видите, что сделано, и корректируете курс, если нужно.",
  },
  {
    n: "05",
    title: "Запуск и передача",
    time: "финальный этап",
    body: "Деплой, документация, обучение команды, гарантийная поддержка.",
  },
];

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как AK Systems внедряет Битрикс24 и разрабатывает платформы",
  description:
    "Процесс из 5 шагов от первого брифа до запуска системы с гарантийной поддержкой.",
  totalTime: "P42D",
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pulseX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="section relative border-b border-[var(--border)] overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <AmbientAurora variant="drift" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Процесс работы"
          title="Как мы внедряем Битрикс24 и разрабатываем платформы: процесс из 5 шагов"
          subtitle="Вы всегда знаете, на каком этапе проект и что будет дальше."
        />

        <div
          ref={ref}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative"
        >
          {/* connector track */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-[var(--border)]"
          />
          {/* connector fill */}
          <motion.div
            aria-hidden
            style={{ scaleX: lineScale, transformOrigin: "0% 50%" }}
            className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-[var(--accent)]"
          />
          {/* traveling pulse */}
          {!reduce && (
            <motion.div
              aria-hidden
              style={{ left: pulseX }}
              className="hidden lg:block absolute top-7 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            >
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] blur-[8px] opacity-80" />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-[var(--accent-hover)] ring-2 ring-[var(--bg)]" />
              </div>
            </motion.div>
          )}

          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.06}>
              <div className="relative p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] h-full overflow-hidden group hover:border-[var(--border-strong)] transition-colors">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-10 -right-8 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(79, 70, 229, 0.25)" }}
                />
                <div className="relative z-10 flex items-center gap-3 mb-4">
                  <span className="mono inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--bg)] border border-[var(--border-strong)] text-[13px] text-[var(--accent-hover)]">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold leading-tight tracking-tight text-[var(--text)]">
                  {s.title}
                </h3>
                <div className="mono text-[11px] text-[var(--text-dim)] mt-2">
                  {s.time}
                </div>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--text-muted)]">
                  {s.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
