import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { PageHero } from "@/components/seo/PageHero";
import {
  ContentSection,
  Prose,
} from "@/components/seo/ContentSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Contact } from "@/components/sections/Contact";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientAurora } from "@/components/AmbientAurora";
import { Check, X } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Битрикс24 или amoCRM — что выбрать среднему бизнесу в 2026 | AK Systems",
  description:
    "Сравнение Битрикс24 и amoCRM по 12 критериям: функциональность, цена, гибкость, интеграции с 1С, масштаб. Рекомендации для компаний 20–200 человек.",
  alternates: {
    canonical: `${SITE.url}/blog/bitrix24-vs-amocrm`,
  },
  openGraph: {
    type: "article",
    publishedTime: "2026-03-22",
    authors: ["AK Systems"],
  },
};

type Row = {
  criterion: string;
  b24: string;
  amo: string;
  winner: "b24" | "amo" | "tie";
};

const rows: Row[] = [
  {
    criterion: "Цена коробки (облако, 10 пользователей)",
    b24: "24 000 ₽/мес — «Профессиональный»",
    amo: "17 970 ₽/мес — «Расширенный»",
    winner: "amo",
  },
  {
    criterion: "Функциональность CRM",
    b24: "Богатая: воронки, роботы, BP, автоматизации, задачи, БЗ",
    amo: "Сфокусированная на продажах, проще",
    winner: "b24",
  },
  {
    criterion: "Кастомизация и бизнес-процессы",
    b24: "Bitrix Framework, свои приложения, Business Processes",
    amo: "Widgets, ограниченные сценарии",
    winner: "b24",
  },
  {
    criterion: "Интеграция с 1С",
    b24: "Нативная, типовой обмен + REST",
    amo: "Через интеграторов, менее стабильно",
    winner: "b24",
  },
  {
    criterion: "Мультиюрлицо / мультибренд",
    b24: "Поддерживается на тарифе «Энтерпрайз»",
    amo: "Только через разные аккаунты",
    winner: "b24",
  },
  {
    criterion: "Простота входа для менеджеров",
    b24: "Много функций — порог входа выше",
    amo: "Минимализм, менеджер разберётся за час",
    winner: "amo",
  },
  {
    criterion: "Мобильное приложение",
    b24: "Полноценное, но перегруженное",
    amo: "Отточенное, приятное в использовании",
    winner: "amo",
  },
  {
    criterion: "Корп-портал, задачи, чаты",
    b24: "Встроено",
    amo: "Нет, нужны отдельные инструменты",
    winner: "b24",
  },
  {
    criterion: "Коробочная версия on-premise",
    b24: "Есть, полный контроль",
    amo: "Нет, только облако",
    winner: "b24",
  },
  {
    criterion: "Скорость внедрения",
    b24: "3–10 недель",
    amo: "2–4 недели",
    winner: "amo",
  },
  {
    criterion: "Каталог готовых приложений",
    b24: "Битрикс24.Маркет — ~1000 приложений",
    amo: "amoМаркет — меньше, но качественнее",
    winner: "tie",
  },
  {
    criterion: "Поддержка сложных B2B-воронок",
    b24: "Да, с кастомными BP",
    amo: "С ограничениями",
    winner: "b24",
  },
];

function Verdict({ w }: { w: Row["winner"] }) {
  if (w === "b24")
    return (
      <span className="mono text-[11px] inline-flex items-center gap-1.5 text-[var(--accent-hover)]">
        <Check size={12} /> Б24
      </span>
    );
  if (w === "amo")
    return (
      <span className="mono text-[11px] inline-flex items-center gap-1.5 text-[var(--price)]">
        <Check size={12} /> amo
      </span>
    );
  return (
    <span className="mono text-[11px] inline-flex items-center gap-1.5 text-[var(--text-muted)]">
      <X size={12} /> Ничья
    </span>
  );
}

