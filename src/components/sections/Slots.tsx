"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AmbientAurora } from "@/components/AmbientAurora";

export function Slots() {
  const reduce = useReducedMotion();

  return (
    <section className="section relative border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="right" />
      <Container className="relative">
        <FadeIn>
          <div className="relative p-10 lg:p-14 rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
            <motion.div
              aria-hidden
              initial={reduce ? undefined : { opacity: 0.6, scale: 1 }}
              animate={
                reduce
                  ? undefined
                  : {
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.05, 1],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-px pointer-events-none"
              style={{
                background:
                  "radial-gradient(40% 80% at 100% 0%, rgba(79, 70, 229, 0.14), transparent 70%)",
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7">
                <div className="mono text-xs uppercase tracking-[0.22em] text-[var(--text-muted)] mb-4">
                  Ёмкость команды
                </div>
                <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-tight text-[var(--text)]">
                  В работе — не больше 3 проектов одновременно
                </h2>
                <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-[var(--text-muted)]">
                  Мы не потоковая студия. В каждом квартале берём до 3 крупных
                  проектов, чтобы каждый получил инженерное качество. На
                  текущий квартал — осталось 2 слота.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6">
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((i) => {
                    const taken = i === 0;
                    return (
                      <motion.div
                        key={i}
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.1 + i * 0.1,
                        }}
                        style={{ transformOrigin: "0% 50%" }}
                        className={`h-2.5 w-10 rounded-full ${
                          taken
                            ? "bg-[var(--border-strong)]"
                            : "bg-[var(--accent)]"
                        }`}
                      />
                    );
                  })}
                  <span className="mono text-[12px] text-[var(--text-muted)] ml-2">
                    2 / 3 свободно
                  </span>
                </div>
                <Button href="#contact" size="lg">
                  Забронировать слот
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
