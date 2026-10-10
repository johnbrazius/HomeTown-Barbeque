import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/hero/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { ArtOfThePit } from "@/components/sections/ArtOfThePit";
import { MenuShowcase } from "@/components/sections/MenuShowcase";
import { Process } from "@/components/sections/Process";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { Visit } from "@/components/sections/Visit";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { AnalyticsListener } from "@/components/ui/AnalyticsListener";
import { restaurantJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Ticker />
        <ArtOfThePit />
        <MenuShowcase />
        <Process />
        <Atmosphere />
        <Visit />
      </main>
      <Footer />
      <MobileActionBar />
      <RevealObserver />
      <AnalyticsListener />
    </>
  );
}
