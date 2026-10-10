import { pageMeta } from "@/lib/metadata";
import { business } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/ui/Prose";

export const metadata = pageMeta({
  title: "Accessibility",
  description: "Accessibility statement for this website: the standard it targets, what’s built in, known limitations and how to get help.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Accessibility", href: "/accessibility" }]}
        eyebrow="Website accessibility"
        title="Built for"
        accent="everyone."
      />
      <Prose>
        <p>
          This website aims to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. Accessibility was
          considered from the start of the design, not added at the end.
        </p>
        <h2>What’s built in</h2>
        <ul>
          <li>Semantic page structure with one main heading per page, landmarks and a “Skip to content” link.</li>
          <li>Every control works with a keyboard, with visible focus indicators.</li>
          <li>Text and controls are designed to meet AA color-contrast ratios.</li>
          <li>Images have descriptive alternative text; decorative graphics are hidden from screen readers.</li>
          <li>
            Motion is reduced or switched off when your device asks for reduced motion — including parallax, the 3D
            effect and scroll animations.
          </li>
          <li>Layouts adapt from small phones to large screens without horizontal scrolling.</li>
          <li>The map only loads when you choose to load it, and directions are always available as a plain link.</li>
        </ul>
        <h2>Known limitations</h2>
        <ul>
          <li>Pages on third-party sites we link to — such as the official menu, maps and press articles — are outside our control.</li>
          <li>The embedded Google map may not be fully accessible; use the “Get directions” link instead.</li>
        </ul>
        <h2>Need help?</h2>
        <p>
          If something on this site doesn’t work for you, or you need information in a different format, call the
          restaurant at <a href={`tel:${business.phoneE164}`}>{business.phoneDisplay}</a>. For questions about
          accessibility at the restaurant itself, please call before your visit.
        </p>
        <p className="text-base text-ink/60">This statement should be reviewed by the site owner before launch.</p>
      </Prose>
    </>
  );
}
