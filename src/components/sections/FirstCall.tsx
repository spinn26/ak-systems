import { Clock, Users, FileSearch, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

const will = [
  "Что у вас сейчас — tech-стек, процессы, команда, пробелы",
  "Что хотите получить на выходе — и через какой срок",
  "Ориентировочный бюджет и ограничения",
  "Подходит ли кому-то из продуктов или нужен аудит",
];

const wont = [
  "Не будем продавать «любой ценой»",
  "Не будем обещать сроки без расчёта",
  "Не будем собирать email в обмен на созвон",
];

export function FirstCall() {
  return (
    <section className="section relative bg-[var(--bg-alt)] border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="left" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Первый шаг"
          title="Что будет на первом созвоне"
          subtitle="30 минут, без презентаций и «сначала расскажите про ваш бизнес». Фокус — понять, стоит ли нам работать вместе."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <FadeIn className="lg:col-span-5">
            <div className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] h-full">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--bg)] border border-[var(--border)] text-[var(--accent-hover)]">
                  <Clock size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                    Формат
                  </div>
                  <div className="text-[16px] font-medium text-[var(--text)]">
                    30 минут, Zoom / Google Meet / Telegram
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--bg)] border border-[var(--border)] text-[var(--accent-hover)]">
                  <Users size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                    Со стороны AK Systems
                  </div>
                  <div className="text-[16px] font-medium text-[var(--text)]">
                    Основатель и архитектор
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--bg)] border border-[var(--border)] text-[var(--accent-hover)]">
                  <FileSearch size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                    После созвона
                  </div>
                  <div className="text-[16px] font-medium text-[var(--text)]">
                    Письмо с резюме и следующим шагом
                  </div>
                </div>
              </div>

              <Link
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-[14.5px] font-medium text-[var(--accent-hover)] hover:text-[var(--accent)]"
              >
                Записаться на созвон
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-7" delay={0.05}>
            <div className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] h-full">
              <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-hover)] mb-3">
                На созвоне разберём
              </div>
              <ul className="space-y-3">
                {will.map((l, i) => (
                  <li
                    key={l}
                    className="flex items-start gap-3 text-[15px] leading-[1.55] text-[var(--text)]"
                  >
                    <span className="mono text-[12px] text-[var(--accent-hover)] mt-1 w-5 shrink-0">
                      0{i + 1}
                    </span>
                    {l}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-[var(--border)]">
                <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)] mb-3">
                  Чего не будет
                </div>
                <ul className="space-y-2 text-[14px] text-[var(--text-muted)]">
                  {wont.map((l) => (
                    <li key={l} className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-1 rounded-full bg-[var(--text-dim)] shrink-0" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
