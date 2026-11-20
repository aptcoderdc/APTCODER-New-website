import { useState, type FormEvent } from 'react'
import { sendToSheet } from '../api/sheetForms'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF } from '../data/contact'

interface Props {
  compact?: boolean
}

export default function SchoolSalesKit({ compact = false }: Props) {
  const emptyForm = { fullName: '', email: '', school: '', role: '', website: '' }
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  // "sent" is shown only after the Google Sheet confirms the request was saved.
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const submitted = status === 'sent'
  const field = (name: keyof typeof emptyForm) => ({
    value: form[name],
    onChange: (event: { target: { value: string } }) =>
      setForm({ ...form, [name]: event.target.value }),
  })

  const close = () => {
    if (status === 'sending') return
    setOpen(false)
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const result = await sendToSheet(
      'school_kit',
      {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        school: form.school.trim(),
        role: form.role,
      },
      form.website,
    )
    if (result.ok) {
      setForm(emptyForm)
      setStatus('sent')
    } else {
      setStatus('failed')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          compact
            ? 'border-2 border-gray-200 text-gray-700 font-semibold rounded-full px-7 py-3.5 hover:border-[#E8401C] transition-colors'
            : 'border-2 border-gray-200 text-gray-700 font-bold rounded-full px-8 py-4 hover:border-[#E8401C] transition-colors'
        }
      >
        Get School Sales Kit
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-gray-950/60 backdrop-blur-sm p-4 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="school-kit-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="bg-[#FFF5F2] px-6 sm:px-8 py-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#E8401C] uppercase tracking-widest mb-2">
                  FOR SCHOOL LEADERS
                </p>
                <h2 id="school-kit-title" className="text-2xl font-black text-gray-900">
                  Get the School Sales Kit
                </h2>
              </div>
              <button
                onClick={close}
                className="w-9 h-9 rounded-full bg-white text-gray-500 hover:text-gray-900"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {submitted ? (
              <div className="p-8" role="status">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-black mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Your request is in.</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  We’ll email the current school sales kit when it is available. No brochure file
                  has been attached to this website yet.
                </p>
                <button
                  onClick={close}
                  className="rounded-full bg-[#E8401C] px-6 py-3 text-sm font-bold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                className="p-6 sm:p-8 space-y-4"
                onSubmit={handleSubmit}
              >
                {/* Spam trap: hidden from people, so only bots fill it in. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  {...field('website')}
                />
                <p className="text-sm text-gray-500">
                  Tell us where to send the latest program overview, curriculum summary and
                  partnership information.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="text-xs font-semibold text-gray-700">
                    Full name
                    <input
                      required
                      maxLength={120}
                      autoComplete="name"
                      {...field('fullName')}
                      className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#E8401C]"
                    />
                  </label>
                  <label className="text-xs font-semibold text-gray-700">
                    Work email
                    <input
                      required
                      type="email"
                      maxLength={200}
                      autoComplete="email"
                      {...field('email')}
                      className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#E8401C]"
                    />
                  </label>
                </div>
                <label className="block text-xs font-semibold text-gray-700">
                  School or institution
                  <input
                    required
                    maxLength={200}
                    autoComplete="organization"
                    {...field('school')}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#E8401C]"
                  />
                </label>
                <label className="block text-xs font-semibold text-gray-700">
                  Your role
                  <select
                    required
                    {...field('role')}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E8401C]"
                  >
                    <option value="">Select role</option>
                    <option>School leader</option>
                    <option>Academic coordinator</option>
                    <option>Teacher</option>
                    <option>Other decision maker</option>
                  </select>
                </label>
                {status === 'failed' && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    We couldn’t send your request just now. Please try again, or email{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                      {CONTACT_EMAIL}
                    </a>{' '}
                    or call{' '}
                    <a href={CONTACT_PHONE_HREF} className="font-semibold underline">
                      {CONTACT_PHONE}
                    </a>
                    .
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                  className="w-full rounded-full bg-[#E8401C] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#C73516] transition-colors disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === 'sending' ? 'Sending…' : 'Email me the sales kit →'}
                </button>
                <p className="text-center text-xs text-gray-400">
                  Your details will only be used to respond to this request.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
