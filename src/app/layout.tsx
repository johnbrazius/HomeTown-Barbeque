import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Big_Shoulders, Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import { business } from "@/content/site";
import { img } from "@/lib/images";
import { allowIndexing, siteUrl } from "@/lib/site-url";
import { analyticsDomain, analyticsEnabled } from "@/lib/analytics";
import { restaurantJsonLd } from "@/lib/structured-data";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { AnalyticsListener } from "@/components/ui/AnalyticsListener";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-big-shoulders",
  display: "swap",
  // No metric overrides exist for this family; fall back to condensed system faces
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
  axes: ["opsz"],
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const ogImage = img("heroWide");

const title = "Hometown Bar-B-Que — Oak-Smoked Barbecue in Red Hook, Brooklyn";
const description =
  "Pit-smoked barbecue cooked over oak with traditional Southern technique at 454 Van Brunt Street, Red Hook, Brooklyn. See the menu, hours and directions.";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: title, template: "%s · Hometown Bar-B-Que" },
  description,
  alternates: { canonical: "/" },
  applicationName: business.name,
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.name,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.src],
  },
  formatDetection: { telephone: false },
  // Concept builds stay out of search results until the owner authorizes launch.
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f1a2e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable} antialiased`}>
      <head>
        {/* Flags JS early so scroll-reveal styles never hide content for no-JS visitors */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()).replace(/</g, "\\u003c") }}
        />
        <Header />
        <AnnouncementBar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <RevealObserver />
        <AnalyticsListener />
        {analyticsEnabled && (
          <Script defer data-domain={analyticsDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
