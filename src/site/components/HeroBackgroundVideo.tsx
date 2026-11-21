import { useEffect, useRef } from "react";
import { assetUrl } from "@/site/assetUrl";

export const HERO_VIDEO_SRC = assetUrl("/videos/APTbackvideo.mp4");
/** The background video plays from this width up; narrower screens show the poster. */
export const HERO_VIDEO_MEDIA = "(min-width: 768px)";
export const HERO_POSTER_SRC = assetUrl("/videos/APTbackvideo-poster.jpg");

/**
 * Full-bleed background video for the homepage hero, with the white overlays that keep the
 * foreground text readable. Purely decorative: hidden from assistive technology.
 *
 * - Muted, looping, inline autoplay (no sound track, so browsers allow it).
 * - The poster frame sits behind the video, so there is always a picture: while loading,
 *   when autoplay is blocked (e.g. battery saver) and for reduced-motion users.
 * - Reduced motion: the video is paused and hidden; only the still poster shows.
 * - Pauses when the hero scrolls out of view to save battery and CPU.
 */
export default function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;

    const sync = () => {
      if (motion.matches || !visible) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay refused: the poster frame remains as a static fallback.
        });
      }
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            visible = entry?.isIntersecting ?? true;
            sync();
          })
        : null;
    observer?.observe(video);
    motion.addEventListener("change", sync);
    sync();
    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-cover bg-[position:62%_center] lg:bg-[position:center_45%]"
      style={{ backgroundImage: `url(${HERO_POSTER_SRC})` }}
    >
      <video
        ref={videoRef}
        className="hero-video h-full w-full object-cover object-[62%_center] lg:object-[center_45%]"
        poster={HERO_POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
      >
        {/* Phones (below 768px) get no source, so the ~1 MB video is never downloaded there;
            the poster shows instead (the text area is washed almost white on phones anyway). */}
        <source src={HERO_VIDEO_SRC} type="video/mp4" media={HERO_VIDEO_MEDIA} />
      </video>
      {/* 1. Soft white wash over the whole video: bright, calm, on-brand. */}
      <div className="absolute inset-0 bg-white/45 lg:bg-white/35" />
      {/* 2a. Text protection (phones and tablets): content is stacked, with the text in the top
              ~60% of the hero, so protect top-down and let the video show more around the
              camp card below. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.88) 62%, rgba(255,255,255,0.5) 74%, rgba(255,255,255,0.2) 100%)",
        }}
      />
      {/* 2. Text protection (desktop): near-solid behind the text column, which ends at about
             53% of the width, then fading out across the centre. Measured against every part of
             the video: the orange headline stays at 3:1 contrast or better on all frames. */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.93) 42%, rgba(255,255,255,0.82) 58%, rgba(255,255,255,0.3) 74%, rgba(255,255,255,0) 86%)",
        }}
      />
      {/* 3. Fade into the white section below for a clean transition. */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
