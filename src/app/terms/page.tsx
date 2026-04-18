import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Пользовательское соглашение — AK Systems",
  description:
    `Условия использования сайта ${SITE.host}. Статус материалов, интеллектуальная собственность, реквизиты, применимое право.`,
  alternates: { canonical: `${SITE.url}/terms` },
  robots: { index: true, follow: true },
};

const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Пользовательское соглашение",
      item: `${SITE.url}/terms`,
    },
  ],
};

const sections = [
  {
    t: "1. Предмет",
    b: `Настоящее Соглашение регулирует порядок использования сайта ${SITE.host}. Использование сайта означает согласие с условиями.`,
  },
  {
    t: "2. Статус материалов",
    b: "Описания продуктов, цены и сроки на сайте носят информационный характер и не являются публичной офертой по смыслу статьи 437 ГК РФ. Конкретные условия работ фиксируются отдельным договором между AK Systems и заказчиком.",
  },
  {
    t: "3. Интеллектуальная собственность",
    b: "Тексты, графика, код и дизайн сайта принадлежат AK Systems. Любое их использование без письменного разрешения запрещено, за исключением цитирования со ссылкой на источник.",
  },
  {
    t: "4. Ограничение ответственности",
    b: "Сайт предоставляется «как есть». AK Systems не несёт ответственности за возможные перерывы в работе, последствия использования информации с сайта и действия третьих сервисов, на которые могут вести ссылки.",
  },
  {
    t: "5. Конфиденциальность",
    b: `Обработка персональных данных описана в отдельной `,
    linkText: "Политике конфиденциальности",
    linkHref: "/privacy",
    bAfter: ".",
  },
  {
    t: "6. Применимое право",
    b: "Соглашение регулируется законодательством Российской Федерации. Споры решаются путём переговоров, при недостижении согласия — в суде по месту нахождения Оператора.",
  },
  {
    t: "7. Изменения",
    b: "Актуальная версия публикуется на этой странице. Продолжение использования сайта после изменений означает согласие с ними.",
  },
];

export default function Terms() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <Header />
      <main className="flex-1">
        <section className="section">
          <Container className="max-w-3xl">
            <Link
              href="/"
              className="mono text-[12px] text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              ← На главную
            </Link>
            <h1 className="mt-6 text-[clamp(32px,5vw,56px)] font-semibold leading-[1.1] tracking-tight">
              Пользовательское соглашение
            </h1>
            <div className="mono text-[12px] text-[var(--text-dim)] mt-3">
              Редакция от 01.04.2026
            </div>

            <div className="mt-10 space-y-8">
              {sections.map((s) => (
                <section key={s.t}>
                  <h2 className="text-[18px] font-semibold text-[var(--text)] tracking-tight">
                    {s.t}
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.75] text-[var(--text-muted)]">
                    {s.b}
                    {s.linkHref && (
                      <Link
                        href={s.linkHref}
                        className="text-[var(--text)] underline underline-offset-2"
                      >
                        {s.linkText}
                      </Link>
                    )}
                    {s.bAfter}
                  </p>
                </section>
              ))}

              <section>
                <h2 className="text-[18px] font-semibold text-[var(--text)] tracking-tight">
                  8. Реквизиты
                </h2>
                <p className="mt-3 text-[15px] leading-[1.75] text-[var(--text-muted)]">
                  {SITE.legal.entity}
                  <br />
                  ИНН {SITE.legal.inn} · ОГРНИП {SITE.legal.ogrnip}
                  <br />
                  Адрес: {SITE.legal.address}
                  <br />
                  Налоговый режим: {SITE.legal.taxRegime}
                  <br />
                  Статус МСП: {SITE.legal.msp}
                  <br />
                  E-mail:{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[var(--text)] underline underline-offset-2"
                  >
                    {SITE.email}
                  </a>
                </p>
              </section>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
