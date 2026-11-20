import { normaliseIndianMobile } from "@/site/data/kcc";
import { freeClassRequestSchema, type FreeClassSubmitResult } from "@/site/data/freeClass";
import { sendToSheet } from "./sheetForms";

/**
 * Sends a "Book a Free Class" request to the APTCODER Google Sheet (see ./sheetForms.ts).
 * The popup shows its success screen only when the sheet confirms the row was saved.
 */
export async function deliverFreeClassRequest(
  data: unknown,
  send: typeof fetch = fetch,
): Promise<FreeClassSubmitResult> {
  const parsed = freeClassRequestSchema.safeParse(data);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  const request = parsed.data;

  return sendToSheet(
    "free_class",
    {
      studentName: request.studentName,
      grade: request.grade,
      parentName: request.parentName,
      mobile: `+91${normaliseIndianMobile(request.mobile)}`,
      email: request.email || "",
      city: request.city || "",
      interest: request.interest,
      language: request.language,
      preferredTime: request.preferredTime,
      message: request.message || "",
    },
    request.website,
    send,
  );
}

export function submitFreeClassRequest({ data }: { data: unknown }) {
  return deliverFreeClassRequest(data);
}
