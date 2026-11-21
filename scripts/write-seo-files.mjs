// Writes sitemap.xml and robots.txt into the GitHub Pages build (dist/client), after
// `vite build`. Run by `npm run build:pages`. The address comes from src/site/data/site.json.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { sitePages, siteUrl } from "./site-pages.mjs";

const out = (name) => join(dirname(fileURLToPath(import.meta.url)), "..", "dist", "client", name);
const base = siteUrl();
const today = new Date().toISOString().slice(0, 10);

// Pages are listed at the address GitHub Pages serves them from (folders end in "/").
const loc = (path) => (path === "/" ? `${base}/` : `${base}${path}/`);

const urls = sitePages()
  .filter((page) => page.indexable)
  .map(
    (page) =>
      `  <url>\n    <loc>${loc(page.path)}</loc>\n    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority.toFixed(1)}</priority>\n  </url>`,
  );

writeFileSync(
  out("sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);

writeFileSync(
  out("robots.txt"),
  `# Every page may be crawled; pages that should not be indexed say so in their own robots tag.\nUser-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
);

console.log(`Wrote sitemap.xml (${urls.length} pages) and robots.txt for ${base}`);
