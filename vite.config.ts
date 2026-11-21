// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { readFileSync } from "node:fs";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * GitHub Pages build (static site). Off by default, so the normal Lovable/Cloudflare build is
 * unchanged. Enabled by `npm run build:pages` (GITHUB_PAGES=true), used by
 * .github/workflows/deploy-pages.yml:
 *   - the site is served from a sub-path (PAGES_BASE_PATH, default "/archive-unpack-and-play/"),
 *   - no server build (GitHub Pages only serves files),
 *   - every page is pre-rendered to static HTML, plus a 404.html app shell for other URLs.
 */
const githubPages = process.env["GITHUB_PAGES"] === "true";
const rawBase = process.env["PAGES_BASE_PATH"] ?? "/archive-unpack-and-play/";
// GitHub Pages reports "/<repo>" for a project site and "" once a custom domain is bound.
// A base of "/" makes the prerender skip the home page (no index.html for "/"), so the root
// is expressed as "" — Vite then emits root-relative asset paths, which is what a custom
// domain needs. Every other value keeps its trailing slash.
const pagesBase = rawBase === "" || rawBase === "/" ? "" : rawBase.replace(/\/?$/, "/");

/** Every page of the site, so the pre-render does not depend on finding links. */
function staticPages(): { path: string }[] {
  const catalogue = JSON.parse(
    readFileSync(
      new URL("./src/site/data/courseCatalogue.generated.json", import.meta.url),
      "utf8",
    ),
  ) as { courses: { routeSlug: string }[] };
  // The hand-added Vernatics courses (Robo Star, Orbit, Galaxy) are not in the generated file.
  const handAddedSlugs = [
    ...readFileSync(
      new URL("./src/site/data/vernaticsCourses.ts", import.meta.url),
      "utf8",
    ).matchAll(/slug: "([a-z0-9-]+)"/g),
  ].map((match) => match[1]);
  // Old /courses/category/<slug> addresses only redirect to /courses, so they are not pre-rendered.
  const pages = [
    "/",
    "/courses",
    "/about",
    "/school",
    "/contact",
    "/vernatics",
    "/c-nat",
    "/careers",
    "/privacy-policy",
    "/terms-and-conditions",
    ...catalogue.courses.map((course) => `/courses/${course.routeSlug}`),
    ...handAddedSlugs.map((slug) => `/courses/${slug}`),
  ];
  return pages.map((path) => ({ path }));
}

export default defineConfig({
  ...(githubPages ? { vite: { base: pagesBase }, nitro: false } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(githubPages
      ? {
          pages: staticPages(),
          prerender: {
            enabled: true,
            crawlLinks: true,
            failOnError: true,
            // A query string or #section is the same page file; filters apply in the browser.
            filter: (page: { path: string }) => !/[?#]/.test(page.path),
          },
          // App shell for any URL without its own page (GitHub Pages serves 404.html).
          spa: { enabled: true, prerender: { outputPath: "/404", crawlLinks: false } },
        }
      : {}),
  },
});
