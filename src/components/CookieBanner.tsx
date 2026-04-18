"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "aks_cookie_notice_ack_v1";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const acknowledge = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* noop */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Использование cookies"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-[60]"
        >
          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
              Cookies и аналитика
            </div>
            <p className="text-[13.5px] leading-[1.6] text-[var(--text-muted)]">
              Сайт использует cookies и Яндекс.Метрику, чтобы понимать, как
              устроен путь пользователей на странице. Никаких рекламных
              ретаргетингов и передачи данных третьим лицам.{" "}
              <Link
                href="/privacy"
                className="text-[var(--text)] underline decoration-[var(--border-strong)] underline-offset-2 hover:decoration-[var(--accent)]"
              >
                Политика конфиденциальности
              </Link>
              .
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={acknowledge}
                className="h-10 px-5 rounded-lg bg-[var(--accent)] text-white text-[13.5px] font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                Понятно
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
