import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AmbientAurora, type AuroraVariant } from "@/components/AmbientAurora";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { FadeIn } from "@/components/ui/FadeIn";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  meta?: Array<{ label: string; value: string }>;
  aurora?: AuroraVariant;
};

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  ctaPrimary = { label: "Обсудить задачу", href: "/#contact" },
  ctaSecondary,
  meta,
  aurora = "hero",
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <AmbientAurora variant={aurora} />
      <Container className="relative">
        <div className="pt-10 pb-20 lg:pt-14 lg:pb-28">
          <Breadcrumbs items={crumbs} />

          <FadeIn className="mt-8 max-w-4xl">
            {eyebrow && (
              <div className="mono text-xs uppercase tracking-[0.22em] text-[var(--text-muted)] mb-5">
                {eyebrow}
              </div>
            )}
            <h1 className="text-[clamp(34px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--text)]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-[17px] lg:text-[19px] leading-[1.6] text-[var(--text-muted)]">
              {description}
            </p>

            {meta && meta.length > 0 && (
              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden max-w-3xl">
                {meta.map((m) => (
                  <div
                    key={m.label}
                    className="bg-[var(--surface)] p-4 lg:p-5"
                  >
                    <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                      {m.label}
                    </div>
                    <div className="mt-1.5 text-[15px] font-medium text-[var(--text)]">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button href={ctaPrimary.href} size="lg">
                {ctaPrimary.label}
              </Button>
              {ctaSecondary && (
                <Button
                  href={ctaSecondary.href}
                  variant="ghost"
                  size="lg"
                >
                  {ctaSecondary.label}
                </Button>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
