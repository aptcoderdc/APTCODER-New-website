import type { ReactNode } from "react";
import {
  Code2,
  Download,
  FlaskConical,
  Info,
  LayoutGrid,
  Link2,
  MonitorSmartphone,
  Move,
  Orbit,
  Play,
  Radar,
  Sparkles,
  Star,
  Wifi,
  WifiOff,
} from "lucide-react";
import type { Page } from "../page";
import { assetUrl } from "../assetUrl";
import CourseSubjectLink from "../components/CourseSubjectLink";
import VernaticsVideo, { VERNATICS_POSTER_SRC } from "../components/VernaticsVideo";
import { VERNATICS_SUBJECT } from "../data/vernaticsCourses";

interface Props {
  navigate: (page: Page) => void;
}

/** Section that "Explore Its Features" scrolls to. */
const FEATURES_ID = "vernatics-features";

const experience = [
  {
    icon: Code2,
    title: "CODE",
    text: "Give the robot instructions and learn how programming works.",
  },
  {
    icon: Wifi,
    title: "CONTROL",
    text: "Control the robot wirelessly and see your commands come to life.",
  },
  {
    icon: Sparkles,
    title: "CREATE",
    text: "Experiment, solve challenges and build new ways for the robot to respond.",
  },
];

/** The robot's 5 × 8 RGB LED matrix, drawn as a small icon. */
function LedMatrixIcon({ className }: { className?: string }) {
  const colours = ["#E8401C", "#F59E0B", "#22C55E", "#3B82F6", "#A855F7"];
  // A simple smiley lit on the 8-wide, 5-tall grid; the other LEDs stay dim.
  const lit = new Set(["1-2", "1-5", "3-1", "3-6", "4-2", "4-3", "4-4", "4-5"]);
  return (
    <svg viewBox="0 0 34 22" aria-hidden="true" className={className}>
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={3 + col * 4}
            cy={3 + row * 4}
            r={1.5}
            fill={lit.has(`${row}-${col}`) ? colours[(row + col) % colours.length] : "currentColor"}
            opacity={lit.has(`${row}-${col}`) ? 1 : 0.22}
          />
        )),
      )}
    </svg>
  );
}

const explore: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <Move className="h-6 w-6" />,
    title: "Make It Move",
    text: "Control the robot’s two wheels and experiment with movement and directions.",
  },
  {
    icon: <Radar className="h-6 w-6" />,
    title: "See It Sense",
    text: "Explore how ultrasonic and IR sensors help the robot detect obstacles and respond to its surroundings.",
  },
  {
    icon: <LedMatrixIcon className="h-6 w-8" />,
    title: "Bring It to Life",
    text: "Use the colourful LED matrix to create patterns, expressions and visual responses.",
  },
  {
    icon: <FlaskConical className="h-6 w-6" />,
    title: "Experiment & Discover",
    text: "Explore light detection, buttons and other interactive components through hands-on activities.",
  },
];

const steps = [
  {
    title: "Discover",
    text: "Get introduced to the robot and understand what its different parts can do.",
  },
  {
    title: "Program",
    text: "Learn to give instructions and control the robot through coding.",
  },
  {
    title: "Experiment",
    text: "Try challenges, observe results, solve problems and create new possibilities.",
  },
];

/** Screenshot of the Vernatics coding portal (public/images/vernatics_portal.jpeg, 2702 × 1662). */
export const VERNATICS_PORTAL_SRC = assetUrl("/images/vernatics_portal.jpeg");

const portalFeatures = [
  { icon: Info, title: "Instructions", text: "Guides you step-by-step to complete the activity." },
  { icon: Play, title: "Run", text: "Run the program and see the output." },
  { icon: LayoutGrid, title: "Blocks", text: "Choose coding in Blocks, Code (syntax) or both." },
  { icon: Link2, title: "Link", text: "Get the activity link to share with others." },
  {
    icon: MonitorSmartphone,
    title: "Share Access",
    text: "Share remote access and control devices with others and vice versa.",
  },
  { icon: Download, title: "Download", text: "Download the activity to your device." },
  {
    icon: WifiOff,
    title: "Reset WiFi",
    text: "Connect the device via Bluetooth or WiFi and use other WiFi when needed.",
  },
];

