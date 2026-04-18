import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StickyCTA } from "@/components/StickyCTA";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyCTA />
      <CookieBanner />
      <Analytics />
    </>
  );
}
