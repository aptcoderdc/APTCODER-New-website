import { useState } from "react"
import type { Page } from "../page"
import CodelyDemo from "../components/CodelyDemo"
import HeroBackgroundVideo from "../components/HeroBackgroundVideo"
import SpotlightSection from "../components/spotlight/SpotlightSection"
import TestimonialsSection from "../components/testimonials/TestimonialsSection"
import VernaticsVideo from "../components/VernaticsVideo"
import RecordedClassLead from "../components/RecordedClassLead"
import { useKccJoin } from "../components/kcc/KccContext"
import { useLanguage } from "../components/LanguageContext"
import { siteWideFaqs } from "../data/siteFaqs"
import { homeCourseSubjects } from "../data/homeCourseSubjects"
import CourseSubjectLink from "../components/CourseSubjectLink"
import FreeClassModal from "../components/freeClass/FreeClassModal"

interface Props {
  navigate: (page: Page) => void
}

interface ProjectCategory {
  title: string
  description: string
  skills: string[]
  examples: string[]
  learning: {
    title: string
    description: string
  }[]
  iconPath: string
  tone: string
}

const projects: ProjectCategory[] = [
  {
    title: "Games",
    description: "Build platforms, puzzles and arcade games with real logic.",
    skills: ["Logic", "Loops", "Events"],
    examples: ["Maze Game", "Platformer", "Quiz Game"],
    learning: [
      {
        title: "Block Coding",
        description: "Build a strong foundation with visual code.",
      },
      {
        title: "Python",
        description: "Bring game ideas to life with text-based code.",
      },
    ],
    iconPath:
      "M6 8h12a4 4 0 0 1 3.9 4.9l-1 4a2.5 2.5 0 0 1-4.3 1L14 15h-4l-2.6 2.9a2.5 2.5 0 0 1-4.3-1l-1-4A4 4 0 0 1 6 8ZM7 10v4m-2-2h4m7-1h.01M18 13h.01",
    tone: "bg-peach text-primary",
  },
  {
    title: "Websites",
    description: "Design and build interactive pages that share an idea.",
    skills: ["HTML", "CSS", "Interaction"],
    examples: ["Personal website", "Story page", "Mini portfolio"],
    learning: [
      {
        title: "Web Development",
        description:
          "Design and build your own websites using HTML, CSS and modern tools.",
      },
    ],
    iconPath:
      "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18",
    tone: "bg-blue-soft text-blue-600",
  },
  {
    title: "Apps",
    description: "Create useful experiences that solve everyday problems.",
    skills: ["Problem solving", "UI thinking", "Interaction"],
    examples: ["Calculator", "Habit tracker", "Simple app"],
    learning: [
      {
        title: "App Development",
        description:
          "Build your own mobile apps and turn your ideas into real applications.",
      },
    ],
    iconPath:
      "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM10 6h4M11 18h2",
    tone: "bg-yellow-soft text-amber-600",
  },
  {
    title: "Robotics",
    description: "Program physical robots that sense and respond.",
    skills: ["Sensors", "Testing", "Automation"],
    examples: ["Robot mission", "Sensor response", "Movement sequence"],
    learning: [
      {
        title: "Robotics with Vernatics",
        description:
          "Program physical robots and bring code to life in the real world.",
      },
    ],
    iconPath:
      "M6 7h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2ZM12 3v4M9 12h.01M15 12h.01M9 16h6",
    tone: "bg-green-soft text-emerald-600",
  },
  {
    title: "Animation & Interactive Stories",
    description:
      "Bring characters and stories to life through choices and motion.",
    skills: ["Sequencing", "Events", "Storytelling"],
    examples: ["Interactive story", "Character scene", "Animation"],
    learning: [
      {
        title: "Block Coding",
        description:
          "Learn coding with blocks and build stories, animations and interactive projects.",
      },
    ],
    iconPath: "M9 7l8 5-8 5V7ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    tone: "bg-peach text-primary",
  },
  {
    title: "AI Projects",
    description:
      "Explore patterns, data and machine learning through experiments.",
    skills: ["Patterns", "Data", "AI concepts"],
    examples: ["Classifier", "Prediction experiment", "Simple chatbot"],
    learning: [
      {
        title: "AI & Machine Learning",
        description:
          "Explore AI concepts and build chatbots, image projects and smart applications.",
      },
    ],
    iconPath:
      "M9 4a3 3 0 0 0-5 3 4 4 0 0 0-1 7 4 4 0 0 0 6 5V4ZM15 4a3 3 0 0 1 5 3 4 4 0 0 1 1 7 4 4 0 0 1-6 5V4ZM9 12h6",
    tone: "bg-purple-soft text-violet-600",
  },
]

