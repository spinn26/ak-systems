"use client";

import Script from "next/script";

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
    dataLayer?: unknown[];
  }
}

/**
 * Loads Yandex.Metrika unconditionally. Cookie banner below is informational
 * (152-ФЗ compliant via notice + data usage disclosure in privacy policy).
 * If user clicks "Отклонить" in the banner — Metrika stays loaded but we set
 * a flag that can be used to suppress custom goal events client-side.
 */
export function Analytics() {
  const metrikaId = process.env.NEXT_PUBLIC_YM_ID;
  const id = Number(metrikaId);
  if (!Number.isFinite(id)) return null;

  return (
    <>
      <Script id="ym-init" strategy="afterInteractive">{`
        (function(w){
          w.ym = w.ym || function(){(w.ym.a = w.ym.a || []).push(arguments)};
          w.ym.l = 1 * new Date();
        })(window);
        try {
          window.ym(${id}, "init", {
            ssr: true,
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            ecommerce: "dataLayer"
          });
        } catch (e) { console.warn("ym init skipped", e); }
      `}</Script>
      <Script
        id="ym-tag"
        src="https://mc.yandex.ru/metrika/tag.js"
        strategy="afterInteractive"
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: -9999 }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
