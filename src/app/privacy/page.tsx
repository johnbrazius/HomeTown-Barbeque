import { pageMeta } from "@/lib/metadata";
import { analyticsEnabled } from "@/lib/analytics";
import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/ui/Prose";

export const metadata = pageMeta({
  title: "Privacy",
  description: "How this website handles your data: no accounts, no forms, optional cookieless analytics and a click-to-load map.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Privacy", href: "/privacy" }]} eyebrow="Privacy" title="Short &" accent="simple." />
      <Prose>
        <p>
          This website is designed to collect as little as possible. There are no accounts, no forms and no advertising
          trackers.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Analytics:</strong>{" "}
            {analyticsEnabled
              ? "this site uses Plausible, a privacy-friendly analytics service that doesn’t use cookies or collect personal data. It records page views and clicks on key links such as directions and phone numbers."
              : "no analytics are currently enabled on this site."}
          </li>
          <li>
            <strong>Server logs:</strong> our hosting provider may keep standard technical logs (such as IP address and
            browser type) to keep the site secure and running.
          </li>
        </ul>
        <h2>Third-party content</h2>
        <ul>
          <li>
            <strong>Google Maps:</strong> the interactive map only loads after you click “Load interactive map.” Once
            loaded, Google’s privacy policy applies.
          </li>
          <li>
            <strong>External links:</strong> links to the official Hometown site, maps, transit and press
            articles take you to other websites with their own privacy policies.
          </li>
          <li>
            <strong>Fonts:</strong> fonts are served from this website, not from a third-party font service.
          </li>
        </ul>
        <h2>Your choices</h2>
        <p>
          Because nothing personal is collected through this site, there’s nothing to delete or export. If you have a
          question, contact the restaurant through its official channels.
        </p>
        <p className="text-base text-ink/60">This policy should be reviewed by the site owner and legal counsel before launch.</p>
      </Prose>
    </>
  );
}
