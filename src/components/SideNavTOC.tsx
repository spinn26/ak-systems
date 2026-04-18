"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const items = [
  { id: "top", label: "Вверх" },
  { id: "problems", label: "Проблемы" },
  { id: "products", label: "Продукты" },
  { id: "cases", label: "Кейсы" },
  { id: "process", label: "Процесс" },
  { id: "team", label: "Команда" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Контакты" },
];

export function SideNavTOC() {
  const [active, setActive] = useState("top");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Навигация по странице"
      className={`hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-2 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {items.map((i) => {
        const isActive = active === i.id;
        return (
          <Link
            key={i.id}
            href={`#${i.id}`}
            className="group flex items-center gap-3 text-right"
          >
            <span
              className={`mono text-[11px] uppercase tracking-[0.15em] transition-opacity ${
                isActive
                  ? "text-[var(--text)] opacity-100"
                  : "text-[var(--text-dim)] opacity-0 group-hover:opacity-100"
              }`}
            >
              {i.label}
            </span>
            <span
              className={`h-px transition-all ${
                isActive
                  ? "bg-[var(--accent)] w-8"
                  : "bg-[var(--text-dim)] w-4 group-hover:w-6"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
