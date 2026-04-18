import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";
import { INDUSTRIES } from "@/lib/industries";

export function Industries() {
  return (
    <section className="section relative bg-[var(--bg-alt)] border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="corners" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Отрасли"
          title="Внедрение Битрикс24 для производства, торговли, логистики и B2B-услуг"
          subtitle="Не берёмся за всё подряд. В каждой отрасли — типовые боли, архитектурные паттерны и интеграции, которые мы уже проходили."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden">
          {INDUSTRIES.map((v, i) => (
            <FadeIn
              key={v.slug}
              delay={i * 0.04}
              className="bg-[var(--surface)]"
            >
              <Link
                href={`/industries/${v.slug}`}
                className="group p-7 h-full flex flex-col hover:bg-[var(--surface)]/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <v.icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-[var(--accent-hover)]"
                  />
                  <span className="mono text-[11px] text-[var(--text-dim)]">
                    {v.projects} проектов
                  </span>
                </div>
                <h3 className="mt-5 text-[18px] font-semibold leading-tight tracking-tight text-[var(--text)]">
                  {v.name}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--text-muted)] flex-1">
                  {v.short}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--accent-hover)] group-hover:text-[var(--accent)]">
                  Подробнее
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </FadeIn>
          ))}

          <FadeIn delay={0.25} className="bg-[var(--surface)]">
            <div className="p-7 h-full flex flex-col justify-between">
              <div>
                <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                  Вашей отрасли нет в списке?
                </div>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--text-muted)]">
                  Уточним специфику на первом созвоне. В 80% случаев паттерны
                  пересекаются с отраслями выше — адаптируем под вас.
                </p>
              </div>
              <Link
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--text)] hover:text-[var(--accent-hover)]"
              >
                Написать нам
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
