"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NodesCanvas } from "@/components/NodesCanvas";
import { AmbientAurora } from "@/components/AmbientAurora";

const trust = [
  "50+ проектов в среднем бизнесе",
  "Фиксированные цены и сроки",
  "Работаем по договору, NDA по запросу",
];

const headLine1 = ["Инженерные", "системы", "для", "бизнеса,"];
const headLine2 = ["который", "перерос", "таблицы"];

function WordStagger({
  words,
  delayBase = 0,
  muted = false,
}: {
  words: string[];
  delayBase?: number;
  muted?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom mr-[0.28em]"
        >
          <motion.span
            initial={reduce ? undefined : { y: "110%" }}
            animate={reduce ? undefined : { y: "0%" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delayBase + i * 0.06,
            }}
            className={`inline-block ${muted ? "text-[var(--text-muted)]" : ""}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden border-b border-[var(--border)]"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: glowY, opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <AmbientAurora variant="hero" />
      </motion.div>

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-20 pb-24 lg:pt-28 lg:pb-32">
          <motion.div
            style={reduce ? undefined : { y: contentY }}
            className="lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mono text-xs uppercase tracking-[0.22em] text-[var(--text-muted)] mb-6"
            >
              Инженерный консалтинг · Средний бизнес
            </motion.div>

            <h1 className="text-[clamp(36px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
              <span className="block">
                <WordStagger words={headLine1} delayBase={0.05} />
              </span>
              <span className="block mt-1">
                <WordStagger words={headLine2} delayBase={0.3} muted />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.55,
              }}
              className="mt-6 max-w-2xl text-[17px] lg:text-[19px] leading-[1.6] text-[var(--text-muted)]"
            >
              Внедряем Битрикс24, разрабатываем платформы и сложные сайты,
              проводим аудиты IT-инфраструктуры. Работаем с компаниями от 20 до
              200 сотрудников. Фиксированная цена, фиксированный срок.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.7,
              }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            >
              {trust.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 text-[14px] text-[var(--text-muted)]"
                >
                  <CheckCircle2
                    size={16}
                    strokeWidth={1.75}
                    className="text-[var(--accent)]"
                  />
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.8,
              }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Button href="#contact" size="lg">
                Обсудить задачу за 30 минут
              </Button>
              <Button href="#products" variant="ghost" size="lg">
                Продукты и цены
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={reduce ? undefined : { y: canvasY }}
            className="lg:col-span-5"
          >
            <div className="relative h-[340px] sm:h-[420px] lg:h-[520px] rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] overflow-hidden">
              <NodesCanvas />
              <div className="absolute top-4 left-4 mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                architecture.map
              </div>
              <div className="absolute bottom-4 left-4 right-4 mono text-[11px] text-[var(--text-dim)] flex justify-between">
                <span>
                  nodes: online
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block ml-2 h-1.5 w-1.5 rounded-full bg-[#10b981] align-middle"
                  />
                </span>
                <span>latency: 12ms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
