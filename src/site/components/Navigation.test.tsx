import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { pageHref, pagePaths, sectionIds } from "@/site/page";
import { CODELY_PORTAL_URL } from "@/site/data/contact";
import { LanguageProvider } from "./LanguageContext";
import { KccJoinProvider } from "./kcc/KccContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SchoolPage from "../pages/SchoolPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

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

const column = (name: string) => within(screen.getByRole("heading", { name }).parentElement!);

describe("footer links", () => {
  it.each([
    ["Our Offerings", "Our Courses", "courses", undefined],
    ["Our Offerings", "Vernatics (Robotics)", "vernatics", undefined],
    ["Our Offerings", "C-NAT Olympiad", "cnat", undefined],
    ["Our Offerings", "School Partnership", "school", undefined],
    ["Company", "About Us", "about", undefined],
    ["Company", "Our Team", "about", sectionIds.meetOurTeam],
    ["Company", "Partner With Us", "contact", sectionIds.contactForm],
    ["Company", "Contact Us", "contact", undefined],
  ] as const)("%s → %s goes to %s %s", (col, label, page, section) => {
    const navigate = vi.fn();
    withProviders(<Footer navigate={navigate} />);
    const link = column(col).getByRole("link", { name: label });
    expect(link).toHaveAttribute("href", pageHref(page, section));
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith(page, section);
  });

  it("opens the KCC registration popup from Kids Coding Community", () => {
    withProviders(<Footer navigate={vi.fn()} />);
    fireEvent.click(column("Our Offerings").getByRole("button", { name: "Kids Coding Community" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Become a KCC Member");
  });

  it("opens the legal pages and Codely in new tabs", () => {
    withProviders(<Footer navigate={vi.fn()} />);
    for (const [name, href] of [
      ["Privacy Policy", pagePaths.privacy],
      ["Terms & Conditions", pagePaths.terms],
      [/Codely Platform/, CODELY_PORTAL_URL],
    ] as const) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("has no placeholder links and no association line", () => {
    const { container } = withProviders(<Footer navigate={vi.fn()} />);
    for (const a of container.querySelectorAll("a"))
      expect(a.getAttribute("href"), a.textContent ?? "").not.toMatch(/^#?$/);
    expect(container.textContent).not.toContain("Supported & Associated with");
    expect(screen.queryByText("School Programs")).toBeNull();
  });
});

describe("navbar", () => {
  it("search opens the course search; Sign In and Join for Free open the platform in a new tab", () => {
    const navigate = vi.fn();
    withProviders(<Navbar currentPage="home" navigate={navigate} />);
    fireEvent.click(screen.getByRole("button", { name: "Search courses" }));
    expect(navigate).toHaveBeenCalledWith("courses", sectionIds.courseSearch);
    const signIn = screen.getByRole("link", { name: "Sign In" });
    expect(signIn).toHaveAttribute(
      "href",
      "https://coding.app.staging.platform.aptcoder.com/login",
    );
    expect(signIn).toHaveAttribute("target", "_blank");
    expect(signIn).toHaveAttribute("rel", "noopener noreferrer");
    const join = screen.getByRole("link", { name: "Join for Free" });
    expect(join).toHaveAttribute("href", "https://coding.app.staging.platform.aptcoder.com/signup");
    expect(join).toHaveAttribute("target", "_blank");
    expect(join).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses the same destinations in the mobile menu", () => {
    withProviders(<Navbar currentPage="home" navigate={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = within(screen.getByRole("dialog", { name: "Menu" }));
    expect(menu.getByRole("link", { name: "Sign In" })).toHaveAttribute(
      "href",
      "https://coding.app.staging.platform.aptcoder.com/login",
    );
    expect(menu.getByRole("link", { name: "Join for Free" })).toHaveAttribute(
      "href",
      "https://coding.app.staging.platform.aptcoder.com/signup",
    );
  });

  it("mobile menu lists every section and closes when one is chosen", () => {
    const navigate = vi.fn();
    withProviders(<Navbar currentPage="school" navigate={navigate} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = within(screen.getByRole("dialog", { name: "Menu" }));
    // Page items are real links (crawlable, can open in a new tab).
    expect(menu.getByRole("link", { name: /School/ })).toHaveAttribute("aria-current", "page");
    expect(menu.getByRole("link", { name: /School/ })).toHaveAttribute("href", pageHref("school"));
    fireEvent.keyDown(screen.getByRole("dialog", { name: "Menu" }), { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull();
    for (const [label, page] of [
      [/Courses/, "courses"],
      [/Vernatics/, "vernatics"],
      [/C-NAT/, "cnat"],
      [/About/, "about"],
      [/Contact Us/, "contact"],
      [/Careers/, "careers"],
    ] as const) {
      fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
      fireEvent.click(
        within(screen.getByRole("dialog", { name: "Menu" })).getByRole("link", { name: label }),
      );
      expect(navigate).toHaveBeenLastCalledWith(page, undefined);
      expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull();
    }
  });

  it("mobile menu search goes to the course search", () => {
    const navigate = vi.fn();
    withProviders(<Navbar currentPage="home" navigate={navigate} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(
      within(screen.getByRole("dialog", { name: "Menu" })).getByRole("button", {
        name: "Search courses",
      }),
    );
    expect(navigate).toHaveBeenCalledWith("courses", sectionIds.courseSearch);
  });

  it("mobile menu opens the KCC popup", () => {
    withProviders(<Navbar currentPage="home" navigate={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(
      within(screen.getByRole("dialog", { name: "Menu" })).getByRole("button", {
        name: /Kids Coding Community/,
      }),
    );
    expect(screen.getByRole("dialog")).toHaveTextContent("Become a KCC Member");
  });
});

describe("header links", () => {
  it("are real links to each page that still navigate inside the site", () => {
    const navigate = vi.fn();
    withProviders(<Navbar currentPage="about" navigate={navigate} />);
    const about = screen.getByRole("link", { name: "About" });
    expect(about).toHaveAttribute("href", pageHref("about"));
    expect(about).toHaveAttribute("aria-current", "page");
    fireEvent.click(about);
    expect(navigate).toHaveBeenCalledWith("about", undefined);
    expect(screen.getByRole("link", { name: "APTCODER home" })).toHaveAttribute(
      "href",
      pageHref("home"),
    );
  });
});

describe("section targets and page buttons", () => {
  it("About has the Meet Our Team section and Contact has the contact form", () => {
    const { container, unmount } = withProviders(<AboutPage navigate={vi.fn()} />);
    expect(container.querySelector(`#${sectionIds.meetOurTeam}`)).toHaveTextContent(
      "Meet Our Team",
    );
    unmount();
    const contact = withProviders(<ContactPage navigate={vi.fn()} />);
    expect(contact.container.querySelector(`#${sectionIds.contactForm}`)).toHaveTextContent(
      "Send Us a Message",
    );
  });

  it("School page Partner with Us buttons go to the contact form", () => {
    const navigate = vi.fn();
    withProviders(<SchoolPage navigate={navigate} />);
    const buttons = screen.getAllByRole("button", { name: "Partner with Us →" });
    expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      fireEvent.click(button);
      expect(navigate).toHaveBeenLastCalledWith("contact", sectionIds.contactForm);
    }
    expect(screen.queryByText(/View Detailed Process/)).toBeNull();
  });
});
