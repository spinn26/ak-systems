import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FAQ } from "@/lib/faq";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jet",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "AK Systems — Внедрение Битрикс24, разработка платформ, аудиты",
  description:
    "Инженерные системы для среднего бизнеса (20–200 чел). Внедрение Битрикс24 от 180 000 ₽, разработка платформ от 600 000 ₽, аудиты от 30 000 ₽. Фиксированные цены и сроки.",
  keywords: [
    "внедрение битрикс24",
    "внедрение битрикс24 под ключ",
    "стоимость внедрения битрикс24",
    "разработка платформы для бизнеса",
    "аудит CRM",
    "аудит IT-инфраструктуры",
    "автоматизация бизнес-процессов",
    "разработка кастомной CRM",
    "миграция с amoCRM на битрикс24",
    "битрикс24 для среднего бизнеса",
  ],
  authors: [{ name: "AK Systems" }],
  creator: "AK Systems",
  publisher: "AK Systems",
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE.url,
    siteName: "AK Systems",
    title: "AK Systems — Внедрение Битрикс24, разработка платформ, аудиты",
    description:
      "Инженерные системы для бизнеса, который перерос таблицы. Внедрение Битрикс24, разработка платформ, аудиты IT. Фиксированные цены и сроки.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Systems — Внедрение Битрикс24, разработка платформ, аудиты",
    description:
      "Инженерная команда: Битрикс24, кастомные платформы, аудиты IT. Фиксированные цены и сроки.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  other: {
    "yandex-verification": "", // placeholder for Яндекс.Вебмастер
    "google-site-verification": "", // placeholder for GSC
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AK Systems",
  url: SITE.url,
  inLanguage: "ru-RU",
  publisher: { "@type": "Organization", name: "AK Systems" },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AK Systems",
  legalName: SITE.legal.entity,
  taxID: SITE.legal.inn,
  identifier: [
    { "@type": "PropertyValue", propertyID: "OGRNIP", value: SITE.legal.ogrnip },
    { "@type": "PropertyValue", propertyID: "INN", value: SITE.legal.inn },
  ],
  foundingDate: "2022-04-13",
  founder: {
    "@type": "Person",
    name: "Каприелов Аркадий Григорьевич",
    jobTitle: "Основатель, системный архитектор",
  },
  description:
    "Инженерная компания: внедрение Битрикс24, разработка платформ, аудиты IT-инфраструктуры для среднего бизнеса 20–200 сотрудников.",
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  image: `${SITE.url}/opengraph-image`,
  email: SITE.email,
  priceRange: "30 000 ₽ – 1 500 000 ₽",
  areaServed: { "@type": "Country", name: "RU" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Ставропольский край",
    addressLocality: "Кисловодск",
  },
  sameAs: [SITE.telegramUrl],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    availableLanguage: ["Russian"],
    areaServed: "RU",
  },
  serviceType: [
    "Внедрение CRM",
    "Разработка программного обеспечения",
    "IT-аудит",
  ],
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AK Systems",
  image: `${SITE.url}/opengraph-image`,
  "@id": SITE.url,
  url: SITE.url,
  email: SITE.email,
  priceRange: "₽₽₽",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Ставропольский край",
    addressLocality: "Кисловодск",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  areaServed: { "@type": "Country", name: "RU" },
  sameAs: [SITE.telegramUrl],
};

const servicesLd = [
  {
    name: "Системный аудит",
    price: "30000",
    priceRange: "30 000 ₽",
    description:
      "Аудит CRM, сайта, бэк-офиса и IT-инфраструктуры. PDF-отчёт с картой проблем и планом действий. Срок 5–10 рабочих дней.",
  },
  {
    name: "Внедрение Битрикс24 Стандарт",
    price: "180000",
    priceRange: "180 000 ₽",
    description:
      "Настройка CRM, импорт базы, интеграции, роботы, обучение команды. Срок 3–5 недель.",
  },
  {
    name: "Внедрение Битрикс24 Энтерпрайз",
    price: "450000",
    priceRange: "450 000 – 900 000 ₽",
    description:
      "Кастомные бизнес-процессы, интеграции с 1С и ERP, доработка на Bitrix Framework, миграция с amoCRM/HubSpot. Срок 6–10 недель.",
  },
  {
    name: "Разработка платформы или сложного сайта",
    price: "600000",
    priceRange: "600 000 – 1 500 000 ₽",
    description:
      "Кастомная платформа: личный кабинет, B2B-маркетплейс, SaaS, отраслевая CRM. Backend (Python/Node.js) + Frontend (React/Next.js) + интеграции. Срок 8–16 недель.",
  },
  {
    name: "Поддержка и развитие",
    price: "40000",
    priceRange: "40 000 – 150 000 ₽/мес",
    description:
      "Ежемесячная подписка на поддержку, доработки и развитие Битрикс24, сайта или платформы.",
  },
].map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  provider: { "@type": "Organization", name: "AK Systems", url: SITE.url },
  areaServed: "RU",
  description: s.description,
  offers: {
    "@type": "Offer",
    price: s.price,
    priceCurrency: "RUB",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: s.price,
      priceCurrency: "RUB",
    },
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "AK Systems" },
  },
}));

const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        {servicesLd.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
