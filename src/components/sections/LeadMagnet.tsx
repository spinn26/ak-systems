"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Check, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = /.+@.+\..+/.test(email.trim());
    if (!ok) {
      setError("Укажите корректный email");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Чек-лист",
          company: "не указано",
          email: email.trim(),
          contact: email.trim(),
          size: "<20",
          consent: true,
          task: "[lead-magnet] Запрос чек-листа аудита CRM на 42 пункта.",
        }),
      });
      setDone(true);
    } catch {
      setError("Не удалось отправить. Напишите на hello@aksys.ru.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section relative border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="drift" />
      <Container className="relative">
        <FadeIn>
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <AmbientAurora variant="bottom" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-hover)] mb-4">
                  <FileText size={14} />
                  PDF · 7 страниц · бесплатно
                </div>
                <h2 className="text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.15] tracking-tight text-[var(--text)]">
                  Чек-лист аудита CRM за 20 минут
                </h2>
                <p className="mt-5 max-w-xl text-[15.5px] leading-[1.65] text-[var(--text-muted)]">
                  42 пункта по четырём блокам: данные, процессы, интеграции,
                  команда. Пройдёте сами — увидите, где течёт ваша CRM. Без
                  нашего участия.
                </p>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-[var(--text-muted)]">
                  {[
                    "Качество данных о клиентах",
                    "Воронка и этапы сделок",
                    "Интеграции с сайтом и 1С",
                    "Отчётность и дашборды",
                    "Права и роли",
                    "Дисциплина работы команды",
                  ].map((l) => (
                    <li
                      key={l}
                      className="inline-flex items-start gap-2"
                    >
                      <Check
                        size={15}
                        className="mt-[3px] text-[var(--accent-hover)]"
                      />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 flex items-center">
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full p-6 rounded-xl bg-[var(--bg)] border border-[var(--accent)]/30"
                    >
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-hover)] mb-4">
                        <Check size={18} />
                      </div>
                      <div className="text-[16px] font-medium text-[var(--text)]">
                        Отправили на почту
                      </div>
                      <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--text-muted)]">
                        Проверьте почту. Если не пришло за 5 минут — загляните
                        в «Спам» или напишите нам в Telegram.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={onSubmit}
                      className="w-full"
                    >
                      <label
                        htmlFor="lm-email"
                        className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2 block"
                      >
                        Ваш email
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          id="lm-email"
                          type="email"
                          autoComplete="email"
                          placeholder="name@company.ru"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-invalid={!!error}
                          className="flex-1 h-12 px-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[15px] text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--accent)]/60"
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg bg-[var(--accent)] text-white text-[14.5px] font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60"
                        >
                          <Download size={15} />
                          {loading ? "Отправляем..." : "Получить PDF"}
                        </button>
                      </div>
                      {error && (
                        <p className="mt-2 text-[12px] text-[var(--price)]">
                          {error}
                        </p>
                      )}
                      <p className="mt-3 text-[12px] leading-[1.6] text-[var(--text-dim)]">
                        Отправим один раз, без рассылки. Никому ваш email не
                        передадим.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
