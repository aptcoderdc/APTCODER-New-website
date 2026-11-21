import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  CheckCircle2,
  Infinity as InfinityIcon,
  Lightbulb,
  Loader2,
  Puzzle,
  Share2,
  Users,
  X,
} from "lucide-react";
import { KCC_GRADES, kccRegistrationSchema, type KccRegistration } from "@/site/data/kcc";
import { CONTACT_PHONE } from "@/site/data/contact";
import { submitKccRegistration } from "@/site/api/kcc";
import { FIELD_TEXT } from "../formFieldStyles";

const journey = ["LEARN", "BUILD", "SHARE", "SOLVE", "GROW"];

const benefits = [
  { icon: InfinityIcon, text: "Lifetime-free community membership." },
  { icon: BookOpen, text: "Continue learning beyond regular classes." },
  { icon: Lightbulb, text: "Explore new ideas and technology." },
  { icon: Share2, text: "Build and share creative projects." },
  { icon: Puzzle, text: "Learn through collaboration and problem-solving." },
  { icon: Users, text: "Stay connected with a community of young creators." },
];

/** Form values before validation (the consent box starts unticked). */
type FormValues = Omit<KccRegistration, "consent"> & { consent: boolean };

const emptyForm: FormValues = {
  studentName: "",
  parentName: "",
  grade: "" as FormValues["grade"],
  school: "",
  mobile: "",
  email: "",
  city: "",
  consent: false,
  website: "",
};

const inputClass = `mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 ${FIELD_TEXT} text-dark placeholder:text-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary aria-[invalid=true]:border-red-400`;

