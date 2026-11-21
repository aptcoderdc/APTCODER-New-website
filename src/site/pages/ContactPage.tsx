import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, MessageCircle, Phone } from 'lucide-react'
import { sendToSheet } from '../api/sheetForms'
import { pageHref, type Page } from '../page'
import { useLanguage } from '../components/LanguageContext'
import SocialLinks from '../components/SocialLinks'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  OFFICE_ADDRESS_LINES,
  OFFICE_MAPS_URL,
} from '../data/contact'
import { FIELD_TEXT } from '../components/formFieldStyles'
import { WHATSAPP_URL } from '../components/WhatsAppButton'

interface Props {
  navigate: (page: Page) => void
}

// Pages receive `navigate` (see AGENTS.md); this page no longer needs it.
export default function ContactPage(_props: Props) {
  const emptyForm = { name: '', email: '', phone: '', role: '', topic: '', message: '', website: '' }
  const [formData, setFormData] = useState(emptyForm)
  // idle → sending → sent (saved in the sheet) or failed; "sent" is shown only after the sheet confirms.
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const { t } = useLanguage()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const result = await sendToSheet(
      'contact',
      {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: formData.role,
        topic: formData.topic,
        message: formData.message.trim(),
      },
      formData.website,
    )
    if (result.ok) {
      setFormData(emptyForm)
      setStatus('sent')
    } else {
      setStatus('failed')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#FFF5F2] rounded-l-[80px] -z-0 max-sm:hidden" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-4">{t('CONTACT US', 'संपर्क करें')}</div>
            {/* At most two lines on desktop; "Together." is highlighted. */}
            <h1 className="text-[2rem] sm:text-[2.6rem] lg:text-[2.5rem] xl:text-[2.75rem] font-black text-gray-900 leading-[1.12] tracking-tight text-balance mb-5">
              {t('Let’s Build What’s Next, ', 'आइए, ')}
              <span className="text-[#E8401C]">{t('Together.', 'साथ मिलकर')}</span>
              {t('', ' आगे का रास्ता बनाएँ।')}
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-lg">
              {t(
                "Have questions about our courses, school programs, partnerships or events? We're here to help. Get in touch and our team will be happy to assist you.",
                'हमारे कोर्स, स्कूल कार्यक्रम, साझेदारी या आयोजनों के बारे में सवाल हैं? हम मदद के लिए यहाँ हैं। हमारी टीम से संपर्क करें।',
              )}
            </p>
            {/* Phones: the quickest ways to reach us come first, before the form. */}
            <ul className="mt-6 grid grid-cols-3 gap-2 sm:hidden" aria-label="Quick contact">
              {[
                { label: t('Call', 'कॉल करें'), href: CONTACT_PHONE_HREF, Icon: Phone, external: false },
                { label: 'WhatsApp', href: WHATSAPP_URL, Icon: MessageCircle, external: true },
                { label: t('Email', 'ईमेल'), href: `mailto:${CONTACT_EMAIL}`, Icon: Mail, external: false },
              ].map(({ label, href, Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white text-sm font-bold text-gray-800 active:bg-[#FFF5F2]"
                  >
                    <Icon className="h-5 w-5 text-[#E8401C]" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative photo: from 640px only. */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#FFE8E0] max-sm:hidden">
            <img
              src="https://images.unsplash.com/photo-1568585219057-9206080e6c74?w=700&h=500&fit=crop&auto=format"
              alt="Friendly student waving, ready to connect"
              className="w-full h-full object-cover"
            />
            {[
              { text: 'Ask Questions', pos: 'top-4 left-4' },
              { text: 'Get Guidance', pos: 'top-4 right-4' },
              { text: 'Start a Conversation', pos: 'bottom-4 right-4' },
            ].map((b) => (
              <div key={b.text} className={`absolute ${b.pos} bg-white rounded-xl shadow-lg px-3 py-2`}>
                <p className="text-xs font-bold text-gray-800">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Contact info */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form (linked to as /contact#contact-form, e.g. "Partner With Us") */}
            <div id="contact-form" className="lg:col-span-2 scroll-mt-24">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill in your details and we'll get back to you soon.</p>

              {status === 'sent' ? (
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-8" role="status">
                  <CheckCircle2 className="h-10 w-10 text-green-600 mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-black text-gray-900 mb-2">Message sent. Thank you!</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    We have received your message and our team will get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-800 hover:border-[#E8401C]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Spam trap: hidden from people, so only bots fill it in. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full border border-gray-200 rounded-xl px-4 py-3 ${FIELD_TEXT} focus:outline-none focus:border-[#E8401C] focus:ring-1 focus:ring-[#E8401C] transition-colors`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full border border-gray-200 rounded-xl px-4 py-3 ${FIELD_TEXT} focus:outline-none focus:border-[#E8401C] focus:ring-1 focus:ring-[#E8401C] transition-colors`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      pattern="[+0-9 \(\)\-]{7,20}"
                      title="Phone number: digits, spaces and + only"
                      autoComplete="tel"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full border border-gray-200 rounded-xl px-4 py-3 ${FIELD_TEXT} focus:outline-none focus:border-[#E8401C] focus:ring-1 focus:ring-[#E8401C] transition-colors`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">I am a *</label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className={`w-full border border-gray-200 rounded-xl px-4 py-3 ${FIELD_TEXT} focus:outline-none focus:border-[#E8401C] focus:ring-1 focus:ring-[#E8401C] transition-colors bg-white`}
                    >
                      <option value="">Select an option</option>
                      <option>Parent</option>
                      <option>Student</option>
                      <option>School Administrator</option>
                      <option>Teacher</option>
                      <option>Partner / Investor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">What is this regarding? *</label>
                  <select
                    required
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className={`w-full border border-gray-200 rounded-xl px-4 py-3 ${FIELD_TEXT} focus:outline-none focus:border-[#E8401C] focus:ring-1 focus:ring-[#E8401C] transition-colors bg-white`}
                  >
                    <option value="">Select an option</option>
                    <option>Book a Free Class</option>
                    <option>Course Information</option>
                    <option>School Program Inquiry</option>
                    <option>Partnership Opportunity</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    maxLength={2000}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full border border-gray-200 rounded-xl px-4 py-3 ${FIELD_TEXT} focus:outline-none focus:border-[#E8401C] focus:ring-1 focus:ring-[#E8401C] transition-colors resize-none`}
                  />
                </div>

                {status === 'failed' && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    We couldn’t send your message just now. Please try again, or email{' '}
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

                {/* Phones: full-width button with the consent line underneath (side by side, the
                    button was squeezed into three lines). From 640px: the original single row. */}
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    aria-busy={status === 'sending'}
                    className="bg-[#E8401C] text-white font-bold rounded-full px-8 py-3.5 hover:bg-[#C73516] transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-wait"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message →'}
                  </button>
                  <p className="text-xs text-gray-400 text-center sm:text-left">
                    By clicking send, you agree to our{' '}
                    <a
                      href={pageHref("privacy")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E8401C] hover:underline"
                    >
                      Privacy Policy
                    </a>
                    {' '}and{' '}
                    <a
                      href={pageHref("terms")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E8401C] hover:underline"
                    >
                      Terms &amp; Conditions
                    </a>
                    .
                  </p>
                </div>
              </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-8">Other Ways to Reach Us</h2>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-lg shrink-0">✉️</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-0.5">Email Us</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center text-[#E8401C] text-sm font-semibold hover:underline sm:inline sm:min-h-0">{CONTACT_EMAIL}</a>
                    <p className="text-xs text-gray-400 mt-1">We typically respond within 1–2 business days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-lg shrink-0">📞</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-0.5">Call Us</p>
                    <a href={CONTACT_PHONE_HREF} className="inline-flex min-h-11 items-center text-gray-800 text-sm font-semibold hover:text-[#E8401C] transition-colors sm:inline sm:min-h-0">
                      {CONTACT_PHONE}
                    </a>
                    <p className="text-xs text-gray-400 mt-1">Mon – Sat, 9:00 AM – 6:00 PM (IST)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-lg shrink-0">📍</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-0.5">Our Office</p>
                    <a
                      href={OFFICE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${OFFICE_ADDRESS_LINES.join(', ')} (opens Google Maps in a new tab)`}
                      className="group block text-xs text-gray-600 leading-relaxed hover:text-gray-900 transition-colors"
                    >
                      {OFFICE_ADDRESS_LINES.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                      <span className="mt-1.5 inline-block font-semibold text-[#E8401C] group-hover:underline">
                        View on Google Maps ↗
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-900 mb-4">Follow Us</p>
                <p className="text-xs text-gray-500 mb-4">Stay updated on our latest programs, events and student projects.</p>
                <SocialLinks variant="brand" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
