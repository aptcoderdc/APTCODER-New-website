import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "./LanguageContext";
import { KccJoinProvider } from "./kcc/KccContext";
import { FreeClassProvider } from "./freeClass/FreeClassContext";
import SchoolSalesKit from "./SchoolSalesKit";
import RecordedClassLead from "./RecordedClassLead";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SwipeRow from "./SwipeRow";

vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useLocation: () => ({ pathname: "/", hash: "" }),
}));

const withProviders = (ui: React.ReactNode) =>
  render(
    <LanguageProvider>
      <KccJoinProvider>
        <FreeClassProvider>{ui}</FreeClassProvider>
      </KccJoinProvider>
    </LanguageProvider>,
  );

describe("form popups", () => {
  it.each([
    ["School Sales Kit", () => render(<SchoolSalesKit />), "Get School Sales Kit"],
    ["Free Recorded Class", () => render(<RecordedClassLead />), /Get a Free Recorded Class/],
  ] as const)("%s is a titled dialog that closes on Escape", (_name, mount, opener) => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: opener }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAccessibleName();
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("the footer's Book a Free Class opens the booking popup", () => {
    withProviders(<Footer navigate={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /Book a Free Class/ }));
    expect(screen.getByRole("dialog")).toHaveTextContent("BOOK A FREE CLASS");
  });

  it("the mobile menu's Book a Free Class closes the menu and opens the booking popup", () => {
    withProviders(<Navbar currentPage="home" navigate={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(
      within(screen.getByRole("dialog", { name: "Menu" })).getByRole("button", {
        name: /Book a Free Class/,
      }),
    );
    expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull();
    expect(screen.getByRole("dialog")).toHaveTextContent("BOOK A FREE CLASS");
  });
});

describe("SwipeRow", () => {
  it("renders every item in a labelled list that keeps the page's grid classes", () => {
    render(
      <SwipeRow
        label="Stories"
        gridClassName="grid gap-5 sm:grid-cols-2"
        items={["a", "b", "c"].map((key) => ({ key, node: <p>Card {key}</p> }))}
      />,
    );
    const list = screen.getByRole("list", { name: "Stories" });
    expect(list).toHaveClass("grid", "sm:grid-cols-2", "max-sm:flex");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });
});