function Field({
  id,
  label,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
        {label} <span className="text-primary">*</span>
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

const failureMessage = {
  not_configured: `Online registration isn’t switched on yet, so your details were not sent. Please message us on WhatsApp or call ${CONTACT_PHONE} and we’ll add you to KCC.`,
  failed:
    "We couldn’t send your registration just now. Please check your connection and try again.",
  invalid: "Some details look incomplete. Please check the highlighted fields and try again.",
} as const;

export default function KccJoinModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [failure, setFailure] = useState<keyof typeof failureMessage | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // The schema turns the ticked consent box into `true`; the form starts it as `false`.
    resolver: zodResolver(kccRegistrationSchema) as never,
    defaultValues: emptyForm,
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    if (isSubmitting) return;
    setFailure(null);
    try {
      const result = await submitKccRegistration({ data: values });
      if (result.ok) {
        setStatus("success");
        reset(emptyForm);
      } else {
        setFailure(result.reason);
      }
    } catch {
      setFailure("failed");
    }
  });

  const handleOpenChange = (next: boolean) => {
    // Don't close mid-submission; start fresh next time after a successful registration.
    if (!next && isSubmitting) return;
    if (!next) {
      setFailure(null);
      if (status === "success") setStatus("idle");
    }
    onOpenChange(next);
  };

  const describedBy = (name: keyof FormValues) => (errors[name] ? `kcc-${name}-error` : undefined);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-gray-950/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(17,24,39,0.5)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:grid-cols-[5fr_6fr] md:overflow-hidden"
          aria-describedby="kcc-modal-description"
        >
          <DialogPrimitive.Close
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm ring-1 ring-black/5 transition-colors hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close"
            disabled={isSubmitting}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </DialogPrimitive.Close>

          {/* About the community */}
          <section className="bg-peach px-6 py-7 sm:px-8 md:max-h-[calc(100dvh-1.5rem)] md:overflow-y-auto">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <p className="text-xs font-black tracking-widest text-primary">KCC</p>
              <p className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-primary">
                Lifetime Free Community
              </p>
            </div>
            <h2 className="mb-3 text-2xl font-black leading-tight text-dark text-balance">
              A Community Where Young Creators Keep Growing.
            </h2>
            <div
              id="kcc-modal-description"
              className="space-y-2 text-sm leading-relaxed text-gray-600"
            >
              <p>
                The Kids Coding Community (KCC) is APTCODER’s lifetime-free learning community where
                children can continue exploring technology beyond their regular classes.
              </p>
              <p>
                It’s a place to keep learning, building projects, sharing ideas, solving problems
                and growing alongside other young learners.
              </p>
            </div>
            <ol
              className="my-5 flex flex-wrap items-center gap-x-1 gap-y-2"
              aria-label="The KCC journey"
            >
              {journey.map((stage, i) => (
                <li key={stage} className="flex items-center gap-1">
                  <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black tracking-wider text-dark shadow-sm">
                    {stage}
                  </span>
                  {i < journey.length - 1 && (
                    <span aria-hidden="true" className="text-xs font-black text-primary">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <ul className="space-y-2.5">
              {benefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="pt-1 leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Join the community */}
          <section className="px-6 py-7 sm:px-8 md:max-h-[calc(100dvh-1.5rem)] md:overflow-y-auto">
            {status === "success" ? (
              <div
                className="flex h-full flex-col items-center justify-center py-10 text-center"
                role="status"
              >
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <DialogPrimitive.Title className="mb-2 text-2xl font-black text-dark">
                  Welcome to the Kids Coding Community!
                </DialogPrimitive.Title>
                <p className="mb-7 max-w-sm text-sm leading-relaxed text-gray-600">
                  Your interest in joining KCC has been received. Our team will get in touch with
                  you shortly.
                </p>
                <DialogPrimitive.Close className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
                  Done
                </DialogPrimitive.Close>
              </div>
            ) : (
              <>
                <DialogPrimitive.Title className="mb-1 pr-10 text-2xl font-black text-dark">
                  Become a KCC Member
                </DialogPrimitive.Title>
                <p className="mb-5 text-sm text-gray-500">
                  Tell us a little about yourself to get started.
                </p>
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-3.5"
                  aria-busy={isSubmitting}
                >
                  <Field
                    id="kcc-studentName"
                    label="Student’s Full Name"
                    error={errors.studentName?.message}
                  >
                    <input
                      id="kcc-studentName"
                      autoComplete="off"
                      className={inputClass}
                      aria-invalid={!!errors.studentName}
                      aria-describedby={describedBy("studentName")}
                      {...register("studentName")}
                    />
                  </Field>
                  <Field
                    id="kcc-parentName"
                    label="Parent’s/Guardian’s Name"
                    error={errors.parentName?.message}
                  >
                    <input
                      id="kcc-parentName"
                      autoComplete="name"
                      className={inputClass}
                      aria-invalid={!!errors.parentName}
                      aria-describedby={describedBy("parentName")}
                      {...register("parentName")}
                    />
                  </Field>
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Field
                      id="kcc-grade"
                      label="Student’s Class/Grade"
                      error={errors.grade?.message}
                    >
                      <select
                        id="kcc-grade"
                        className={inputClass}
                        aria-invalid={!!errors.grade}
                        aria-describedby={describedBy("grade")}
                        {...register("grade")}
                      >
                        <option value="">Select class</option>
                        {KCC_GRADES.map((grade) => (
                          <option key={grade}>{grade}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="kcc-city" label="City" error={errors.city?.message}>
                      <input
                        id="kcc-city"
                        autoComplete="address-level2"
                        className={inputClass}
                        aria-invalid={!!errors.city}
                        aria-describedby={describedBy("city")}
                        {...register("city")}
                      />
                    </Field>
                  </div>
                  <Field id="kcc-school" label="School Name" error={errors.school?.message}>
                    <input
                      id="kcc-school"
                      autoComplete="organization"
                      className={inputClass}
                      aria-invalid={!!errors.school}
                      aria-describedby={describedBy("school")}
                      {...register("school")}
                    />
                  </Field>
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Field
                      id="kcc-mobile"
                      label="Parent’s/Guardian’s Mobile"
                      error={errors.mobile?.message}
                    >
                      <input
                        id="kcc-mobile"
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
                    <Field id="kcc-email" label="Email Address" error={errors.email?.message}>
                      <input
                        id="kcc-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        className={inputClass}
                        aria-invalid={!!errors.email}
                        aria-describedby={describedBy("email")}
                        {...register("email")}
                      />
                    </Field>
                  </div>
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
                      I agree to be contacted by APTCODER regarding my KCC membership.
                    </label>
                    {errors.consent && (
                      <p id="kcc-consent-error" className="mt-1 text-xs font-medium text-red-600">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>
                  {failure && (
                    <p
                      role="alert"
                      className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium leading-relaxed text-red-700"
                    >
                      {failureMessage[failure]}
                    </p>
                  )}
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
                      "Join the KCC Community →"
                    )}
                  </button>
                </form>
              </>
            )}
          </section>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
