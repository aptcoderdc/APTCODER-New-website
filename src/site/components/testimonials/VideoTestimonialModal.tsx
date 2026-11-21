import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { VideoTestimonial } from "@/site/data/testimonials";

/**
 * On-page player for a video testimonial. The <video> only exists while the modal is open, so
 * nothing is downloaded until a visitor chooses a video, and closing it stops playback. Radix
 * closes it on Escape and on a click outside, and restores page scrolling when it closes.
 */
export default function VideoTestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: VideoTestimonial | null;
  onClose: () => void;
}) {
  if (!testimonial) return null;
  const ratio = testimonial.width / testimonial.height;

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-gray-950/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          aria-describedby={undefined}
          // As tall as the screen allows (leaving room for the title row), never wider than it.
          style={{ width: `min(calc((100dvh - 8rem) * ${ratio}), calc(100vw - 2rem), 36rem)` }}
        >
          <div className="mb-3 flex w-full items-center justify-between gap-4">
            <div className="min-w-0 text-white">
              <p className="text-[11px] sm:text-[10px] font-black tracking-widest text-orange-300">
                {testimonial.label}
              </p>
              <DialogPrimitive.Title className="text-sm font-bold leading-snug sm:text-base">
                {testimonial.speaker}
              </DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-dark shadow-lg transition-colors hover:bg-peach hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>
          <div
            className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl"
            style={{ aspectRatio: `${testimonial.width} / ${testimonial.height}` }}
          >
            <video
              className="h-full w-full bg-black object-contain"
              src={testimonial.video}
              poster={testimonial.poster}
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload"
              data-testid="testimonial-video"
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
