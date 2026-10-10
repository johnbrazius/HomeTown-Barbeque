import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageKey } from "@/content/images";
import { img } from "@/lib/images";
import { siteUrl } from "@/lib/site-url";
import { Photo } from "./Photo";

type Crumb = { label: string; href: string };

type Props = {
  eyebrow: string;
  /** Main title. Use `accent` for the italic serif word at the end. */
  title: string;
  accent?: string;
  intro?: ReactNode;
  image?: ImageKey;
  crumbs: Crumb[];
  children?: ReactNode;
};

/**
 * Header block for every inner page: breadcrumb trail (+ BreadcrumbList
 * JSON-LD), label, editorial title, intro, and an optional image panel.
 */
export function PageHero({ eyebrow, title, accent, intro, image, crumbs, children }: Props) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const origin = siteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: new URL(c.href, origin).toString(),
    })),
  };
  const photo = image ? img(image) : null;

  return (
    <section className="grain relative overflow-hidden bg-ink pt-18">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative z-2 mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 pt-12 sm:px-8 md:pb-24 md:pt-16 lg:grid-cols-12 lg:px-12">
        <div className={photo ? "lg:col-span-7" : "lg:col-span-10"}>
          <nav aria-label="Breadcrumb">
            <ol className="label flex flex-wrap items-center gap-2 text-cream/60">
              {trail.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i < trail.length - 1 ? (
                    <>
                      <Link href={c.href} className="hover:text-cream">
                        {c.label}
                      </Link>
                      <span aria-hidden>/</span>
                    </>
                  ) : (
                    <span aria-current="page" className="text-cream/85">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="label hero-fade mt-10 flex items-center gap-3 text-ember-bright">
            <span aria-hidden className="h-px w-10 bg-ember" />
            {eyebrow}
          </p>
          <h1 className="display mt-6 text-[clamp(3.2rem,10vw,9rem)]">
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="hero-line">
                {title}
                {accent && (
                  <>
                    {" "}
                    <span className="font-serif text-[0.92em] font-normal normal-case italic tracking-normal text-ember-bright">
                      {accent}
                    </span>
                  </>
                )}
              </span>
            </span>
          </h1>
          {intro && (
            <div className="hero-fade mt-8 max-w-2xl text-lg leading-relaxed text-cream/75 md:text-xl" style={{ ["--d" as string]: "0.3s" }}>
              {intro}
            </div>
          )}
          {children && (
            <div className="hero-fade mt-10" style={{ ["--d" as string]: "0.45s" }}>
              {children}
            </div>
          )}
        </div>
        {photo && (
          <div className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[420px]">
            <div className="hero-photo absolute inset-0">
              <Photo image={photo} sizes="(min-width: 1024px) 40vw, 100vw" eager tagPosition="br" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
