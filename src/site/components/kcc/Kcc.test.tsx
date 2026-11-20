import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { kccRegistrationSchema, normaliseIndianMobile } from "@/site/data/kcc";
import { deliverKccRegistration } from "@/site/api/kcc";
import { SHEET_FORMS_URL } from "@/site/api/sheetForms";

const submit = vi.fn();
vi.mock("@/site/api/kcc", async (original) => ({
  ...(await original<typeof import("@/site/api/kcc")>()),
  submitKccRegistration: (args: unknown) => submit(args),
}));

const { default: KccJoinModal } = await import("./KccJoinModal");

const valid = {
  studentName: "Asha Verma",
  parentName: "Ravi Verma",
  grade: "Class 6",
  school: "Test Public School",
  mobile: "+91 98765 12345",
  email: "parent@example.test",
  city: "Noida",
  consent: true,
  website: "",
};

describe("KCC validation rules", () => {
  it("accepts Indian mobile numbers written in common ways and rejects others", () => {
    for (const ok of ["9876512345", "+91 98765 12345", "0 98765-12345", "919876512345"])
      expect(normaliseIndianMobile(ok), ok).toBe("9876512345");
    for (const bad of ["12345", "5876512345", "98765123456", "abcdefghij"])
      expect(normaliseIndianMobile(bad), bad).toBeNull();
  });

  it("requires every field, a valid email and the consent box", () => {
    expect(kccRegistrationSchema.safeParse(valid).success).toBe(true);
    const result = kccRegistrationSchema.safeParse({
      ...valid,
      email: "nope",
      consent: false,
      city: " ",
    });
    expect(result.success).toBe(false);
    const fields = result.success ? [] : result.error.issues.map((i) => i.path[0]);
    expect(fields).toEqual(expect.arrayContaining(["email", "consent", "city"]));
  });
});

describe("KCC delivery to the Google Sheet", () => {
  it("sends the registration to the sheet's kcc tab and succeeds only when the row is saved", async () => {
    const send = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    expect(await deliverKccRegistration(valid, send)).toEqual({ ok: true });
    const [url, init] = send.mock.calls[0]!;
    expect(url).toBe(SHEET_FORMS_URL);
    expect(init.headers["content-type"]).toBe("text/plain;charset=utf-8");
    const body = JSON.parse(init.body);
    expect(body.form).toBe("kcc");
    expect(body.data).toMatchObject({
      studentName: "Asha Verma",
      mobile: "+919876512345",
      grade: "Class 6",
    });

    send.mockResolvedValue(new Response(JSON.stringify({ ok: false }), { status: 200 }));
    expect(await deliverKccRegistration(valid, send)).toEqual({ ok: false, reason: "failed" });
    send.mockRejectedValue(new Error("offline"));
    expect(await deliverKccRegistration(valid, send)).toEqual({ ok: false, reason: "failed" });
  });

  it("rejects invalid data without sending it", async () => {
    const send = vi.fn();
    expect(await deliverKccRegistration({ ...valid, mobile: "123" }, send)).toEqual({
      ok: false,
      reason: "invalid",
    });
    expect(send).not.toHaveBeenCalled();
  });
});

describe("Join KCC modal", () => {
  afterEach(() => submit.mockReset());

  const fill = () => {
    const dialog = within(screen.getByRole("dialog"));
    fireEvent.change(dialog.getByLabelText(/Student’s Full Name/), {
      target: { value: valid.studentName },
    });
    fireEvent.change(dialog.getByLabelText(/Parent’s\/Guardian’s Name/), {
      target: { value: valid.parentName },
    });
    fireEvent.change(dialog.getByLabelText(/Class\/Grade/), { target: { value: valid.grade } });
    fireEvent.change(dialog.getByLabelText(/School Name/), { target: { value: valid.school } });
    fireEvent.change(dialog.getByLabelText(/Mobile/), { target: { value: valid.mobile } });
    fireEvent.change(dialog.getByLabelText(/Email Address/), { target: { value: valid.email } });
    fireEvent.change(dialog.getByLabelText(/City/), { target: { value: valid.city } });
    fireEvent.click(dialog.getByRole("checkbox"));
    return dialog;
  };

  it("shows the community information and every form field", () => {
    render(<KccJoinModal open onOpenChange={() => {}} />);
    const dialog = within(screen.getByRole("dialog"));
    expect(dialog.getByText("A Community Where Young Creators Keep Growing.")).toBeInTheDocument();
    expect(dialog.getByText("Become a KCC Member")).toBeInTheDocument();
    expect(dialog.getByRole("button", { name: "Join the KCC Community →" })).toBeInTheDocument();
  });

  it("blocks submission and explains each problem when fields are missing or invalid", async () => {
    render(<KccJoinModal open onOpenChange={() => {}} />);
    const dialog = within(screen.getByRole("dialog"));
    fireEvent.change(dialog.getByLabelText(/Mobile/), { target: { value: "12345" } });
    fireEvent.change(dialog.getByLabelText(/Email Address/), { target: { value: "not-an-email" } });
    await act(async () =>
      fireEvent.click(dialog.getByRole("button", { name: /Join the KCC Community/ })),
    );
    expect(
      await dialog.findByText("Please enter a valid 10-digit Indian mobile number."),
    ).toBeInTheDocument();
    expect(dialog.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(dialog.getByText("Please choose the student’s class.")).toBeInTheDocument();
    expect(dialog.getByText(/Please agree to be contacted/)).toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
  });

  it("shows a loading state, sends once, and welcomes the member only after it was delivered", async () => {
    let resolve!: (v: unknown) => void;
    submit.mockReturnValue(new Promise((r) => (resolve = r)));
    render(<KccJoinModal open onOpenChange={() => {}} />);
    const dialog = fill();
    const button = dialog.getByRole("button", { name: /Join the KCC Community/ });
    await act(async () => fireEvent.click(button));
    const sending = await dialog.findByRole("button", { name: /Sending/ });
    expect(sending).toBeDisabled();
    fireEvent.click(sending);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit.mock.calls[0]![0].data).toMatchObject({
      studentName: "Asha Verma",
      consent: true,
    });
    expect(screen.queryByText("Welcome to the Kids Coding Community!")).toBeNull();
    await act(async () => resolve({ ok: true }));
    expect(await screen.findByText("Welcome to the Kids Coding Community!")).toBeInTheDocument();
    expect(screen.getByText(/Your interest in joining KCC has been received/)).toBeInTheDocument();
  });

  it.each([
    [{ ok: false, reason: "not_configured" }, /isn’t switched on yet/],
    [{ ok: false, reason: "failed" }, /couldn’t send your registration/],
  ])("shows an error, not a welcome, when the result is %o", async (result, message) => {
    submit.mockResolvedValue(result);
    render(<KccJoinModal open onOpenChange={() => {}} />);
    const dialog = fill();
    await act(async () =>
      fireEvent.click(dialog.getByRole("button", { name: /Join the KCC Community/ })),
    );
    expect(await dialog.findByRole("alert")).toHaveTextContent(message);
    expect(screen.queryByText("Welcome to the Kids Coding Community!")).toBeNull();
  });

  it("shows the connection error when the request itself fails", async () => {
    submit.mockRejectedValue(new Error("network"));
    render(<KccJoinModal open onOpenChange={() => {}} />);
    const dialog = fill();
    await act(async () =>
      fireEvent.click(dialog.getByRole("button", { name: /Join the KCC Community/ })),
    );
    await waitFor(() => expect(dialog.getByRole("alert")).toHaveTextContent(/couldn’t send/));
  });
});
