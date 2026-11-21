import type { Page } from '../page'
import { useLanguage } from '../components/LanguageContext'
import { partners } from '../data/partners'
import { team } from '../data/team'
import SocialLinks from '../components/SocialLinks'
import StatGrid, { type Stat } from '../components/StatGrid'

interface Props {
  navigate: (page: Page) => void
}

const journey = [
  { year: '2020', title: 'The Beginning', desc: 'Started with a mission to make coding accessible for children across India.' },
  { year: '2021', title: 'Building the Foundation', desc: 'Developed structured learning programs and began working with schools and students.' },
  { year: '2022', title: 'Expanding Reach', desc: 'Trained 310+ teachers and reached 5K+ students across India.' },
  { year: '2023', title: 'Global Presence', desc: 'Extended to 15+ countries and strengthened our community of learners.' },
  { year: '2024', title: 'New Possibilities', desc: 'Launched innovative programs like Vernatics, C-NAT and global collaborations.' },
  { year: '2025+', title: 'A Bigger Impact', desc: 'Continuing to scale, reach more schools and enable more children to create with technology.' },
]

const impactStats: Stat[] = [
  { icon: '👥', num: '5K+', label: 'Students Empowered' },
  { icon: '🎓', num: '250+', label: 'Teachers Trained' },
  { icon: '🌍', num: '15+', label: 'Countries Reached' },
  { icon: '🏫', num: '500+', label: 'Government Schools' },
  { icon: '🏆', num: '20+', label: 'Competitions & Camps' },
]

