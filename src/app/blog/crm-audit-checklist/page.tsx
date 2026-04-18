import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { PageHero } from "@/components/seo/PageHero";
import {
  ContentSection,
  Prose,
} from "@/components/seo/ContentSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Contact } from "@/components/sections/Contact";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Чек-лист аудита CRM: 42 пункта — как найти дыры в системе | AK Systems",
  description:
    "42 пункта, по которым мы сами проверяем качество CRM среднего бизнеса. Качество данных, процессы, интеграции, отчётность, дисциплина. PDF-версия бесплатно.",
  alternates: {
    canonical: `${SITE.url}/blog/crm-audit-checklist`,
  },
};

type Block = {
  title: string;
  items: string[];
};

const blocks: Block[] = [
  {
    title: "1. Качество данных (9 пунктов)",
    items: [
      "Есть ли дубли клиентов по одному ИНН / номеру телефона / email?",
      "Заполнено ли поле «ответственный» на каждой сделке?",
      "У каждого контакта указан хотя бы один способ связи?",
      "Сделки без истории действий старше 14 дней — есть ли такие?",
      "Есть ли сделки без суммы или с нулевой суммой на этапе «выигран»?",
      "Теги / категории используются или пустые?",
      "Есть ли контакты без компании (юрлица)?",
      "Есть ли поля, которые заполняют 100% менеджеров, или значимая часть пустая?",
      "Когда последний раз проводили чистку базы?",
    ],
  },
  {
    title: "2. Воронка и процессы (8 пунктов)",
    items: [
      "Количество этапов в воронке — адекватно длине цикла сделки?",
      "Названия этапов описывают действие, а не состояние («отправлено КП», не «в работе»)?",
      "Есть этап квалификации до «в работе»?",
      "Причины проигрыша — предустановленный список, а не свободный текст?",
      "Конверсия между этапами считается автоматически?",
      "Средняя длительность этапа известна и мониторится?",
      "Бутылочные горлышки в воронке выявлены?",
      "Менеджеры двигают сделки или сделки «застревают»?",
    ],
  },
  {
    title: "3. Интеграции и автоматизация (8 пунктов)",
    items: [
      "Телефония привязана — звонки автоматически фиксируются?",
      "Почта интегрирована — входящие превращаются в лиды?",
      "Сайт отдаёт лиды в CRM через формы / webhook?",
      "1С синхронизирована — остатки, заказы, оплаты?",
      "Есть автоматические задачи для менеджера при переходе этапа?",
      "Работают триггеры уведомлений клиенту (КП отправлено, и т.д.)?",
      "Есть интеграция с мессенджерами (WhatsApp, Telegram)?",
      "Email-рассылки идут из CRM или через сторонний сервис?",
    ],
  },
  {
    title: "4. Отчётность (7 пунктов)",
    items: [
      "Руководитель видит воронку в реальном времени, без ручной сборки?",
      "Есть дашборд по выручке: план / факт / прогноз?",
      "Активность менеджеров (звонки, встречи) видна в отчётах?",
      "Отчёт по причинам проигрыша — собирается?",
      "Отчёт по длительности сделок по этапам — есть?",
      "BI-инструмент подключён (DataLens, Power BI, Metabase)?",
      "Отчёты приходят на почту автоматически или их формируют вручную?",
    ],
  },
  {
    title: "5. Права и роли (5 пунктов)",
    items: [
      "Менеджер видит только свои сделки, не чужие?",
      "Есть разграничение по отделам / департаментам?",
      "Удаление / редактирование чужих данных ограничено?",
      "Роль «администратор» — не у всех, кого не лень повысить?",
      "Уволенные сотрудники удалены из CRM сразу?",
    ],
  },
  {
    title: "6. Дисциплина команды (5 пунктов)",
    items: [
      "Менеджеры ведут сделки в CRM или в личных заметках / Excel?",
      "Каждый звонок / встреча фиксируется комментарием?",
      "Есть регламент работы в CRM, с которым ознакомлены все?",
      "Новички проходят обучение перед доступом к CRM?",
      "Руководитель проверяет качество ведения CRM регулярно?",
    ],
  },
];

