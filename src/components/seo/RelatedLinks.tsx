import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

type Item = { href: string; title: string; description: string };

export function RelatedLinks({
  title = "Смежные материалы",
  items,
}: {
  title?: string;
  items: Item[];
}) {
  return (
    <section className="section relative border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="soft" />
      <Container className="relative">
        <FadeIn>
          <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
            Читать дальше
          </div>
          <h2 className="text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.15] tracking-tight text-[var(--text)]">
            {title}
          </h2>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i, idx) => (
            <FadeIn key={i.href} delay={idx * 0.05}>
              <Link
                href={i.href}
                className="group block p-7 h-full rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
              >
                <h3 className="text-[17px] font-semibold leading-tight tracking-tight text-[var(--text)] group-hover:text-[var(--accent-hover)] transition-colors">
                  {i.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--text-muted)]">
                  {i.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--accent-hover)]">
                  Открыть
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
