"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { Menu, X, Send } from "lucide-react";
import { SITE } from "@/lib/site";

const nav = [
  { href: "/bitrix24", label: "Битрикс24" },
  { href: "/#problems", label: "Проблемы" },
  { href: "/#products", label: "Продукты" },
  { href: "/#cases", label: "Кейсы" },
  { href: "/#process", label: "Процесс" },
  { href: "/#team", label: "Команда" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav
          className="hidden xl:flex items-center gap-7"
          aria-label="Основная навигация"
        >
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-[14px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`mailto:${SITE.email}`}
            className="hidden 2xl:inline text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Telegram ${SITE.telegram}`}
            title={SITE.telegram}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors"
          >
            <Send size={15} strokeWidth={1.75} />
          </a>
          <Button href="/#contact" size="md">
            Обсудить задачу
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[var(--bg)] border-t border-[var(--border)] overflow-y-auto">
          <div className="container-x py-8 flex flex-col gap-2">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[17px] text-[var(--text)] border-b border-[var(--border)]"
              >
                {i.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="py-3 text-[17px] text-[var(--text)] border-b border-[var(--border)]"
            >
              Контакты
            </Link>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={SITE.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-[var(--text)]"
              >
                Telegram: {SITE.telegram}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="text-[15px] text-[var(--text-muted)]"
              >
                {SITE.email}
              </a>
            </div>

            <Button
              href="/#contact"
              size="lg"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Обсудить задачу
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