const possibilities = [
  {
    title: "Make Everyday Tasks Smarter",
    note: "Notice a problem. Design a better way.",
    path: "M4 12h4l2-7 4 14 2-7h4",
  },
  {
    title: "Build Something That Reacts",
    note: "Connect an input to a visible response.",
    path: "M5 8h14v10H5V8Zm3-3v3m8-3v3M8 13h.01M16 13h.01",
  },
  {
    title: "Turn an Idea into a Working Prototype",
    note: "Make, test and improve a first version.",
    path: "M4 19h16M6 16l3-9 3 6 2-4 4 7",
  },
  {
    title: "Create for Other People",
    note: "Think about who will use what you make.",
    path: "M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 1a3 3 0 1 0 0-6M2 21v-2a6 6 0 0 1 12 0v2m2-6a5 5 0 0 1 6 4v2",
  },
  {
    title: "Solve a Challenge in a New Way",
    note: "Question the obvious answer and try again.",
    path: "M9 18h6M10 22h4M8 14a7 7 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4Z",
  },
  {
    title: "Bring the Physical and Digital Together",
    note: "Use code, controls and sensors as one system.",
    path: "M7 7h10v10H7V7Zm5-4v4m0 10v4M3 12h4m10 0h4",
  },
]

const faqs = siteWideFaqs
/** Phones show this many FAQs, then a "Show all" button; wider screens show every one. */
const PHONE_FAQS = 5

