export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "bitrix24-vs-amocrm",
    title: "Битрикс24 или amoCRM — что выбрать среднему бизнесу в 2026",
    description:
      "Сравнение Битрикс24 и amoCRM по 12 критериям: функциональность, цена, гибкость настройки, интеграции, масштаб. Когда подходит одна, когда другая.",
    publishedAt: "2026-03-22",
    readMinutes: 9,
    tags: ["Битрикс24", "amoCRM", "Сравнение"],
  },
  {
    slug: "crm-audit-checklist",
    title: "Чек-лист аудита CRM: 42 пункта, по которым мы проверяем систему",
    description:
      "Как за 20 минут понять, где у вас «течёт» CRM: качество данных, процессы, интеграции, отчётность, права, дисциплина команды.",
    publishedAt: "2026-02-14",
    readMinutes: 12,
    tags: ["CRM", "Аудит", "Чек-лист"],
  },
];
