import { NextResponse } from "next/server";
import { leadSchema, type LeadInput } from "@/lib/leadSchema";

export const runtime = "nodejs";

const SIZE_LABEL: Record<string, string> = {
  "<20": "до 20",
  "20-50": "20–50",
  "50-100": "50–100",
  "100-200": "100–200",
  "200+": "200+",
};

type Utm = Record<string, string> | undefined;

function plainText(data: LeadInput, utm: Utm) {
  const lines = [
    `Имя: ${data.name}`,
    `Компания: ${data.company}`,
    `Должность: ${data.role || "—"}`,
    `Email: ${data.email}`,
    `Telegram: ${data.contact}`,
    `Размер: ${SIZE_LABEL[data.size] || data.size}`,
    "",
    "Задача:",
    data.task || "—",
  ];
  if (utm && Object.keys(utm).length > 0) {
    lines.push("", "UTM / источник:");
    for (const [k, v] of Object.entries(utm)) {
      lines.push(`  ${k}: ${v}`);
    }
  }
  return lines.join("\n");
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, skipped: true };

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    },
  );
  return { ok: res.ok };
}

async function sendBitrix24(data: LeadInput, utm: Utm) {
  const raw = process.env.BITRIX_WEBHOOK_URL;
  if (!raw) return { ok: false, skipped: true };

  const base = raw.endsWith("/") ? raw : `${raw}/`;
  const url = `${base}crm.lead.add.json`;

  const commentsParts: string[] = [];
  if (data.task) commentsParts.push(`Задача:\n${data.task}`);
  commentsParts.push(`Размер компании: ${SIZE_LABEL[data.size] || data.size}`);
  if (utm && Object.keys(utm).length > 0) {
    const utmLines = Object.entries(utm)
      .map(([k, v]) => `  ${k}: ${v}`)
      .join("\n");
    commentsParts.push(`UTM / источник:\n${utmLines}`);
  }

  const payload = {
    fields: {
      TITLE: `Заявка с aksystems.pro — ${data.company}`,
      NAME: data.name,
      COMPANY_TITLE: data.company,
      POST: data.role || "",
      EMAIL: [{ VALUE: data.email, VALUE_TYPE: "WORK" }],
      IM: [{ VALUE: data.contact, TYPE_ID: "TELEGRAM" }],
      SOURCE_ID: "WEB",
      SOURCE_DESCRIPTION: "Форма на aksystems.pro",
      COMMENTS: commentsParts.join("\n\n"),
      OPENED: "Y",
      ASSIGNED_BY_ID: process.env.BITRIX_ASSIGNED_BY_ID || undefined,
      UF_CRM_COMPANY_SIZE: SIZE_LABEL[data.size] || data.size,
      UTM_SOURCE: utm?.utm_source,
      UTM_MEDIUM: utm?.utm_medium,
      UTM_CAMPAIGN: utm?.utm_campaign,
      UTM_CONTENT: utm?.utm_content,
      UTM_TERM: utm?.utm_term,
    },
    params: { REGISTER_SONET_EVENT: "Y" },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, status: res.status };
    const body = await res.json();
    if (body?.error) return { ok: false, error: body.error_description };
    return { ok: true, leadId: body?.result as number | undefined };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // honeypot
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const text = plainText(parsed.data, parsed.data.utm);

  const tgText =
    `<b>Новая заявка — AK Systems</b>\n` +
    `<code>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;

  const [tgRes, b24Res] = await Promise.allSettled([
    sendTelegram(tgText),
    sendBitrix24(parsed.data, parsed.data.utm),
  ]);

  const tgOk = tgRes.status === "fulfilled" && tgRes.value.ok;
  const b24Ok = b24Res.status === "fulfilled" && b24Res.value.ok;

  if (!tgOk && !b24Ok) {
    console.error("Lead delivery failed", {
      tg: tgRes.status === "fulfilled" ? tgRes.value : tgRes.reason,
      b24: b24Res.status === "fulfilled" ? b24Res.value : b24Res.reason,
    });
    console.info("Lead payload:\n" + text);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
