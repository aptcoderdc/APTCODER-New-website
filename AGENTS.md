# Agent rules
- Site pages/components live in src/site and receive a `navigate(page)` prop; useSiteNavigate maps page keys to file routes (keeps imported components unchanged).

# Project notes (handover)
Background on how this site was built and what was decided along the way. These notes describe the
current state; they are not fixed rules, and the owner may change direction at any time. Ask when
something here conflicts with a new request.

## Where things live
- Live site: https://newweb.aptcoder.com/, served by GitHub Pages from this repo
  (aptcoderdc/APTCODER-New-website). Every push to `main` runs `.github/workflows/deploy-pages.yml`.
- The custom domain needs `public/CNAME` and the root-base handling in `vite.config.ts`
  (`PAGES_BASE_PATH` empty means base "/", so every asset and link is an absolute `/...` path;
  relative `./` paths broke the logo on pages opened directly). The 404.html app shell is
  rendered from `/?spa-shell` so it does not take the home page's place in the prerender.
  To test a Pages build locally: `node scripts/serve-pages-build.mjs` (serves `dist/client`
  like GitHub Pages).
- This repo started as a copy of KH11120/archive-unpack-and-play (built with Lovable). It is no
  longer connected to Lovable: the Lovable Vite preset, `.lovable/` and the editor hooks were
  removed, and `vite.config.ts` now lists the plugins itself (TanStack Start, React, Tailwind,
  tsconfig paths).
- So far the owner has pushed from GitHub Desktop, and agents have committed locally.

## Course catalogue
- Source: `docs/Course_Catalogue_Website.xlsx`, sheet "Course Master (2)", with allowed values in
  "Lists (2)". `scripts/sync-course-catalogue.py` regenerates
  `src/site/data/courseCatalogue.generated.json`, checks every value against Lists (2) and fails on
  anything unexpected; `scripts/test_sync_course_catalogue.py` tests it. So far the workbook has been
  treated as read-only input.
- Filters:
  - The horizontal subject bar on /courses is the Subject filter. It supports multi-select, and its
    order comes from `SUBJECT_BAR_ORDER` in `src/site/data/courseCatalogue.ts`. The URL form is
    `?subject=a,b`.
  - The sidebar filters are Learning Model, Grade, Language and Program Type.
  - Selections are OR'd within a group and AND'd across groups.
  - Difficulty/Level filters and the old category system were removed on purpose. Old
    `?category=` and `/courses/category/<slug>` links redirect to the matching subjects.
- Grades can span several values; `formatCourseGrades` shows labels like "Grade 10–12". Cards show
  age group and duration.
- The Vernatics courses (Robo Star/Orbit/Galaxy) are hand-added in
  `src/site/data/vernaticsCourses.ts`, not in the workbook.
- Thumbnails:
  - `src/site/data/courseThumbnails.json` maps each course ID to a source image (mostly
    `public/Thumbnail Samples`), chosen by subject.
  - `scripts/build-course-thumbnails.py` writes `public/course-thumbnails/<id>.jpg` at 1280x720.
  - The original images were kept unchanged.
  - The owner may later supply clean subject images; swapping them means editing the JSON and
    rebuilding.
- After catalogue changes, earlier work checked every course and filter count against the Excel,
  and the subject bar on desktop, tablet and mobile (no horizontal page overflow).

## Website forms → Google Sheet
- All five forms post to one Google Apps Script web app: Free Class, KCC, Contact, School Sales Kit
  and Recorded Class. The URL is `SHEET_FORMS_URL` in `src/site/api/sheetForms.ts`, overridable
  with `VITE_SHEET_FORMS_URL`.
- The script source is `docs/google-sheets-forms/Code.gs`. A copy of it runs in Google under the
  company data account, which owns the Sheet. Changing the script means pasting the new code there
  and using Deploy → Manage deployments → Edit → New version, which keeps the URL.
- A form shows success only when the script answers `{ ok: true }`, i.e. after the row is saved.
  Each form has a hidden honeypot field named "website".
- Emails are sent from the data account.
  - The team gets a notification at the addresses in the Sheet's Settings tab ("Team emails:
    <form>"), with reply-to set to the visitor.
  - Visitors get a confirmation at the address they typed when "Send customer confirmations" is
    Yes; replies go to "Reply-to address" (hello@aptcoder.com).
- Known open risk, deliberately left for now: anyone can trigger confirmation emails to any
  address, and the confirmation includes text the visitor typed.
  - Ideas discussed: fixed-text confirmations, per-address and hourly limits, and Cloudflare
    Turnstile if junk rows appear.
  - The quick switch-off is Settings → "Send customer confirmations" = No.

## How work has gone so far
- Keep the existing design and change only what was asked; check the result in the browser
  preview (desktop and mobile) and with `npm test`. `GITHUB_PAGES=true PAGES_BASE_PATH="" npm run
  build:pages` reproduces the live build.
- Mobile: phones are below 640px (Tailwind `max-sm:` / `sm:`), tablets 640–1023px, desktop from
  1024px (`lg:`). Mobile-only changes use those variants so desktop stays unchanged. Before
  committing layout changes, run `scripts/layout-check.browser.js` (see scripts/README.md).
- Commit with clear messages and don't rewrite pushed history.
