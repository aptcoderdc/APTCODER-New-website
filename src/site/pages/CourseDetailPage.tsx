import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSiteNavigate } from "@/site/useSiteNavigate";
import {
  formatCourseGrades,
  catalogueCourses,
  type CourseRecord,
} from "@/site/data/courseCatalogue";
import CourseCard from "@/site/components/CourseCard";
import { siteWideFaqs } from "@/site/data/siteFaqs";

function actionLabel(course: CourseRecord): string | null | undefined {
  return course.enrolCta;
}

function approvedInstructor(course: CourseRecord) {
  return course.instructor?.consentToPublish ? course.instructor : undefined;
}

function approvedReviews(course: CourseRecord) {
  return (course.reviews ?? []).filter((review) => review.consentToPublish);
}

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

export default function CourseDetailPage({ course }: { course: CourseRecord }) {
  const navigate = useSiteNavigate();
  // Hide the hero image (rather than show a broken one) if its file is missing.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const instructor = approvedInstructor(course);
  const reviews = approvedReviews(course);
  const relatedCourses = useMemo(() => {
    const explicit = (course.relatedCourseIds ?? [])
      .map((id) => catalogueCourses.find((candidate) => candidate.id === id))
      .filter((candidate): candidate is CourseRecord =>
        Boolean(candidate && candidate.id !== course.id),
      );
    const sameSubject = catalogueCourses.filter(
      (candidate) => candidate.subject === course.subject && candidate.id !== course.id,
    );
    return [
      ...new Map([...explicit, ...sameSubject].map((item) => [item.id, item])).values(),
    ].slice(0, 3);
  }, [course]);

  const modules = useMemo(() => {
    const grouped = new Map<number, { title: string; lessons: CourseRecord["syllabus"] }>();
    for (const lesson of course.syllabus ?? []) {
      const group = grouped.get(lesson.moduleNumber) ?? { title: lesson.moduleTitle, lessons: [] };
      group.lessons = [...(group.lessons ?? []), lesson];
      grouped.set(lesson.moduleNumber, group);
    }
    return [...grouped.entries()].sort(([a], [b]) => a - b);
  }, [course.syllabus]);

  const gradeLabel = formatCourseGrades(course);
  const facts: [string, string][] = [
    ...(course.programType !== "Course"
      ? [["Program Type", course.programType] as [string, string]]
      : []),
    ...(isDisplayable(course.subject) ? [["Subject", course.subject] as [string, string]] : []),
    ...(gradeLabel ? [["Grade", gradeLabel] as [string, string]] : []),
    ...(isDisplayable(course.ageGroup) ? [["Age Group", course.ageGroup] as [string, string]] : []),
    ...(isDisplayable(course.duration) ? [["Duration", course.duration] as [string, string]] : []),
    ...(typeof course.lessons === "number"
      ? [["Lessons", String(course.lessons)] as [string, string]]
      : []),
    // A hand-added course's own level text (e.g. "Simple Level") when it has one.
    ...(isDisplayable(course.levelLabel ?? course.level)
      ? [["Level", (course.levelLabel ?? course.level)!] as [string, string]]
      : []),
    ...(isDisplayable(course.language) ? [["Language", course.language] as [string, string]] : []),
    ...(displayLearningModel(course.learningModel)
      ? [["Learning Model", displayLearningModel(course.learningModel)!] as [string, string]]
      : []),
    ...(course.certificate === "Yes - verified"
      ? [["Certificate", "Yes - verified"] as [string, string]]
      : []),
  ];

  return (
    <main className="pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-0 max-lg:[&_a]:inline-flex max-lg:[&_a]:min-h-11 max-lg:[&_a]:items-center lg:gap-2">
            <li>
              <Link to="/courses" className="hover:text-[#E8401C]">
                Courses
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            {isDisplayable(course.subject) && (
              <>
                <li>
                  <Link
                    to="/courses"
                    search={{ subject: course.subject }}
                    className="hover:text-[#E8401C]"
                  >
                    {course.subject}
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
              </>
            )}
            <li aria-current="page" className="font-semibold text-gray-900" data-translate="no">
              {course.title}
            </li>
          </ol>
        </nav>
      </div>

      <section className="bg-[#FFF5F2]">
        {/* From 768px the title and thumbnail sit side by side. */}
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-[1fr_0.9fr] md:items-center lg:px-8 lg:py-14">
          <div>
            {isDisplayable(course.subject) && (
              <p className="section-label mb-4">{course.subject}</p>
            )}
            <h1
              className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl"
              data-translate="no"
            >
              {course.title}
            </h1>
            {course.shortDescription && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
                {course.shortDescription}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {gradeLabel && (
                <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-800">
                  {gradeLabel}
                </span>
              )}
              {isDisplayable(course.duration) && (
                <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-800">
                  {course.duration}
                </span>
              )}
              {displayLearningModel(course.learningModel) && (
                <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-800">
                  {displayLearningModel(course.learningModel)}
                </span>
              )}
              {isDisplayable(course.levelLabel ?? course.level) && (
                <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-800">
                  {course.levelLabel ?? course.level}
                </span>
              )}
              {isDisplayable(course.language) && (
                <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-800">
                  {course.language}
                </span>
              )}
              {course.programType !== "Course" && (
                <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-800">
                  {course.programType}
                </span>
              )}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {actionLabel(course) && (
                <button
                  type="button"
                  onClick={() => navigate("contact")}
                  className="min-h-12 rounded-full bg-[#E8401C] px-7 font-bold text-white hover:bg-[#C73516]"
                >
                  {actionLabel(course)}
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate("contact")}
                className="min-h-12 rounded-full border border-gray-300 bg-white px-7 font-bold text-gray-800 hover:border-[#E8401C]"
              >
                Book a Free Class
              </button>
            </div>
          </div>
          {course.thumbnailUrl && failedSrc !== course.thumbnailUrl && (
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                width={1280}
                height={720}
                onError={() => setFailedSrc(course.thumbnailUrl ?? null)}
                className="aspect-video w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:px-8">
        <div className="space-y-10">
          <section
            aria-labelledby="course-facts-heading"
            className="rounded-2xl border border-gray-200 p-5 sm:p-6"
          >
            <h2 id="course-facts-heading" className="text-lg font-black text-gray-900">
              Course at a glance
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {label}
                  </dt>
                  <dd className="mt-1 font-bold text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {course.overview && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">Overview</h2>
              <p className="mt-3 leading-relaxed text-gray-700">{course.overview}</p>
            </section>
          )}

          {course.learningOutcomes.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">What You&apos;ll Learn</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.learningOutcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="rounded-xl bg-gray-50 p-4 leading-relaxed text-gray-700"
                  >
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {modules.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">Topics Covered</h2>
              <p className="mt-2 text-sm text-gray-600">{course.lessons} lessons</p>
              <div className="mt-4 divide-y divide-gray-200 rounded-2xl border border-gray-200">
                {modules.map(([number, module]) => (
                  <details key={number} className="p-4" open={number === modules[0]?.[0]}>
                    <summary className="cursor-pointer font-bold text-gray-900 max-lg:py-2.5">
                      Module {number}: {module.title}
                    </summary>
                    <ol className="mt-3 space-y-3 pl-5 text-sm text-gray-700">
                      {(module.lessons ?? [])
                        .sort((a, b) => a.lessonNumber - b.lessonNumber)
                        .map((lesson) => (
                          <li key={`${number}-${lesson.lessonNumber}`}>
                            <span className="font-semibold">{lesson.lessonTitle}</span>
                            <p className="mt-1 leading-relaxed text-gray-600">{lesson.outcome}</p>
                          </li>
                        ))}
                    </ol>
                  </details>
                ))}
              </div>
            </section>
          )}

          {!!course.projects?.length && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">Projects You&apos;ll Build</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {course.projects.map((project) => (
                  <article key={project.title} className="rounded-2xl border border-gray-200 p-5">
                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {project.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {course.prerequisites && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">Who It&apos;s For</h2>
              <p className="mt-3 leading-relaxed text-gray-700">{course.prerequisites}</p>
            </section>
          )}

          {course.learningModelOverview && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">How Learning Works</h2>
              <p className="mt-3 leading-relaxed text-gray-700">{course.learningModelOverview}</p>
            </section>
          )}

          {instructor && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">Instructor / Mentor</h2>
              <article className="mt-4 flex flex-col gap-4 rounded-2xl border border-gray-200 p-5 sm:flex-row">
                {instructor.photoUrl && (
                  <img
                    src={instructor.photoUrl}
                    alt={instructor.name}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-bold text-gray-900">{instructor.name}</h3>
                  <p className="text-sm text-gray-600">{instructor.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{instructor.bio}</p>
                  <p className="mt-2 text-xs text-gray-500">{instructor.languages.join(" · ")}</p>
                </div>
              </article>
            </section>
          )}

          {course.certificate === "Yes - verified" && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">Assessment and Certificate</h2>
              <p className="mt-3 text-gray-700">A certificate is available for this course.</p>
            </section>
          )}

          {reviews.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">Reviews</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {reviews.map((review, index) => (
                  <figure
                    key={`${review.reviewerName}-${index}`}
                    className="rounded-2xl bg-gray-50 p-5"
                  >
                    <blockquote className="leading-relaxed text-gray-700">
                      “{review.text}”
                    </blockquote>
                    <figcaption className="mt-4 text-sm font-bold text-gray-900">
                      {review.reviewerName}
                      <span className="font-normal text-gray-600"> · {review.relationship}</span>
                    </figcaption>
                    {review.rating && (
                      <p className="mt-1 text-xs text-gray-500">Rating: {review.rating} / 5</p>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {!!course.faqs?.length && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">FAQs</h2>
              <div className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
                {course.faqs.map((faq) => (
                  <details key={faq.question} className="py-4">
                    <summary className="cursor-pointer font-semibold text-gray-900 max-lg:py-2.5">
                      {faq.question}
                    </summary>
                    <p className="mt-3 leading-relaxed text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-black text-gray-900">More questions</h2>
            <div className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
              {siteWideFaqs.map((faq) => (
                <details key={faq.q} className="py-4">
                  <summary className="cursor-pointer font-semibold text-gray-900 max-lg:py-2.5">
                    {faq.q}
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-700">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {relatedCourses.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-gray-900">Next step</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {relatedCourses.map((related) => (
                  <CourseCard key={related.id} course={related} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Below 1024px the fixed bottom bar already shows the title and "Book a Free Class", so
            this box is hidden there unless it carries something extra (a price or an action). */}
        <aside
          className={`h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 ${
            course.priceDisplay || actionLabel(course) ? "" : "hidden lg:block"
          }`}
        >
          <h2 className="text-lg font-black text-gray-900" data-translate="no">
            {course.title}
          </h2>
          {course.priceDisplay && (
            <p className="mt-3 text-2xl font-black text-gray-900">{course.priceDisplay}</p>
          )}
          {actionLabel(course) && (
            <button
              type="button"
              onClick={() => navigate("contact")}
              className="mt-5 min-h-12 w-full rounded-full bg-[#E8401C] px-5 font-bold text-white hover:bg-[#C73516]"
            >
              {actionLabel(course)}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("contact")}
            className="mt-3 min-h-12 w-full rounded-full border border-gray-300 px-5 font-bold text-gray-800 hover:border-[#E8401C]"
          >
            Book a Free Class
          </button>
        </aside>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-3 shadow-lg lg:hidden"
        data-fixed-bottom-bar
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <span
            className="min-w-0 flex-1 truncate text-sm font-bold text-gray-900"
            data-translate="no"
          >
            {course.title}
          </span>
          <button
            type="button"
            onClick={() => navigate("contact")}
            className="min-h-11 shrink-0 rounded-full bg-[#E8401C] px-5 text-sm font-bold text-white"
          >
            Book a Free Class
          </button>
        </div>
      </div>
    </main>
  );
}
