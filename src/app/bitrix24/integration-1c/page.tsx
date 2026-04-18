import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { PageHero } from "@/components/seo/PageHero";
import {
  ContentSection,
  BulletList,
  Prose,
} from "@/components/seo/ContentSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Contact } from "@/components/sections/Contact";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Интеграция Битрикс24 и 1С — настройка обмена | AK Systems",
  description:
    "Интеграция Битрикс24 с 1С:УНФ, 1С:ERP, 1С:Торговля. Обмен номенклатурой, остатками, ценами, статусами заказов и контрагентами в обе стороны.",
  alternates: {
    canonical: `${SITE.url}/bitrix24/integration-1c`,
  },
};

export default function Integration1C() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Битрикс24 × 1С"
        title="Интеграция Битрикс24 и 1С: обмен в обе стороны"
        description="Синхронизируем номенклатуру, остатки, цены, контрагентов и статусы заказов между Битрикс24 и 1С. Работаем с 1С:УНФ, 1С:ERP, 1С:Управление торговлей, 1С:Бухгалтерия."
        crumbs={[
          { name: "Битрикс24", href: "/bitrix24" },
          { name: "Интеграция с 1С" },
        ]}
        aurora="left"
        ctaPrimary={{
          label: "Обсудить интеграцию",
          href: "/#contact",
        }}
        ctaSecondary={{
          label: "Системный аудит",
          href: "/audit",
        }}
        meta={[
          { label: "Срок", value: "2–6 недель" },
          { label: "Цена от", value: "120 000 ₽" },
          { label: "В составе", value: "Enterprise" },
          { label: "Гарантия", value: "90 дней" },
        ]}
      />

      <ContentSection
        eyebrow="Зачем"
        title="Что даёт интеграция Битрикс24 и 1С"
        lede="Одна из самых частых задач среднего бизнеса: менеджеры в CRM обещают сроки, которых производство или склад не может выполнить, — потому что у них нет общей базы. Интеграция убирает ручную сверку и ошибки."
        aurora="right"
      >
        <BulletList
          items={[
            "Менеджер в Битрикс24 видит актуальные остатки, цены и сроки поставки по каждой позиции.",
            "Сделка из CRM автоматически превращается в заказ в 1С без ручного переноса.",
            "Статусы заказа (отгружен / доставлен / оплачен) обновляются в сделке в реальном времени.",
            "Бухгалтер не тратит время на дублирование данных — контрагенты и счета создаются автоматически.",
            "Руководитель видит единую картину: воронка продаж, выручка, отгрузки, оплаты — в одном дашборде.",
          ]}
        />
      </ContentSection>

      <ContentSection
        eyebrow="Как работаем"
        title="Два способа интеграции Битрикс24 с 1С"
        alt
        aurora="sweep"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="p-7 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent-hover)]">
              Стандартный модуль
            </div>
            <h3 className="mt-3 text-[19px] font-semibold leading-tight text-[var(--text)]">
              Через типовой обмен 1С-Битрикс
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--text-muted)]">
              Подходит для 80% задач. Настраивается за 2–3 недели. Обмен
              идёт через типовые механизмы 1С: номенклатура, контрагенты,
              заказы покупателей, счета, остатки.
            </p>
            <div className="mt-5 mono text-[12px] text-[var(--text-dim)]">
              1С:УНФ · 1С:УТ · 1С:Бухгалтерия
            </div>
          </div>
          <div className="p-7 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent-hover)]">
              REST API / кастом
            </div>
            <h3 className="mt-3 text-[19px] font-semibold leading-tight text-[var(--text)]">
              Через REST API и очереди сообщений
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--text-muted)]">
              Для сложных сценариев: кастомные справочники, специфичные
              документы, двунаправленный обмен с несколькими 1С сразу, работа
              через RabbitMQ или Kafka. Срок 4–6 недель.
            </p>
            <div className="mt-5 mono text-[12px] text-[var(--text-dim)]">
              1С:ERP · холдинговые конфигурации
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Что обмениваем"
        title="Данные, которые ходят между Битрикс24 и 1С"
        aurora="drift"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3">
              Из 1С в Битрикс24
            </div>
            <ul className="space-y-2 text-[14.5px] leading-[1.55] text-[var(--text-muted)]">
              <li>— Номенклатура, свойства, фото</li>
              <li>— Остатки по складам</li>
              <li>— Цены по типам (опт, розница, партнёрские)</li>
              <li>— Контрагенты и их реквизиты</li>
              <li>— Статусы заказов (отгружен, оплачен)</li>
              <li>— История отгрузок и оплат</li>
            </ul>
          </div>
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3">
              Из Битрикс24 в 1С
            </div>
            <ul className="space-y-2 text-[14.5px] leading-[1.55] text-[var(--text-muted)]">
              <li>— Сделки → заказы покупателей</li>
              <li>— Новые контрагенты из CRM</li>
              <li>— Счета и акты</li>
              <li>— Коммерческие предложения</li>
              <li>— Изменения в реквизитах клиентов</li>
              <li>— Задачи для бухгалтерии</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Технические детали"
        title="Подводные камни интеграции 1С и Битрикс24"
        alt
        aurora="left"
      >
        <Prose>
          <p>
            Интеграция кажется простой, пока не столкнёшься с реальными
            данными. На практике рвутся три вещи.
          </p>
          <p>
            <strong className="text-[var(--text)]">1. Дубли.</strong> В 1С и в
            CRM по одному и тому же клиенту заведены разные карточки — они
            не совпадают ни по ИНН, ни по названию. При обмене это создаёт
            мусор. Решение: валидация по ИНН/КПП, мердж перед запуском.
          </p>
          <p>
            <strong className="text-[var(--text)]">2. Разные структуры.</strong>{" "}
            У вас в 1С номенклатура разбита по одной иерархии, а менеджеры
            привыкли искать товары по-другому. Маппинг решается либо
            переделкой справочника, либо переходом на теги в Битрикс24.
          </p>
          <p>
            <strong className="text-[var(--text)]">3. Скорость.</strong> Обмен
            каждую ночь — не вариант, если заказы обрабатываются в течение
            дня. Делаем асинхронный обмен через REST API с очередью, время
            обновления — 30–60 секунд.
          </p>
        </Prose>
      </ContentSection>

      <RelatedLinks
        title="Смежные материалы"
        items={[
          {
            href: "/bitrix24",
            title: "Внедрение Битрикс24 под ключ",
            description:
              "Пакеты «Стандарт» и «Энтерпрайз». Цены, сроки, что входит.",
          },
          {
            href: "/industries/manufacturing",
            title: "Битрикс24 для производства",
            description:
              "Цикл заявка→КП, план-факт, интеграция с 1С:УНФ.",
          },
          {
            href: "/industries/wholesale",
            title: "Битрикс24 для оптовой торговли",
            description:
              "Мультибренд, 4+ юрлица, BI-отчёты по всем направлениям.",
          },
        ]}
      />

      <Contact />
    </PageShell>
  );
}
