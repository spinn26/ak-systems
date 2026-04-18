import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — AK Systems",
  description:
    "Как AK Systems обрабатывает персональные данные по 152-ФЗ. Реквизиты оператора, цели, сроки хранения, права пользователя.",
  alternates: { canonical: `${SITE.url}/privacy` },
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
      name: "Политика конфиденциальности",
      item: `${SITE.url}/privacy`,
    },
  ],
};

type Section = {
  t: string;
  body?: string;
  list?: string[];
  note?: string;
};

const sections: Section[] = [
  {
    t: "1. Термины",
    body: "В настоящей Политике используются следующие термины:",
    list: [
      "«Оператор» — индивидуальный предприниматель Каприелов Аркадий Григорьевич, ОГРНИП 322265100040044, ИНН 262800734368.",
      `«Сайт» — интернет-ресурс, расположенный по адресу ${SITE.host}, и все его поддомены.`,
      "«Пользователь» — физическое лицо, посещающее Сайт и/или направляющее Оператору обращения через формы обратной связи.",
      "«Персональные данные» — любая информация, относящаяся прямо или косвенно к определённому или определяемому Пользователю.",
      "«Обработка» — любое действие с персональными данными, включая сбор, запись, хранение, уточнение, использование, передачу, обезличивание и уничтожение.",
    ],
  },
  {
    t: "2. Правовые основания",
    body:
      "Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных», Конституцией РФ, а также настоящей Политикой. Правовые основания обработки:",
    list: [
      "согласие Пользователя, выражаемое при отправке формы обратной связи с отмеченным чекбоксом;",
      "исполнение договора, стороной которого является или намерен стать Пользователь (статья 6 п. 5 ФЗ-152);",
      "законные интересы Оператора по обеспечению работы и развитию Сайта при условии, что права Пользователя не нарушаются.",
    ],
  },
  {
    t: "3. Какие данные мы собираем",
    body: "Через формы обратной связи Оператор собирает:",
    list: [
      "имя Пользователя;",
      "название компании, должность;",
      "адрес электронной почты;",
      "номер телефона и/или ник в мессенджере (Telegram, WhatsApp);",
      "размер компании (диапазон количества сотрудников);",
      "краткое описание задачи, которое Пользователь сообщает добровольно.",
    ],
    note:
      "Автоматически при посещении Сайта обрабатываются: IP-адрес, тип устройства и браузера, операционная система, источник перехода (HTTP-referrer), UTM-метки, последовательность просмотренных страниц, длительность сессии, события клика. Эти данные являются обезличенными.",
  },
  {
    t: "4. Цели обработки",
    list: [
      "связь с Пользователем по направленному им обращению;",
      "подготовка коммерческого предложения и ведение преддоговорной переписки;",
      "заключение и исполнение договора подряда;",
      "улучшение Сайта, качества контента и пользовательского опыта;",
      "статистический и аналитический учёт посещаемости Сайта (в обезличенном виде);",
      "исполнение требований применимого законодательства.",
    ],
  },
  {
    t: "5. Сроки хранения",
    list: [
      "данные из форм обратной связи — до 12 месяцев с момента последнего обращения или до отзыва согласия Пользователем (что наступит раньше);",
      "данные, необходимые для исполнения договора, — в течение срока действия договора и 5 лет после его завершения согласно требованиям налогового и бухгалтерского учёта;",
      "данные аналитических систем — до 24 месяцев, в обезличенном виде.",
    ],
  },
  {
    t: "6. Передача данных третьим лицам",
    body:
      "Оператор не продаёт персональные данные и не передаёт их третьим лицам для рекламных целей. Для работы Сайта и связи с Пользователем используются следующие сервисы:",
    list: [
      "Resend (resend.com) — доставка служебных e-mail уведомлений;",
      "Telegram Bot API (telegram.org) — передача служебных уведомлений в корпоративный чат;",
      "Яндекс.Метрика (metrika.yandex.ru) — веб-аналитика в обезличенном виде;",
      "хостинг-провайдер, обеспечивающий размещение Сайта.",
    ],
    note:
      "Передача в указанные сервисы происходит автоматически в рамках их штатной функциональности и регулируется их собственными политиками конфиденциальности.",
  },
  {
    t: "7. Трансграничная передача",
    body:
      "Отдельные из перечисленных сервисов могут располагать серверы за пределами Российской Федерации. Пользователь, отправляя данные через Сайт, подтверждает своё согласие на возможную трансграничную передачу данных в государства, обеспечивающие адекватную защиту прав субъектов персональных данных, а в иных случаях — на основании письменного согласия или в объёме, необходимом для исполнения договора.",
  },
  {
    t: "8. Меры защиты",
    body:
      "Оператор принимает технические и организационные меры для защиты данных от неправомерного доступа, изменения, уничтожения или распространения:",
    list: [
      "использование защищённого соединения HTTPS;",
      "ограничение круга лиц, имеющих доступ к данным;",
      "внутренние правила работы с персональными данными;",
      "регулярное резервное копирование и мониторинг.",
    ],
  },
  {
    t: "9. Ваши права",
    body: "В соответствии со статьями 14–15 ФЗ-152 Пользователь вправе:",
    list: [
      "получать информацию о составе и обработке своих данных;",
      "требовать уточнения, блокирования или уничтожения данных, если они неполны, устарели, неточны или обрабатываются с нарушением закона;",
      "отозвать согласие на обработку в любой момент;",
      "обжаловать действия или бездействие Оператора в Роскомнадзоре или в суде.",
    ],
    note: `Для реализации прав направьте запрос на ${SITE.email}. Срок ответа — не более 10 рабочих дней.`,
  },
  {
    t: "10. Cookies и аналитика",
    body:
      "При первом визите Сайт показывает баннер согласия на использование cookies. До получения согласия аналитические скрипты не загружаются. Пользователь может в любой момент отозвать согласие, очистив файлы cookies в своём браузере или отклонив согласие повторно.",
  },
  {
    t: "11. Изменения политики",
    body:
      "Актуальная редакция Политики всегда публикуется на этой странице. О существенных изменениях Оператор уведомляет через баннер на Сайте не менее чем за 7 дней до их вступления в силу.",
  },
];