function LineIcon({
  path,
  className = "h-6 w-6",
}: {
  path: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}

export default function HomePage({ navigate }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeProject, setActiveProject] = useState(0)
  const [showMorePossibilities, setShowMorePossibilities] = useState(false)
  const [freeClassOpen, setFreeClassOpen] = useState(false)
  // Phones only: extra detail that is folded away to keep the page short (always shown from 640px).
  const [showProjectDetails, setShowProjectDetails] = useState(false)
  const [showAllFaqs, setShowAllFaqs] = useState(false)
  const openKccJoin = useKccJoin()
  const { t } = useLanguage()
  const selectedProject = projects[activeProject]!

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-white">
        <HeroBackgroundVideo />
        {/* Compact hero: content is vertically centred with equal room above and below, and
            the next section follows closely (its own top padding is reduced to match). On wide
            screens the card column is fixed at the card's width so the text column gets the rest. */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-10 md:pb-14 lg:py-12">
          <div className="grid w-full grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:grid-cols-[minmax(0,1fr)_28rem] gap-8 lg:gap-14 items-center">
            <div>
              <div className="section-label mb-4 sm:mb-5">
                {t(
                  "CHILDREN · TECHNOLOGY · BRIGHTER TOMORROWS",
                  "बच्चे · तकनीक · उज्ज्वल भविष्य",
                )}
              </div>
              <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-dark mb-5 sm:mb-6">
                {t("From Curious Minds", "जिज्ञासु मन से")}
                <br />
                <span className="text-primary">
                  {t("to Confident Creators.", "आत्मविश्वासी रचनाकार तक।")}
                </span>
              </h1>
              {/* Positioning line: one line from 1280px wide (the box grows to fit); wraps on smaller screens. */}
              <div className="relative mb-5 max-w-xl overflow-hidden rounded-r-2xl border-l-4 border-primary bg-peach px-4 py-3 sm:px-5 sm:py-4 xl:w-fit xl:max-w-none">
                <p className="text-lg sm:text-2xl xl:text-[1.375rem] xl:tracking-[-0.025em] xl:whitespace-nowrap font-black leading-snug text-primary">
                  {t(
                    "AI, Robotics & Coding — Made Understandable for Every Child.",
                    "एआई, रोबोटिक्स और कोडिंग — हर बच्चे के लिए आसान समझ में।",
                  )}
                </p>
              </div>
              <p className="text-base leading-relaxed text-gray-700 max-w-xl mb-6 sm:mb-8">
                {t(
                  "Children explore AI, robotics and coding through a language they understand best — so they can focus on understanding ideas, solving problems and creating with technology.",
                  "बच्चे एआई, रोबोटिक्स और कोडिंग उस भाषा में सीखते हैं जिसे वे सबसे अच्छी तरह समझते हैं — ताकि वे विचारों को समझने, समस्याओं को हल करने और तकनीक के साथ रचना करने पर ध्यान दे सकें।",
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setFreeClassOpen(true)}
                  className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors max-sm:w-full max-sm:py-4"
                >
                  {t("Book a Free Class", "मुफ़्त क्लास बुक करें")}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Featured programme card, floating over the video */}
            <div className="relative w-full max-w-md lg:justify-self-end">
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(17,24,39,0.4),0_2px_6px_rgba(17,24,39,0.04)] sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="flex items-center gap-2 text-[11px] font-black tracking-[0.16em] text-primary">
                    <span className="enrolling-dot" aria-hidden="true" />
                    ENROLLING NOW
                  </p>
                  <CourseSubjectLink
                    subjects={homeCourseSubjects.heroPrograms}
                    className="group inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-bold text-primary hover:text-primary-dark"
                  >
                    Explore Programs
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </CourseSubjectLink>
                </div>
                <div className="my-4 h-px bg-gray-100" aria-hidden="true" />
                <p className="text-xl font-black leading-tight tracking-tight text-dark">
                  AI &amp; Robotics Programs
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Explore AI, robotics and technology through engaging, hands-on learning experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pt-10 pb-12 sm:pt-16 sm:pb-20 bg-white"
        aria-labelledby="project-builder-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-9">
            <div className="section-label justify-center mb-4">
              REAL PROJECTS. REAL SKILLS.
            </div>
            <h2
              id="project-builder-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-dark mb-4"
            >
              What Can Your Child Build?
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gray-500 max-w-3xl mx-auto">
              From games and websites to AI, robotics and smart devices,
              children learn by turning ideas into things that actually work.
            </p>
          </div>

          <div
            className="flex overflow-x-auto gap-2 pb-3 mb-5 lg:justify-center"
            role="group"
            aria-label="Project categories"
          >
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() => {
                  setActiveProject(index)
                  setShowMorePossibilities(false)
                }}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${
                  activeProject === index
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary"
                }`}
                aria-pressed={activeProject === index}
              >
                {project.title}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                setShowMorePossibilities((isShowing) => !isShowing)
              }
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs sm:text-sm font-black tracking-wide transition-colors ${
                showMorePossibilities
                  ? "border-dark bg-dark text-white"
                  : "border-dark bg-white text-dark hover:bg-gray-50"
              }`}
              aria-pressed={showMorePossibilities}
              aria-expanded={showMorePossibilities}
              aria-controls="more-possibilities-panel"
            >
              {showMorePossibilities
                ? "SHOW LESS −"
                : "MORE POSSIBILITIES +"}
            </button>
          </div>

          {!showMorePossibilities ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 max-sm:border-0 max-sm:bg-transparent max-sm:p-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-[0.95fr_1.05fr_1.35fr] gap-5 lg:gap-6 items-stretch">
                <div className={`rounded-2xl p-5 ${selectedProject.tone}`}>
                  <LineIcon
                    path={selectedProject.iconPath}
                    className="h-8 w-8 mb-4"
                  />
                  <h3 className="text-2xl font-black text-dark mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {selectedProject.description}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-xs font-black tracking-widest text-gray-400 mb-3">
                    SKILLS THEY PRACTISE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-gray-50 px-3 py-2 text-xs font-bold text-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className={`mt-5 text-xs font-black tracking-widest text-gray-400 mb-3 ${showProjectDetails ? "" : "max-sm:hidden"}`}>
                    EXAMPLE PROJECTS
                  </p>
                  <ul className={`grid gap-2 ${showProjectDetails ? "" : "max-sm:hidden"}`}>
                    {selectedProject.examples.map((example) => (
                      <li
                        key={example}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-red-100 bg-peach p-5 md:col-span-2 lg:col-span-1">
                  <p className={`text-xs font-black tracking-widest text-primary mb-3 ${showProjectDetails ? "" : "max-sm:hidden"}`}>
                    RELEVANT APTCODER LEARNING
                  </p>
                  <div className={`grid sm:grid-cols-2 lg:grid-cols-1 gap-3 ${showProjectDetails ? "" : "max-sm:hidden"}`}>
                    {selectedProject.learning.map((course) => (
                      <div
                        key={course.title}
                        className="rounded-xl border border-red-100 bg-white p-3.5"
                      >
                        <h4 className="text-sm font-black text-dark mb-1">
                          {course.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-gray-500">
                          {course.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <CourseSubjectLink
                    subjects={homeCourseSubjects.projects[selectedProject.title] ?? []}
                    className={`inline-block text-sm font-black text-primary hover:text-primary-dark ${showProjectDetails ? "mt-4" : "sm:mt-4"}`}
                  >
                    Explore Courses →
                  </CourseSubjectLink>
                </div>
              </div>
              {/* Phones: example projects and course ideas are folded away until asked for. */}
              <button
                type="button"
                onClick={() => setShowProjectDetails((shown) => !shown)}
                aria-expanded={showProjectDetails}
                className="mt-3 flex min-h-11 w-full items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-700 sm:hidden"
              >
                {showProjectDetails ? "Show less −" : "See example projects & courses +"}
              </button>
            </div>
          ) : (
            <div
              id="more-possibilities-panel"
              className="possibilities-reveal relative overflow-hidden rounded-3xl bg-dark p-5 sm:p-6 text-white"
              aria-live="polite"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
              <div className="relative mb-4 max-w-4xl">
                <p className="text-xs font-black tracking-widest text-primary mb-2">
                  IDEAS BEYOND THE SCREEN
                </p>
                <h3 className="text-lg sm:text-xl font-black leading-snug">
                  Technology is not just something to learn. It is something to
                  use, question and create with.
                </h3>
              </div>
              <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {possibilities.map((possibility) => (
                  <article
                    key={possibility.title}
                    className="rounded-2xl border border-white/10 bg-white/8 p-3.5 text-white"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <LineIcon
                          path={possibility.path}
                          className="h-5 w-5"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase leading-snug mb-1">
                          {possibility.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-white/65">
                          {possibility.note}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <p className="relative text-center mt-3 text-xs font-bold text-white/65">
                The next idea could be theirs.
              </p>
              <div className="relative mt-2 text-center">
                <CourseSubjectLink
                  subjects={homeCourseSubjects.morePossibilities}
                  className="inline-block text-sm font-black text-primary hover:text-white"
                >
                  Explore Courses →
                </CourseSubjectLink>
              </div>
            </div>
          )}
        </div>
      </section>

      <CodelyDemo />

      {/* Same background as Try Codely above, so only a modest top padding is needed. */}
      <section
        className="pt-8 pb-12 sm:pt-10 sm:pb-20 bg-peach"
        aria-labelledby="offerings-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-9 sm:mb-11">
            <div className="section-label mb-3">OUR OFFERINGS</div>
            <h2
              id="offerings-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-dark mb-4"
            >
              Explore the APTCODER Ecosystem.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gray-500 max-w-3xl">
              Learn, build, take on challenges and keep creating with APTCODER.
            </p>
          </div>

          <article className="mb-5 overflow-hidden rounded-3xl bg-white">
            <div className="grid lg:grid-cols-2 items-stretch">
              <div className="p-5 sm:p-8 lg:p-10">
                <p className="text-xs font-black tracking-widest text-primary mb-2">
                  MEET VERNATICS
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-dark mb-3">
                  Code a Robot. Watch It Respond.
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600 mb-5 sm:mb-7">
                  Program a real robot, control it wirelessly from anywhere,
                  work with sensors and experiment in the language you
                  understand best.
                </p>
                {/* Phones: the four-word summary is left to the Vernatics page, to keep this short. */}
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-10 mb-7 max-sm:hidden">
                  {[
                    ["CODE", "Give it instructions."],
                    ["CONTROL", "Operate it from anywhere."],
                    ["SENSE", "Use sensors to detect and respond."],
                    ["CREATE", "Test. Change. Try again."],
                  ].map(([term, detail]) => (
                    <div key={term}>
                      <dt className="text-sm font-black tracking-[0.12em] text-dark">
                        {term}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-gray-600">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mb-6 inline-flex rounded-full bg-peach px-3 py-2 text-xs font-black text-primary max-sm:hidden">
                  Learn Robotics in Your Language
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("vernatics")}
                    className="rounded-full bg-primary px-5 py-3 text-sm font-black text-white hover:bg-primary-dark"
                  >
                    Explore Vernatics →
                  </button>
                </div>
              </div>
              {/* Video panel: edge to edge in 16:9 on small screens; on desktop the video fills
                  the whole right half of the card (scaled to cover, centred on the robot). */}
              <div className="relative">
                <VernaticsVideo
                  fit="cover"
                  className="relative aspect-video w-full overflow-hidden bg-peach-mid lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                />
              </div>
            </div>
          </article>

          {/* Primary offering: full-width Courses & Learning Paths */}
          <article className="mb-5 rounded-3xl bg-white p-5 sm:p-8 lg:p-10">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12">
              <div>
                <p className="text-xs font-black tracking-widest text-primary mb-2">
                  EXPLORE OUR COURSES
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-dark mb-3">
                  Courses &amp; Learning Paths
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600 mb-3 max-w-md">
                  Find a learning approach that works for your child. Explore
                  coding, AI and other technology learning opportunities through
                  live instruction, guided support or self-paced learning.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("courses")}
                  className="inline-flex min-h-11 items-center text-sm font-black text-primary hover:text-primary-dark"
                >
                  Browse Courses →
                </button>
              </div>
              {/* Phones: the three learning models are named in the text above; the cards show from 640px. */}
              <ul className="grid gap-3 sm:grid-cols-3 max-sm:hidden" aria-label="Learning models">
                {[
                  {
                    name: "LIVE",
                    copy: "Learn with an instructor in real time.",
                    path: "M4 5h16v12H4V5Zm5 15h6M12 17v3M9 9l6 2.5L9 14V9Z",
                  },
                  {
                    name: "ASSISTED LEARNING",
                    copy: "Learn independently with support when needed.",
                    path: "M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 20v-2a6 6 0 0 1 12 0v2m2-9 2 2 4-5",
                  },
                  {
                    name: "SELF-LEARNING",
                    copy: "Learn at your own pace with recorded lessons and practice.",
                    path: "M4 5h16v12H4V5Zm6 4 5 2.5-5 2.5V9ZM8 21h8",
                  },
                ].map((format) => (
                  <li
                    key={format.name}
                    className="flex items-start gap-3 rounded-2xl border border-red-100 bg-peach p-4 sm:flex-col sm:gap-0 sm:p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary sm:mb-4">
                      <LineIcon path={format.path} className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black tracking-widest text-dark">
                        {format.name}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                        {format.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Two complementary parts of the ecosystem, equal width */}
          <div className="grid gap-5 md:grid-cols-2 items-stretch">
            <article className="flex flex-col rounded-3xl border border-red-100 bg-white p-5 sm:p-8">
              <div className="flex min-h-8 items-center mb-2">
                <p className="text-xs font-black tracking-widest text-primary">C-NAT</p>
              </div>
              <h3 className="text-2xl sm:text-3xl md:min-h-[2.5em] md:text-2xl lg:min-h-0 lg:text-[1.7rem] xl:text-3xl font-black leading-tight text-dark text-balance mb-3">
                India’s Coding Olympiad
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 mb-2 sm:mb-5">
                A national coding challenge where young learners test their
                skills, compete in coding tracks and earn recognition for what
                they can do.
              </p>
              <p className="text-xs font-black tracking-wide text-gray-500 max-sm:hidden">
                CHOOSE YOUR TRACK <span className="text-primary">→</span> TAKE
                THE CHALLENGE <span className="text-primary">→</span> EARN
                RECOGNITION
              </p>
              <div className="mt-auto pt-3">
                <button
                  type="button"
                  onClick={() => navigate("cnat")}
                  className="inline-flex min-h-11 items-center text-sm font-black text-primary hover:text-primary-dark"
                >
                  Explore C-NAT →
                </button>
              </div>
            </article>

            <article className="flex flex-col rounded-3xl border border-red-100 bg-white p-5 sm:p-8">
              <div className="flex min-h-8 flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-2">
                <p className="text-xs font-black tracking-widest text-primary">KCC</p>
                <p className="inline-flex rounded-full bg-peach px-3 py-1.5 text-xs font-bold text-primary">
                  Lifetime Free Community
                </p>
              </div>
              <h3 className="text-2xl sm:text-3xl md:min-h-[2.5em] md:text-2xl lg:min-h-0 lg:text-[1.7rem] xl:text-3xl font-black leading-tight text-dark text-balance mb-3">
                The Kids Coding Community
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 mb-2 sm:mb-5">
                Keep learning long after the class ends, in a free community
                for continued learning, building, sharing and problem-solving.
              </p>
              <p className="text-xs font-black tracking-wide text-gray-500 max-sm:hidden">
                LEARN <span className="text-primary">→</span> BUILD{" "}
                <span className="text-primary">→</span> SHARE{" "}
                <span className="text-primary">→</span> SOLVE{" "}
                <span className="text-primary">→</span> GROW
              </p>
              <div className="mt-auto pt-3">
                <button
                  type="button"
                  onClick={openKccJoin}
                  aria-haspopup="dialog"
                  className="inline-flex min-h-11 items-center text-sm font-black text-primary hover:text-primary-dark"
                >
                  Join KCC →
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <SpotlightSection />

      <TestimonialsSection />

      <RecordedClassLead />

      <section
        className="py-12 sm:py-20 bg-white"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="section-label mb-3">FAQS</div>
            <h2 id="faq-heading" className="text-3xl font-black text-dark mb-3">
              Questions? We’ve Got Answers.
            </h2>
            <p className="text-sm text-gray-500">
              Clear answers about learning with APTCODER.
            </p>
          </div>
          <div>
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`faq-item py-5 ${index >= PHONE_FAQS && !showAllFaqs ? "max-sm:hidden" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-bold text-dark">{faq.q}</span>
                  <span
                    className={`shrink-0 text-xl font-light text-primary transition-transform ${
                      openFaq === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === index && (
                  <p className="mt-3 pr-10 text-sm leading-relaxed text-gray-500">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
          {faqs.length > PHONE_FAQS && !showAllFaqs && (
            <button
              type="button"
              onClick={() => setShowAllFaqs(true)}
              className="mt-4 flex min-h-11 w-full items-center justify-center rounded-full border border-gray-200 text-sm font-bold text-gray-700 sm:hidden"
            >
              {`Show all ${faqs.length} questions +`}
            </button>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-peach">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black tracking-widest text-primary mb-3">
            READY TO BEGIN?
          </p>
          {/* One line on desktop (about 980px at 40px); wraps naturally on smaller screens. */}
          <h2 className="text-3xl sm:text-4xl xl:text-[2.5rem] lg:tracking-[-0.025em] lg:whitespace-nowrap font-black text-dark mb-4">
            Turn Curiosity Into Something Your Child Can Build.
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-7">
            Start with a conversation and find a learning path that fits your
            child.
          </p>
          <button
            type="button"
            onClick={() => setFreeClassOpen(true)}
            className="rounded-full bg-primary px-8 py-4 text-sm font-black text-white hover:bg-primary-dark"
          >
            Book a Free Class →
          </button>
        </div>
      </section>

      {/* Opened by both "Book a Free Class" buttons on this page. */}
      <FreeClassModal open={freeClassOpen} onOpenChange={setFreeClassOpen} />
    </div>
  )
}
