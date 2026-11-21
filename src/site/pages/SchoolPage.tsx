import { sectionIds, type SiteNavigate } from '../page'
import SchoolSalesKit from '../components/SchoolSalesKit'
import { partnerSchools } from '../data/schools'
import { useLanguage } from '../components/LanguageContext'
import StatGrid, { type Stat } from '../components/StatGrid'
import SwipeRow from '../components/SwipeRow'

interface Props {
  navigate: SiteNavigate
}

const schoolTestimonials = [
  {
    quote: '"AptCoder has brought a new level of excitement to our classrooms. Our students are more confident, curious and engaged with technology."',
    name: 'Principal', school: 'Delhi Public School, Noida',
  },
  {
    quote: '"The teacher training and support from AptCoder has been exceptional. The curriculum is well-structured and easy to integrate into school programs."',
    name: 'Academic Head', school: 'Ryan International School',
  },
  {
    quote: '"Our students have created amazing projects and participated in C-NAT with great enthusiasm. AptCoder is a valuable partner in our digital learning journey."',
    name: 'Director', school: 'Mount Carmel School',
  },
]

const schoolStats: Stat[] = [
  { icon: '🏫', num: '500+', label: 'Partner Schools' },
  { icon: '👦', num: '2,00,000+', label: 'Students Impacted' },
  { icon: '👨‍🏫', num: '10,000+', label: 'Teachers Trained' },
  { icon: '🌍', num: '15+', label: 'Countries' },
]

const steps = [
  { num: '1', title: 'Understand Your Needs', desc: 'We work with your team to understand your goals and craft the right approach.' },
  { num: '2', title: 'Design a Custom Plan', desc: 'Get a tailored program for your school, aligned to your curriculum.' },
  { num: '3', title: 'Train & Launch', desc: 'We enable your teachers and help you launch smoothly.' },
  { num: '4', title: 'Track & Grow', desc: 'Monitor progress and expand grades and programs over time.' },
]

