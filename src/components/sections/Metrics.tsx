import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Counter } from "@/components/ui/Counter";
import { Sparkline } from "@/components/ui/Sparkline";
import { AmbientAurora } from "@/components/AmbientAurora";

type Metric = {
  value: string;
  label: string;
  hint: string;
  spark: number[];
  trend: "up" | "down" | "flat";
};

const metrics: Metric[] = [
  {
    value: "−50 … 80%",
    label: "времени на ручные процессы",
    hint: "меньше → лучше",
    spark: [92, 88, 80, 74, 62, 48, 34, 26, 20],
    trend: "down",
  },
  {
    value: "×2–3",
    label: "скорость обработки заявок",
    hint: "быстрее отвечаем — не теряем лида",
    spark: [18, 22, 26, 33, 42, 55, 68, 78, 86],
    trend: "up",
  },
  {
    value: "100%",
    label: "данных в одной системе",
    hint: "ни Excel, ни почты, ни Trello",
    spark: [30, 38, 45, 52, 62, 74, 82, 92, 100],
    trend: "up",
  },
  {
    value: "4 мес",
    label: "средний срок окупаемости проекта",
    hint: "после этого — чистая экономия",
    spark: [100, 84, 68, 54, 38, 22, 8, 4, 0],
    trend: "down",
  },
];

export function Metrics() {
  return (
    <section className="section relative bg-[var(--bg-alt)] border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="soft" />
      <Container className="relative">
        <FadeIn className="max-w-3xl">
          <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
            Результат в цифрах
          </div>
          <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-tight text-[var(--text)]">
            Что меняется после внедрения
          </h2>
          <p className="mt-4 mono text-[12px] text-[var(--text-dim)]">
            Усреднённые значения по 50+ проектам AK Systems, 2022 – 2025 гг.
            Конкретные показатели зависят от исходного состояния процессов.
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden">
          {metrics.map((m, i) => (
            <FadeIn
              key={m.label}
              delay={i * 0.06}
              className="bg-[var(--surface)]"
            >
              <div className="relative p-8 lg:p-10 h-full overflow-hidden">
                {/* sparkline background */}
                <Sparkline
                  points={m.spark}
                  trend={m.trend}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px] w-full opacity-60"
                />
                <div className="relative">
                  <Counter
                    value={m.value}
                    className="mono block text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-[var(--text)] leading-none tabular-nums"
                  />
                  <div className="mt-4 text-[14px] leading-[1.5] text-[var(--text-muted)]">
                    {m.label}
                  </div>
                  <div className="mt-2 mono text-[11px] text-[var(--text-dim)]">
                    {m.hint}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
