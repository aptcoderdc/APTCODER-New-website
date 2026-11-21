import { useState, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MessageCircle, X } from "lucide-react";
import {
  FREE_CLASS_GRADES,
  FREE_CLASS_INTERESTS,
  FREE_CLASS_LANGUAGES,
  FREE_CLASS_TIMES,
  freeClassRequestSchema,
  type FreeClassRequest,
} from "@/site/data/freeClass";
import { CONTACT_PHONE } from "@/site/data/contact";
import { WHATSAPP_NUMBER } from "@/site/components/WhatsAppButton";
import { submitFreeClassRequest } from "@/site/api/freeClass";
import { FIELD_TEXT } from "../formFieldStyles";
import {
  POPUP_ACTIONS,
  POPUP_CLOSE,
  POPUP_CLOSE_WRAP,
  POPUP_CONTENT,
  POPUP_OVERLAY,
} from "../popupStyles";

/** Form values before validation (the consent box starts unticked). */
type FormValues = Omit<FreeClassRequest, "consent"> & { consent: boolean };

const emptyForm: FormValues = {
  studentName: "",
  grade: "" as FormValues["grade"],
  parentName: "",
  mobile: "",
  email: "",
  city: "",
  interest: FREE_CLASS_INTERESTS[0],
  language: "" as FormValues["language"],
  preferredTime: FREE_CLASS_TIMES[0],
  message: "",
  consent: false,
  website: "",
};

const inputClass = `mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 ${FIELD_TEXT} text-dark placeholder:text-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary aria-[invalid=true]:border-red-400`;

