import site from "./data/site.json";
import { CONTACT_EMAIL, CONTACT_PHONE, OFFICE_ADDRESS_LINES, socialLinks } from "./data/contact";

/**
 * Search-engine and link-preview tags for every page, built in one place so each page gets the
 * same complete set: title, description, canonical address, Open Graph (WhatsApp, LinkedIn,
 * Facebook), Twitter card, robots and optional structured data (JSON-LD).
 *
 * The site's public address lives in src/site/data/site.json. If the site moves to another
 * domain (e.g. aptcoder.com), change it there: canonical tags, structured data, the sitemap and
 * robots.txt all follow.
 */
export const SITE_URL: string = site.url.replace(/\/$/, "");
export const SITE_NAME: string = site.name;

/** Absolute address of a page as GitHub Pages serves it (folders end in "/"). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.split(/[?#]/)[0] ?? "/";
  if (clean === "/" || clean === "") return `${SITE_URL}/`;
  // Files (logo, images) keep their name; pages get the trailing slash GitHub Pages redirects to.
  return /\.[a-z0-9]+$/i.test(clean)
    ? `${SITE_URL}${clean}`
    : `${SITE_URL}${clean.replace(/\/?$/, "/")}`;
}

export const DEFAULT_SHARE_IMAGE = {
  url: absoluteUrl("/images/brand/og-image.jpg"),
  width: 1200,
  height: 630,
  alt: "APTCODER – access the potential",
};

type JsonLd = Record<string, unknown>;

export type PageSeo = {
  /** Path of the page, e.g. "/school" (used for the canonical address). */
  path: string;
  title: string;
  description: string;
  /** Ask search engines not to index this page (they still follow its links). */
  noindex?: boolean | undefined;
  type?: "website" | "article";
  image?: { url: string; width?: number; height?: number; alt?: string } | undefined;
  /** Structured data for this page (schema.org objects). */
  jsonLd?: JsonLd[];
};

export function pageHead({
  path,
  title,
  description,
  noindex = false,
  type = "website",
  image,
  jsonLd = [],
}: PageSeo) {
  image ??= DEFAULT_SHARE_IMAGE;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.url);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
      },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: site.locale },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: imageUrl },
      ...(image.width ? [{ property: "og:image:width", content: String(image.width) }] : []),
      ...(image.height ? [{ property: "og:image:height", content: String(image.height) }] : []),
      ...(image.alt ? [{ property: "og:image:alt", content: image.alt }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      // "<" is escaped so text in the data can never close the script tag.
      children: JSON.stringify(data).replace(/</g, "\\u003c"),
    })),
  };
}

/** The organisation behind the site (home page structured data). */
export function organizationJsonLd(): JsonLd {
  const [, street, cityLine] = OFFICE_ADDRESS_LINES;
  const postalCode = cityLine.match(/\d{6}/)?.[0];
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: absoluteUrl("/images/brand/aptcoder_logo.png"),
    image: DEFAULT_SHARE_IMAGE.url,
    description: site.description,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      ...(postalCode ? { postalCode } : {}),
      addressCountry: "IN",
    },
    sameAs: socialLinks.map((link) => link.url),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: ["en", "hi"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
