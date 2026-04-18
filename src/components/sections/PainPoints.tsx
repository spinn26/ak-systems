import {
  Banknote,
  Database,
  Network,
  TrendingUp,
  Package,
  BarChart3,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

const items = [
  {
    icon: Banknote,
    title: "Рутина съедает ФОТ",
    body: "Менеджер на 120 тыс/мес тратит 15 часов в неделю на ручные действия в CRM, отчёты в Excel и согласования в почте. Это 45 000 ₽ в месяц выброшенных впустую с одного сотрудника. На команде в 10 человек — 450 000 ₽ ежемесячно.",
  },
  {
    icon: Database,
    title: "CRM не отражает реальность",
    body: "Данные вносятся вручную и с ошибками. Дубли клиентов. Статусы устарели. Менеджеры ведут сделки в личных заметках. Руководитель принимает решения вслепую — на устаревших данных.",
  },
  {
    icon: Network,
    title: "Отделы изолированы друг от друга",
    body: "Продажи в Битрикс, маркетинг в amoCRM, производство в 1С, склад в Excel. Клиент «теряется» на стыках. Каждый отдел — своя правда. Синхронизация вручную, через мессенджеры.",
  },
  {
    icon: TrendingUp,
    title: "Рост ломает процессы",
    body: "То, что работало на 20 сотрудниках, рушится на 80. Инфраструктура не проектировалась под масштаб. Масштабирование превращается в хаос и пожары.",
  },
  {
    icon: Package,
    title: "Готовые решения не подходят",
    body: "Ваша модель продаж или производства — уникальна. Коробочный Битрикс24 закрывает 60% задач. Остальные 40% — либо работа вручную, либо костыли.",
  },
  {
    icon: BarChart3,
    title: "Нет единой картины бизнеса",
    body: "Отчёты собираются вручную, к понедельнику, из пяти разных мест. К моменту, когда они готовы — данные уже устарели. Реальных дашбордов нет.",
  },
];

export function PainPoints() {
  return (
    <section
      id="problems"
      className="section relative bg-[var(--bg-alt)] border-b border-[var(--border)] overflow-hidden"
    >
      <AmbientAurora variant="right" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Диагностика"
          title="Где именно утекают деньги в среднем бизнесе"
          subtitle="За 50+ проектов мы видели одни и те же проблемы. Вот они — с реальной ценой."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <article className="h-full p-7 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--accent-hover)]">
                    <item.icon size={18} strokeWidth={1.5} />
                  </span>
                  <span className="mono text-[11px] text-[var(--text-dim)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-[19px] font-semibold leading-tight tracking-tight text-[var(--text)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--text-muted)]">
                  {item.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
