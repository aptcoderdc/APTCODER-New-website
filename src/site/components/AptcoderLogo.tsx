import { aptcoderLogo } from "@/site/data/brand";

/**
 * The official APTCODER logo. Set the height with `className` (e.g. "h-9"); the width follows
 * the logo's own proportions, so it is never stretched or cropped.
 */
export default function AptcoderLogo({
  className = "h-9",
  eager = false,
}: {
  className?: string;
  /** Load immediately (use for the header logo, which is visible on first paint). */
  eager?: boolean;
}) {
  return (
    <img
      src={aptcoderLogo.src}
      srcSet={aptcoderLogo.srcSet}
      sizes={aptcoderLogo.sizes}
      alt={aptcoderLogo.alt}
      width={aptcoderLogo.width}
      height={aptcoderLogo.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={`w-auto max-w-none object-contain ${className}`}
    />
  );
}
