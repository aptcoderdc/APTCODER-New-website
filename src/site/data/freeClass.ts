import { z } from "zod";
import { KCC_GRADES, normaliseIndianMobile } from "./kcc";

/**
 * "Book a Free Class" request: the fields, their validation (shared by the popup and the server,
 * so both apply exactly the same rules) and the choices offered.
 */

export const FREE_CLASS_GRADES = KCC_GRADES;

/** What the child would like to try; matches the catalogue's subjects plus "not sure". */
export const FREE_CLASS_INTERESTS = [
  "Not sure yet – help us choose",
  "Block Coding",
  "Python",
  "AI & Data Science",
  "Robotics with Vernatics",
  "Web Development",
  "App Development",
  "Games & Creative Coding",
] as const;

export const FREE_CLASS_LANGUAGES = ["English", "Hindi"] as const;

export const FREE_CLASS_TIMES = [
  "Any time",
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekends",
] as const;

const required = (label: string) =>
  z
    .string({ required_error: `Please enter ${label}.` })
    .trim()
    .min(1, `Please enter ${label}.`)
    .max(120, `Please shorten ${label}.`);

const optionalText = (max: number) => z.string().trim().max(max, "Please shorten this.").optional();

export const freeClassRequestSchema = z.object({
  studentName: required("the student’s name").refine((v) => v.length >= 2, {
    message: "Please enter the student’s name.",
  }),
  grade: z.enum(FREE_CLASS_GRADES, {
    errorMap: () => ({ message: "Please choose the student’s class." }),
  }),
  parentName: required("the parent’s or guardian’s name"),
  mobile: z
    .string()
    .trim()
    .min(1, "Please enter a mobile number.")
    .refine((v) => normaliseIndianMobile(v) !== null, {
      message: "Please enter a valid 10-digit Indian mobile number.",
    }),
  // Required: the confirmation email (sent by the Google Sheet's script) goes to this address.
  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address.")
    .max(160, "Please shorten this.")
    .email("Please enter a valid email address."),
  city: optionalText(80),
  interest: z.enum(FREE_CLASS_INTERESTS, {
    errorMap: () => ({ message: "Please choose what your child would like to learn." }),
  }),
  language: z.enum(FREE_CLASS_LANGUAGES, {
    errorMap: () => ({ message: "Please choose a class language." }),
  }),
  preferredTime: z.enum(FREE_CLASS_TIMES, {
    errorMap: () => ({ message: "Please choose a preferred time." }),
  }),
  message: optionalText(500),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please agree to be contacted so we can schedule the free class.",
    }),
  }),
  /** Hidden from people; bots that fill every field reveal themselves here. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type FreeClassRequest = z.infer<typeof freeClassRequestSchema>;

export type FreeClassSubmitResult =
  | { ok: true }
  | {
      ok: false;
      /** not_configured: no delivery destination set up yet; failed: delivery attempt failed. */
      reason: "not_configured" | "failed" | "invalid";
    };