export default function Privacy() {
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

            <div className="mt-6 inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-hover)]">
              <ShieldCheck size={14} />
              152-ФЗ · Актуальная редакция
            </div>

            <h1 className="mt-4 text-[clamp(32px,5vw,56px)] font-semibold leading-[1.08] tracking-tight">
              Политика конфиденциальности
            </h1>
            <div className="mono text-[12px] text-[var(--text-dim)] mt-3">
              Редакция от 18.04.2026 · действует с даты публикации
            </div>

            {/* Operator card */}
            <div className="mt-10 p-6 lg:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] mb-5">
                <FileText size={14} />
                Оператор персональных данных
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-[14px] leading-[1.6]">
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    Полное наименование
                  </div>
                  <div className="mt-1 text-[var(--text)]">
                    {SITE.legal.entity}
                  </div>
                </div>
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    Адрес
                  </div>
                  <div className="mt-1 text-[var(--text)]">
                    {SITE.legal.address}
                  </div>
                </div>
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    ОГРНИП
                  </div>
                  <div className="mt-1 mono text-[var(--text)]">
                    {SITE.legal.ogrnip}
                  </div>
                </div>
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    ИНН
                  </div>
                  <div className="mt-1 mono text-[var(--text)]">
                    {SITE.legal.inn}
                  </div>
                </div>
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    Дата регистрации
                  </div>
                  <div className="mt-1 text-[var(--text)]">
                    {SITE.legal.registered}
                  </div>
                </div>
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    Налоговый режим
                  </div>
                  <div className="mt-1 text-[var(--text)]">
                    {SITE.legal.taxRegime}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    Налоговый орган
                  </div>
                  <div className="mt-1 text-[var(--text)]">
                    {SITE.legal.taxAuthority}
                  </div>
                </div>
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    E-mail
                  </div>
                  <div className="mt-1">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-[var(--text)] underline underline-offset-2 decoration-[var(--border-strong)] hover:decoration-[var(--accent)]"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    Telegram
                  </div>
                  <div className="mt-1">
                    <a
                      href={SITE.telegramUrl}
                      className="text-[var(--text)] underline underline-offset-2 decoration-[var(--border-strong)] hover:decoration-[var(--accent)]"
                    >
                      {SITE.telegram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-10">
              {sections.map((s) => (
                <section key={s.t}>
                  <h2 className="text-[19px] font-semibold text-[var(--text)] tracking-tight">
                    {s.t}
                  </h2>
                  {s.body && (
                    <p className="mt-3 text-[15px] leading-[1.75] text-[var(--text-muted)]">
                      {s.body}
                    </p>
                  )}
                  {s.list && (
                    <ul className="mt-4 space-y-2.5">
                      {s.list.map((li, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[15px] leading-[1.7] text-[var(--text-muted)]"
                        >
                          <span className="mono text-[11px] text-[var(--text-dim)] mt-1.5 w-5 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.note && (
                    <p className="mt-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-alt)] text-[13.5px] leading-[1.7] text-[var(--text-muted)]">
                      {s.note}
                    </p>
                  )}
                </section>
              ))}

              <section>
                <h2 className="text-[19px] font-semibold text-[var(--text)] tracking-tight">
                  12. Обратная связь
                </h2>
                <p className="mt-3 text-[15px] leading-[1.75] text-[var(--text-muted)]">
                  Любые запросы, связанные с обработкой персональных данных,
                  направляйте на{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[var(--text)] underline underline-offset-2"
                  >
                    {SITE.email}
                  </a>
                  . Жалобы на действия Оператора Пользователь вправе направить
                  в Роскомнадзор (
                  <a
                    href="https://rkn.gov.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] underline underline-offset-2"
                  >
                    rkn.gov.ru
                  </a>
                  ).
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
