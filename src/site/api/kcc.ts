import {
  kccRegistrationSchema,
  normaliseIndianMobile,
  type KccSubmitResult,
} from "@/site/data/kcc";
import { sendToSheet } from "./sheetForms";

/**
 * Sends a KCC registration to the APTCODER Google Sheet (see ./sheetForms.ts). The form
 * welcomes the member only when the sheet confirms the row was saved.
 */
export async function deliverKccRegistration(
  data: unknown,
  send: typeof fetch = fetch,
): Promise<KccSubmitResult> {
  const parsed = kccRegistrationSchema.safeParse(data);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  const registration = parsed.data;

  return sendToSheet(
    "kcc",
    {
      studentName: registration.studentName,
      parentName: registration.parentName,
      grade: registration.grade,
      school: registration.school,
      mobile: `+91${normaliseIndianMobile(registration.mobile)}`,
      email: registration.email,
      city: registration.city,
    },
    registration.website,
    send,
  );
}

export function submitKccRegistration({ data }: { data: unknown }) {
  return deliverKccRegistration(data);
}