export default function Article() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Битрикс24 или amoCRM — что выбрать среднему бизнесу в 2026",
    datePublished: "2026-03-22",
    author: { "@type": "Organization", name: "AK Systems" },
    publisher: {
      "@type": "Organization",
      name: "AK Systems",
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` },
    },
    mainEntityOfPage: `${SITE.url}/blog/bitrix24-vs-amocrm`,
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <PageHero
        eyebrow="Статья · 9 минут чтения · 22.03.2026"
        title="Битрикс24 или amoCRM — что выбрать среднему бизнесу в 2026"
        description="Короткий ответ: зависит от того, нужна вам только CRM или CRM-плюс-корпортал-плюс-автоматизация. Длинный — ниже, по 12 критериям с нашим вердиктом по каждому."
        crumbs={[
          { name: "Блог", href: "/blog" },
          { name: "Битрикс24 vs amoCRM" },
        ]}
        aurora="split"
      />

      <ContentSection
        eyebrow="Тезис"
        title="Короткий ответ в двух абзацах"
        aurora="right"
      >
        <Prose>
          <p>
            <strong className="text-[var(--text)]">amoCRM</strong> — ваш выбор,
            если бизнес-модель простая: продавцы звонят, ведут сделки в
            воронке, закрывают. Нужна скорость внедрения, простота для
            менеджера, красивое мобильное приложение. 10–50 пользователей,
            B2C или несложный B2B.
          </p>
          <p>
            <strong className="text-[var(--text)]">Битрикс24</strong> — ваш
            выбор, если в CRM упирается вся операционка: нужны задачи,
            документооборот, интеграция с 1С, мультибрендовая структура,
            кастомные бизнес-процессы, свой корпоративный портал. 30–200
            пользователей, средний и сложный B2B, производство, торговля,
            услуги.
          </p>
          <p>
            Теперь детально — по 12 критериям. Смотрим, где кто выигрывает.
          </p>
        </Prose>
      </ContentSection>

      <section className="section relative bg-[var(--bg-alt)] border-b border-[var(--border)] overflow-hidden">
        <AmbientAurora variant="sweep" />
        <Container className="relative">
          <FadeIn className="max-w-3xl">
            <div className="mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
              Сравнение по критериям
            </div>
            <h2 className="text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.15] tracking-tight text-[var(--text)]">
              12 критериев: где выигрывает Битрикс24, где amoCRM
            </h2>
          </FadeIn>
          <FadeIn delay={0.05} className="mt-10">
            <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full min-w-[820px] text-left">
                <thead className="bg-[var(--surface)] border-b border-[var(--border)]">
                  <tr>
                    <th className="p-4 text-[12.5px] font-medium text-[var(--text-muted)] w-[28%]">
                      Критерий
                    </th>
                    <th className="p-4 text-[12.5px] font-semibold text-[var(--accent-hover)] w-[30%]">
                      Битрикс24
                    </th>
                    <th className="p-4 text-[12.5px] font-semibold text-[var(--price)] w-[30%]">
                      amoCRM
                    </th>
                    <th className="p-4 text-[12.5px] font-medium text-[var(--text-muted)] w-[12%]">
                      Вердикт
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={r.criterion}
                      className={`border-b border-[var(--border)] last:border-0 ${
                        i % 2 === 1 ? "bg-[var(--surface)]/40" : ""
                      }`}
                    >
                      <td className="p-4 text-[13.5px] text-[var(--text)]">
                        {r.criterion}
                      </td>
                      <td className="p-4 text-[13.5px] text-[var(--text-muted)]">
                        {r.b24}
                      </td>
                      <td className="p-4 text-[13.5px] text-[var(--text-muted)]">
                        {r.amo}
                      </td>
                      <td className="p-4">
                        <Verdict w={r.winner} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </Container>
      </section>

      <ContentSection
        eyebrow="Итог"
        title="Когда мы рекомендуем Битрикс24"
        aurora="drift"
      >
        <Prose>
          <p>
            Если в компании от 30 человек, есть несколько отделов, нужна
            интеграция с 1С, планируется автоматизация задач вне CRM (HR,
            финансы, склад) — Битрикс24. Через 6–12 месяцев вы будете
            использовать 3–5 модулей, которые в amoCRM пришлось бы докупать
            отдельно.
          </p>
          <p>
            Если вы уже в amoCRM и работаете нормально — не переходите ради
            галочки. Переход стоит денег, времени и стресса команды.
            Переходите, когда упираетесь: не хватает мультиюрлица, нет
            нормальной интеграции с 1С, нужны кастомные BP.
          </p>
        </Prose>
      </ContentSection>

      <ContentSection
        eyebrow="Итог"
        title="Когда мы рекомендуем amoCRM"
        alt
        aurora="left"
      >
        <Prose>
          <p>
            Если у вас 5–30 продавцов, воронка классическая (лид → квалификация
            → КП → договор → закрыто), нет производства и сложных
            согласований — amoCRM. Быстрее внедрится, менеджеры быстрее
            привыкнут, поддержка проще.
          </p>
          <p>
            Также amoCRM оправдан, если у вас стартап или быстрорастущий
            бизнес, где процессы меняются каждые 3 месяца. Битрикс24 под
            такое перенастраивать дороже, а простая CRM amoCRM — легче.
          </p>
        </Prose>
      </ContentSection>

      <RelatedLinks
        title="Ещё по теме"
        items={[
          {
            href: "/bitrix24",
            title: "Внедрение Битрикс24 под ключ",
            description:
              "Если выбрали Битрикс24 — цены, сроки, пакеты, что входит.",
          },
          {
            href: "/bitrix24/integration-1c",
            title: "Интеграция Битрикс24 и 1С",
            description:
              "Самый частый аргумент в пользу Битрикс24. Как настраиваем.",
          },
          {
            href: "/audit",
            title: "Системный аудит",
            description:
              "Не уверены, что выбрать — начните с аудита процессов.",
          },
        ]}
      />

      <Contact />
    </PageShell>
  );
}
