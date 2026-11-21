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
// The custom domain serves the site from the root, so "" means "/": every asset and link is
// then an absolute path (/images/..., /assets/...) that works on every page. (An empty base
// made them relative, "./images/...", which breaks on /school/ and other pages opened
// directly: the header logo and the first stylesheet failed to load there.) Every other value
// keeps its trailing slash.
const pagesBase = rawBase === "" || rawBase === "/" ? "/" : rawBase.replace(/\/?$/, "/");

/** Address the 404.html app shell is rendered from (anything but "/", see `spa` below). */
const SPA_SHELL_PATH = "/?spa-shell";

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
            // The app shell below is the one exception: it is rendered from its own address.
            filter: (page: { path: string }) =>
              page.path === SPA_SHELL_PATH || !/[?#]/.test(page.path),
          },
          // App shell for any URL without its own page (GitHub Pages serves 404.html). It is
          // rendered from its own address: at "/" it took the home page's place in the
          // prerender, so the home page got no index.html of its own.
          spa: {
            enabled: true,
            maskPath: SPA_SHELL_PATH,
            prerender: { outputPath: "/404", crawlLinks: false },
          },
        }
      : {}),
  },
});
