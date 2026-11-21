import { useEffect, useState, type FormEvent } from "react"
import { sendToSheet } from "../api/sheetForms"
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF } from "../data/contact"
import { FIELD_TEXT } from "./formFieldStyles"

const interests = [
  "Coding & Games",
  "AI",
  "Robotics",
  "Websites & Apps",
  "Not sure yet",
]
const experienceLevels = [
  "New to technology learning",
  "Tried coding before",
  "Already builds projects",
]

export default function RecordedClassLead() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [parentName, setParentName] = useState("")
  const [email, setEmail] = useState("")
  const [grade, setGrade] = useState("")
  const [experience, setExperience] = useState("")
  const [interest, setInterest] = useState("")
  const [watching, setWatching] = useState(false)
  const [website, setWebsite] = useState("")
  // The answers are saved in the Google Sheet before step 3 is shown.
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle")

  const submitAnswers = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!grade || !experience || !interest || status === "sending") return
    setStatus("sending")
    const result = await sendToSheet(
      "recorded_class",
      { parentName: parentName.trim(), email: email.trim(), grade, experience, interest },
      website,
    )
    if (result.ok) {
      setStatus("idle")
      setStep(3)
    } else {
      setStatus("failed")
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const close = () => {
    if (status !== "sending") setIsOpen(false)
  }

  return (
    <>
      <section className="py-16 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black text-primary tracking-widest mb-3">
            FREE RECORDED CLASS
          </p>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Find the Right Class for Your Child
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 max-w-xl mx-auto mb-7">
            Tell us a little about your child and we’ll recommend a recorded
            class to try right away.
          </p>
          <button
            type="button"
            onClick={() => {
              setStep(1)
              setIsOpen(true)
            }}
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Get a Free Recorded Class →
          </button>
          <p className="mt-5 text-xs font-bold text-gray-500">Under 1 minute</p>
        </div>
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 z-[70] bg-gray-950/70 p-4 flex items-center justify-center"
          role="presentation"
          onMouseDown={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="recorded-class-title"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:text-dark"
              aria-label="Close"
            >
              ×
            </button>

            {step < 3 && (
              <>
                <p className="text-xs font-black text-primary tracking-widest mb-2">
                  QUICK CHECK · STEP {step} OF 2
                </p>
                <h2
                  id="recorded-class-title"
                  className="text-2xl sm:text-3xl font-black text-dark mb-2"
                >
                  Find the Right Class for Your Child
                </h2>
                <p className="text-sm text-gray-500 mb-7">
                  {step === 1
                    ? "Tell us a little about your child and we’ll recommend a recorded class to try right away."
                    : "Answer 3 short questions so we can suggest a suitable starting class."}
                </p>
              </>
            )}

            {step === 1 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setStep(2)
                }}
                className="space-y-5"
              >
                <label className="block">
                  <span className="block text-sm font-bold text-dark mb-2">
                    Parent / Guardian Name
                  </span>
                  <input
                    required
                    maxLength={120}
                    autoComplete="name"
                    value={parentName}
                    onChange={(event) => setParentName(event.target.value)}
                    className={`w-full rounded-xl border border-gray-200 px-4 py-3 ${FIELD_TEXT} outline-none focus:border-primary`}
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-bold text-dark mb-2">
                    Email Address
                  </span>
                  <input
                    required
                    type="email"
                    maxLength={200}
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={`w-full rounded-xl border border-gray-200 px-4 py-3 ${FIELD_TEXT} outline-none focus:border-primary`}
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-dark"
                >
                  Continue →
                </button>
                <p className="text-center text-xs font-bold text-gray-400">
                  Under 1 minute
                </p>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={submitAnswers}
                className="space-y-6"
              >
                {/* Spam trap: hidden from people, so only bots fill it in. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  className="hidden"
                />
                <fieldset>
                  <legend className="text-sm font-bold text-dark mb-3">
                    Child’s Grade
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      { length: 12 },
                      (_, index) => `Grade ${index + 1}`,
                    ).map((option) => (
                      <label
                        key={option}
                        className={`rounded-full border px-3.5 py-2 text-xs font-bold cursor-pointer ${
                          grade === option
                            ? "border-primary bg-peach text-primary"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="grade"
                          value={option}
                          checked={grade === option}
                          onChange={() => setGrade(option)}
                          className="sr-only"
                          required
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-bold text-dark mb-3">
                    Previous experience
                  </legend>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {experienceLevels.map((option) => (
                      <label
                        key={option}
                        className={`rounded-xl border px-4 py-3 text-xs font-bold cursor-pointer ${
                          experience === option
                            ? "border-primary bg-peach text-primary"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="experience"
                          value={option}
                          checked={experience === option}
                          onChange={() => setExperience(option)}
                          className="sr-only"
                          required
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-bold text-dark mb-3">
                    Interests
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((option) => (
                      <label
                        key={option}
                        className={`rounded-full border px-3.5 py-2 text-xs font-bold cursor-pointer ${
                          interest === option
                            ? "border-primary bg-peach text-primary"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={option}
                          checked={interest === option}
                          onChange={() => setInterest(option)}
                          className="sr-only"
                          required
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {status === "failed" && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    We couldn’t send your answers just now. Please try again, or email{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                      {CONTACT_EMAIL}
                    </a>{" "}
                    or call{" "}
                    <a href={CONTACT_PHONE_HREF} className="font-semibold underline">
                      {CONTACT_PHONE}
                    </a>
                    .
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === "sending" ? "Sending…" : "Show My Free Class →"}
                </button>
              </form>
            )}

            {step === 3 && (
              <div aria-live="polite">
                <p className="text-xs font-black text-primary tracking-widest mb-2">
                  YOUR FREE CLASS IS READY
                </p>
                <h2
                  id="recorded-class-title"
                  className="text-2xl sm:text-3xl font-black text-dark mb-3"
                >
                  A suitable starting class is ready to try.
                </h2>
                <p className="text-sm text-gray-500 mb-7">
                  The approved recorded class can be connected here when the
                  media is supplied.
                </p>
                {watching ? (
                  <div className="aspect-video rounded-2xl border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center text-center p-6">
                    <div>
                      <p className="text-sm font-black text-dark">
                        Recorded class placeholder
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Approved class video has not been supplied yet.
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setWatching(true)}
                    className="rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-dark"
                  >
                    Watch Class Now →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
