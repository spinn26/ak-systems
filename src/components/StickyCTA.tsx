"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { SITE } from "@/lib/site";

export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > 600 && y / h < 0.92);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed bottom-4 left-4 right-4 z-40"
        >
          <div className="flex gap-2 p-2 rounded-2xl bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Telegram"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)]"
            >
              <Send size={17} strokeWidth={1.75} />
            </a>
            <Link
              href="#contact"
              className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-[var(--accent)] text-white text-[14px] font-medium"
            >
              Обсудить задачу
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
