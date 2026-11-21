# Course catalogue data sync

`src/site/data/courseCatalogue.generated.json` is generated from
`docs/Course_Catalogue_Website.xlsx` by `scripts/sync-course-catalogue.py`. The workbook is
read-only input; the script never writes to it. Refresh the JSON after the workbook changes:

```sh
python3 -m pip install -r requirements-catalogue.txt
npm run catalogue:sync
```

Run the exporter's tests with pytest (it needs openpyxl and pytest installed):

```sh
python3 -m pytest -q scripts/test_sync_course_catalogue.py
```

## Sheets

- **Course Master (2)** has one row per course. The older "Course Master" sheet is no longer
  used.
- **Lists (2)** holds the allowed dropdown values. Every Type, Subject, Learning Model, Language
  and Grade cell on Course Master (2) must use one of these values, or the script stops with an
  error naming the record. Lists (2) also sets the order of the Subject, Learning Model and
  Language filter options.

## What becomes a website course

- Only rows whose Type is Course, Camp or Capstone and whose LMS Status is Active are used. Each
  such row becomes exactly one website course, so the site's count matches the workbook's.
- Record IDs (e.g. `CRS-001`) must be unique and are the course IDs on the site. The URL slug
  comes from the title. The record ID is added to the slug when a title is shared by several
  records or is not ASCII.
- Title: the "Display Name (cleaned from "New Lesson Name")" column. The LMS name is used only
  when a row has no display name, and the report lists those rows.
- Subject, Type (shown as Program Type), Learning Model and Language are copied as written.
  "Not specified" is kept as data, but the site never shows it as a filter option or badge.
- Age Group and Course Duration are copied as written and shown on the cards.
- Difficulty and Live Level are kept for reference only; the site has no Level filter.
- Display order is the row order on the sheet.
- Fields the workbook does not contain (description, lessons, syllabus, price, ...) stay empty,
  and the site hides them. Publication approval is never inferred.

## Grades

- **Grades Covered** ("5" or "10, 11, 12") is the full list of grades a course covers. Each
  value must be a whole number from 1 to 12.
- **Grade** ("Grade 5" or "Multi-Grade") must agree with it. A single grade must equal Grades
  Covered, and Multi-Grade needs at least two grades. If Grades Covered is empty, a single
  Grade value is used instead.
- The JSON stores `grades` (the full list) plus `gradeFrom`/`gradeTo`. The sidebar Grade filter
  offers every grade any course covers. A course matches when it covers any selected grade.
- Cards and course pages show "Grade 5", "Grade 10–12" for consecutive grades, or
  "Grades 1, 3, 5" for grades with gaps (`formatCourseGrades` in
  `src/site/data/courseCatalogue.ts`). The report lists any course without grades.

## Not from the workbook

- The Vernatics courses (Robo Star, Orbit, Galaxy) are added by hand in
  `src/site/data/vernaticsCourses.ts`.
- Thumbnails come from `src/site/data/courseThumbnails.json` and
  `scripts/build-course-thumbnails.py` (see `docs/course-thumbnails.md`).

# Mobile layout check

`scripts/layout-check.browser.js` loads every page at 320, 360, 375, 390, 430, 768 and 1024px
and reports sideways scrolling, text under 11px and touch targets under 44px. It measures the
real layout, so it runs in a browser rather than in `npm test` (no headless browser is
installed):

1. Start the dev server: `npm run dev` (http://localhost:8080).
2. Open any page of it and paste the whole file into the developer console. The dev server
   also serves it, so `(0, eval)((await import("/scripts/layout-check.browser.js?raw")).default)`
   works too.
3. After about three minutes it prints a table; the details are in `window.__layoutCheck`.

Sideways scrolling, or text under 11px below 1024px, is a failure. Small touch targets are listed as warnings;
links inside sentences and the footer's text links are not counted.
