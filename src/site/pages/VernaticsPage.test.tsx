import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { pagePaths } from "@/site/page";
import VernaticsPage, { VERNATICS_PORTAL_SRC } from "./VernaticsPage";

class IdleObserver {
  observe() {}
  disconnect() {}
}

describe("Vernatics page", () => {
  afterEach(() => vi.unstubAllGlobals());

  // The page contains router links, so it renders inside a minimal router.
  const renderPage = async () => {
    vi.stubGlobal("IntersectionObserver", IdleObserver);
    const navigate = vi.fn();
    const rootRoute = createRootRoute({ component: () => <VernaticsPage navigate={navigate} /> });
    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ["/vernatics"] }),
    });
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1 });
    return navigate;
  };

  it("is registered at /vernatics", () => {
    expect(pagePaths.vernatics).toBe("/vernatics");
  });

  it("shows the hero with the highlighted heading and the robot video", async () => {
    await renderPage();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Meet Your First Coding Robot.");
    expect(h1.querySelector("span")).toHaveTextContent("Coding Robot.");
    const video = screen.getByTestId("vernatics-video") as HTMLVideoElement;
    expect(video.muted && video.loop && video.hasAttribute("playsinline")).toBe(true);
  });

  it("has working buttons", async () => {
    const navigate = await renderPage();
    // Start Learning opens the catalogue with the Vernatics category selected.
    expect(screen.getByRole("link", { name: "Start Learning →" })).toHaveAttribute(
      "href",
      "/courses?subject=Vernatics+%28Robotics%29",
    );
    fireEvent.click(screen.getByRole("button", { name: "Explore APTCODER Classes →" }));
    expect(navigate).toHaveBeenLastCalledWith("courses");
    const features = screen.getByRole("link", { name: "Explore Its Features" });
    const target = features.getAttribute("href")!.slice(1);
    expect(document.getElementById(target)).toHaveTextContent("What Can Children Explore?");
  });

  it("shows the three experience cards, four explore cards and three steps", async () => {
    await renderPage();
    for (const text of [
      "CODE",
      "CONTROL",
      "CREATE",
      "Make It Move",
      "See It Sense",
      "Bring It to Life",
      "Experiment & Discover",
      "Discover",
      "Program",
      "Experiment",
    ]) {
      expect(screen.getByRole("heading", { name: text })).toBeInTheDocument();
    }
  });
});

describe("Vernatics page images and portal", () => {
  afterEach(() => vi.unstubAllGlobals());

  const renderPage = async () => {
    vi.stubGlobal("IntersectionObserver", IdleObserver);
    const rootRoute = createRootRoute({ component: () => <VernaticsPage navigate={vi.fn()} /> });
    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ["/vernatics"] }),
    });
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1 });
  };

  it("shows the whole robot photo instead of cropping it", async () => {
    await renderPage();
    const photo = screen.getByRole("img", { name: /robot on a table/ });
    expect(photo.className).not.toMatch(/object-cover|aspect-\[4\/5\]/);
    expect(photo.className).toContain("aspect-video");
  });

  it("presents the portal screenshot, its seven features and three coding levels", async () => {
    await renderPage();
    expect(screen.getByRole("heading", { name: "Key Features at a Glance" })).toBeInTheDocument();
    const shot = screen.getByRole("img", { name: /Vernatics portal/ });
    expect(shot).toHaveAttribute("src", VERNATICS_PORTAL_SRC);
    expect(VERNATICS_PORTAL_SRC).toBe("/images/vernatics_portal.jpeg");
    expect(existsSync(resolve(__dirname, "../../../public/images/vernatics_portal.jpeg"))).toBe(
      true,
    );
    expect(shot.className).not.toMatch(/object-cover/);
    for (const feature of [
      "Instructions",
      "Run",
      "Blocks",
      "Link",
      "Share Access",
      "Download",
      "Reset WiFi",
    ]) {
      expect(screen.getByRole("heading", { name: feature })).toBeInTheDocument();
    }
    for (const [name, level] of [
      ["Robo Star", "Simple Level"],
      ["Robo Orbit", "Moderate Level"],
      ["Robo Galaxy", "Tough Level"],
    ] as const) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
      expect(screen.getByText(level)).toBeInTheDocument();
    }
  });
});

describe("homepage Vernatics panel", () => {
  it("links Explore Vernatics to the new page and drops Watch it in action", () => {
    const home = readFileSync(resolve(__dirname, "HomePage.tsx"), "utf8");
    expect(home).toMatch(/navigate\("vernatics"\)\}[\s\S]{0,200}Explore Vernatics →/);
    expect(home).not.toContain("Watch it in action");
  });
});

describe("Vernatics page on phones", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("folds the portal features after four, with a button that shows the rest", async () => {
    vi.stubGlobal("IntersectionObserver", IdleObserver);
    const rootRoute = createRootRoute({ component: () => <VernaticsPage navigate={vi.fn()} /> });
    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ["/vernatics"] }),
    });
    render(<RouterProvider router={router} />);
    const list = await screen.findByRole("list", { name: "Portal features" });
    const folded = () => [...list.children].filter((li) => li.className.includes("max-sm:hidden"));
    expect(folded()).toHaveLength(list.children.length - 4);
    fireEvent.click(screen.getByRole("button", { name: /Show all \d+ features/ }));
    expect(folded()).toHaveLength(0);
    expect(screen.queryByRole("button", { name: /Show all \d+ features/ })).toBeNull();
  });
});
