import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

const items = [
  "Если нужен сайт-визитка за 20 000 ₽ — мы не ваши.",
  "Если компания меньше 10 человек — системность у нас будет избыточной.",
  "Если ищете «сделайте красиво на коленке за неделю» — не наш формат.",
  "Если не готовы подписывать NDA и договор подряда — не поработаем.",
  "Если нужна ERP уровня SAP / 1С:ERP — это не к нам, это к консалтеру крупного бизнеса.",
];

export function NotForYou() {
  return (
    <section className="section relative border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="bottom" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <FadeIn className="lg:col-span-5">
            <div className="mono text-xs uppercase tracking-[0.22em] text-[var(--text-muted)] mb-4">
              Честно
            </div>
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.15] tracking-tight text-[var(--text)]">
              Когда мы не подойдём
              <br />
              <span className="text-[var(--text-muted)]">друг другу</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.65] text-[var(--text-muted)]">
              Лучше сказать сразу, чем потратить неделю на КП, которое не
              полетит. Вот прямая граница, за которой мы не работаем.
            </p>
          </FadeIn>

          <FadeIn className="lg:col-span-7" delay={0.05}>
            <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {items.map((l, i) => (
                <li
                  key={l}
                  className="py-5 flex items-start gap-4 text-[15.5px] leading-[1.55] text-[var(--text)]"
                >
                  <span className="mono text-[11px] text-[var(--text-dim)] mt-1.5 w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
