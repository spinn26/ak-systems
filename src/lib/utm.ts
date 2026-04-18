const KEY = "aks_utm_v1";
const FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "yclid",
] as const;

type UtmFields = Partial<Record<(typeof FIELDS)[number], string>> & {
  referrer?: string;
  landing?: string;
};

export function captureUtm() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const found: UtmFields = {};
    let any = false;
    for (const k of FIELDS) {
      const v = url.searchParams.get(k);
      if (v) {
        found[k] = v;
        any = true;
      }
    }
    if (any) {
      found.referrer = document.referrer || "";
      found.landing = url.pathname + url.search;
      sessionStorage.setItem(KEY, JSON.stringify(found));
    }
  } catch {
    /* noop */
  }
}

export function readUtm(): UtmFields {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmFields;
  } catch {
    return {};
  }
}
