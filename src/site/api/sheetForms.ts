import { LANGUAGE_STORAGE_KEY } from "@/site/components/LanguageContext";

/**
 * Sends website form submissions to the APTCODER Google Sheet.
 *
 * The sheet's Apps Script web app (docs/google-sheets-forms/Code.gs) saves each submission as a
 * row in its form's tab, emails the team and sends the visitor a confirmation. The browser
 * posts to it directly, so this works on every host (including the static GitHub Pages copy).
 *
 * The body is JSON sent as text/plain, which browsers send without a CORS preflight (Apps Script
 * cannot answer one). A form may only say "received" when this returns { ok: true }, which the
 * script answers only after the row was saved.
 *
 * To move to a new deployment, change SHEET_FORMS_URL (or set VITE_SHEET_FORMS_URL).
 */
export const SHEET_FORMS_URL: string =
  (import.meta.env?.["VITE_SHEET_FORMS_URL"] as string | undefined)?.trim() ||
  "https://script.google.com/macros/s/AKfycbyxbv4kO46O8t-8XhU50vfpegmMzjSnD52n3vvvlmsEYEFYMqCfTp1gE5OG7bh37awQ/exec";

/** Form keys and field names exactly as Code.gs (FORMS) expects them. */
export type SheetForms = {
  free_class: {
    studentName: string;
    grade: string;
    parentName: string;
    mobile: string;
    email: string;
    city?: string;
    interest: string;
    language: string;
    preferredTime: string;
    message?: string;
  };
  kcc: {
    studentName: string;
    parentName: string;
    grade: string;
    school: string;
    mobile: string;
    email: string;
    city: string;
  };
  contact: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    topic: string;
    message: string;
  };
  school_kit: { fullName: string; email: string; school: string; role: string };
  recorded_class: {
    parentName: string;
    email: string;
    grade: string;
    experience: string;
    interest: string;
  };
};

export type SheetSubmitResult = { ok: true } | { ok: false; reason: "failed" | "invalid" };

/** Site language and page the visitor used (shown in the sheet; Hindi gets a Hindi email). */
function visitorContext(): { lang: "en" | "hi"; page: string } {
  let lang: "en" | "hi" = "en";
  try {
    if (localStorage.getItem(LANGUAGE_STORAGE_KEY) === "hi") lang = "hi";
  } catch {
    // Storage blocked: the submission is still sent, in English.
  }
  const page = typeof location === "undefined" ? "" : location.pathname;
  return { lang, page };
}

export async function sendToSheet<F extends keyof SheetForms>(
  form: F,
  data: SheetForms[F],
  /** The hidden spam-trap field; when a bot fills it nothing is sent and it "succeeds". */
  honeypot?: string,
  send: typeof fetch = fetch,
): Promise<SheetSubmitResult> {
  if (honeypot?.trim()) return { ok: true };
  try {
    const response = await send(SHEET_FORMS_URL, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ form, data, ...visitorContext() }),
      redirect: "follow",
      signal: AbortSignal.timeout(25_000),
    });
    if (!response.ok) return { ok: false, reason: "failed" };
    const answer = (await response.json().catch(() => null)) as {
      ok?: unknown;
      reason?: unknown;
    } | null;
    if (answer?.ok === true) return { ok: true };
    return { ok: false, reason: answer?.reason === "invalid" ? "invalid" : "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
