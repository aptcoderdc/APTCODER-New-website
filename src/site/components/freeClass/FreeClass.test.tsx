import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { freeClassRequestSchema } from "@/site/data/freeClass";
import { deliverFreeClassRequest } from "@/site/api/freeClass";
import { SHEET_FORMS_URL } from "@/site/api/sheetForms";

const submit = vi.fn();
vi.mock("@/site/api/freeClass", async (original) => ({
  ...(await original<typeof import("@/site/api/freeClass")>()),
  submitFreeClassRequest: (args: unknown) => submit(args),
}));

const { default: FreeClassModal } = await import("./FreeClassModal");

const valid = {
  studentName: "Asha Verma",
  grade: "Class 6",
  parentName: "Ravi Verma",
  mobile: "+91 98765 12345",
  email: "ravi@example.com",
  city: "",
  interest: "Python",
  language: "Hindi",
  preferredTime: "Weekends",
  message: "",
  consent: true,
  website: "",
};

describe("free class validation rules", () => {
  it("needs the student, class, parent, mobile, email, language and consent; city is optional", () => {
    expect(freeClassRequestSchema.safeParse(valid).success).toBe(true);
    const result = freeClassRequestSchema.safeParse({
      ...valid,
      studentName: "",
      grade: "",
      parentName: " ",
      mobile: "12345",
      language: "",
      consent: false,
      email: "nope",
    });
    const fields = result.success ? [] : result.error.issues.map((i) => i.path[0]);
    expect(fields).toEqual(
      expect.arrayContaining([
        "studentName",
        "grade",
        "parentName",
        "mobile",
        "language",
        "consent",
        "email",
      ]),
    );
    expect(fields).not.toContain("city");
    // Email is required, so the confirmation email can always be sent.
    const noEmail = freeClassRequestSchema.safeParse({ ...valid, email: "" });
    expect(noEmail.success).toBe(false);
    expect(noEmail.success ? [] : noEmail.error.issues.map((i) => i.message)).toContain(
      "Please enter an email address.",
    );
  });
});

describe("free class delivery to the Google Sheet", () => {
  it("sends the request to the sheet's free_class tab and succeeds only when the row is saved", async () => {
    const send = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    expect(await deliverFreeClassRequest(valid, send)).toEqual({ ok: true });
    const [url, init] = send.mock.calls[0]!;
    expect(url).toBe(SHEET_FORMS_URL);
    expect(init.method).toBe("POST");
    // text/plain avoids a CORS preflight, which Apps Script cannot answer.
    expect(init.headers["content-type"]).toBe("text/plain;charset=utf-8");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ form: "free_class", lang: "en" });
    expect(body.data).toEqual({
      studentName: "Asha Verma",
      grade: "Class 6",
      parentName: "Ravi Verma",
      mobile: "+919876512345",
      email: "ravi@example.com",
      city: "",
      interest: "Python",
      language: "Hindi",
      preferredTime: "Weekends",
      message: "",
    });
  });

  it("never reports success when the sheet did not save the row", async () => {
    const send = vi.fn();
    for (const answer of [
      new Response(JSON.stringify({ ok: false, reason: "failed" }), { status: 200 }),
      new Response("<html>error</html>", { status: 200 }),
      new Response("nope", { status: 500 }),
    ]) {
      send.mockResolvedValueOnce(answer);
      expect(await deliverFreeClassRequest(valid, send)).toEqual({ ok: false, reason: "failed" });
    }
    send.mockRejectedValueOnce(new Error("offline"));
    expect(await deliverFreeClassRequest(valid, send)).toEqual({ ok: false, reason: "failed" });
  });

  it("rejects invalid data without sending it", async () => {
    const send = vi.fn();
    expect(await deliverFreeClassRequest({ ...valid, mobile: "123" }, send)).toEqual({
      ok: false,
      reason: "invalid",
    });
    expect(send).not.toHaveBeenCalled();
  });
});

