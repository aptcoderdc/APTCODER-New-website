import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock3, Code2, GraduationCap, Languages, ListChecks, Users } from "lucide-react";
import {
  formatCourseGrades,
  getCourseLevelLabel,
  type CourseRecord,
} from "@/site/data/courseCatalogue";

function isDisplayable(value: string | null | undefined): value is string {
  return Boolean(value?.trim() && value.trim().toLocaleLowerCase() !== "not specified");
}

function displayLearningModel(value: string): string | undefined {
  if (
    ["live", "assisted learning (al)", "self learning (sl)"].includes(value.toLocaleLowerCase())
  ) {
    return value.replace(/\s*\([^)]*\)/g, "");
  }
  return undefined;
}

/** One detail in its fixed slot; an empty slot keeps its place so columns stay aligned. */
function CardDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string | undefined;
}) {
  if (!value) return <div aria-hidden="true" />;
  return (
    <div className="flex min-w-0 items-start gap-1.5">
      <Icon aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0 text-[#E8401C]" />
      <dt className="sr-only">{label}</dt>
      <dd className="min-w-0 break-words leading-snug">{value}</dd>
    </div>
  );
}

export default function CourseCard({ course }: { course: CourseRecord }) {
  // If an image file is missing, fall back to the neutral placeholder instead of a broken image.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const levelLabel = getCourseLevelLabel(course);
  const language = isDisplayable(course.language) ? course.language : undefined;
  const lessons = typeof course.lessons === "number" ? `${course.lessons} lessons` : undefined;
  const gradeLabel = formatCourseGrades(course);
  const ageGroup = isDisplayable(course.ageGroup) ? course.ageGroup : undefined;
  const duration = isDisplayable(course.duration) ? course.duration : undefined;

  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.routeSlug }}
      aria-label={`View course: ${course.title}`}
      className="group relative flex h-full flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8401C] sm:flex-col"
    >
      {/* Phones (below 640px): a compact row, thumbnail on the left and details on the right,
          so several courses fit on one screen. From 640px: the original tall card. */}
      <div className="relative aspect-video w-[38%] shrink-0 self-start overflow-hidden bg-[#FFF5F2] max-sm:m-3 max-sm:rounded-xl sm:w-full">
        {course.thumbnailUrl && failedSrc !== course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            onError={() => setFailedSrc(course.thumbnailUrl ?? null)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-[#F7F8FA] text-[#E8401C]"
          >
            <Code2 className="h-10 w-10 opacity-70" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-3 pr-3 sm:p-5">
        {/* Grade and learning model: in the text on phones, over the image from 640px. */}
        <div className="mb-1.5 flex flex-wrap items-start gap-1.5 sm:absolute sm:inset-x-3 sm:top-3 sm:mb-0 sm:flex-nowrap sm:justify-between sm:gap-2">
          {gradeLabel && (
            <span className="rounded-full bg-[#FFF5F2] px-2.5 py-0.5 text-xs font-bold text-gray-800 sm:bg-white sm:px-3 sm:py-1 sm:shadow-sm">
              {gradeLabel}
            </span>
          )}
          {displayLearningModel(course.learningModel) && (
            <span className="rounded-full bg-[#FFF5F2] px-2.5 py-0.5 text-xs font-bold text-gray-800 sm:bg-white sm:px-3 sm:py-1 sm:shadow-sm">
              {displayLearningModel(course.learningModel)}
            </span>
          )}
        </div>

        {isDisplayable(course.subject) && (
          <span className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500 sm:mb-2">
            {course.subject}
          </span>
        )}
        {course.programType && (
          <span className="mb-2 hidden text-xs font-bold uppercase tracking-wide text-[#E8401C] sm:block">
            {course.programType}
          </span>
        )}
        {/* Course titles are product names and stay in English in the Hindi view. */}
        <h2
          className="line-clamp-2 text-base font-black leading-snug text-gray-900 sm:text-lg sm:leading-normal"
          data-translate="no"
        >
          {course.title}
        </h2>
        {course.shortDescription && (
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-gray-600">
            {course.shortDescription}
          </p>
        )}

        {/* Footer: pinned to the bottom of the card, so the details line up across a row of
            cards and always keep a fixed gap above the button. Each detail has a fixed slot:
            age group left and duration right; level left and language right; lessons. */}
        <div className="mt-auto pt-2 sm:pt-5">
          {(ageGroup || duration || levelLabel || language || lessons) && (
            <dl className="grid grid-cols-1 gap-y-1 text-xs text-gray-600 sm:mb-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2 max-sm:[&>div:empty]:hidden">
              {(ageGroup || duration) && (
                <>
                  <CardDetail icon={Users} label="Age group" value={ageGroup} />
                  <CardDetail icon={Clock3} label="Duration" value={duration} />
                </>
              )}
              {(levelLabel || language) && (
                <>
                  <CardDetail icon={GraduationCap} label="Level" value={levelLabel} />
                  <CardDetail icon={Languages} label="Language" value={language} />
                </>
              )}
              {lessons && (
                <>
                  <CardDetail icon={ListChecks} label="Lessons" value={lessons} />
                  <div aria-hidden="true" />
                </>
              )}
            </dl>
          )}
          <span className="hidden min-h-11 w-full items-center sm:flex justify-center rounded-full border border-[#E8401C] px-5 py-3 text-sm font-bold text-[#E8401C] transition-colors group-hover:bg-[#E8401C] group-hover:text-white">
            View Course{" "}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
