import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora, type AuroraVariant } from "@/components/AmbientAurora";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
  alt?: boolean;
  aurora?: AuroraVariant;
};

export function ContentSection({
  id,
  eyebrow,
  title,
  lede,
  children,
  alt = false,
  aurora,
}: Props) {
  return (
    <section
      id={id}
      className={`section relative border-b border-[var(--border)] overflow-hidden ${
        alt ? "bg-[var(--bg-alt)]" : ""
      }`}
    >
      {aurora && <AmbientAurora variant={aurora} />}
      <Container className="relative">
        <FadeIn className="max-w-3xl">
          {eyebrow && (
            <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.15] tracking-tight text-[var(--text)]">
            {title}
          </h2>
          {lede && (
            <p className="mt-5 text-[16.5px] leading-[1.65] text-[var(--text-muted)]">
              {lede}
            </p>
          )}
        </FadeIn>
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 max-w-3xl">
      {items.map((i, idx) => (
        <li
          key={idx}
          className="flex items-start gap-3 text-[15.5px] leading-[1.7] text-[var(--text)]"
        >
          <span className="mono text-[11px] text-[var(--text-dim)] mt-1.5 w-6 shrink-0">
            {String(idx + 1).padStart(2, "0")}
          </span>
          {i}
        </li>
      ))}
    </ul>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 text-[15.5px] leading-[1.75] text-[var(--text-muted)]">
      {children}
    </div>
  );
}
