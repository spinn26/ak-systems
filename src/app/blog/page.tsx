import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/seo/PageShell";
import { PageHero } from "@/components/seo/PageHero";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";
import { POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Блог AK Systems — Битрикс24, CRM, платформы",
  description:
    "Инженерные статьи о внедрении Битрикс24, аудите CRM, разработке B2B-платформ и автоматизации бизнес-процессов среднего бизнеса.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function BlogIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Блог"
        title="Инженерные статьи о CRM, Битрикс24 и платформах"
        description="Пишем только то, что сами прошли на проектах. Без копипасты с англоязычных блогов и без «маркетинговых обзоров». С конкретикой, цифрами и названиями технологий."
        crumbs={[{ name: "Блог" }]}
        aurora="center"
        ctaPrimary={{ label: "Обсудить задачу", href: "/#contact" }}
      />

      <section className="section relative border-b border-[var(--border)] overflow-hidden">
        <AmbientAurora variant="soft" />
        <Container className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POSTS.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block h-full p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
                >
                  <div className="flex items-center gap-2 mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    <span>{p.publishedAt.replace(/-/g, ".")}</span>
                    <span>·</span>
                    <span>{p.readMinutes} мин чтения</span>
                  </div>
                  <h2 className="mt-5 text-[22px] lg:text-[24px] font-semibold leading-[1.2] tracking-tight text-[var(--text)] group-hover:text-[var(--accent-hover)] transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.65] text-[var(--text-muted)]">
                    {p.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="mono inline-flex h-6 px-2 items-center rounded-md border border-[var(--border)] text-[11px] text-[var(--text-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--accent-hover)]">
                    Читать
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
