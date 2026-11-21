import { describe, expect, it } from "vitest";
import { absoluteUrl, pageHead, SITE_URL } from "./seo";
import { catalogueCourses } from "./data/courseCatalogue";
import { courseHead } from "@/routes/courses/$slug";
import { sitePages } from "../../scripts/site-pages.mjs";

const metaContent = (head: ReturnType<typeof pageHead>, key: string) =>
  (head.meta as Record<string, string>[]).find((m) => m["name"] === key || m["property"] === key)?.[
    "content"
  ];

describe("page head tags", () => {
  it("uses the address GitHub Pages serves (folders end in /) as the canonical", () => {
    expect(absoluteUrl("/")).toBe(`${SITE_URL}/`);
    expect(absoluteUrl("/school")).toBe(`${SITE_URL}/school/`);
    expect(absoluteUrl("/courses?subject=Python")).toBe(`${SITE_URL}/courses/`);
    expect(absoluteUrl("/images/brand/og-image.jpg")).toBe(`${SITE_URL}/images/brand/og-image.jpg`);
  });

  it("gives every page a title, description, canonical, social tags and robots", () => {
    const head = pageHead({ path: "/school", title: "T", description: "D" });
    expect(head.links).toEqual([{ rel: "canonical", href: `${SITE_URL}/school/` }]);
    expect(metaContent(head, "og:url")).toBe(`${SITE_URL}/school/`);
    expect(metaContent(head, "og:image")).toMatch(/^https:\/\/.+\.jpg$/);
    expect(metaContent(head, "twitter:card")).toBe("summary_large_image");
    expect(metaContent(head, "robots")).toMatch(/^index, follow/);
    expect(
      metaContent(pageHead({ path: "/x", title: "T", description: "D", noindex: true }), "robots"),
    ).toBe("noindex, follow");
  });

  it("writes structured data that cannot close its script tag", () => {
    const head = pageHead({
      path: "/",
      title: "T",
      description: "D",
      jsonLd: [{ "@type": "Thing", name: "</script><b>" }],
    });
    const [script] = head.scripts;
    expect(script?.type).toBe("application/ld+json");
    expect(script?.children).not.toContain("</script>");
    expect(JSON.parse(script!.children).name).toBe("</script><b>");
  });
});

describe("course page head tags", () => {
  it("gives every course its own title and description", () => {
    const heads = catalogueCourses.map((course) => courseHead(course));
    const titles = heads.map((head) => metaContent(head, "og:title"));
    const descriptions = heads.map((head) => metaContent(head, "description"));
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("includes Course and breadcrumb structured data", () => {
    const head = courseHead(catalogueCourses[0]!);
    const types = head.scripts.map((script) => JSON.parse(script.children)["@type"]);
    expect(types).toEqual(["Course", "BreadcrumbList"]);
  });
});

describe("site page list (pre-render and sitemap)", () => {
  it("lists every course page once and keeps unapproved courses out of the sitemap", () => {
    const pages = sitePages();
    const paths = pages.map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const course of catalogueCourses) {
      const page = pages.find((p) => p.path === `/courses/${course.routeSlug}`);
      expect(page, course.routeSlug).toBeDefined();
      expect(page!.indexable).toBe(course.offeringApproved);
    }
    expect(pages.filter((page) => page.indexable).map((page) => page.path)).toContain("/");
  });
});
