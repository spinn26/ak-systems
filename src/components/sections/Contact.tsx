"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";
import { leadSchema, type LeadInput } from "@/lib/leadSchema";
import { captureUtm, readUtm } from "@/lib/utm";
import { SITE } from "@/lib/site";

const fieldBase =
  "w-full h-12 px-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[15px] text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none transition-colors focus:border-[var(--accent)]/60 focus:bg-[var(--bg-alt)]";

const labelBase =
  "mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2 block";

const errorBase = "mt-1.5 text-[12px] text-[#f59e0b]";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    captureUtm();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
      email: "",
      contact: "",
      size: undefined,
      task: "",
      consent: false,
      website: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LeadInput) => {
    setServerError(null);
    try {
      const utm = readUtm();
      const payload = { ...data, utm };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad response");
      setSubmitted(true);
      reset();
      try {
        if (typeof window !== "undefined") {
          window.ym?.(
            Number(process.env.NEXT_PUBLIC_YM_ID),
            "reachGoal",
            "lead_submitted",
          );
          (window.dataLayer = window.dataLayer || []).push({
            event: "lead_submitted",
          });
        }
      } catch {
        /* noop */
      }
    } catch {
      setServerError(
        `Не удалось отправить заявку. Напишите нам на ${SITE.email} — ответим в течение 24 часов.`,
      );
    }
  };

  return (
    <section id="contact" className="section relative border-b border-[var(--border)] overflow-hidden">
      <AmbientAurora variant="hero" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                Связаться
              </div>
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-tight text-[var(--text)]">
                Начните с аудита
              </h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-[var(--text-muted)]">
                За 5–10 дней получите карту проблем вашего бизнеса и план
                действий с приоритетами. Стоимость — 30 000 ₽. Засчитываем в
                любой следующий проект.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 text-[14px]">
                  <Check
                    size={16}
                    className="mt-[3px] text-[var(--accent-hover)]"
                  />
                  <span className="text-[var(--text-muted)]">
                    Ответим в течение 24 часов в рабочие дни
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[14px]">
                  <Check
                    size={16}
                    className="mt-[3px] text-[var(--accent-hover)]"
                  />
                  <span className="text-[var(--text-muted)]">
                    NDA подписываем до обсуждения деталей
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[14px]">
                  <Check
                    size={16}
                    className="mt-[3px] text-[var(--accent-hover)]"
                  />
                  <span className="text-[var(--text-muted)]">
                    Ваши данные не передаются третьим лицам
                  </span>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--border)] space-y-1.5">
                <a
                  href={`mailto:${SITE.email}`}
                  className="block text-[15px] text-[var(--text)] hover:text-[var(--accent-hover)]"
                >
                  {SITE.email}
                </a>
                <a
                  href={SITE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[15px] text-[var(--text)] hover:text-[var(--accent-hover)]"
                >
                  Telegram: {SITE.telegram}
                </a>
                <div className="mono text-[12px] text-[var(--text-dim)] pt-2">
                  {SITE.hours}
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.1}>
              <div className="p-8 lg:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                {submitted ? (
                  <div className="min-h-[520px] flex flex-col items-start justify-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/40 text-[var(--accent-hover)] mb-6">
                      <Check size={22} strokeWidth={2} />
                    </div>
                    <h3 className="text-[22px] font-semibold tracking-tight text-[var(--text)]">
                      Заявка отправлена
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-[1.65] text-[var(--text-muted)]">
                      Получили. Ответим в течение 24 часов в рабочие дни — с
                      вопросами по задаче или предложением времени на созвон.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-[14px] text-[var(--accent-hover)] hover:text-[var(--accent)]"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                  >
                    <div
                      aria-hidden
                      className="absolute overflow-hidden h-0 w-0 opacity-0"
                    >
                      <label>
                        Website
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          {...register("website")}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelBase}>
                          Имя
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Как к вам обращаться"
                          aria-invalid={!!errors.name}
                          className={fieldBase}
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className={errorBase}>{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className={labelBase}>
                          Компания
                        </label>
                        <input
                          id="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Название"
                          aria-invalid={!!errors.company}
                          className={fieldBase}
                          {...register("company")}
                        />
                        {errors.company && (
                          <p className={errorBase}>
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="role" className={labelBase}>
                        Должность
                      </label>
                      <input
                        id="role"
                        type="text"
                        autoComplete="organization-title"
                        placeholder="CEO, CTO, руководитель отдела"
                        className={fieldBase}
                        {...register("role")}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className={labelBase}>
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="name@company.ru"
                          aria-invalid={!!errors.email}
                          className={fieldBase}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className={errorBase}>{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact" className={labelBase}>
                          Telegram
                        </label>
                        <input
                          id="contact"
                          type="text"
                          placeholder="@username"
                          aria-invalid={!!errors.contact}
                          className={fieldBase}
                          {...register("contact")}
                        />
                        {errors.contact && (
                          <p className={errorBase}>
                            {errors.contact.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="size" className={labelBase}>
                        Размер компании
                      </label>
                      <select
                        id="size"
                        defaultValue=""
                        aria-invalid={!!errors.size}
                        className={fieldBase + " appearance-none pr-10"}
                        {...register("size")}
                      >
                        <option value="" disabled>
                          Выберите диапазон
                        </option>
                        <option value="<20">до 20 сотрудников</option>
                        <option value="20-50">20–50 сотрудников</option>
                        <option value="50-100">50–100 сотрудников</option>
                        <option value="100-200">100–200 сотрудников</option>
                        <option value="200+">более 200 сотрудников</option>
                      </select>
                      {errors.size && (
                        <p className={errorBase}>{errors.size.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="task" className={labelBase}>
                        Коротко о задаче
                      </label>
                      <textarea
                        id="task"
                        rows={5}
                        placeholder="Что хотите решить. Даже пара строк — уже помогает."
                        className={
                          fieldBase +
                          " h-auto py-3 resize-y min-h-[120px] leading-[1.5]"
                        }
                        {...register("task")}
                      />
                    </div>

                    <label className="flex items-start gap-3 text-[13px] leading-[1.55] text-[var(--text-muted)] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="mt-[3px] h-4 w-4 rounded border-[var(--border-strong)] bg-[var(--bg)] accent-[var(--accent)]"
                        {...register("consent")}
                      />
                      <span>
                        Согласен с обработкой персональных данных и{" "}
                        <a
                          href="/privacy"
                          className="text-[var(--text)] underline decoration-[var(--border-strong)] underline-offset-2 hover:decoration-[var(--accent)]"
                        >
                          политикой конфиденциальности
                        </a>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p className={errorBase}>{errors.consent.message}</p>
                    )}

                    {serverError && (
                      <div className="p-4 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/5 text-[13px] leading-[1.55] text-[#f59e0b]">
                        {serverError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                      {!isSubmitting && <ArrowRight size={16} />}
                    </button>

                    <p className="text-[12px] leading-[1.55] text-[var(--text-dim)]">
                      Ответим в течение 24 часов в рабочие дни. NDA подписываем
                      до обсуждения деталей. Ваши данные не передаются третьим
                      лицам.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
