import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AmbientAurora } from "@/components/AmbientAurora";

type Case = {
  industry: string;
  size: string;
  before: string;
  did: string;
  result: string;
  metric: { label: string; value: string }[];
};

const cases: Case[] = [
  {
    industry: "Производственная компания",
    size: "85 сотрудников",
    before:
      "Заявки с сайта приходили в почту, обрабатывались вручную. Цикл от заявки до КП — 3 рабочих дня. Потеря до 30% лидов «по таймингу».",
    did: "Внедрили Битрикс24, настроили воронку с 9 этапами, интеграцию с 1С:УНФ, автоматическую генерацию КП из шаблонов.",
    result:
      "Цикл «заявка → КП» сократился с 3 дней до 4 часов. Конверсия из заявки в сделку выросла с 12% до 19%. Проект окупился за 4 месяца.",
    metric: [
      { label: "цикл заявки", value: "−94%" },
      { label: "конверсия", value: "12 → 19%" },
      { label: "окупаемость", value: "4 мес" },
    ],
  },
  {
    industry: "B2B-сервис в логистике",
    size: "40 сотрудников",
    before:
      "Компания вела операционку в 6 разных инструментах (Trello, Google Sheets, почта, WhatsApp, 1С, внутренний сайт). 3 сотрудника фулл-тайм сводили данные вручную.",
    did: "Разработали единую платформу на Next.js + Python, интегрировали все источники данных, сделали дашборды в реальном времени.",
    result:
      "3 человека освободились от ручной сводки (сэкономлено ~480 000 ₽ ФОТ в месяц). Руководитель получил реальную картину бизнеса в одном окне.",
    metric: [
      { label: "экономия ФОТ", value: "480 000 ₽/мес" },
      { label: "инструментов", value: "6 → 1" },
      { label: "данные", value: "real-time" },
    ],
  },
  {
    industry: "Оптовая торговая компания",
    size: "120 сотрудников",
    before:
      "amoCRM не справлялся со сложной воронкой B2B-продаж. 4 юрлица, 7 товарных направлений, разные команды менеджеров. Отчёты собирались вручную 2 дня в месяц.",
    did: "Миграция с amoCRM на коробочный Битрикс24, настройка под мультибрендовую структуру, интеграция с 1С и BI.",
    result:
      "Время сборки управленческой отчётности — с 16 часов до 15 минут (автоматически). Прозрачность по всем 4 юрлицам в одном интерфейсе.",
    metric: [
      { label: "сборка отчётов", value: "16ч → 15м" },
      { label: "юрлиц в одном окне", value: "4" },
      { label: "миграция", value: "amoCRM → Б24" },
    ],
  },
];

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)] mb-2">
        {label}
      </div>
      <p className="text-[15px] leading-[1.65] text-[var(--text-muted)]">
        {children}
      </p>
    </div>
  );
}

export function Cases() {
  return (
    <section
      id="cases"
      className="section relative bg-[var(--bg-alt)] border-b border-[var(--border)] overflow-hidden"
    >
      <AmbientAurora variant="left" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Кейсы под NDA"
          title="Кейсы внедрения Битрикс24 и разработки платформ в среднем бизнесе"
          subtitle="Под NDA не раскрываем имена. Но цифры, задачи и результаты — реальные."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <FadeIn key={c.industry} delay={i * 0.05}>
              <article className="h-full p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col">
                <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                  Кейс 0{i + 1}
                </div>
                <h3 className="mt-3 text-[20px] font-semibold leading-tight tracking-tight text-[var(--text)]">
                  {c.industry}
                </h3>
                <div className="mono text-[12px] text-[var(--text-muted)] mt-1">
                  {c.size}
                </div>

                <div className="mt-6 space-y-5">
                  <Block label="Было">{c.before}</Block>
                  <Block label="Сделали">{c.did}</Block>
                  <Block label="Результат">{c.result}</Block>
                </div>

                <div className="mt-auto pt-6 grid grid-cols-3 gap-2 border-t border-[var(--border)] mt-7">
                  {c.metric.map((m) => (
                    <div key={m.label} className="pt-4">
                      <div className="mono text-[16px] font-semibold text-[var(--text)] leading-tight">
                        {m.value}
                      </div>
                      <div className="mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)] mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 flex justify-center">
          <Button href="#contact" variant="ghost" size="lg">
            Обсудить ваш кейс
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
