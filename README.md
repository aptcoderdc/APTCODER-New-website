# APTCODER Website

The APTCODER website, live at https://newweb.aptcoder.com/. It is a static site: every page is
pre-rendered at build time and published to GitHub Pages on each push to `main`
(`.github/workflows/deploy-pages.yml`).

Built with TanStack Start (React), Tailwind CSS and Vite. Site pages and components live in
`src/site`, routes in `src/routes`. See `AGENTS.md` for project notes and `scripts/README.md`
for the course catalogue sync, the layout check and local testing of the Pages build.

## Development

You need Node.js 22 (and Bun, which the deploy uses to install dependencies).

```sh
bun install
npm run dev          # http://localhost:8080
npm test             # unit tests (Vitest)
```

## Build

```sh
GITHUB_PAGES=true PAGES_BASE_PATH="" npm run build:pages   # the live build, in dist/client
node scripts/serve-pages-build.mjs                         # serve it like GitHub Pages
```