export default function AboutPage({ navigate }: Props) {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        {/* From 768px (tablets) text and picture sit side by side, as on desktop. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-8 lg:gap-12 items-center">
          <div>
            <div className="section-label mb-4">{t('ABOUT APTCODER', 'APTCODER के बारे में')}</div>
            {/* One heading for the page (two lines, styled as before). */}
            <h1 className="mb-5 sm:mb-6">
              <span className="block text-[2rem] sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-2">
                {t('Opening a Brighter Future', 'तकनीक के साथ')}
              </span>{' '}
              <span className="block text-[1.75rem] sm:text-3xl lg:text-4xl font-black text-[#E8401C] leading-tight">
                {t('Through Technology', 'उज्ज्वल भविष्य की ओर')}
              </span>
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
              {t(
                'We help children across India and beyond learn coding and emerging technologies through hands-on, project-based learning — in the language they understand best.',
                'हम भारत और दुनिया भर के बच्चों को उनकी पसंदीदा भाषा में प्रोजेक्ट-आधारित शिक्षा से कोडिंग और नई तकनीक सीखने में मदद करते हैं।',
              )}
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: '💡', label: 'Practical Learning' },
                { icon: '🌐', label: 'Regional Language Support' },
                { icon: '👨‍🏫', label: 'Expert Mentors' },
                { icon: '📈', label: 'Real-World Skills' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFF5F2] rounded-xl flex items-center justify-center text-lg shrink-0">{f.icon}</div>
                  <span className="text-sm font-semibold text-gray-700">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#FFE8E0]">
            <img
              src="https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=700&h=500&fit=crop&auto=format"
              srcSet="https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=480&h=343&fit=crop&auto=format 480w, https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=700&h=500&fit=crop&auto=format 700w, https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=1000&h=714&fit=crop&auto=format 1000w, https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=1400&h=1000&fit=crop&auto=format 1400w"
              sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
              width={700}
              height={500}
              decoding="async"
              alt="Children collaborating and learning technology together"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg px-4 py-3 text-center">
              <p className="text-xs font-bold text-[#E8401C]">Learn · Create</p>
              <p className="text-xs font-bold text-gray-700">Grow in Your Language</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners and supporters */}
      <section className="py-14 bg-gray-50 border-y border-gray-100" aria-labelledby="partners-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-[#E8401C] uppercase tracking-widest mb-2">OUR PARTNERS &amp; SUPPORTERS</p>
          <h2 id="partners-heading" className="text-2xl font-black text-gray-900 mb-2">Backed &amp; Supported By</h2>
          <p className="text-sm text-gray-500 mb-8">We are supported and associated with leading institutions and organizations.</p>
          {/* Two smaller cards per row on phones; one per row was ~2,500px of logos. */}
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white px-3 pt-4 pb-3 text-center transition-shadow duration-200 hover:border-gray-300 hover:shadow-md sm:px-5 sm:pt-6 sm:pb-5"
              >
                <div className="flex h-16 w-full items-center justify-center sm:h-24">
                  <img
                    src={partner.src}
                    alt={partner.fullName}
                    width={partner.width}
                    height={partner.height}
                    loading="lazy"
                    decoding="async"
                    className="max-h-12 w-auto max-w-[85%] object-contain sm:max-h-[4.5rem]"
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-gray-800 sm:mt-4 sm:text-sm">{partner.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission, Vision, Belief */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-label mb-3">OUR PURPOSE</div>
          <h2 className="text-3xl font-black text-gray-900 mb-10">Our Mission, Vision and Belief</h2>

          {/* Phones: icon beside the text in each card, to keep the three cards short. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100 max-sm:flex max-sm:items-start max-sm:gap-4">
              <div className="w-12 h-12 shrink-0 bg-red-50 rounded-xl flex items-center justify-center text-2xl mb-5 max-sm:mb-0 max-sm:w-10 max-sm:h-10 max-sm:text-xl">🎯</div>
              <div>
                <h3 className="font-black text-gray-900 text-lg mb-3 max-sm:mb-1.5">Our Mission</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To make coding and technology education accessible, engaging and meaningful for every child — in the language they understand best.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100 max-sm:flex max-sm:items-start max-sm:gap-4">
              <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-5 max-sm:mb-0 max-sm:w-10 max-sm:h-10 max-sm:text-xl">👁️</div>
              <div>
                <h3 className="font-black text-gray-900 text-lg mb-3 max-sm:mb-1.5">Our Vision</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A future where every child, regardless of background or location, can confidently use technology to create, solve and contribute to a better world.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100 max-sm:flex max-sm:items-start max-sm:gap-4">
              <div className="w-12 h-12 shrink-0 bg-yellow-50 rounded-xl flex items-center justify-center text-2xl mb-5 max-sm:mb-0 max-sm:w-10 max-sm:h-10 max-sm:text-xl">❤️</div>
              <div>
                <h3 className="font-black text-gray-900 text-lg mb-3 max-sm:mb-1.5">What We Believe</h3>
                <ul className="space-y-2">
                  {[
                    'Every child has the potential to create.',
                    'Technology education should be practical, not just theoretical.',
                    'Learning is more effective in a familiar language.',
                    'Hands-on projects build confidence and real skills.',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Our Impact So Far</h2>
          <p className="text-gray-500 mb-10">A growing community of learners, teachers and partner institutions.</p>
          <StatGrid variant="plain" stats={impactStats} />
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-14 sm:py-20 bg-[#FFF5F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Our Journey</h2>
          <p className="text-gray-500 mb-12">From a vision to a growing global community.</p>

          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0" />
            {/* Phones: one year per row, the year beside its text, joined by a line. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5 sm:gap-6">
              {journey.map((j, i) => (
                <div key={j.year} className="relative max-sm:flex max-sm:gap-4">
                  {i < journey.length - 1 && (
                    <div aria-hidden="true" className="sm:hidden absolute left-6 top-12 -bottom-5 w-0.5 -translate-x-1/2 bg-gray-200" />
                  )}
                  <div
                    className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white font-black text-sm mb-4 relative z-10 mx-auto md:mx-0 max-sm:mx-0 max-sm:mb-0"
                    style={{ background: ['#E8401C', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6'][i] }}
                  >
                    {j.year.replace('+', '')}
                  </div>
                  <div className="max-sm:pt-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{j.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-sm:text-sm">{j.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="meet-our-team" className="scroll-mt-16 py-14 sm:py-20 bg-white" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 id="team-heading" className="text-3xl font-black text-gray-900 mb-2">Meet Our Team</h2>
            <p className="text-gray-500">A passionate team working to make technology education easy, practical and impactful for every child.</p>
          </div>

          {/* Two leaders: equal cards, centred, never stretched across the full width. */}
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            {team.map((member) => (
              <li
                key={member.id}
                className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white px-6 pb-8 pt-8 text-center shadow-[0_2px_14px_-6px_rgba(17,24,39,0.18)] sm:px-8 max-sm:flex-row max-sm:items-start max-sm:gap-4 max-sm:p-5 max-sm:text-left"
                data-team-id={member.id}
              >
                {/* Phones: a small photo beside the name and bio. */}
                <div className="mb-6 shrink-0 rounded-full bg-[#FFF5F2] p-2.5 ring-1 ring-[#FBD9CE] max-sm:mb-0 max-sm:p-1">
                  <img
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    width={560}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-20 rounded-full object-cover sm:h-48 sm:w-48"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1 max-sm:text-lg">{member.name}</h3>
                  <p className="text-sm font-bold text-[#E8401C] mb-4 max-sm:mb-2">{member.role}</p>
                  <p className="max-w-sm text-sm leading-relaxed text-gray-500">{member.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-[#FFF5F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold text-[#E8401C] uppercase tracking-widest mb-3">JOIN OUR MISSION</p>
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Let's Create Brighter<br />Futures Together.
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Be a part of a movement to make technology education accessible, practical and meaningful for every child.
              </p>
              <div className="mt-6">
                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Follow our journey</p>
                <SocialLinks variant="brand" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('courses')}
                className="bg-[#E8401C] text-white font-bold rounded-full px-8 py-4 hover:bg-[#C73516] transition-colors text-center"
              >
                Book a Free Class →
              </button>
              <button
                onClick={() => navigate('school')}
                className="border-2 border-[#E8401C] text-[#E8401C] font-bold rounded-full px-8 py-4 hover:bg-[#FFF0EB] transition-colors text-center"
              >
                Partner With Us →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
