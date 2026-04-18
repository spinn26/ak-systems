"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "aks_cookie_consent_v1";

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
    dataLayer?: unknown[];
  }
}

export function Analytics() {
  const [granted, setGranted] = useState(false);
  const metrikaId = process.env.NEXT_PUBLIC_YM_ID;

  useEffect(() => {
    const check = () => {
      try {
        const v = localStorage.getItem(CONSENT_KEY);
        setGranted(v === "accept");
      } catch {
        /* noop */
      }
    };
    check();
    const onGranted = () => setGranted(true);
    window.addEventListener("aks:consent:granted", onGranted);
    return () => window.removeEventListener("aks:consent:granted", onGranted);
  }, []);

  const id = Number(metrikaId);
  if (!Number.isFinite(id) || !granted) return null;

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
