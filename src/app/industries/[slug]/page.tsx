import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/seo/PageShell";
import { PageHero } from "@/components/seo/PageHero";
import {
  ContentSection,
  BulletList,
  Prose,
} from "@/components/seo/ContentSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Contact } from "@/components/sections/Contact";
import { INDUSTRIES } from "@/lib/industries";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = INDUSTRIES.find((i) => i.slug === slug);
  if (!ind) return { title: "Страница не найдена" };
  return {
    title: `Внедрение Битрикс24 для ${ind.name.toLowerCase()} — AK Systems`,
    description: `Внедрение Битрикс24 и разработка систем для отрасли «${ind.name}». ${ind.projects} проектов в портфеле. Фиксированная цена и срок.`,
    alternates: { canonical: `${SITE.url}/industries/${ind.slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = INDUSTRIES.find((i) => i.slug === slug);
  if (!ind) return notFound();

  const others = INDUSTRIES.filter((i) => i.slug !== ind.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero
        eyebrow={`Отрасль · ${ind.name}`}
        title={`Внедрение Битрикс24 и разработка систем для «${ind.name}»`}
        description={`${ind.short.charAt(0).toUpperCase() + ind.short.slice(1)}. ${ind.projects} проектов в этой отрасли — знаем типовые процессы, интеграции и подводные камни.`}
        crumbs={[
          { name: "Отрасли", href: "/#cases" },
          { name: ind.name },
        ]}
        aurora="left"
        ctaPrimary={{ label: "Обсудить проект", href: "/#contact" }}
        ctaSecondary={{
          label: "Заказать аудит",
          href: "/audit",
        }}
        meta={[
          { label: "Проектов", value: `${ind.projects}+` },
          { label: "Отрасль", value: ind.name },
          { label: "Срок", value: "4–12 недель" },
          { label: "Цена от", value: "180 000 ₽" },
        ]}
      />

      <ContentSection
        eyebrow="Боли отрасли"
        title={`Типовые проблемы в отрасли «${ind.name}»`}
        lede={`За ${ind.projects}+ проектов в этой отрасли мы видим одни и те же болевые точки. Вот они — с реальной ценой.`}
        aurora="right"
      >
        <BulletList items={ind.painPoints} />
      </ContentSection>

      <ContentSection
        eyebrow="Наше решение"
        title="Что мы делаем"
        alt
        aurora="sweep"
      >
        <BulletList items={ind.solutions} />
      </ContentSection>

      <ContentSection
        eyebrow="Технологии"
        title="Какой стек используем"
        aurora="drift"
      >
        <Prose>
          <p>
            Конкретный стек выбираем под задачу на этапе аудита. В отрасли «
            {ind.name}» в 80% случаев это:
          </p>
        </Prose>
        <div className="mt-6 flex flex-wrap gap-2">
          {ind.tech.map((t) => (
            <span
              key={t}
              className="mono inline-flex h-8 px-3 items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[12.5px] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </ContentSection>

      <RelatedLinks
        title="Смежные отрасли и материалы"
        items={[
          ...others.map((o) => ({
            href: `/industries/${o.slug}`,
            title: o.name,
            description: o.short,
          })),
          {
            href: "/bitrix24",
            title: "Внедрение Битрикс24",
            description: "Цены, сроки, что входит в «Стандарт» и «Энтерпрайз».",
          },
          {
            href: "/audit",
            title: "Системный аудит",
            description: "Начните с аудита, если не уверены, что нужно внедрять.",
          },
        ].slice(0, 3)}
      />

      <Contact />
    </PageShell>
  );
}
