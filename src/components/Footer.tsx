import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--border)] bg-[var(--bg-alt)]">
      <div className="container-x py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-[1.6] text-[var(--text-muted)]">
              Инженерные системы для среднего бизнеса.
            </p>
            <div className="mt-4 mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-hover)]">
              systems.engineered()
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-dim)] mb-4">
              Разделы
            </div>
            <ul className="space-y-2.5 text-[14px]">
              {[
                ["/bitrix24", "Битрикс24"],
                ["/audit", "Аудит"],
                ["/blog", "Блог"],
                ["/#problems", "Проблемы"],
                ["/#products", "Продукты"],
                ["/#cases", "Кейсы"],
                ["/#process", "Процесс"],
                ["/#team", "Команда"],
                ["/#faq", "FAQ"],
                ["/#contact", "Контакты"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-dim)] mb-4">
              Контакты
            </div>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[var(--text)] hover:text-[var(--accent-hover)] transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)] hover:text-[var(--accent-hover)] transition-colors"
                >
                  Telegram: {SITE.telegram}
                </a>
              </li>
              <li className="mono text-[12px] text-[var(--text-dim)]">
                {SITE.hours}
              </li>
            </ul>
            <div className="mt-6 mono text-[12px] leading-[1.7] text-[var(--text-dim)]">
              {SITE.legal.entity}
              <br />
              ОГРНИП {SITE.legal.ogrnip}
              <br />
              ИНН {SITE.legal.inn}
              <br />
              {SITE.legal.address}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="mono text-[12px] text-[var(--text-dim)]">
            © 2026 AK Systems · engineered for scale
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[var(--text-muted)]">
            <Link
              href="/privacy"
              className="hover:text-[var(--text)] transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--text)] transition-colors"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
