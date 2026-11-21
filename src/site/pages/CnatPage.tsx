import { BadgeCheck, Brain, Code2, Trophy } from "lucide-react";
import type { Page } from "../page";
import { WHATSAPP_NUMBER } from "../components/WhatsAppButton";

interface Props {
  navigate: (page: Page) => void;
}

/**
 * C-NAT, India's Coding Olympiad. Only information already on the site is shown: no dates,
 * fees, eligibility, formats or awards. Registration isn't online yet, so "Register" opens a
 * WhatsApp chat with the APTCODER team, pre-filled as a C-NAT registration request.
 */
export const CNAT_REGISTER_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello APTCODER, I would like to register for C-NAT (India’s Coding Olympiad). Please share the next steps.",
)}`;

const CHALLENGE_ID = "cnat-challenge";

const pillars = [
  { icon: Brain, title: "THINK", text: "Strengthen logical thinking and computational skills." },
  { icon: Code2, title: "CODE", text: "Apply coding concepts to solve challenges." },
  { icon: Trophy, title: "COMPETE", text: "Put your skills to the test and earn recognition." },
];

const steps = ["Choose Your Track", "Take the Challenge", "Earn Recognition"];

const reasons = [
  "Develop computational thinking.",
  "Improve logical reasoning.",
  "Build confidence in coding.",
  "Challenge yourself through practical problems.",
  "Showcase your skills and achievements.",
];

function RegisterButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CNAT_REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark ${className}`}
    >
      Register for C-NAT →
    </a>
  );
}

/** A small code-editor card: the hero's coding visual. */
function ChallengeCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl bg-gray-950 shadow-[0_30px_70px_-30px_rgba(17,24,39,0.7)] ring-1 ring-black/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-xs font-semibold tracking-wide text-gray-400">
            challenge.py
          </span>
        </div>
        <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7 text-gray-300 sm:text-sm">
          <code>
            <span className="text-gray-500"># Is the word the same backwards?</span>
            {"\n"}
            <span className="text-[#F97316]">def</span>{" "}
            <span className="text-[#60A5FA]">is_palindrome</span>(word):
            {"\n"}
            {"    "}
            <span className="text-[#F97316]">return</span> word == word[::-1]
            {"\n\n"}
            <span className="text-[#60A5FA]">print</span>(is_palindrome(
            <span className="text-[#86EFAC]">&quot;level&quot;</span>))
            {"\n"}
            <span className="text-gray-500"># True</span>
          </code>
        </pre>
      </div>
      <div className="absolute -bottom-5 -left-3 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_-16px_rgba(17,24,39,0.45)] sm:-left-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-peach text-primary">
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-black text-dark">Challenge solved</span>
      </div>
      <div className="absolute -right-3 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg sm:-right-5">
        <Trophy className="h-7 w-7" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function CnatPage(_props: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white" aria-labelledby="cnat-heading">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 rounded-l-[80px] bg-peach lg:block" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <div className="section-label mb-4">APTCODER PRESENTS</div>
            <p className="mb-2 text-sm font-black tracking-widest text-primary">C-NAT</p>
            <h1
              id="cnat-heading"
              className="mb-3 text-balance text-[2.25rem] font-black leading-[1.08] tracking-tight text-gray-900 sm:text-5xl"
            >
              India’s Coding Olympiad
            </h1>
            <p className="mb-5 text-xl font-black text-primary sm:text-2xl">
              Think. Code. Compete. Get Recognised.
            </p>
            <p className="mb-8 max-w-lg leading-relaxed text-gray-600">
              Give your coding skills a national stage. Challenge yourself, explore coding problems
              and showcase what you can create through C-NAT.
            </p>
            <div className="flex flex-wrap gap-3">
              <RegisterButton />
              <a
                href={`#${CHALLENGE_ID}`}
                className="rounded-full border-2 border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-700 transition-colors hover:border-primary"
              >
                Discover the Olympiad
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Registration opens a WhatsApp chat with the APTCODER team, who will share the next
              steps.
            </p>
          </div>
          <div className="pb-6 lg:pb-0">
            <ChallengeCard />
          </div>
        </div>
      </section>

      {/* The challenge */}
      <section
        id={CHALLENGE_ID}
        className="scroll-mt-20 bg-peach py-16 sm:py-20"
        aria-labelledby="cnat-challenge-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="section-label mb-3">THE CHALLENGE</div>
            <h2
              id="cnat-challenge-heading"
              className="mb-3 text-3xl font-black text-dark sm:text-4xl"
            >
              More Than a Coding Competition
            </h2>
            <p className="text-sm text-gray-500 sm:text-base">
              C-NAT gives students the opportunity to apply their coding knowledge, develop logical
              thinking and demonstrate their problem-solving abilities.
            </p>
          </div>
          {/* Phones: icon beside the text, to keep the three cards short. */}
          <ul className="grid gap-3 sm:gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="rounded-3xl border border-red-100 bg-white p-5 sm:p-7 shadow-[0_2px_12px_-6px_rgba(17,24,39,0.15)] max-sm:flex max-sm:items-start max-sm:gap-4"
              >
                <span className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white max-sm:mb-0">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-2 text-sm font-black tracking-[0.12em] text-dark max-sm:mb-1">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-12 sm:py-20" aria-labelledby="cnat-how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="section-label mb-3">HOW IT WORKS</div>
            <h2 id="cnat-how-heading" className="text-3xl font-black text-dark sm:text-4xl">
              Three Steps to Recognition
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3 md:gap-0">
            {steps.map((step, i) => (
              <li key={step} className="relative flex items-center md:block">
                <div className="flex w-full items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-5 md:mx-3 md:w-auto md:flex-col md:p-7 md:text-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-black text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-black tracking-widest text-primary">STEP {i + 1}</p>
                    <h3 className="text-lg font-black uppercase tracking-wide text-dark">{step}</h3>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-black text-primary shadow md:flex"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why participate: dark band gives the Olympiad its own competitive identity */}
      <section className="bg-gray-950 py-12 text-white sm:py-20" aria-labelledby="cnat-why-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-black tracking-widest text-[#F97316]">
              WHY PARTICIPATE?
            </p>
            <h2 id="cnat-why-heading" className="text-3xl font-black sm:text-4xl">
              Show What You Can Do.
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li
                key={reason}
                className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3.5 ring-1 ring-white/10"
              >
                <BadgeCheck className="h-5 w-5 shrink-0 text-[#F97316]" aria-hidden="true" />
                <span className="text-sm font-semibold text-gray-100">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-peach py-12 sm:py-16" aria-labelledby="cnat-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="cnat-cta-heading" className="mb-4 text-3xl font-black text-dark sm:text-4xl">
            Ready to Take the Challenge?
          </h2>
          <p className="mx-auto mb-8 max-w-xl leading-relaxed text-gray-600">
            Put your coding skills to the test and discover what you can achieve.
          </p>
          <RegisterButton className="px-8 py-4 font-bold" />
        </div>
      </section>
    </div>
  );
}
