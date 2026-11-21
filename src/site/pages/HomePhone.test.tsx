import { fireEvent, render, screen } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "@/site/components/LanguageContext";
import { KccJoinProvider } from "@/site/components/kcc/KccContext";
import { siteWideFaqs } from "@/site/data/siteFaqs";
import HomePage from "./HomePage";

class IdleObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

/** Phones fold some homepage detail away (Tailwind max-sm:hidden); wider screens show it all. */
describe("homepage on phones", () => {
  afterEach(() => vi.unstubAllGlobals());

  const renderHome = async () => {
    vi.stubGlobal("IntersectionObserver", IdleObserver);
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    const rootRoute = createRootRoute({
      component: () => (
        <LanguageProvider>
          <KccJoinProvider>
            <HomePage navigate={vi.fn()} />
          </KccJoinProvider>
        </LanguageProvider>
      ),
    });
    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1 });
  };

  it("shows five FAQs, then every question after Show all", async () => {
    await renderHome();
    const question = (q: string) => screen.getByText(q).closest(".faq-item")!;
    expect(question(siteWideFaqs[4]!.q)).not.toHaveClass("max-sm:hidden");
    expect(question(siteWideFaqs[5]!.q)).toHaveClass("max-sm:hidden");
    fireEvent.click(
      screen.getByRole("button", { name: `Show all ${siteWideFaqs.length} questions +` }),
    );
    expect(question(siteWideFaqs[siteWideFaqs.length - 1]!.q)).not.toHaveClass("max-sm:hidden");
  });

  it("folds example projects until asked for", async () => {
    await renderHome();
    const examples = screen.getByText("EXAMPLE PROJECTS");
    expect(examples).toHaveClass("max-sm:hidden");
    const toggle = screen.getByRole("button", { name: "See example projects & courses +" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(examples).not.toHaveClass("max-sm:hidden");
    expect(screen.getByRole("button", { name: "Show less −" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
