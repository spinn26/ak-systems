"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "aks_cookie_consent_v1";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
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

  if (!metrikaId || !granted) return null;

  const id = Number(metrikaId);
  if (!Number.isFinite(id)) return null;

  return (
    <>
      <Script id="ym" strategy="afterInteractive">{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        try {
          window.ym && window.ym(${id}, "init", {
            ssr: true,
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            ecommerce: "dataLayer"
          });
        } catch (e) { console.warn("ym init skipped", e); }
      `}</Script>
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
