import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StickyCTA } from "@/components/StickyCTA";
import { SideNavTOC } from "@/components/SideNavTOC";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { IntroScan } from "@/components/IntroScan";
import { SkipLink } from "@/components/SkipLink";

import { Hero } from "@/components/sections/Hero";
import { IndustriesStrip } from "@/components/sections/IndustriesStrip";
import { PainPoints } from "@/components/sections/PainPoints";
import { Credentials } from "@/components/sections/Credentials";
import { Products } from "@/components/sections/Products";
import { Quiz } from "@/components/sections/Quiz";
import { Cases } from "@/components/sections/Cases";
import { Industries } from "@/components/sections/Industries";
import { Metrics } from "@/components/sections/Metrics";
import { Comparison } from "@/components/sections/Comparison";
import { Process } from "@/components/sections/Process";
import { FirstCall } from "@/components/sections/FirstCall";
import { WhyUs } from "@/components/sections/WhyUs";
import { Team } from "@/components/sections/Team";
import { Guarantees } from "@/components/sections/Guarantees";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { Faq } from "@/components/sections/Faq";
import { NotForYou } from "@/components/sections/NotForYou";
import { Slots } from "@/components/sections/Slots";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SkipLink />
      <IntroScan />
      <ScrollProgress />
      <Header />
      <SideNavTOC />
      <main id="main" className="flex-1">
        <Hero />
        <IndustriesStrip />
        <PainPoints />
        <Credentials />
        <Products />
        <Quiz />
        <Cases />
        <Industries />
        <Metrics />
        <Comparison />
        <Process />
        <FirstCall />
        <WhyUs />
        <Team />
        <Guarantees />
        <LeadMagnet />
        <Faq />
        <NotForYou />
        <Slots />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
      <CookieBanner />
      <Analytics />
    </>
  );
}
