import { FadeIn } from "./FadeIn";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <FadeIn
      className={
        align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-3xl"
      }
    >
      {eyebrow && (
        <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-tight text-[var(--text)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[17px] leading-[1.6] text-[var(--text-muted)]">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