function Field({
  id,
  label,
  error,
  optional = false,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string | undefined;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
        {label}{" "}
        {optional ? (
          <span className="font-normal text-gray-400">(optional)</span>
        ) : (
          <span className="text-primary">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function GroupHeading({ children }: { children: ReactNode }) {
  return <p className="mb-2.5 text-[11px] font-black tracking-widest text-primary">{children}</p>;
}

const failureMessage = {
  not_configured:
    "Online booking isn’t switched on yet, so your request was not sent. You can send the same details to us on WhatsApp instead, or call",
  failed:
    "We couldn’t send your request just now. Please try again, or send it on WhatsApp or call",
  invalid: "Some details look incomplete. Please check the highlighted fields and try again.",
} as const;

/** WhatsApp message with the visitor's own details, used when online sending fails. */
function whatsappHref(values: FormValues) {
  const lines = [
    "Hello APTCODER, I would like to book a free class.",
    `Student: ${values.studentName} (${values.grade})`,
    `Parent/Guardian: ${values.parentName}`,
    `Mobile: ${values.mobile}`,
    values.email ? `Email: ${values.email}` : "",
    values.city ? `City: ${values.city}` : "",
    `Interested in: ${values.interest}`,
    `Class language: ${values.language}`,
    `Preferred time: ${values.preferredTime}`,
    values.message ? `Note: ${values.message}` : "",
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * "Book a Free Class" popup. The request goes to the APTCODER Google Sheet (src/site/api/freeClass.ts), which
 * forwards it to the configured destination; the success screen appears only when that
 * delivery succeeds.
 */
export default function FreeClassModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState<{ mobile: string } | null>(null);
  const [failure, setFailure] = useState<{
    reason: keyof typeof failureMessage;
    values: FormValues;
  } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // The schema turns the ticked consent box into `true`; the form starts it as `false`.
    resolver: zodResolver(freeClassRequestSchema) as never,
    defaultValues: emptyForm,
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    if (isSubmitting) return;
    setFailure(null);
    try {
      const result = await submitFreeClassRequest({ data: values });
      if (result.ok) {
        setSubmitted({ mobile: values.mobile });
        reset(emptyForm);
      } else {
        setFailure({ reason: result.reason, values });
      }
    } catch {
      setFailure({ reason: "failed", values });
    }
  });

  const handleOpenChange = (next: boolean) => {
    // Don't close mid-submission; start fresh next time after a successful request.
    if (!next && isSubmitting) return;
    if (!next) {
      setFailure(null);
      setSubmitted(null);
    }
    onOpenChange(next);
  };

  const describedBy = (name: keyof FormValues) => (errors[name] ? `fc-${name}-error` : undefined);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={POPUP_OVERLAY} />
        <DialogPrimitive.Content
          className={`${POPUP_CONTENT} sm:max-w-2xl`}
          aria-describedby="fc-description"
        >
          <div className={POPUP_CLOSE_WRAP}>
            <DialogPrimitive.Close
              className={POPUP_CLOSE}
              aria-label="Close"
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          {submitted ? (
            <div
              className="flex flex-col items-center px-6 py-14 text-center sm:px-10"
              role="status"
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              </span>
              <DialogPrimitive.Title className="mb-2 text-2xl font-black text-dark">
                Your Free Class Request Is In!
              </DialogPrimitive.Title>
              <p
                id="fc-description"
                className="mb-7 max-w-sm text-sm leading-relaxed text-gray-600"
              >
                Thank you. Our team will contact you on {submitted.mobile} to schedule the free
                class.
              </p>
              <DialogPrimitive.Close className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
                Done
              </DialogPrimitive.Close>
            </div>
          ) : (
            <>
              <header className="bg-peach px-6 pb-5 pt-7 sm:px-8">
                <p className="mb-2 text-xs font-black tracking-widest text-primary">
                  BOOK A FREE CLASS
                </p>
                <DialogPrimitive.Title className="mb-1.5 pr-10 text-2xl font-black leading-tight text-dark text-balance">
                  Let’s Find the Right Start for Your Child.
                </DialogPrimitive.Title>
                <p id="fc-description" className="text-sm leading-relaxed text-gray-600">
                  Share a few details and our team will get in touch to schedule the free class.
                </p>
              </header>

              <form
                onSubmit={onSubmit}
                noValidate
                className="space-y-6 px-6 py-6 sm:px-8"
                aria-busy={isSubmitting}
              >
                <fieldset>
                  <legend className="sr-only">About the student</legend>
                  <GroupHeading>ABOUT THE STUDENT</GroupHeading>
                  <div className="grid gap-3.5 sm:grid-cols-[3fr_2fr]">
                    <Field
                      id="fc-studentName"
                      label="Student’s Name"
                      error={errors.studentName?.message}
                    >
                      <input
                        id="fc-studentName"
                        autoComplete="off"
                        className={inputClass}
                        aria-invalid={!!errors.studentName}
                        aria-describedby={describedBy("studentName")}
                        {...register("studentName")}
                      />
                    </Field>
                    <Field id="fc-grade" label="Class/Grade" error={errors.grade?.message}>
                      <select
                        id="fc-grade"
                        className={inputClass}
                        aria-invalid={!!errors.grade}
                        aria-describedby={describedBy("grade")}
                        {...register("grade")}
                      >
                        <option value="">Select class</option>
                        {FREE_CLASS_GRADES.map((grade) => (
                          <option key={grade}>{grade}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="sr-only">Parent or guardian contact</legend>
                  <GroupHeading>PARENT / GUARDIAN CONTACT</GroupHeading>
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Field
                      id="fc-parentName"
                      label="Parent’s/Guardian’s Name"
                      error={errors.parentName?.message}
                    >
                      <input
                        id="fc-parentName"
                        autoComplete="name"
                        className={inputClass}
                        aria-invalid={!!errors.parentName}
                        aria-describedby={describedBy("parentName")}
                        {...register("parentName")}
                      />
                    </Field>
                    <Field id="fc-mobile" label="Mobile Number" error={errors.mobile?.message}>
                      <input
                        id="fc-mobile"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="10-digit mobile number"
                        className={inputClass}
                        aria-invalid={!!errors.mobile}
                        aria-describedby={describedBy("mobile")}
                        {...register("mobile")}
                      />
                    </Field>
                    <Field id="fc-email" label="Email" optional error={errors.email?.message}>
                      <input
                        id="fc-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        className={inputClass}
                        aria-invalid={!!errors.email}
                        aria-describedby={describedBy("email")}
                        {...register("email")}
                      />
                    </Field>
                    <Field id="fc-city" label="City" optional error={errors.city?.message}>
                      <input
                        id="fc-city"
                        autoComplete="address-level2"
                        className={inputClass}
                        aria-invalid={!!errors.city}
                        aria-describedby={describedBy("city")}
                        {...register("city")}
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="sr-only">Class preferences</legend>
                  <GroupHeading>CLASS PREFERENCES</GroupHeading>
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Field
                      id="fc-interest"
                      label="Interested In"
                      error={errors.interest?.message}
                      className="sm:col-span-2"
                    >
                      <select
                        id="fc-interest"
                        className={inputClass}
                        aria-invalid={!!errors.interest}
                        aria-describedby={describedBy("interest")}
                        {...register("interest")}
                      >
                        {FREE_CLASS_INTERESTS.map((interest) => (
                          <option key={interest}>{interest}</option>
                        ))}
                      </select>
                    </Field>
                    <div>
                      <p
                        id="fc-language-label"
                        className="block text-xs font-semibold text-gray-700"
                      >
                        Class Language <span className="text-primary">*</span>
                      </p>
                      <div
                        role="radiogroup"
                        aria-labelledby="fc-language-label"
                        aria-describedby={describedBy("language")}
                        className="mt-1.5 grid grid-cols-2 gap-2"
                      >
                        {FREE_CLASS_LANGUAGES.map((language) => (
                          <label
                            key={language}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition-colors has-[:checked]:border-primary has-[:checked]:bg-peach has-[:checked]:text-primary has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-primary"
                          >
                            <input
                              type="radio"
                              value={language}
                              className="sr-only"
                              {...register("language")}
                            />
                            {language}
                          </label>
                        ))}
                      </div>
                      {errors.language && (
                        <p id="fc-language-error" className="mt-1 text-xs font-medium text-red-600">
                          {errors.language.message}
                        </p>
                      )}
                    </div>
                    <Field
                      id="fc-preferredTime"
                      label="Preferred Time"
                      error={errors.preferredTime?.message}
                    >
                      <select
                        id="fc-preferredTime"
                        className={inputClass}
                        aria-invalid={!!errors.preferredTime}
                        aria-describedby={describedBy("preferredTime")}
                        {...register("preferredTime")}
                      >
                        {FREE_CLASS_TIMES.map((time) => (
                          <option key={time}>{time}</option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      id="fc-message"
                      label="Anything We Should Know?"
                      optional
                      error={errors.message?.message}
                      className="sm:col-span-2"
                    >
                      <textarea
                        id="fc-message"
                        rows={2}
                        placeholder="e.g. prior coding experience, questions"
                        className={`${inputClass} resize-none`}
                        aria-invalid={!!errors.message}
                        aria-describedby={describedBy("message")}
                        {...register("message")}
                      />
                    </Field>
                  </div>
                </fieldset>

                {/* Spam trap: hidden from people and screen readers. */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                  {...register("website")}
                />

                <div>
                  <label className="flex items-start gap-2.5 text-xs leading-relaxed text-gray-600">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#E8401C]"
                      aria-invalid={!!errors.consent}
                      aria-describedby={describedBy("consent")}
                      {...register("consent")}
                    />
                    I agree to be contacted by APTCODER by phone, WhatsApp or email to schedule the
                    free class.
                  </label>
                  {errors.consent && (
                    <p id="fc-consent-error" className="mt-1 text-xs font-medium text-red-600">
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {failure && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium leading-relaxed text-red-700"
                  >
                    {failure.reason === "invalid" ? (
                      failureMessage.invalid
                    ) : (
                      <>
                        <p>
                          {failureMessage[failure.reason]} {CONTACT_PHONE}.
                        </p>
                        <a
                          href={whatsappHref(failure.values)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white hover:bg-[#1ebe5a]"
                        >
                          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          Send these details on WhatsApp
                        </a>
                      </>
                    )}
                  </div>
                )}

                <div className={`${POPUP_ACTIONS} -mx-6`}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:cursor-wait disabled:opacity-80"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      "Request My Free Class →"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
