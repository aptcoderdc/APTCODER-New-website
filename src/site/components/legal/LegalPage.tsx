import { Fragment, type ReactNode } from "react";
import { pageHref } from "@/site/page";
import AptcoderLogo from "@/site/components/AptcoderLogo";
import { LEGAL_LAST_UPDATED, type LegalBlock, type LegalDocument } from "@/site/data/legal/types";

/**
 * A simple, standalone legal document page: the APTCODER logo, the title, then the text.
 * These pages open in their own tab from the site's links and are shown without the site's
 * navigation bar and footer (see SiteLayout in src/routes/__root.tsx).
 */

/** Emails, www.aptcoder.com and [[privacy]] / [[terms]] become links. */
const LINK_PATTERN =
  /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|www\.aptcoder\.com|\[\[privacy\]\]|\[\[terms\]\])/g;

const linkClass = "font-semibold text-primary underline-offset-2 hover:underline";

function RichText({ text }: { text: string }) {
  const parts = text.split(LINK_PATTERN);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        if (part === "[[privacy]]")
          return (
            <a key={i} href={pageHref("privacy")} className={linkClass}>
              Privacy Policy
            </a>
          );
        if (part === "[[terms]]")
          return (
            <a key={i} href={pageHref("terms")} className={linkClass}>
              Terms &amp; Conditions
            </a>
          );
        if (part === "www.aptcoder.com")
          return (
            <a key={i} href="https://www.aptcoder.com" className={linkClass}>
              {part}
            </a>
          );
        return (
          <a key={i} href={`mailto:${part}`} className={linkClass}>
            {part}
          </a>
        );
      })}
    </>
  );
}

function Block({ block }: { block: LegalBlock }): ReactNode {
  switch (block.type) {
    case "p":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case "h3":
      return <h3 className="!mt-7 text-lg font-black text-dark">{block.text}</h3>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-primary">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
  }
}

export default function LegalPage({ document: doc }: { document: LegalDocument }) {
  return (
    // Legal wording is shown exactly as provided, so it is not translated into Hindi.
    <main id="top" className="min-h-screen bg-white" data-translate="no">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="mb-10 border-b border-gray-100 pb-8">
          <a href={pageHref("home")} aria-label="APTCODER home" className="mb-8 inline-block">
            <AptcoderLogo className="h-9 md:h-8 lg:h-10" eager />
          </a>
          <h1 className="mb-3 text-4xl font-black tracking-tight text-dark sm:text-5xl">
            {doc.title}
          </h1>
          {doc.intro && <p className="text-sm font-semibold text-gray-600">{doc.intro}</p>}
          <p className="mt-1 text-sm text-gray-500">Last updated: {LEGAL_LAST_UPDATED}</p>
        </header>

        {/* Phones: a folded list of the sections, since the page is many screens long. */}
        <details className="mb-8 rounded-2xl border border-gray-200 sm:hidden">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-bold text-dark">
            On this page
            <span aria-hidden="true" className="text-primary">
              +
            </span>
          </summary>
          <ol className="border-t border-gray-100 px-4 py-2">
            {doc.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex min-h-11 items-center gap-2 text-sm text-gray-700"
                >
                  <span className="text-primary tabular-nums">{i + 1}.</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </details>

        <article>
          {doc.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="scroll-mt-4 pb-8"
              data-legal-section
            >
              <h2
                id={`${section.id}-heading`}
                className="mb-4 flex gap-3 text-2xl font-black tracking-tight text-dark"
              >
                <span className="text-primary tabular-nums">{i + 1}.</span>
                <span>{section.title}</span>
              </h2>
              <div className="space-y-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            </section>
          ))}
        </article>
        <p className="border-t border-gray-100 pt-6 text-center sm:hidden">
          <a
            href="#top"
            className="inline-flex min-h-11 items-center text-sm font-bold text-primary"
          >
            Back to top ↑
          </a>
        </p>
      </div>
    </main>
  );
}
