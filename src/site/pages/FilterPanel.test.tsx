import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { emptyCatalogueFilters, type CourseRecord } from "@/site/data/courseCatalogue";
import { FilterPanel } from "./CoursesPage";

const sampleCourses: CourseRecord[] = [
  {
    id: "one",
    title: "Live Python",
    slug: "live-python",
    routeSlug: "live-python",
    catalogueInclusion: "intended",
    offeringApproved: true,
    subject: "Python",
    programType: "Course",
    learningModel: "Live",
    level: "Easy",
    language: "English",
    lessons: 8,
    gradeFrom: 4,
    gradeTo: 6,
    duration: "12 weeks",
    shortDescription: "A test course.",
    overview: "Test overview.",
    learningOutcomes: ["Build", "Create", "Debug", "Share"],
    thumbnailReady: true,
    thumbnailUrl: null,
    enrolCta: "Book a Free Class",
  },
  {
    id: "two",
    title: "Assisted Python",
    slug: "assisted-python",
    routeSlug: "assisted-python",
    catalogueInclusion: "intended",
    offeringApproved: true,
    subject: "Python",
    programType: "Camp",
    learningModel: "Assisted Learning (AL)",
    level: "All Levels",
    language: "Hindi",
    lessons: 5,
    gradeFrom: 6,
    gradeTo: 8,
    duration: "5 weeks",
    shortDescription: "Another test course.",
    overview: "Test overview.",
    learningOutcomes: ["Build", "Create", "Debug", "Share"],
    thumbnailReady: true,
    thumbnailUrl: null,
    enrolCta: "Book a Free Class",
  },
];

function groupTitles() {
  return [...document.querySelectorAll("summary")].map((summary) =>
    (summary.textContent ?? "").replace("−", "").trim(),
  );
}

describe("catalogue filter controls", () => {
  it("reports counts and sends checkbox state changes to its caller", () => {
    const onChange = vi.fn();
    render(
      <FilterPanel
        filters={emptyCatalogueFilters}
        courses={sampleCourses}
        onChange={onChange}
        onClear={vi.fn()}
      />,
    );

    expect(screen.getByRole("checkbox", { name: /Live/ })).toBeEnabled();
    expect(screen.getByText("Live").nextElementSibling).toHaveTextContent("1");
    // Options come from the courses themselves: nothing here is Self Learning.
    expect(screen.queryByRole("checkbox", { name: /Self Learning/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: /Live/ }));
    expect(onChange).toHaveBeenCalledWith({ ...emptyCatalogueFilters, models: ["Live"] });
  });

  it("hides groups with no known values and only lists options used in the chosen subjects", () => {
    const sparse = sampleCourses.map((course) => ({
      ...course,
      language: "Not specified",
      gradeFrom: null,
      gradeTo: null,
    }));
    const webCourse = {
      ...sampleCourses[0]!,
      id: "web",
      subject: "Web Development",
      language: "Tamil",
    };
    render(
      <FilterPanel
        filters={{ ...emptyCatalogueFilters, subjects: ["Python"] }}
        courses={[...sparse, webCourse]}
        onChange={vi.fn()}
        onClear={vi.fn()}
      />,
    );

    // Subjects are chosen in the subject bar, and there is no Level filter.
    expect(groupTitles()).toEqual(["Learning Model", "Program Type"]);
    expect(screen.queryByRole("checkbox", { name: /Tamil/ })).not.toBeInTheDocument();
  });

  it("keeps a selected value that this page does not use visible so it can be removed", () => {
    const onChange = vi.fn();
    render(
      <FilterPanel
        filters={{ ...emptyCatalogueFilters, models: ["Self Learning (SL)"] }}
        courses={sampleCourses}
        onChange={onChange}
        onClear={vi.fn()}
      />,
    );

    expect(groupTitles()).toContain("Grade");
    const selectedSelfLearning = screen.getByRole("checkbox", { name: /Self Learning/ });
    expect(selectedSelfLearning).toBeEnabled();
    fireEvent.click(selectedSelfLearning);
    expect(onChange).toHaveBeenCalledWith({
      ...emptyCatalogueFilters,
      models: [],
    });
  });

  it("wires Clear all to the page state reset", () => {
    const onClear = vi.fn();
    render(
      <FilterPanel
        filters={emptyCatalogueFilters}
        courses={sampleCourses}
        onChange={vi.fn()}
        onClear={onClear}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(onClear).toHaveBeenCalledOnce();
  });
});

describe("phone filter sheet grade chips", () => {
  it("shows grades as tappable chips that still behave as checkboxes", () => {
    const onChange = vi.fn();
    const { container } = render(
      <FilterPanel
        filters={emptyCatalogueFilters}
        courses={sampleCourses}
        onChange={onChange}
        onClear={vi.fn()}
        gradeChips
      />,
    );
    const chips = container.querySelectorAll('input[id^="grades-"][id$="-chip"]');
    expect(chips.length).toBeGreaterThan(0);
    // Only grades become chips; the other groups keep their checkbox rows.
    expect(screen.getByRole("checkbox", { name: /Live/ }).id).not.toMatch(/-chip$/);
    fireEvent.click(chips[0]!);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ grades: [expect.any(Number)] }),
    );
  });
});
