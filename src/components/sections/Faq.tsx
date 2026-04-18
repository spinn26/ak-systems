"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQ } from "@/lib/faq";
import { AmbientAurora } from "@/components/AmbientAurora";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section relative bg-[var(--bg-alt)] border-b border-[var(--border)] overflow-hidden"
    >
      <AmbientAurora variant="center" />
      <Container className="relative">
        <SectionHeader eyebrow="FAQ" title="Частые вопросы" />

        <div className="mt-14 max-w-3xl mx-auto border-t border-[var(--border)]">
          {FAQ.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="border-b border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start gap-4 py-6 text-left"
                >
                  <span className="mono text-[12px] text-[var(--text-dim)] mt-1 w-8 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="flex-1 text-[17px] lg:text-[18px] font-medium leading-snug text-[var(--text)]">
                    {it.q}
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] shrink-0">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 pr-12 pb-6 text-[15px] leading-[1.7] text-[var(--text-muted)]">
                        {it.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
