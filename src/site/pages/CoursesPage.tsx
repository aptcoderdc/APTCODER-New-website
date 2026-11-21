import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Search, SlidersHorizontal, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CourseCard from "@/site/components/CourseCard";
import {
  emptyCatalogueFilters,
  gradeOptions,
  getCatalogueOptionCount,
  getCourseFacetValues,
  getFacetOptions,
  getGradeOptions,
  matchesCatalogueFilters,
  catalogueCourses,
  sortCourses,
  subjectOptions,
  type CatalogueFilters,
  type CatalogueFilterKey,
  type CatalogueFilterValue,
  type CourseRecord,
} from "@/site/data/courseCatalogue";
import { hasActiveCatalogueSearch, serializeCatalogueSearch } from "@/site/data/catalogueSearch";
import type { Page } from "../page";

interface Props {
  filters: CatalogueFilters;
  onFiltersChange: (filters: CatalogueFilters, replace?: boolean) => void;
  navigate: (page: Page) => void;
}

/** Sidebar groups. Subjects are chosen in the subject bar above the results, not here. */
type FilterKey = Exclude<CatalogueFilterKey, "subjects">;
type FilterValue = CatalogueFilterValue;

function filterOptionLabel(key: FilterKey, value: FilterValue): string {
  return key === "models" ? String(value).replace(/\s*\([^)]*\)/g, "") : String(value);
}

function filterKeyLabel(key: FilterKey): string {
  return {
    models: "Learning Model",
    grades: "Grade",
    languages: "Language",
    programTypes: "Program Type",
  }[key];
}

