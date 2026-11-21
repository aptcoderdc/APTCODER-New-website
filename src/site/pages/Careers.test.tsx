import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { pageHref, pagePaths, sectionIds } from "@/site/page";
import { CONTACT_EMAIL } from "@/site/data/contact";
import { applyHref, CAREERS_INTEREST_HREF, jobOpenings } from "@/site/data/careers";
import {
  catalogueCourses,
  emptyCatalogueFilters,
  matchesCatalogueFilters,
} from "@/site/data/courseCatalogue";
import { parseCatalogueSearch, serializeCatalogueSearch } from "@/site/data/catalogueSearch";
import { LanguageProvider } from "@/site/components/LanguageContext";
import { KccJoinProvider } from "@/site/components/kcc/KccContext";
import Footer from "@/site/components/Footer";
import Navbar from "@/site/components/Navbar";
import CareersPage from "./CareersPage";

vi.mock("@/site/api/kcc", () => ({ submitKccRegistration: vi.fn() }));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useLocation: () => ({ pathname: "/", hash: "" }),
}));

const withProviders = (ui: React.ReactNode) =>
  render(
    <LanguageProvider>
      <KccJoinProvider>{ui}</KccJoinProvider>
    </LanguageProvider>,
  );

describe("subject multi-select", () => {
  it("reads and writes several subjects in the URL, ignoring unknown ones", () => {
    const filters = parseCatalogueSearch({ subject: "Python,web development,Robotics" });
    expect(filters.subjects).toEqual(["Python", "Web Development"]);
    expect(serializeCatalogueSearch(filters)).toEqual({ subject: "Python,Web Development" });
  });

  it("matches courses in any selected subject, together with other filters", () => {
    const filters = { ...emptyCatalogueFilters, subjects: ["Python", "Web Development"] };
    const matched = catalogueCourses.filter((c) => matchesCatalogueFilters(c, filters));
    const expected = catalogueCourses.filter((c) =>
      ["Python", "Web Development"].includes(c.subject ?? ""),
    );
    expect(matched).toEqual(expected);
    expect(matched).toHaveLength(18);
    const selfLearning = catalogueCourses.filter((c) =>
      matchesCatalogueFilters(c, { ...filters, models: ["Self Learning (SL)"] }),
    );
    expect(selfLearning.map((c) => c.id)).toEqual(["CRS-095", "CRS-096", "CRS-097", "CRS-098"]);
  });

  it("opens old category links with the subjects that category used to contain", () => {
    expect(parseCatalogueSearch({ category: "ai-data-science,python" }).subjects).toEqual([
      "AI & ML",
      "Data Science",
      "Python",
    ]);
    expect(serializeCatalogueSearch(parseCatalogueSearch({ category: "vernatics" }))).toEqual({
      subject: "Vernatics (Robotics)",
    });
  });
});

describe("Careers", () => {
  it("is the last item in the header, after Contact Us", () => {
    const navigate = vi.fn();
    withProviders(<Navbar currentPage="home" navigate={navigate} />);
    // Header items are links (crawlable), in this order.
    const labels = screen
      .getAllByRole("link")
      .map((b) => b.textContent?.trim())
      .filter((t) => ["Courses", "School", "About", "Contact Us", "Careers"].includes(t ?? ""));
    expect(labels.slice(0, 5)).toEqual(["Courses", "School", "About", "Contact Us", "Careers"]);
    expect(screen.queryByText("Work with Us")).toBeNull();
    fireEvent.click(screen.getAllByRole("link", { name: "Careers" })[0]!);
    expect(navigate).toHaveBeenCalledWith("careers", undefined);
  });

  it("is in the footer's Company column", () => {
    const navigate = vi.fn();
    withProviders(<Footer navigate={navigate} />);
    expect(screen.queryByText("Work with Us")).toBeNull();
    const company = within(screen.getByRole("heading", { name: "Company" }).parentElement!);
    const link = company.getByRole("link", { name: "Careers" });
    expect(link).toHaveAttribute("href", pageHref("careers"));
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith("careers", undefined);
  });

  it("shows a no-open-positions message and lists no roles while there are none", () => {
    const { container } = render(<CareersPage navigate={vi.fn()} />);
    expect(pagePaths.careers).toBe("/careers");
    expect(jobOpenings).toEqual([]);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId("no-openings")).toHaveTextContent(/no open positions/i);
    expect(screen.queryByTestId("job-openings")).toBeNull();
    expect(container.querySelector(`#${sectionIds.openPositions}`)).not.toBeNull();
    expect(container.querySelector(`a[href="${CAREERS_INTEREST_HREF}"]`)).not.toBeNull();
    expect(CAREERS_INTEREST_HREF).toContain(`mailto:${CONTACT_EMAIL}`);
    // The old collaboration content is gone.
    expect(container.textContent).not.toMatch(/mentor|content creator|partners & organisations/i);
  });

  it("lists roles with an Apply email once openings are added", () => {
    const job = { id: "test-role", title: "Test Role", location: "Noida", summary: "About it." };
    render(<CareersPage navigate={vi.fn()} openings={[job]} />);
    expect(screen.queryByTestId("no-openings")).toBeNull();
    const apply = screen.getByRole("link", { name: "Apply for Test Role" });
    expect(apply).toHaveAttribute("href", applyHref(job));
    expect(apply.getAttribute("href")).toContain(encodeURIComponent("Application: Test Role"));
  });

  it("shows values and why join, without unconfirmed employment benefits", () => {
    const { container } = render(<CareersPage navigate={vi.fn()} />);
    expect(screen.queryByRole("heading", { name: "What We Do" })).toBeNull();
    for (const value of ["Purpose-Driven Work", "Innovation & Curiosity", "Continuous Learning"]) {
      expect(screen.getByRole("heading", { name: value })).toBeInTheDocument();
    }
    expect(screen.queryByRole("heading", { name: /Where Education Meets/ })).toBeNull();
    expect(screen.getByRole("heading", { name: "Why Join APTCODER" })).toBeInTheDocument();
    expect(container.textContent).not.toMatch(
      /insurance|paid leave|bonus|allowance|remote|work from home|salary|stipend/i,
    );
  });

  it("scrolls both open-positions links smoothly to the Open Positions section on this page", () => {
    const navigate = vi.fn();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const { container } = render(<CareersPage navigate={navigate} />);
    const section = container.querySelector(`#${sectionIds.openPositions}`)!;
    expect(section).toHaveTextContent(/no open positions/i);
    const links = [
      screen.getByRole("link", { name: "View Open Positions" }),
      screen.getByRole("link", { name: /Ready to join us/ }),
    ];
    for (const link of links) {
      expect(link).toHaveAttribute("href", pageHref("careers", sectionIds.openPositions));
      expect(link).not.toHaveAttribute("target");
      scrollIntoView.mockClear();
      const notPrevented = fireEvent.click(link);
      expect(notPrevented).toBe(false);
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView.mock.instances[0]).toBe(section);
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    }
    expect(navigate).not.toHaveBeenCalled();
  });
});
