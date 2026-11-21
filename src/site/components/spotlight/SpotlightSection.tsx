import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Newspaper, ZoomIn } from "lucide-react";
import { newsEntries, type ImageNewsEntry, type NewsEntry } from "@/site/data/news";
import PressViewer from "./PressViewer";

const cardClass =
  "group flex h-full w-[17rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-[0_2px_10px_-4px_rgba(17,24,39,0.12)] transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_14px_30px_-14px_rgba(17,24,39,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-[18.5rem]";

function Thumbnail({ entry }: { entry: NewsEntry }) {
  if (!entry.thumbnail) {
    // No matching image was supplied: a clean text panel rather than an unrelated picture.
    return (
      <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-peach px-6 text-center">
        <Newspaper className="h-6 w-6 text-primary" aria-hidden="true" />
        <p className="text-base font-black leading-tight text-dark">{entry.publicationName}</p>
      </div>
    );
  }
  return (
    <div className="aspect-[16/10] overflow-hidden bg-gray-100">
      <img
        src={entry.thumbnail}
        alt={entry.thumbnailAlt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        style={{ objectPosition: entry.thumbnailPosition ?? "center" }}
      />
    </div>
  );
}

function CardBody({ entry }: { entry: NewsEntry }) {
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="min-w-0 text-xs leading-snug font-black tracking-widest text-dark uppercase">
          {entry.publicationName}
        </p>
        <span className="shrink-0 rounded-full bg-peach px-2 py-0.5 text-[11px] sm:text-[10px] font-bold text-primary">
          {entry.kind}
        </span>
      </div>
      <h3 className="line-clamp-3 text-[15px] font-bold leading-snug text-gray-800">
        {entry.headline}
      </h3>
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <span className="text-xs font-semibold text-gray-400">{entry.publicationDate ?? ""}</span>
        {entry.type === "online" ? (
          <span className="inline-flex items-center gap-1 text-xs font-black text-primary">
            Read Article <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-black text-primary">
            <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" /> View Coverage
          </span>
        )}
      </div>
    </div>
  );
}

