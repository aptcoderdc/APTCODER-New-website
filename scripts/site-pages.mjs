// The site's pages, in one list: vite.config.ts pre-renders them and write-seo-files.mjs puts
// the indexable ones in sitemap.xml.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(ROOT, path), "utf8");

/** Main pages, with how often they change and their relative importance for the sitemap. */
const MAIN_PAGES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/courses", changefreq: "weekly", priority: 0.9 },
  { path: "/vernatics", changefreq: "monthly", priority: 0.8 },
  { path: "/school", changefreq: "monthly", priority: 0.8 },
  { path: "/c-nat", changefreq: "monthly", priority: 0.7 },
  { path: "/about", changefreq: "monthly", priority: 0.6 },
  { path: "/contact", changefreq: "yearly", priority: 0.6 },
  { path: "/careers", changefreq: "monthly", priority: 0.5 },
  { path: "/privacy-policy", changefreq: "yearly", priority: 0.2 },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: 0.2 },
];

/**
 * Every page of the site. `indexable` is false for pages that tell search engines not to index
 * them (courses not yet approved for the website, see offeringApproved), which therefore stay out
 * of the sitemap.
 */
export function sitePages() {
  const catalogue = JSON.parse(read("src/site/data/courseCatalogue.generated.json"));
  const courses = catalogue.courses.map((course) => ({
    path: `/courses/${course.routeSlug}`,
    indexable: course.offeringApproved === true,
    changefreq: "monthly",
    priority: 0.7,
  }));
  // The hand-added Vernatics courses (Robo Star, Orbit, Galaxy) are not in the generated file.
  const vernatics = read("src/site/data/vernaticsCourses.ts");
  const vernaticsApproved = /offeringApproved:\s*true/.test(vernatics);
  const handAdded = [...vernatics.matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => ({
    path: `/courses/${match[1]}`,
    indexable: vernaticsApproved,
    changefreq: "monthly",
    priority: 0.7,
  }));
  return [...MAIN_PAGES.map((page) => ({ ...page, indexable: true })), ...courses, ...handAdded];
}

/** The site's public address (src/site/data/site.json), without a trailing slash. */
export function siteUrl() {
  return JSON.parse(read("src/site/data/site.json")).url.replace(/\/$/, "");
}