export default function SchoolPage({ navigate }: Props) {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#FFF5F2] rounded-l-[80px] -z-0" />
        {/* From 768px (tablets) text and picture sit side by side, as on desktop. */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-8 lg:gap-12 items-center">
          <div>
            <div className="section-label mb-4">{t('APTCODER FOR SCHOOLS', 'स्कूलों के लिए APTCODER')}</div>
            {/* Two lines on desktop; the offer (Coding, AI & Robotics) is highlighted. */}
            <h1 className="text-[2rem] sm:text-[2.6rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-black text-gray-900 leading-[1.12] tracking-tight text-balance mb-5">
              {t('Bringing ', 'हर कक्षा में ')}
              <span className="text-[#E8401C]">{t('Coding, AI & Robotics', 'कोडिंग, AI और रोबोटिक्स')}</span>
              {t(' into Every Classroom.', ' की शिक्षा।')}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
              {t(
                'Empowering schools with practical coding, AI and robotics education that builds creativity, problem-solving skills and technological confidence in every student.',
                'स्कूलों को व्यावहारिक कोडिंग, AI और रोबोटिक्स शिक्षा से सशक्त बनाना, जो हर छात्र में रचनात्मकता, समस्या-समाधान कौशल और तकनीकी आत्मविश्वास विकसित करती है।',
              )}
            </p>
            {/* Phones: the two buttons stack at full width. */}
            <div className="flex flex-wrap gap-3 mb-8 max-sm:flex-col">
              <button
                type="button"
                onClick={() => navigate('contact', sectionIds.contactForm)}
                className="bg-[#E8401C] text-white font-semibold rounded-full px-7 py-3.5 hover:bg-[#C73516] transition-colors flex items-center justify-center gap-2"
              >
                Partner with Us →
              </button>
              <SchoolSalesKit compact />
            </div>
            {/* Three highlights in equal columns, each centred in its column. */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                ['📘', 'Structured Curriculum'],
                ['👩‍🏫', 'Teacher Enablement'],
                ['🛠️', 'Hands-on Learning'],
              ].map(([icon, f]) => (
                <div key={f} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:text-left">
                  <div className="w-8 h-8 shrink-0 bg-[#FFF5F2] rounded-lg flex items-center justify-center text-sm" aria-hidden="true">{icon}</div>
                  <span className="text-xs font-medium text-gray-600">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#FFE8E0]">
            <img
              src="https://images.unsplash.com/photo-1550706899-d71befa3b74f?w=700&h=500&fit=crop&auto=format"
              srcSet="https://images.unsplash.com/photo-1550706899-d71befa3b74f?w=480&h=343&fit=crop&auto=format 480w, https://images.unsplash.com/photo-1550706899-d71befa3b74f?w=700&h=500&fit=crop&auto=format 700w, https://images.unsplash.com/photo-1550706899-d71befa3b74f?w=1000&h=714&fit=crop&auto=format 1000w, https://images.unsplash.com/photo-1550706899-d71befa3b74f?w=1400&h=1000&fit=crop&auto=format 1400w"
              sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
              width={700}
              height={500}
              decoding="async"
              alt="Students using technology in classroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg px-4 py-3 text-center">
              <p className="text-xs font-bold text-[#E8401C]">Create · Explore</p>
              <p className="text-xs font-bold text-gray-700">Innovate Together</p>
            </div>
          </div>
        </div>
      </section>

      {/* School validation */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-[#E8401C] uppercase tracking-widest mb-2">SCHOOLS WE WORK WITH</p>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Trusted by Schools</h2>
          <p className="text-sm text-gray-500 mb-7">Supporting technology learning with schools and educators.</p>
          {/* Five logos in one row on desktop; 3 + 2 on tablets and phones. */}
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:flex-nowrap">
            {partnerSchools.map((school) => (
              <li
                key={school.id}
                className="flex h-24 w-[calc(33.333%-0.5rem)] items-center justify-center rounded-2xl border border-gray-100 bg-white px-2 sm:h-32 sm:w-[calc(33.333%-0.667rem)] sm:px-4 lg:w-auto lg:flex-1"
                title={school.name}
                data-school-id={school.id}
              >
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-16 w-full max-w-[9rem] object-contain sm:h-24"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why AptCoder */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-3">WHY APTCODER FOR SCHOOLS</div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">More Than Just Coding Classes</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                We partner with schools to bring a comprehensive technology education program that goes beyond theory — helping students apply, create and solve real-world problems.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: '</>', label: 'Coding', color: 'bg-blue-50 text-blue-600' },
                  { icon: '🤖', label: 'Robotics (Vernatics)', color: 'bg-orange-50 text-orange-600' },
                  { icon: '🧠', label: 'AI & Emerging Tech', color: 'bg-purple-50 text-purple-600' },
                  { icon: '📊', label: 'Assessments (C-NAT)', color: 'bg-green-50 text-green-600' },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${f.color}`}>{f.icon}</div>
                    <span className="text-sm font-semibold text-gray-700">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop&auto=format', label: 'Curriculum Integration' },
                { img: 'https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=300&h=200&fit=crop&auto=format', label: 'Teacher Training & Support' },
                { img: 'https://images.unsplash.com/photo-1603354351149-e97b9124020d?w=300&h=200&fit=crop&auto=format', label: 'Hands-on Learning' },
                { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&auto=format', label: 'Assessment & Recognition' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] relative group">
                  <img src={item.img} alt={item.label} width={300} height={200} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-semibold">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact in schools */}
      <section className="py-12 sm:py-16 bg-[#FFF5F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-3">OUR IMPACT IN SCHOOLS</div>
          <h2 className="text-3xl font-black text-gray-900 mb-12">Building a Stronger, Smarter Generation</h2>
          <StatGrid variant="cards" stats={schoolStats} />
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-label mb-3">HOW IT WORKS</div>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900">Simple and Seamless Implementation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative max-sm:flex max-sm:gap-4">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-100 z-0 -translate-x-4" />
                )}
                {/* Phones: a vertical line joins the numbers (number on the left, text beside it). */}
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="sm:hidden absolute left-6 top-12 -bottom-6 w-0.5 -translate-x-1/2 bg-gray-200"
                  />
                )}
                <div
                  className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white font-black text-lg mb-5 max-sm:mb-0 relative z-10"
                  style={{ background: ['#E8401C', '#3B82F6', '#10B981', '#8B5CF6'][i] }}
                >
                  {step.num}
                </div>
                <div className="max-sm:pt-2.5">
                  <h3 className="font-bold text-gray-900 mb-2 max-sm:mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-label mb-3">WHAT SCHOOLS SAY</div>
          <h2 className="text-3xl font-black text-gray-900 mb-10">Trusted by Educators and School Leaders</h2>
          {/* A swipeable row on phones; the grid from 640px. */}
          <SwipeRow
            label="What schools say"
            gridClassName="grid grid-cols-1 md:grid-cols-3 gap-6"
            items={schoolTestimonials.map((t) => ({
              key: t.name,
              node: (
                <div className="h-full bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100">
                  <p className="text-gray-700 text-sm leading-relaxed italic mb-6">{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF5F2] flex items-center justify-center text-[#E8401C] font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.school}</p>
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-[#FFF5F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Let's Bring Future-Ready Learning to Your School
          </h2>
          <p className="text-gray-600 mb-8">
            Partner with AptCoder and empower your students with real skills for tomorrow.
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col">
            <button
              type="button"
              onClick={() => navigate('contact', sectionIds.contactForm)}
              className="bg-[#E8401C] text-white font-bold rounded-full px-8 py-4 hover:bg-[#C73516] transition-colors"
            >
              Partner with Us →
            </button>
            <SchoolSalesKit />
          </div>
        </div>
      </section>
    </div>
  )
}