function NewsCard({
  entry,
  hidden = false,
  onOpen,
}: {
  entry: NewsEntry;
  /** The duplicate set that makes the loop seamless: clickable, but skipped by keyboard and screen readers. */
  hidden?: boolean;
  onOpen: (entry: ImageNewsEntry) => void;
}) {
  const a11y = hidden ? { tabIndex: -1 } : {};
  if (entry.type === "online") {
    return (
      <a
        href={entry.articleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        aria-label={
          hidden ? undefined : `${entry.headline}, ${entry.publicationName} (opens in a new tab)`
        }
        data-news-id={entry.id}
        {...a11y}
      >
        <Thumbnail entry={entry} />
        <CardBody entry={entry} />
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onOpen(entry)}
      className={cardClass}
      aria-haspopup="dialog"
      aria-label={hidden ? undefined : `View coverage: ${entry.headline}, ${entry.publicationName}`}
      data-news-id={entry.id}
      {...a11y}
    >
      <Thumbnail entry={entry} />
      <CardBody entry={entry} />
    </button>
  );
}

function CardGroup({ copy, onOpen }: { copy: boolean; onOpen: (entry: ImageNewsEntry) => void }) {
  return (
    <ul
      className="spotlight-strip-group flex shrink-0 items-stretch"
      aria-hidden={copy || undefined}
      data-copy={copy || undefined}
    >
      {newsEntries.map((entry) => (
        <li key={entry.id} className="spotlight-strip-item flex shrink-0 px-2.5 py-3">
          <NewsCard entry={entry} hidden={copy} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}

/** Continuous movement speed, in pixels per second (one full lap of six cards ≈ 70 s). */
const SPEED_PX_PER_S = 27;
/** After a swipe or an arrow press, carry on moving after this long. */
const RESUME_AFTER_MS = 2500;

/** Width of one full set of cards: scrolling past it wraps back seamlessly onto the copy. */
function lapWidth(el: HTMLElement | null) {
  return el?.querySelector<HTMLElement>(".spotlight-strip-group")?.offsetWidth ?? 0;
}

/** One card plus its spacing: one arrow step. */
function cardWidth(el: HTMLElement | null) {
  return el?.querySelector<HTMLElement>(".spotlight-strip-item")?.offsetWidth || 300;
}

/** Keep a position inside the first lap (the second set looks identical, so there is no jump). */
function wrap(el: HTMLElement | null, value: number) {
  const lap = lapWidth(el);
  if (!lap) return value;
  return ((value % lap) + lap) % lap;
}

export default function SpotlightSection() {
  const [open, setOpen] = useState<ImageNewsEntry | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  /** Exact scroll position (fractional), so slow movement is smooth rather than rounded away. */
  const position = useRef(0);
  const hovered = useRef(false);
  const holdUntil = useRef(0);

  const hold = (ms = RESUME_AFTER_MS) => {
    holdUntil.current = performance.now() + ms;
  };

  const onArrow = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const step = cardWidth(el);
    // Start from a wrapped position so "previous" works from the very first card too.
    const from = wrap(el, el.scrollLeft);
    const start = direction === -1 && from < step ? from + lapWidth(el) : from;
    el.scrollLeft = start;
    position.current = start;
    const target = (Math.round(start / step) + direction) * step;
    hold(RESUME_AFTER_MS + 600);
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  // Continuous movement, driven frame by frame so arrows and swipes can work alongside it.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduceMotion) return;
    let frame = 0;
    let last = performance.now();
    let visible = true;
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            visible = entry?.isIntersecting ?? true;
          });
    observer?.observe(el);

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      if (visible && !hovered.current && now >= holdUntil.current) {
        // Pick up from wherever an arrow or swipe left the strip.
        if (Math.abs(el.scrollLeft - position.current) > 2) position.current = el.scrollLeft;
        position.current = wrap(el, position.current + (SPEED_PX_PER_S * dt) / 1000);
        el.scrollLeft = position.current;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-dark shadow-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <section className="bg-white py-12 sm:py-20" aria-labelledby="spotlight-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 sm:mb-8">
          <div className="min-w-0">
            <div className="section-label mb-3">APTCODER IN THE SPOTLIGHT</div>
            <h2 id="spotlight-heading" className="mb-3 text-3xl font-black text-dark sm:text-4xl">
              From India to the World
            </h2>
            {/* One line on desktop (about 790px at 16px); wraps naturally on smaller screens. */}
            <p className="max-w-4xl text-sm text-gray-500 sm:text-base">
              Discover APTCODER’s media features, institutional milestones and growing impact in
              technology education.
            </p>
          </div>
          <div className="flex shrink-0 gap-2.5">
            <button
              type="button"
              onClick={() => onArrow(-1)}
              aria-label="Previous article"
              aria-controls="spotlight-strip"
              className={arrowClass}
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onArrow(1)}
              aria-label="Next article"
              aria-controls="spotlight-strip"
              className={arrowClass}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Continuously moving strip (two identical sets of cards, so the loop has no jump or
          gap). Pauses while hovered or focused; arrows and swipes move it by hand and it then
          carries on. For reduced motion it stays still and moves only with the arrows/swipes. */}
      <div className="mx-auto max-w-7xl sm:px-4 lg:px-6">
        <div
          id="spotlight-strip"
          ref={scroller}
          className="spotlight-strip"
          data-testid="spotlight-strip"
          role="region"
          aria-label="APTCODER news and coverage"
          onMouseEnter={() => (hovered.current = true)}
          onMouseLeave={() => (hovered.current = false)}
          onFocus={() => (hovered.current = true)}
          onBlur={() => (hovered.current = false)}
          onPointerDown={() => hold()}
          onTouchStart={() => hold(60_000)}
          onTouchEnd={() => hold()}
          onWheel={() => hold()}
        >
          <CardGroup copy={false} onOpen={setOpen} />
          <CardGroup copy onOpen={setOpen} />
        </div>
      </div>

      <PressViewer entry={open} onClose={() => setOpen(null)} />
    </section>
  );
}
