import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "@/site/components/LanguageContext";

const send = vi.fn();
vi.mock("@/site/api/sheetForms", async (original) => ({
  ...(await original<typeof import("@/site/api/sheetForms")>()),
  sendToSheet: (...args: unknown[]) => send(...args),
}));

const { default: ContactPage } = await import("@/site/pages/ContactPage");
const { default: SchoolSalesKit } = await import("./SchoolSalesKit");
const { default: RecordedClassLead } = await import("./RecordedClassLead");

afterEach(() => send.mockReset());

describe("Contact form", () => {
  const fill = () => {
    fireEvent.change(screen.getByPlaceholderText("Your full name"), {
      target: { value: "Ravi Verma" },
    });
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), {
      target: { value: "ravi@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("+91 00000 00000"), {
      target: { value: "+91 98765 12345" },
    });
    const [role, topic] = screen.getAllByRole("combobox");
    fireEvent.change(role!, { target: { value: "Parent" } });
    fireEvent.change(topic!, { target: { value: "Course Information" } });
    fireEvent.change(screen.getByPlaceholderText("Tell us how we can help..."), {
      target: { value: "Which course suits Grade 6?" },
    });
  };
  const renderPage = () =>
    render(
      <LanguageProvider>
        <ContactPage navigate={vi.fn()} />
      </LanguageProvider>,
    );

  it("sends the message to the sheet and thanks the visitor only after it was saved", async () => {
    send.mockResolvedValue({ ok: true });
    renderPage();
    fill();
    fireEvent.click(screen.getByRole("button", { name: /Send Message/ }));
    expect(await screen.findByText("Message sent. Thank you!")).toBeInTheDocument();
    expect(send).toHaveBeenCalledWith(
      "contact",
      {
        fullName: "Ravi Verma",
        email: "ravi@example.com",
        phone: "+91 98765 12345",
        role: "Parent",
        topic: "Course Information",
        message: "Which course suits Grade 6?",
      },
      "",
    );
  });

  it("keeps the message and offers other ways to reach APTCODER when sending fails", async () => {
    send.mockResolvedValue({ ok: false, reason: "failed" });
    renderPage();
    fill();
    fireEvent.click(screen.getByRole("button", { name: /Send Message/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn’t send your message/);
    expect(screen.queryByText("Message sent. Thank you!")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your full name")).toHaveValue("Ravi Verma");
  });
});

describe("School Sales Kit form", () => {
  const openAndFill = () => {
    render(<SchoolSalesKit />);
    fireEvent.click(screen.getByRole("button", { name: "Get School Sales Kit" }));
    const dialog = within(screen.getByRole("dialog"));
    fireEvent.change(dialog.getByLabelText(/Full name/), { target: { value: "Meera Rao" } });
    fireEvent.change(dialog.getByLabelText(/Work email/), {
      target: { value: "meera@school.example" },
    });
    fireEvent.change(dialog.getByLabelText(/School or institution/), {
      target: { value: "Sunrise Public School" },
    });
    fireEvent.change(dialog.getByLabelText(/Your role/), { target: { value: "School leader" } });
    fireEvent.click(dialog.getByRole("button", { name: /Email me the sales kit/ }));
  };

  it("shows 'Your request is in' only after the sheet saved it", async () => {
    send.mockResolvedValue({ ok: true });
    openAndFill();
    expect(await screen.findByText("Your request is in.")).toBeInTheDocument();
    expect(send).toHaveBeenCalledWith(
      "school_kit",
      {
        fullName: "Meera Rao",
        email: "meera@school.example",
        school: "Sunrise Public School",
        role: "School leader",
      },
      "",
    );
  });

  it("shows an error instead of a success message when sending fails", async () => {
    send.mockResolvedValue({ ok: false, reason: "failed" });
    openAndFill();
    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn’t send your request/);
    expect(screen.queryByText("Your request is in.")).not.toBeInTheDocument();
  });
});

describe("Free recorded class form", () => {
  const answer = () => {
    render(<RecordedClassLead />);
    fireEvent.click(screen.getByRole("button", { name: /Get a Free Recorded Class/ }));
    const dialog = within(screen.getByRole("dialog"));
    fireEvent.change(dialog.getByLabelText("Parent / Guardian Name"), {
      target: { value: "Ravi Verma" },
    });
    fireEvent.change(dialog.getByLabelText("Email Address"), {
      target: { value: "ravi@example.com" },
    });
    fireEvent.click(dialog.getByRole("button", { name: /Continue/ }));
    fireEvent.click(dialog.getByLabelText("Grade 6"));
    fireEvent.click(dialog.getByLabelText("Tried coding before"));
    fireEvent.click(dialog.getByLabelText("AI"));
    fireEvent.click(dialog.getByRole("button", { name: /Show My Free Class/ }));
  };

  it("saves the answers before showing the class", async () => {
    send.mockResolvedValue({ ok: true });
    answer();
    expect(await screen.findByText("YOUR FREE CLASS IS READY")).toBeInTheDocument();
    expect(send).toHaveBeenCalledWith(
      "recorded_class",
      {
        parentName: "Ravi Verma",
        email: "ravi@example.com",
        grade: "Grade 6",
        experience: "Tried coding before",
        interest: "AI",
      },
      "",
    );
  });

  it("stays on the questions with an error when sending fails", async () => {
    send.mockResolvedValue({ ok: false, reason: "failed" });
    answer();
    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn’t send your answers/);
    await waitFor(() => expect(screen.queryByText("YOUR FREE CLASS IS READY")).toBeNull());
  });
});
