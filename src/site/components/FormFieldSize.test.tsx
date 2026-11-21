import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "@/site/components/LanguageContext";
import { FIELD_TEXT } from "./formFieldStyles";
import ContactPage from "@/site/pages/ContactPage";
import SchoolSalesKit from "./SchoolSalesKit";
import RecordedClassLead from "./RecordedClassLead";
import FreeClassModal from "./freeClass/FreeClassModal";
import KccJoinModal from "./kcc/KccJoinModal";

/**
 * Every typed field on the site must be 16px on phones: iOS Safari zooms the page in when a
 * field under 16px is focused. The spam-trap field ("website") is hidden and skipped.
 */
function expectPhoneSizedFields(root: HTMLElement) {
  const fields = [...root.querySelectorAll("input, select, textarea")].filter(
    (field) =>
      field.getAttribute("name") !== "website" &&
      !["radio", "checkbox", "hidden", "submit"].includes(field.getAttribute("type") ?? ""),
  );
  expect(fields.length).toBeGreaterThan(0);
  for (const field of fields) {
    for (const token of FIELD_TEXT.split(" ")) expect(field).toHaveClass(token);
  }
}

describe("form fields on phones", () => {
  it("Contact form", () => {
    const { container } = render(
      <LanguageProvider>
        <ContactPage navigate={vi.fn()} />
      </LanguageProvider>,
    );
    expectPhoneSizedFields(container.querySelector("form")!);
  });

  it("School Sales Kit", () => {
    render(<SchoolSalesKit />);
    fireEvent.click(screen.getByRole("button", { name: "Get School Sales Kit" }));
    expectPhoneSizedFields(screen.getByRole("dialog"));
  });

  it("Free recorded class", () => {
    render(<RecordedClassLead />);
    fireEvent.click(screen.getByRole("button", { name: /Get a Free Recorded Class/ }));
    expectPhoneSizedFields(screen.getByRole("dialog"));
  });

  it("Book a Free Class", () => {
    render(<FreeClassModal open onOpenChange={() => {}} />);
    expectPhoneSizedFields(screen.getByRole("dialog"));
  });

  it("Join KCC", () => {
    render(<KccJoinModal open onOpenChange={() => {}} />);
    expectPhoneSizedFields(screen.getByRole("dialog"));
  });
});
