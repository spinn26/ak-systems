"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const KEY = "aks_intro_seen_v1";

export function IntroScan() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduce) return;
    try {
      const seen = sessionStorage.getItem(KEY);
      if (!seen) {
        setShow(true);
        sessionStorage.setItem(KEY, "1");
      }
    } catch {
      /* noop */
    }
  }, [reduce]);

  const duration = 1.1;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[70] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* glow ribbon trailing the scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[140px] -translate-y-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(79,70,229,0) 0%, rgba(79,70,229,0.12) 45%, rgba(99,102,241,0.18) 50%, rgba(79,70,229,0.12) 55%, rgba(79,70,229,0) 100%)",
              filter: "blur(6px)",
            }}
            initial={{ top: "-70px" }}
            animate={{ top: "calc(100% + 70px)" }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* crisp scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[1.5px] bg-[var(--accent-hover)]"
            style={{
              boxShadow:
                "0 0 18px 2px rgba(99,102,241,0.8), 0 0 60px 10px rgba(79,70,229,0.45)",
            }}
            initial={{ top: "-2px" }}
            animate={{ top: "100%" }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() =>
              setTimeout(() => setShow(false), 180)
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
