import {
  ShieldCheck,
  Scale,
  Clock3,
  Wallet,
  GitBranch,
  FileCheck2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

const items = [
  {
    icon: Scale,
    title: "Договор подряда",
    body: "Скоуп, сроки, цена и порядок приёмки — в договоре. Образец присылаем до подписания — изучаете с юристом.",
  },
  {
    icon: Wallet,
    title: "Оплата этапами",
    body: "50% предоплата, остальное — по этапам с промежуточной приёмкой. Не платите за то, что ещё не увидели.",
  },
  {
    icon: Clock3,
    title: "Срок жёстко зафиксирован",
    body: "Если просрочим — платите только за сделанное и забираете результат. Перенос срока только по вашей инициативе.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантийный период",
    body: "30 дней на Стандарте, 90 — на Энтерпрайзе и платформе. Починка багов в релизе — за наш счёт, без доплат.",
  },
  {
    icon: GitBranch,
    title: "Исходники ваши",
    body: "Весь код и данные — ваши с первого дня. Репозиторий, документация, учётки передаются на финальном этапе.",
  },
  {
    icon: FileCheck2,
    title: "NDA до деталей",
    body: "NDA подписываем до обсуждения конкретики. Бумажно или через ЭДО. Без NDA обсуждаем только общий периметр.",
  },
];

export function Guarantees() {
  return (
    <section className="section relative border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="right" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Гарантии"
          title="Что в договоре — и что будет, если пойдёт не так"
          subtitle="Это не «галочки для доверия». Это реальные пункты из договора, которые закрывают главные риски."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <FadeIn key={i.title} delay={idx * 0.04}>
              <article className="h-full p-7 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <i.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-[var(--accent-hover)]"
                />
                <h3 className="mt-5 text-[17px] font-semibold leading-tight tracking-tight text-[var(--text)]">
                  {i.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--text-muted)]">
                  {i.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)]">
          <p className="mono text-[12.5px] leading-[1.6] text-[var(--text-muted)]">
            Образцы договора, NDA и акта — присылаем после первого созвона в
            PDF на e-mail. Для ознакомления и согласования с вашим юристом.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