function FilterGroup({
  title,
  filterKey,
  options,
  filters,
  courses,
  onChange,
}: {
  title: string;
  filterKey: FilterKey;
  options: readonly FilterValue[];
  filters: CatalogueFilters;
  courses: readonly CourseRecord[];
  onChange: (key: FilterKey, value: FilterValue, checked: boolean) => void;
}) {
  const selected = filters[filterKey] as FilterValue[];
  return (
    <details className="border-b border-gray-100 py-3" open>
      <summary className="cursor-pointer list-none text-sm font-bold text-gray-900">
        <span className="flex items-center justify-between">
          {title}
          <span aria-hidden="true">−</span>
        </span>
      </summary>
      <div className="mt-3 space-y-2">
        {options.map((option) => {
          const count = getCatalogueOptionCount(courses, filters, filterKey, option);
          const label = filterOptionLabel(filterKey, option);
          const id = `${filterKey}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <label
              key={label}
              htmlFor={id}
              className={`flex min-h-11 items-center gap-2 text-sm lg:min-h-8 ${count ? "cursor-pointer text-gray-700" : "cursor-not-allowed text-gray-400"}`}
            >
              <Checkbox
                id={id}
                checked={selected.includes(option)}
                disabled={count === 0 && !selected.includes(option)}
                onCheckedChange={(checked) => onChange(filterKey, option, checked === true)}
              />
              <span className="flex-1">{label}</span>
              <span className="text-xs tabular-nums">{count}</span>
            </label>
          );
        })}
      </div>
    </details>
  );
}

export function FilterPanel({
  filters,
  courses = catalogueCourses,
  onChange,
  onClear,
}: {
  filters: CatalogueFilters;
  courses?: readonly CourseRecord[];
  onChange: Props["onFiltersChange"];
  onClear: () => void;
}) {
  const updateFilter = (key: FilterKey, value: FilterValue, checked: boolean) => {
    const current = filters[key] as FilterValue[];
    const next = checked ? [...current, value] : current.filter((item) => item !== value);
    onChange({ ...filters, [key]: next } as CatalogueFilters);
  };

  // Options come from the courses in the chosen subjects (all courses when none is chosen), so
  // a group only lists values those courses actually have. Selected values always stay visible
  // so they can be removed, e.g. after choosing a subject that does not use them.
  const scopedCourses = courses.filter(
    (course) =>
      filters.subjects.length === 0 ||
      getCourseFacetValues(course, "subjects").some((subject) =>
        filters.subjects.includes(subject),
      ),
  );
  const withSelected = <T extends FilterValue>(options: T[], selected: readonly T[]): T[] => [
    ...options,
    ...selected.filter((value) => !options.includes(value)),
  ];
  const groups: { title: string; key: FilterKey; options: FilterValue[] }[] = [
    {
      title: "Learning Model",
      key: "models",
      options: withSelected(getFacetOptions(scopedCourses, "models"), filters.models),
    },
    {
      title: "Grade",
      key: "grades",
      options: withSelected(getGradeOptions(scopedCourses), filters.grades),
    },
    {
      title: "Language",
      key: "languages",
      options: withSelected(getFacetOptions(scopedCourses, "languages"), filters.languages),
    },
    {
      title: "Program Type",
      key: "programTypes",
      options: withSelected(getFacetOptions(scopedCourses, "programTypes"), filters.programTypes),
    },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-wide text-gray-900">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-[#E8401C] underline underline-offset-2"
        >
          Clear all
        </button>
      </div>
      {groups.map(
        ({ title, key, options }) =>
          options.length > 0 && (
            <FilterGroup
              key={key}
              title={title}
              filterKey={key}
              options={options}
              filters={filters}
              courses={courses}
              onChange={updateFilter}
            />
          ),
      )}
    </div>
  );
}

export default function CoursesPage({ filters, onFiltersChange, navigate }: Props) {
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Choosing other subjects starts the list at the first page again.
  const subjectKey = filters.subjects.join("|");
  const [pagedSubjects, setPagedSubjects] = useState(subjectKey);
  if (pagedSubjects !== subjectKey) {
    setPagedSubjects(subjectKey);
    setVisibleCount(12);
  }

  // Subjects chosen in the bar (?subject=a,b). A course in any of them matches; the sidebar
  // groups narrow that further.
  const selectedSubjects = filters.subjects;

  const results = useMemo(() => {
    const matched = catalogueCourses.filter((course) => matchesCatalogueFilters(course, filters));
    return sortCourses(matched, filters.sort);
  }, [filters]);

  const updateFilters: Props["onFiltersChange"] = (next, replace) => {
    setVisibleCount(12);
    onFiltersChange(next, replace);
  };

  // Removes the search and every sidebar filter; the chosen subjects and sort are kept.
  const clearFilters = () => {
    updateFilters({
      ...emptyCatalogueFilters,
      subjects: filters.subjects,
      sort: filters.sort,
    });
  };

  /** Subjects selected after clicking a chip (keeps search, sidebar filters and sort). */
  const toggleSubject = (item: string) =>
    selectedSubjects.includes(item)
      ? selectedSubjects.filter((value) => value !== item)
      : [...selectedSubjects, item];

  const activeChips: { key: FilterKey | "q"; value: FilterValue | string; label: string }[] = [];
  if (filters.q.trim())
    activeChips.push({ key: "q", value: filters.q, label: `Search: ${filters.q}` });
  for (const key of ["models", "grades", "languages", "programTypes"] as const) {
    for (const value of filters[key])
      activeChips.push({
        key,
        value,
        label: `${filterKeyLabel(key)}: ${filterOptionLabel(key, value)}`,
      });
  }

  const removeChip = (chip: (typeof activeChips)[number]) => {
    if (chip.key === "q") updateFilters({ ...filters, q: "" });
    else {
      const key = chip.key;
      updateFilters({
        ...filters,
        [key]: filters[key].filter((item) => item !== chip.value),
      } as CatalogueFilters);
    }
  };

  return (
    <main>
      <section className="bg-[#FFF5F2]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_minmax(18rem,28rem)] lg:items-end lg:px-8 lg:py-16">
          <div>
            <p className="section-label mb-4">OUR COURSES</p>
            <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
              {selectedSubjects.length === 1
                ? `${selectedSubjects[0]} Courses`
                : "Explore Our Courses"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
              Explore technology courses for your interests and learning needs.
            </p>
          </div>
          <label className="relative block">
            <span className="sr-only">Search courses</span>
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            />
            <input
              id="course-search"
              type="search"
              value={filters.q}
              onChange={(event) => {
                updateFilters({ ...filters, q: event.target.value }, true);
              }}
              placeholder="Search courses..."
              className="scroll-mt-40 min-h-12 w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#E8401C] focus:ring-2 focus:ring-[#E8401C]/15"
            />
            <span className="sr-only" aria-live="polite">
              {filters.q.trim().length === 1 ? "Enter at least 2 characters to search." : ""}
            </span>
          </label>
        </div>
      </section>

      <nav aria-label="Course subjects" className="border-b border-gray-100 bg-white">
        {/* Multi-select: each chip toggles its subject; filters, search and sort are kept. The
            row scrolls sideways when the subjects do not fit; "relative" keeps the screen-reader
            labels inside it, so the page itself never scrolls sideways. */}
        <div className="relative mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          {/* All Courses resets the catalogue: no subjects, search or sidebar filters. */}
          <Link
            to="/courses"
            search={{}}
            aria-current={selectedSubjects.length === 0 ? "page" : undefined}
            className={`min-h-11 shrink-0 rounded-full px-5 py-3 text-sm font-bold transition-colors ${selectedSubjects.length === 0 ? "bg-[#E8401C] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            All Courses
          </Link>
          {subjectOptions.map((item) => {
            const selected = selectedSubjects.includes(item);
            return (
              <Link
                key={item}
                to="/courses"
                search={serializeCatalogueSearch({ ...filters, subjects: toggleSubject(item) })}
                className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition-colors ${selected ? "bg-[#E8401C] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                data-subject={item}
                data-selected={selected || undefined}
              >
                {selected && <Check aria-hidden="true" className="-ml-1 h-4 w-4" />}
                {item}
                <span className="sr-only">{selected ? " (selected)" : ""}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold text-gray-700" aria-live="polite">
              Showing {results.length} courses
            </p>
            <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
              <button
                type="button"
                onClick={() => setFilterSheetOpen(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-800 lg:hidden"
              >
                <SlidersHorizontal aria-hidden="true" className="h-4 w-4" /> Filters
              </button>
              {/* Only the options scroll; the footer stays pinned so the button (with the live
                  result count, as filters apply as soon as they are ticked) is always in reach. */}
              <SheetContent
                side="bottom"
                className="flex max-h-[85dvh] flex-col gap-0 rounded-t-2xl p-0"
              >
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-6 pb-2">
                  <SheetHeader className="mb-4 pr-8 text-left">
                    <SheetTitle>Filter courses</SheetTitle>
                    <SheetDescription>
                      Select options, then apply to the catalogue.
                    </SheetDescription>
                  </SheetHeader>
                  <FilterPanel filters={filters} onChange={updateFilters} onClear={clearFilters} />
                </div>
                <SheetFooter className="shrink-0 border-t border-gray-100 bg-white px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setFilterSheetOpen(false)}
                    className="min-h-12 w-full rounded-full bg-[#E8401C] px-6 font-bold text-white"
                  >
                    {`Show ${results.length} ${results.length === 1 ? "course" : "courses"}`}
                  </button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <label className="flex min-h-11 items-center gap-2 text-sm text-gray-600">
            <span>Sort:</span>
            <select
              value={filters.sort}
              onChange={(event) =>
                updateFilters({
                  ...filters,
                  sort: event.target.value as CatalogueFilters["sort"],
                })
              }
              className="min-h-11 rounded-full border border-gray-200 bg-white px-4 font-semibold text-gray-800 outline-none focus:border-[#E8401C]"
            >
              <option value="recommended">Recommended</option>
              {gradeOptions.length > 0 && <option value="grade">Grade low to high</option>}
              <option value="az">A-Z</option>
            </select>
          </label>
        </div>

        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Active filters">
            {activeChips.map((chip) => (
              <button
                type="button"
                key={`${chip.key}-${chip.value}`}
                onClick={() => removeChip(chip)}
                className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#FFF5F2] px-3 text-xs font-semibold text-gray-800"
              >
                {chip.label}
                <X aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className="min-h-9 px-2 text-xs font-bold text-[#E8401C] underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="hidden lg:block" aria-label="Filter courses">
            <FilterPanel filters={filters} onChange={updateFilters} onClear={clearFilters} />
          </aside>
          <div>
            {results.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {results.slice(0, visibleCount).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                {results.length > visibleCount && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((count) => count + 12)}
                      className="min-h-11 rounded-full border border-gray-300 px-7 text-sm font-bold text-gray-800 hover:border-[#E8401C] hover:text-[#E8401C]"
                    >
                      Load more
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center sm:px-12">
                <h2 className="text-2xl font-black text-gray-900">
                  No courses match these filters
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-600">
                  Try changing your search or filters, or contact APTCODER about a free class.
                </p>
                {hasActiveCatalogueSearch(filters) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 min-h-11 rounded-full border border-gray-300 px-6 font-bold text-gray-800 hover:border-[#E8401C]"
                  >
                    Clear all filters
                  </button>
                )}
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => navigate("contact")}
                    className="min-h-11 rounded-full bg-[#E8401C] px-7 font-bold text-white transition-colors hover:bg-[#C73516]"
                  >
                    Book a Free Class
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#102A43] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black">Not sure which course fits your child?</h2>
            <p className="mt-2 text-sm text-white/80">
              Talk with APTCODER and find a suitable starting point.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("contact")}
            className="min-h-11 rounded-full bg-[#E8401C] px-7 font-bold text-white hover:bg-[#C73516]"
          >
            Book a Free Class
          </button>
        </div>
      </section>
    </main>
  );
}
