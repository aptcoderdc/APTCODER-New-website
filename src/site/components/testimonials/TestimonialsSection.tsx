import { useState } from "react";
import { GraduationCap, Play } from "lucide-react";
import {
  testimonials,
  type QuoteTestimonial,
  type VideoTestimonial,
} from "@/site/data/testimonials";
import VideoTestimonialModal from "./VideoTestimonialModal";
import SwipeRow from "../SwipeRow";

const cardBase =
  "group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-3xl border border-red-100 bg-white shadow-[0_2px_12px_-6px_rgba(17,24,39,0.15)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_40px_-18px_rgba(17,24,39,0.35)]";

function VideoCard({
  testimonial,
  onPlay,
}: {
  testimonial: VideoTestimonial;
  onPlay: (testimonial: VideoTestimonial) => void;
}) {
  return (
    <article className={cardBase}>
      <button
        type="button"
        onClick={() => onPlay(testimonial)}
        aria-haspopup="dialog"
        aria-label={`Play video: ${testimonial.label.toLowerCase()}, ${testimonial.speaker} (${testimonial.duration})`}
        className="relative flex flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        data-testimonial-id={testimonial.id}
      >
        {/* Still frame from the video; the video itself loads only when played. */}
        <img
          src={testimonial.poster}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/25 to-gray-950/10"
        />
        <span className="relative m-4 inline-flex self-start rounded-full bg-white/95 px-3 py-1 text-[11px] lg:text-[10px] font-black tracking-widest text-primary shadow-sm">
          {testimonial.label}
        </span>
        <span
          aria-hidden="true"
          className="relative m-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_30px_-6px_rgba(0,0,0,0.5)] ring-8 ring-white/25 transition-transform duration-200 group-hover:scale-110"
        >
          <Play className="ml-1 h-7 w-7 fill-current" />
        </span>
        <span className="relative flex items-end justify-between gap-3 p-5 pt-10 text-white">
          <span className="text-sm font-bold leading-snug">{testimonial.speaker}</span>
          <span className="shrink-0 rounded-md bg-black/45 px-2 py-0.5 text-xs font-semibold tabular-nums">
            {testimonial.duration}
          </span>
        </span>
      </button>
    </article>
  );
}

function QuoteCard({ testimonial }: { testimonial: QuoteTestimonial }) {
  const approved = testimonial.attributionApproved;
  return (
    <figure className={`${cardBase} p-6 sm:p-7`} data-testimonial-id={testimonial.id}>
      <p className="relative mb-4 text-[11px] lg:text-[10px] font-black tracking-widest text-primary">
        {testimonial.label}
      </p>
      <span
        aria-hidden="true"
        className="relative -mt-2 mb-1 block h-16 select-none font-serif text-[6rem] leading-none text-primary"
      >
        &ldquo;
      </span>
      <blockquote className="relative text-[15px] font-medium leading-relaxed text-gray-700">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="relative mt-auto flex items-center gap-3 border-t border-red-100 pt-5">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-peach text-sm font-black text-primary"
        >
          {approved && !testimonial.avatarIcon ? (
            testimonial.name.charAt(0)
          ) : (
            <GraduationCap className="h-5 w-5" />
          )}
        </span>
        <span className="min-w-0">
          {approved ? (
            <>
              <span className="block text-sm font-black text-dark">{testimonial.name}</span>
              <span className="block text-xs leading-snug text-gray-500">
                {testimonial.role}
                {testimonial.organisation ? `, ${testimonial.organisation}` : ""}
              </span>
            </>
          ) : (
            <span className="block text-sm font-black text-dark">
              {testimonial.anonymousAttribution}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export default function TestimonialsSection() {
  const [playing, setPlaying] = useState<VideoTestimonial | null>(null);

  return (
    <section className="py-12 sm:py-20 bg-peach" aria-labelledby="stories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-9">
          <div className="section-label mb-3">VOICES FROM THE APTCODER ECOSYSTEM</div>
          <h2 id="stories-heading" className="text-3xl sm:text-4xl font-black text-dark mb-3">
            Different Perspectives. One Shared Journey.
          </h2>
          {/* One line on desktop (about 820px at 16px); wraps naturally on smaller screens. */}
          <p className="text-sm sm:text-base text-gray-500 max-w-4xl">
            Hear from the learners, families, educators, schools and partners who experience
            APTCODER in different ways.
          </p>
        </div>
        {/* A swipeable row on phones; the grid from 640px. */}
        <SwipeRow
          label="Testimonials"
          gridClassName="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          items={testimonials.map((testimonial) => ({
            key: testimonial.id,
            node:
              testimonial.type === "video" ? (
                <VideoCard testimonial={testimonial} onPlay={setPlaying} />
              ) : (
                <QuoteCard testimonial={testimonial} />
              ),
          }))}
        />
      </div>
      <VideoTestimonialModal testimonial={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