export default function Article() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Чек-лист аудита CRM: 42 пункта",
    datePublished: "2026-02-14",
    author: { "@type": "Organization", name: "AK Systems" },
    publisher: {
      "@type": "Organization",
      name: "AK Systems",
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` },
    },
    mainEntityOfPage: `${SITE.url}/blog/crm-audit-checklist`,
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <PageHero
        eyebrow="Статья · 12 минут чтения · 14.02.2026"
        title="Чек-лист аудита CRM: 42 пункта, по которым мы проверяем систему"
        description="Как за 20 минут понять, где у вас «течёт» CRM. 42 пункта в 6 блоках: качество данных, воронка, интеграции, отчётность, права, дисциплина команды. Проходите сами — видите слабые места без нашего участия."
        crumbs={[
          { name: "Блог", href: "/blog" },
          { name: "Чек-лист аудита CRM" },
        ]}
        aurora="center"
      />

      <ContentSection
        eyebrow="Как пользоваться"
        title="Инструкция к чек-листу"
        aurora="right"
      >
        <Prose>
          <p>
            Идея проста: ответьте «да» / «нет» по каждому пункту. Считайте
            количество «нет». Это ваши слабые места. Приоритизируйте их — и
            получите карту первоочередных задач по улучшению CRM.
          </p>
          <p>
            Если «нет» больше 20 из 42 — CRM не решает задачи, которые должна
            решать. Это не значит «менять систему», чаще всего проблема — в
            настройках и регламентах.
          </p>
          <p>
            Если «нет» 10–20 — система работает, но теряет эффективность в
            конкретных зонах. Точечные доработки дадут ощутимый ROI.
          </p>
          <p>
            Если «нет» меньше 10 — у вас зрелая CRM, можно думать о
            расширениях: BI, прогнозы, интеграции с внешними сервисами,
            омниканальность.
          </p>
        </Prose>
      </ContentSection>

      {blocks.map((b, i) => (
        <section
          key={b.title}
          className={`section relative border-b border-[var(--border)] overflow-hidden ${i % 2 === 1 ? "bg-[var(--bg-alt)]" : ""}`}
        >
          <AmbientAurora variant={i % 2 === 0 ? "left" : "right"} />
          <Container className="relative">
            <FadeIn className="max-w-3xl">
              <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                Блок {i + 1} из 6
              </div>
              <h2 className="text-[clamp(22px,2.8vw,32px)] font-semibold leading-[1.2] tracking-tight text-[var(--text)]">
                {b.title}
              </h2>
            </FadeIn>
            <FadeIn className="mt-8 max-w-3xl">
              <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {b.items.map((it, idx) => (
                  <li
                    key={idx}
                    className="py-4 flex items-start gap-4 text-[15.5px] leading-[1.6] text-[var(--text)]"
                  >
                    <span className="mono text-[11px] text-[var(--text-dim)] mt-1 w-7 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{it}</span>
                    <label className="mono text-[11px] text-[var(--text-dim)] shrink-0 flex gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-[var(--border-strong)]">
                        ✓
                      </span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-[var(--border-strong)]">
                        ✗
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </Container>
        </section>
      ))}

      <LeadMagnet />

      <RelatedLinks
        title="Что дальше"
        items={[
          {
            href: "/audit",
            title: "Платный системный аудит",
            description:
              "Пройдите сами — или закажите у нас. Даст PDF на 15–25 страниц с приоритетами и бюджетом.",
          },
          {
            href: "/bitrix24",
            title: "Внедрение Битрикс24",
            description:
              "Если по результатам чек-листа понятно — нужна другая CRM.",
          },
          {
            href: "/blog/bitrix24-vs-amocrm",
            title: "Битрикс24 или amoCRM",
            description:
              "Сравнение по 12 критериям — выбор следующей системы.",
          },
        ]}
      />

      <Contact />
    </PageShell>
  );
}
