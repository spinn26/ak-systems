import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE } from "@/lib/site";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Главная", href: "/" }, ...items];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.href ? `${SITE.url}${c.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <nav
        aria-label="Навигация по сайту"
        className="mono text-[12px] text-[var(--text-dim)]"
      >
        <ol className="inline-flex flex-wrap items-center gap-1.5">
          {full.map((c, i) => {
            const last = i === full.length - 1;
            return (
              <li key={i} className="inline-flex items-center gap-1.5">
                {c.href && !last ? (
                  <Link
                    href={c.href}
                    className="hover:text-[var(--text)] transition-colors"
                  >
                    {c.name}
                  </Link>
                ) : (
                  <span className={last ? "text-[var(--text-muted)]" : ""}>
                    {c.name}
                  </span>
                )}
                {!last && (
                  <ChevronRight size={12} className="text-[var(--text-dim)]" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
