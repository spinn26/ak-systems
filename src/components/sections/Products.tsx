import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { AmbientAurora } from "@/components/AmbientAurora";

type Product = {
  tag: string;
  title: string;
  term: string;
  price: string;
  priceRange?: string;
  audience: string;
  features: string[];
  outcome: string;
  cta: string;
  highlight?: boolean;
  wide?: boolean;
};

const products: Product[] = [
  {
    tag: "Продукт 01",
    title: "Системный аудит",
    term: "5–10 рабочих дней",
    price: "30 000 ₽",
    audience:
      "Бизнес, где «что-то не так», но непонятно — что чинить в первую очередь.",
    features: [
      "Интервью с собственником и руководителями отделов (до 5 человек)",
      "Анализ текущего tech-стека и интеграций",
      "Карта процессов: где теряется время, деньги, клиенты",
      "Оценка CRM, сайта, бэк-офиса",
      "Документ: карта проблем + план действий с приоритетами и бюджетом",
    ],
    outcome: "PDF-отчёт на 15–25 страниц + часовая презентация с разбором.",
    cta: "Заказать аудит",
    highlight: true,
  },
  {
    tag: "Продукт 02",
    title: "Внедрение Битрикс24 «Стандарт»",
    term: "3–5 недель",
    price: "180 000 ₽",
    audience:
      "Компании, которые покупают Битрикс24, но не хотят за него «разбираться сами».",
    features: [
      "Настройка CRM под вашу воронку продаж (до 3 воронок)",
      "Импорт и очистка существующей базы клиентов",
      "Интеграции: телефония, почта, WhatsApp, сайт",
      "Автоматические сценарии: 10 роботов и триггеров",
      "Права доступа и роли",
      "Обучение команды (2 сессии + запись)",
      "30 дней поддержки после запуска",
    ],
    outcome:
      "Рабочая CRM, в которой команда реально работает, а не «есть формально».",
    cta: "Обсудить внедрение",
  },
  {
    tag: "Продукт 03",
    title: "Внедрение Битрикс24 «Энтерпрайз»",
    term: "6–10 недель",
    price: "от 450 000 ₽",
    priceRange: "обычно 450 000 – 900 000 ₽, медиана ~620 000 ₽",
    audience:
      "Компании с кастомными процессами, где стандартного Битрикс24 не хватает.",
    features: [
      "Всё из «Стандарта»",
      "Кастомные бизнес-процессы под вашу специфику",
      "Интеграции с 1С, ERP, производственными системами",
      "Доработка на Bitrix Framework",
      "Нестандартные модули и приложения",
      "Миграция с amoCRM / HubSpot / Salesforce",
      "90 дней поддержки после запуска",
    ],
    outcome:
      "Битрикс24, заточенный под вашу модель бизнеса — без костылей.",
    cta: "Обсудить проект",
  },
  {
    tag: "Продукт 04",
    title: "Разработка платформы или сложного сайта",
    term: "8–16 недель",
    price: "от 600 000 ₽",
    priceRange: "обычно 600 000 – 1 500 000 ₽, медиана ~850 000 ₽",
    audience:
      "Бизнес, которому коробочные решения не подходят. Нужна кастомная платформа: личный кабинет, B2B-маркетплейс, SaaS, отраслевая CRM.",
    features: [
      "Системная аналитика и архитектура",
      "UX/UI-дизайн",
      "Backend (Python / Node.js / PHP)",
      "Frontend (React / Next.js)",
      "API и интеграции с внешними системами",
      "Деплой на ваш сервер или в облако",
      "Техническая документация",
      "60 дней гарантийной поддержки",
    ],
    outcome: "Production-ready система под вашу бизнес-модель.",
    cta: "Обсудить разработку",
  },
  {
    tag: "Продукт 05",
    title: "Поддержка и развитие",
    term: "ежемесячно",
    price: "от 40 000 ₽/мес",
    audience:
      "Компании, у которых уже есть Битрикс24, сайт или платформа, и нужна команда, которая это поддерживает и развивает.",
    features: [
      "База — 40 000 ₽/мес: мониторинг, стабильность, пул часов на мелкие доработки",
      "Бизнес — 80 000 ₽/мес: расширенный пул часов, оптимизация, консультации",
      "Энтерпрайз — 150 000 ₽/мес: выделенная команда, SLA по времени реакции, развитие системы",
      "Обновления и оптимизация",
      "Аудит изменений и архитектурные консультации",
    ],
    outcome:
      "Система работает и развивается, а вы не держите техдиректора в штате.",
    cta: "Подобрать пакет поддержки",
    wide: true,
  },
];

function ProductCard({ p, index }: { p: Product; index: number }) {
  return (
    <FadeIn
      delay={index * 0.04}
      className={p.wide ? "md:col-span-2 lg:col-span-2" : ""}
    >
      <TiltCard className="group h-full rounded-xl">
      <article
        className={`relative h-full p-8 lg:p-10 rounded-xl bg-[var(--surface)] border transition-colors ${
          p.highlight
            ? "border-[var(--accent)]/40"
            : "border-[var(--border)] group-hover:border-[var(--border-strong)]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
            {p.tag}
          </span>
          {p.highlight && <Badge tone="accent">рекомендуем начать</Badge>}
        </div>

        <h3 className="mt-5 text-[24px] lg:text-[28px] font-semibold leading-[1.15] tracking-tight text-[var(--text)]">
          {p.title}
        </h3>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge>{`срок: ${p.term}`}</Badge>
          <Badge tone="price">{p.price}</Badge>
        </div>
        {p.priceRange && (
          <div className="mt-2 mono text-[11px] text-[var(--text-dim)]">
            {p.priceRange}
          </div>
        )}

        <div className="mt-6">
          <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)] mb-2">
            Для кого
          </div>
          <p className="text-[15px] leading-[1.65] text-[var(--text-muted)]">
            {p.audience}
          </p>
        </div>

        <div className="mt-6">
          <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)] mb-3">
            Что входит
          </div>
          <ul className="space-y-2.5">
            {p.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-[15px] leading-[1.55] text-[var(--text)]"
              >
                <Check
                  size={16}
                  strokeWidth={2}
                  className="mt-[3px] shrink-0 text-[var(--accent-hover)]"
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]">
          <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)] mb-2">
            На выходе
          </div>
          <p className="text-[15px] leading-[1.6] text-[var(--text)]">
            {p.outcome}
          </p>
        </div>

        <Link
          href="#contact"
          className="mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-[var(--accent-hover)] hover:text-[var(--accent)] transition-colors"
        >
          {p.cta}
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </article>
      </TiltCard>
    </FadeIn>
  );
}

export function Products() {
  return (
    <section
      id="products"
      className="section relative border-b border-[var(--border)] overflow-hidden"
    >
      <AmbientAurora variant="split" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Продукты и цены"
          title="Внедрение Битрикс24 и разработка платформ с фиксированной ценой"
          subtitle="Никакой почасовки. Чёткий скоуп — чёткий результат. Стоимость внедрения Битрикс24 и разработки платформ — в КП до подписания договора."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.title} p={p} index={i} />
          ))}
        </div>

        <FadeIn className="mt-12 flex justify-center">
          <Button href="#contact" variant="ghost" size="lg">
            Не уверены, какой продукт нужен — напишите нам
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
