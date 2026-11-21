import type { ReactNode } from "react";
import { socialLinks, type SocialPlatform } from "@/site/data/contact";

/**
 * APTCODER's social profiles as brand icons (LinkedIn, Facebook, Instagram, Google Play).
 * Used in the footer ("dark": quiet grey circles that turn orange on hover, as before) and on
 * light pages ("brand": each circle in the platform's own colour).
 * lucide-react has no Google Play icon, so all four glyphs are inline SVGs for a matching set.
 */

const glyphs: Record<SocialPlatform, ReactNode> = {
  linkedin: (
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
    />
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  googleplay: (
    <path
      fill="currentColor"
      d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"
    />
  ),
};

const brandBackground: Record<SocialPlatform, string> = {
  linkedin: "bg-[#0A66C2]",
  facebook: "bg-[#1877F2]",
  instagram: "bg-[linear-gradient(45deg,#F58529_0%,#DD2A7B_55%,#8134AF_100%)]",
  googleplay: "bg-[#01875F]",
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      {glyphs[platform]}
    </svg>
  );
}

export default function SocialLinks({
  variant,
  className = "",
}: {
  variant: "dark" | "brand";
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (opens in a new tab)`}
            title={link.label}
            data-social={link.platform}
            className={
              variant === "dark"
                ? "flex h-11 w-11 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-[#E8401C] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8401C] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                : `flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8401C] focus-visible:ring-offset-2 ${brandBackground[link.platform]}`
            }
          >
            <SocialIcon
              platform={link.platform}
              className={variant === "dark" ? "h-4 w-4" : "h-[18px] w-[18px]"}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
