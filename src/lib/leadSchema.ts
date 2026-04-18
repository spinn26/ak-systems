import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Слишком короткое имя")
    .max(100, "Слишком длинное имя"),
  company: z
    .string()
    .trim()
    .min(2, "Укажите компанию")
    .max(200, "Слишком длинное название"),
  role: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Некорректный email"),
  contact: z
    .string()
    .trim()
    .min(3, "Укажите Telegram")
    .max(100),
  size: z.enum(["<20", "20-50", "50-100", "100-200", "200+"], {
    error: "Укажите размер компании",
  }),
  task: z.string().trim().max(2000, "Слишком длинное описание").optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "Требуется согласие на обработку данных"),
  website: z.string().max(0).optional(),
  utm: z.record(z.string(), z.string()).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
