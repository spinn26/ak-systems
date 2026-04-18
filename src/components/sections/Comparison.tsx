import { Check, Minus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

type Cell = "yes" | "no" | "partial";

type Row = {
  label: string;
  us: Cell;
  agency: Cell;
  inhouse: Cell;
  freelancer: Cell;
};

const rows: Row[] = [
  {
    label: "Фиксированная цена и срок в договоре",
    us: "yes",
    agency: "no",
    inhouse: "no",
    freelancer: "partial",
  },
  {
    label: "Системная архитектура до кода",
    us: "yes",
    agency: "partial",
    inhouse: "partial",
    freelancer: "no",
  },
  {
    label: "Команда с ролями (архитектор, backend, frontend)",
    us: "yes",
    agency: "yes",
    inhouse: "partial",
    freelancer: "no",
  },
  {
    label: "Специализация на среднем бизнесе (20–200 чел)",
    us: "yes",
    agency: "no",
    inhouse: "yes",
    freelancer: "no",
  },
  {
    label: "Гарантия после запуска",
    us: "yes",
    agency: "partial",
    inhouse: "yes",
    freelancer: "no",
  },
  {
    label: "Не растёт в ФОТ после проекта",
    us: "yes",
    agency: "yes",
    inhouse: "no",
    freelancer: "yes",
  },
  {
    label: "Старт за 1–2 недели",
    us: "yes",
    agency: "partial",
    inhouse: "no",
    freelancer: "yes",
  },
];

function Icon({ v }: { v: Cell }) {
  if (v === "yes")
    return (
      <Check
        size={16}
        strokeWidth={2.2}
        className="text-[var(--accent-hover)]"
      />
    );
  if (v === "partial")
    return (
      <Minus size={16} strokeWidth={2} className="text-[var(--price)]" />
    );
  return <X size={16} strokeWidth={2} className="text-[var(--text-dim)]" />;
}

export function Comparison() {
  return (
    <section className="section relative bg-[var(--bg-alt)] border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="sweep" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Сравнение с альтернативами"
          title="AK Systems против типичного агентства, штата и фрилансера"
          subtitle="Короткая честная таблица. Цель — помочь выбрать, а не продать любой ценой."
        />

        <FadeIn className="mt-14">
          <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                  <th className="p-5 text-[13px] font-medium text-[var(--text-muted)] w-[36%]">
                    Критерий
                  </th>
                  <th className="p-5 text-[13px] font-semibold text-[var(--accent-hover)] w-[16%]">
                    AK Systems
                  </th>
                  <th className="p-5 text-[13px] font-medium text-[var(--text-muted)] w-[16%]">
                    Типовое агентство
                  </th>
                  <th className="p-5 text-[13px] font-medium text-[var(--text-muted)] w-[16%]">
                    Штатный разработчик
                  </th>
                  <th className="p-5 text-[13px] font-medium text-[var(--text-muted)] w-[16%]">
                    Фрилансер
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.label}
                    className={`border-b border-[var(--border)] last:border-0 ${
                      i % 2 === 1 ? "bg-[var(--surface)]/40" : ""
                    }`}
                  >
                    <td className="p-5 text-[14px] text-[var(--text)]">
                      {r.label}
                    </td>
                    <td className="p-5 bg-[var(--accent-soft)]/30">
                      <Icon v={r.us} />
                    </td>
                    <td className="p-5">
                      <Icon v={r.agency} />
                    </td>
                    <td className="p-5">
                      <Icon v={r.inhouse} />
                    </td>
                    <td className="p-5">
                      <Icon v={r.freelancer} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="text-[var(--accent-hover)]" /> есть
            </span>
            <span className="inline-flex items-center gap-2">
              <Minus size={14} className="text-[var(--price)]" /> частично
            </span>
            <span className="inline-flex items-center gap-2">
              <X size={14} className="text-[var(--text-dim)]" /> нет
            </span>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
