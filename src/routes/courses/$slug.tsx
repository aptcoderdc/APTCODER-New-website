import { createFileRoute, notFound } from "@tanstack/react-router";
import CourseDetailPage from "@/site/pages/CourseDetailPage";
import {
  catalogueCourses,
  formatCourseGrades,
  getCatalogueCourseByRouteSlug,
  type CourseRecord,
} from "@/site/data/courseCatalogue";
import { breadcrumbJsonLd, pageHead, SITE_NAME, SITE_URL } from "@/site/seo";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCatalogueCourseByRouteSlug(params.slug);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData: course }) => (course ? courseHead(course) : {}),
  component: CourseDetailRoute,
});

function CourseDetailRoute() {
  return <CourseDetailPage course={Route.useLoaderData()} />;
}

const shown = (value: string | null | undefined) =>
  value && value.trim().toLocaleLowerCase() !== "not specified" ? value.trim() : undefined;

/**
 * Head tags for a course page. Several courses share a title ("Coding Fundamentals" for each
 * grade), so the grade is added to the page title, and the description is built from the
 * course's own details when the workbook has no written description.
 */
export function courseHead(course: CourseRecord) {
  const grades = formatCourseGrades(course);
  const subject = shown(course.subject);
  // When another course has the same name and grades (e.g. an English and a Hindi version),
  // the language and learning model keep each page title unique.
  const twins = catalogueCourses.filter(
    (other) =>
      other.id !== course.id &&
      other.title === course.title &&
      formatCourseGrades(other) === grades,
  );
  const model = shown(course.learningModel)?.replace(/\s*\([^)]*\)/g, "");
  const qualifiers = [grades, ...(twins.length ? [shown(course.language), model] : [])].filter(
    Boolean,
  );
  const title =
    course.seoTitle ||
    `${course.title}${qualifiers.length ? ` (${qualifiers.join(", ")})` : ""} — ${SITE_NAME}`;
  const facts = [
    grades,
    shown(course.ageGroup),
    shown(course.duration),
    shown(course.language) && `in ${shown(course.language)}`,
  ].filter(Boolean);
  const description =
    course.seoDescription ||
    course.shortDescription ||
    `${course.title}: ${subject ? `a ${subject} ` : "a "}${
      course.programType?.toLocaleLowerCase() ?? "course"
    } from ${SITE_NAME}${facts.length ? ` (${facts.join(", ")})` : ""}. Book a free class to get started.`;
  const path = `/courses/${course.routeSlug}`;
  return pageHead({
    path,
    title,
    description,
    // Courses are indexed only once approved for the website (offeringApproved).
    noindex: !course.offeringApproved,
    image: course.thumbnailUrl
      ? { url: course.thumbnailUrl, width: 1280, height: 720, alt: course.title }
      : undefined,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description,
        url: `${SITE_URL}${path}/`,
        ...(subject ? { about: subject } : {}),
        ...(shown(course.language) ? { inLanguage: shown(course.language) } : {}),
        ...(course.thumbnailUrl ? { image: `${SITE_URL}${course.thumbnailUrl}` } : {}),
        provider: { "@type": "Organization", name: SITE_NAME, sameAs: `${SITE_URL}/` },
      },
      breadcrumbJsonLd([
        { name: "Courses", path: "/courses" },
        { name: course.title, path },
      ]),
    ],
  });
}
