"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "aks_cookie_consent_v1";

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

  const decide = (v: "accept" | "reject") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* noop */
    }
    setShow(false);
    if (v === "accept") {
      window.dispatchEvent(new CustomEvent("aks:consent:granted"));
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookies"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-[60]"
        >
          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
              Cookies
            </div>
            <p className="text-[13.5px] leading-[1.6] text-[var(--text-muted)]">
              Сайт использует cookies для аналитики (Яндекс.Метрика) — помогают
              нам видеть, как устроен путь на странице. Никаких рекламных
              ретаргетингов.{" "}
              <Link
                href="/privacy"
                className="text-[var(--text)] underline decoration-[var(--border-strong)] underline-offset-2 hover:decoration-[var(--accent)]"
              >
                Политика
              </Link>
              .
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => decide("accept")}
                className="flex-1 h-10 rounded-lg bg-[var(--accent)] text-white text-[13.5px] font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                Принять
              </button>
              <button
                type="button"
                onClick={() => decide("reject")}
                className="flex-1 h-10 rounded-lg border border-[var(--border)] bg-transparent text-[13.5px] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors"
              >
                Отклонить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