const codingLevels = [
  { icon: Star, name: "Robo Star", level: "Simple Level", text: "Coding with single blocks." },
  { icon: Orbit, name: "Robo Orbit", level: "Moderate Level", text: "More blocks, more logic." },
  {
    icon: Sparkles,
    name: "Robo Galaxy",
    level: "Tough Level",
    text: "Advanced logic and complex coding.",
  },
];

const iconTile =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-peach text-primary";

export default function VernaticsPage({ navigate }: Props) {
  return (
    <div>
      {/* Hero: same split layout as the School and Contact heroes. */}
      <section className="relative overflow-hidden bg-white" aria-labelledby="vernatics-heading">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 rounded-l-[80px] bg-peach lg:block" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <div className="section-label mb-4">MEET VERNATICS</div>
            <h1
              id="vernatics-heading"
              className="mb-5 text-balance text-[2rem] font-black leading-[1.12] tracking-tight text-gray-900 sm:text-[2.6rem] lg:text-[2.5rem] xl:text-[2.75rem]"
            >
              Meet Your First <span className="text-primary">Coding Robot.</span>
            </h1>
            <p className="mb-8 max-w-lg leading-relaxed text-gray-600">
              Go beyond the screen and bring code to life. With Vernatics, children learn
              programming by controlling a real robot, experimenting with sensors and watching their
              ideas turn into action.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Opens the catalogue with the Vernatics subject selected. */}
              <CourseSubjectLink
                subjects={[VERNATICS_SUBJECT]}
                className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Start Learning →
              </CourseSubjectLink>
              <a
                href={`#${FEATURES_ID}`}
                className="rounded-full border-2 border-gray-200 px-7 py-3.5 font-semibold text-gray-700 transition-colors hover:border-primary"
              >
                Explore Its Features
              </a>
            </div>
          </div>

          <div className="relative">
            <VernaticsVideo
              fallbackControls
              className="relative aspect-video w-full overflow-hidden rounded-3xl bg-peach-mid shadow-[0_24px_60px_-28px_rgba(17,24,39,0.45)] ring-1 ring-black/5"
            />
            <p className="absolute -bottom-4 left-5 rounded-full bg-white px-4 py-2 text-xs font-black text-primary shadow-lg sm:left-6">
              Learn Robotics in Your Language
            </p>
          </div>
        </div>
      </section>

      {/* The experience: Code / Control / Create */}
      <section className="bg-peach py-12 sm:py-20" aria-labelledby="experience-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="section-label mb-3">THE VERNATICS EXPERIENCE</div>
            <h2 id="experience-heading" className="mb-3 text-3xl font-black text-dark sm:text-4xl">
              Not Just a Robot. A Hands-On Learning Experience.
            </h2>
            <p className="text-sm text-gray-500 sm:text-base">
              Children don’t just learn what code does. They discover it by making things happen.
            </p>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {experience.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="rounded-3xl border border-red-100 bg-white p-5 sm:p-7 shadow-[0_2px_12px_-6px_rgba(17,24,39,0.15)]"
              >
                <span className={`${iconTile} mb-5`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-sm font-black tracking-[0.12em] text-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What children explore: the robot's most interesting capabilities */}
      <section
        id={FEATURES_ID}
        className="scroll-mt-20 bg-white py-16 sm:py-20"
        aria-labelledby="explore-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <div className="section-label mb-3">EXPLORE VERNATICS</div>
            <h2 id="explore-heading" className="text-3xl font-black text-dark sm:text-4xl">
              What Can Children Explore?
            </h2>
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10">
            <div className="overflow-hidden rounded-3xl bg-peach-mid">
              <img
                src={VERNATICS_POSTER_SRC}
                alt="The Vernatics robot on a table with its LED matrix lit up"
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
                className="block aspect-video h-auto w-full object-contain"
              />
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {explore.map(({ icon, title, text }) => (
                <li key={title} className="rounded-3xl bg-peach p-6">
                  <span className={`${iconTile} mb-4 bg-white`}>{icon}</span>
                  <h3 className="mb-2 text-lg font-black text-dark">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vernatics Portal: the coding portal's tools and its three coding levels */}
      <section className="bg-peach py-12 sm:py-20" aria-labelledby="portal-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="section-label mb-3 justify-center">VERNATICS PORTAL</div>
            <h2 id="portal-heading" className="text-3xl font-black text-dark sm:text-4xl">
              Key Features at a Glance
            </h2>
          </div>

          {/* Screenshot on the left (complete, at its own proportions), features on the right;
              stacked on smaller screens. */}
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,8fr)_minmax(0,7fr)] lg:gap-10">
            <figure className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-28px_rgba(17,24,39,0.45)] ring-1 ring-black/5">
              <img
                src={VERNATICS_PORTAL_SRC}
                alt="The Vernatics portal: a toolbar with Instructions, Blocks, Download, Run and more, the block categories Robo Star, Robo Orbit and Robo Galaxy, the coding area and the device log"
                width={2702}
                height={1662}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </figure>
            <ul className="grid gap-3 sm:grid-cols-2" aria-label="Portal features">
              {portalFeatures.map(({ icon: Icon, title, text }, i) => (
                <li
                  key={title}
                  // The seventh card spans the row so the grid has no gap.
                  className={`flex items-start gap-3 rounded-2xl bg-white p-3.5 ${
                    i === portalFeatures.length - 1 && portalFeatures.length % 2 === 1
                      ? "sm:col-span-2"
                      : ""
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peach text-primary">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-dark">{title}</h3>
                    <p className="text-[13px] leading-snug text-gray-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <h3 className="mb-5 mt-14 text-center text-xl font-black text-dark sm:text-2xl">
            Three Coding Levels
          </h3>
          <ol className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {codingLevels.map(({ icon: Icon, name, level, text }, i) => (
              <li
                key={name}
                className="relative overflow-hidden rounded-3xl border border-red-100 bg-white p-6 shadow-[0_2px_12px_-6px_rgba(17,24,39,0.15)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className={iconTile}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    className="flex gap-1"
                    aria-label={`Level ${i + 1} of ${codingLevels.length}`}
                  >
                    {codingLevels.map((_, dot) => (
                      <span
                        key={dot}
                        className={`h-2 w-6 rounded-full ${dot <= i ? "bg-primary" : "bg-peach-mid"}`}
                      />
                    ))}
                  </span>
                </div>
                <h4 className="text-lg font-black text-dark">{name}</h4>
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary">
                  {level}
                </p>
                <p className="text-sm leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How children learn: three steps (horizontal on desktop, vertical on mobile) */}
      <section
        className="border-t border-gray-100 bg-gray-50 py-12 sm:py-20"
        aria-labelledby="learn-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="section-label mb-3">HOW CHILDREN LEARN</div>
            <h2 id="learn-heading" className="text-3xl font-black text-dark sm:text-4xl">
              Learn by Doing. Grow by Creating.
            </h2>
          </div>
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {/* Connecting line behind the step numbers. */}
            <span
              aria-hidden="true"
              className="absolute left-7 top-7 bottom-7 w-0.5 bg-red-200 md:left-[16.67%] md:right-[16.67%] md:top-7 md:bottom-auto md:h-0.5 md:w-auto"
            />
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative flex gap-5 md:flex-col md:items-center md:text-center"
              >
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-black text-white ring-8 ring-gray-50">
                  {i + 1}
                </span>
                <div className="pt-1 md:max-w-xs md:pt-0">
                  <p className="mb-1 text-xs font-black tracking-widest text-primary">
                    STEP {i + 1}
                  </p>
                  <h3 className="mb-2 text-xl font-black text-dark">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA (same peach band as the About page's closing section) */}
      <section className="bg-peach py-12 sm:py-16" aria-labelledby="vernatics-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="vernatics-cta-heading" className="mb-4 text-3xl font-black text-dark sm:text-4xl">
            Ready to Bring Coding to Life?
          </h2>
          <p className="mx-auto mb-8 max-w-xl leading-relaxed text-gray-600">
            Give your child the opportunity to explore robotics, discover programming and turn
            imagination into action.
          </p>
          <button
            type="button"
            onClick={() => navigate("courses")}
            className="rounded-full bg-primary px-8 py-4 font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Explore APTCODER Classes →
          </button>
        </div>
      </section>
    </div>
  );
}
