import {
  ArrowRight,
  Briefcase,
  Check,
  Compass,
  GraduationCap,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Sprout,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { pageHref, sectionIds, type SiteNavigate } from "../page";
import {
  applyHref,
  CAREERS_EMAIL,
  CAREERS_INTEREST_HREF,
  jobOpenings,
  type JobOpening,
} from "../data/careers";

interface Props {
  /** Passed by the route like every site page; this page has no links to other pages. */
  navigate: SiteNavigate;
  /** Roles to list; defaults to src/site/data/careers.ts. */
  openings?: JobOpening[];
}

/**
 * Careers: values and culture, why join, the current openings (a "no open
 * positions" message while there are none) and how to apply by email.
 * "Why Join" describes the value of the work, not employment terms: no salary, insurance, leave,
 * allowances or work-arrangement policies are stated, as none have been confirmed.
 */
const values = [
  {
    icon: Target,
    title: "Purpose-Driven Work",
    text: "Contribute to making coding and technology education accessible to children.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Curiosity",
    text: "Explore new ideas and practical ways to make learning more engaging.",
  },
  {
    icon: Users,
    title: "Collaboration",
    text: "Work together, share perspectives and build meaningful solutions.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    text: "Stay curious, develop skills and grow through new challenges.",
  },
];

const whyJoin = [
  {
    icon: Heart,
    title: "Meaningful Work",
    text: "Create learning experiences that reach children and their classrooms.",
  },
  {
    icon: Sprout,
    title: "Room to Learn",
    text: "Work across education and technology, and pick up new skills as you go.",
  },
  {
    icon: TrendingUp,
    title: "Professional Growth",
    text: "Take on new challenges that build your experience and confidence.",
  },
  {
    icon: Users,
    title: "Collaboration",
    text: "Build solutions together with people who care about learning.",
  },
  {
    icon: Compass,
    title: "A Larger Mission",
    text: "Be part of the effort to make technology education accessible to every child.",
  },
];

const toInclude = [
  "Your name and phone number",
  "The role or area you are interested in",
  "Your resume, and LinkedIn or portfolio if you have one",
];

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark";

function JobCard({ job }: { job: JobOpening }) {
  const details = [job.team, job.location, job.employmentType].filter(Boolean);
  return (
    <li
      id={`job-${job.id}`}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h3 className="text-lg font-black text-dark">{job.title}</h3>
        {details.length > 0 && (
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-gray-500">
            {details.map((detail, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {detail === job.location && <MapPin className="h-3.5 w-3.5" aria-hidden="true" />}
                {detail}
              </span>
            ))}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{job.summary}</p>
      </div>
      <a
        href={applyHref(job)}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        aria-label={`Apply for ${job.title}`}
      >
        Apply <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </li>
  );
}

/** Smoothly scroll to the Open Positions section on this page, clear of the sticky header
 * (the section's scroll-margin). Instant for visitors who prefer reduced motion. */
function scrollToOpenPositions(event: React.MouseEvent<HTMLAnchorElement>) {
  const section = document.getElementById(sectionIds.openPositions);
  if (!section) return; // let the link's own #open-positions address work
  event.preventDefault();
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

export default function CareersPage({ openings = jobOpenings }: Props) {
  const hasOpenings = openings.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-peach" aria-labelledby="careers-heading">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <div className="section-label mb-4 justify-center">CAREERS</div>
          <h1
            id="careers-heading"
            className="mb-5 text-balance text-4xl font-black leading-tight tracking-tight text-dark sm:text-5xl"
          >
            Build the Future of Learning with <span className="text-primary">APTCODER.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-gray-600">
            APTCODER is on a mission to make AI, robotics and coding education accessible to every
            child. Explore current openings or send us your resume to join the team.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={pageHref("careers", sectionIds.openPositions)}
              onClick={scrollToOpenPositions}
              className={primaryButton}
            >
              View Open Positions
            </a>
            <a
              href={CAREERS_INTEREST_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-7 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Send Your Resume
            </a>
          </div>
        </div>
      </section>

      {/* Our values and culture */}
      <section className="bg-white py-12 sm:py-20" aria-labelledby="careers-values-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="section-label mb-3 justify-center">OUR VALUES &amp; CULTURE</div>
            <h2
              id="careers-values-heading"
              className="mb-3 text-3xl font-black text-dark sm:text-4xl"
            >
              The Principles Behind Our Work
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-red-100 bg-white p-5 shadow-[0_2px_12px_-6px_rgba(17,24,39,0.15)] transition-all hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 bg-primary opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="mb-3 flex items-center justify-between sm:mb-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peach text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-3xl font-black text-peach-mid" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-black text-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why join: the value of the work, not employment terms (none have been confirmed). */}
      <section className="bg-white py-12 sm:py-20" aria-labelledby="careers-benefits-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="section-label mb-3 justify-center">BENEFITS</div>
            <h2
              id="careers-benefits-heading"
              className="mb-3 text-3xl font-black text-dark sm:text-4xl"
            >
              Why Join APTCODER
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3" data-testid="why-join">
            {whyJoin.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-gray-50 p-5 sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-1 font-black text-dark">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{text}</p>
                </div>
              </li>
            ))}
            <li>
              <a
                href={pageHref("careers", sectionIds.openPositions)}
                onClick={scrollToOpenPositions}
                className="flex h-full min-h-28 flex-col justify-center rounded-2xl bg-primary p-6 text-white transition-colors hover:bg-primary-dark"
              >
                <span className="mb-1 font-black">Ready to join us?</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
                  View open positions <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Open positions */}
      <section
        id={sectionIds.openPositions}
        className="scroll-mt-20 bg-gray-50 py-16 sm:py-20"
        aria-labelledby="open-positions-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              id="open-positions-heading"
              className="mb-3 text-3xl font-black text-dark sm:text-4xl"
            >
              Open Positions
            </h2>
          </div>
          {hasOpenings ? (
            <ul className="space-y-4" data-testid="job-openings">
              {openings.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </ul>
          ) : (
            <div
              className="rounded-3xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-black/5"
              data-testid="no-openings"
            >
              <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-peach text-primary">
                <Briefcase className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-xl font-black text-dark">
                There are no open positions at the moment.
              </h3>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-600">
                New roles will be listed here when they open. You are welcome to send us your resume
                in the meantime.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How to apply */}
      <section className="bg-white py-12 sm:py-20" aria-labelledby="careers-apply-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 rounded-3xl bg-peach p-6 sm:gap-8 sm:p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2
                id="careers-apply-heading"
                className="mb-3 text-3xl font-black text-dark sm:text-4xl"
              >
                {hasOpenings ? "How to Apply" : "Send Your Resume"}
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-gray-600 sm:text-base">
                {hasOpenings
                  ? "Use the Apply button on a role, or email us about other roles. Please include:"
                  : "Interested in joining APTCODER? Email us and include:"}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {toInclude.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Phones: no card inside the card; just the address and the button. */}
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm max-sm:bg-transparent max-sm:p-0 max-sm:shadow-none">
              <Mail className="h-7 w-7 text-primary max-sm:hidden" aria-hidden="true" />
              <a
                href={`mailto:${CAREERS_EMAIL}`}
                className="break-all font-bold text-dark hover:text-primary max-lg:inline-flex max-lg:min-h-11 max-lg:items-center"
              >
                {CAREERS_EMAIL}
              </a>
              <a href={CAREERS_INTEREST_HREF} className={`${primaryButton} w-full`}>
                Email Your Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