describe("Book a Free Class popup", () => {
  afterEach(() => submit.mockReset());

  const fill = () => {
    const dialog = within(screen.getByRole("dialog"));
    fireEvent.change(dialog.getByLabelText(/Student’s Name/), {
      target: { value: valid.studentName },
    });
    fireEvent.change(dialog.getByLabelText(/Class\/Grade/), { target: { value: valid.grade } });
    fireEvent.change(dialog.getByLabelText(/Parent’s\/Guardian’s Name/), {
      target: { value: valid.parentName },
    });
    fireEvent.change(dialog.getByLabelText(/Mobile Number/), { target: { value: valid.mobile } });
    fireEvent.change(dialog.getByLabelText(/^Email/), { target: { value: valid.email } });
    fireEvent.change(dialog.getByLabelText(/Interested In/), { target: { value: valid.interest } });
    fireEvent.click(dialog.getByLabelText("Hindi"));
    fireEvent.change(dialog.getByLabelText(/Preferred Time/), {
      target: { value: valid.preferredTime },
    });
    fireEvent.click(dialog.getByRole("checkbox"));
    return dialog;
  };
  const send = (dialog: ReturnType<typeof within>) =>
    act(async () => fireEvent.click(dialog.getByRole("button", { name: /Request My Free Class/ })));

  it("blocks submission and explains each problem when fields are missing or invalid", async () => {
    render(<FreeClassModal open onOpenChange={() => {}} />);
    const dialog = within(screen.getByRole("dialog"));
    fireEvent.change(dialog.getByLabelText(/Mobile Number/), { target: { value: "12345" } });
    await send(dialog);
    expect(
      await dialog.findByText("Please enter a valid 10-digit Indian mobile number."),
    ).toBeInTheDocument();
    expect(dialog.getByText("Please choose the student’s class.")).toBeInTheDocument();
    expect(dialog.getByText("Please choose a class language.")).toBeInTheDocument();
    expect(dialog.getByText("Please enter an email address.")).toBeInTheDocument();
    expect(dialog.getByText(/Please agree to be contacted/)).toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
  });

  it("shows a loading state, sends once, and confirms only after delivery succeeded", async () => {
    let resolveSubmit!: (v: unknown) => void;
    submit.mockReturnValue(new Promise((r) => (resolveSubmit = r)));
    render(<FreeClassModal open onOpenChange={() => {}} />);
    const dialog = fill();
    await send(dialog);
    const sending = await dialog.findByRole("button", { name: /Sending/ });
    expect(sending).toBeDisabled();
    fireEvent.click(sending);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit.mock.calls[0]![0].data).toMatchObject({
      studentName: "Asha Verma",
      language: "Hindi",
      consent: true,
    });
    expect(screen.queryByText("Your Free Class Request Is In!")).toBeNull();
    await act(async () => resolveSubmit({ ok: true }));
    expect(await screen.findByText("Your Free Class Request Is In!")).toBeInTheDocument();
    expect(screen.getByText(/contact you on \+91 98765 12345/)).toBeInTheDocument();
  });

  it.each([
    [{ ok: false, reason: "not_configured" }, /isn’t switched on yet/],
    [{ ok: false, reason: "failed" }, /couldn’t send your request/],
  ])(
    "shows an error with a WhatsApp fallback, not a confirmation, for %o",
    async (result, message) => {
      submit.mockResolvedValue(result);
      render(<FreeClassModal open onOpenChange={() => {}} />);
      const dialog = fill();
      await send(dialog);
      const alert = await dialog.findByRole("alert");
      expect(alert).toHaveTextContent(message);
      const whatsapp = within(alert).getByRole("link", { name: /Send these details on WhatsApp/ });
      expect(decodeURIComponent(whatsapp.getAttribute("href")!)).toContain("Student: Asha Verma");
      expect(screen.queryByText("Your Free Class Request Is In!")).toBeNull();
    },
  );

  it("shows the connection error when the request itself fails", async () => {
    submit.mockRejectedValue(new Error("network"));
    render(<FreeClassModal open onOpenChange={() => {}} />);
    const dialog = fill();
    await send(dialog);
    await waitFor(() => expect(dialog.getByRole("alert")).toHaveTextContent(/couldn’t send/));
  });
});

describe("homepage Book a Free Class buttons", () => {
  it("both open the popup instead of going to Courses", () => {
    const home = readFileSync(resolve(__dirname, "../../pages/HomePage.tsx"), "utf8");
    const opens = home.match(/onClick=\{\(\) => setFreeClassOpen\(true\)\}/g) ?? [];
    expect(opens).toHaveLength(2);
    expect(home).toContain(
      "<FreeClassModal open={freeClassOpen} onOpenChange={setFreeClassOpen} />",
    );
  });
});
