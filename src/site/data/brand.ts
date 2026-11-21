import { assetUrl } from "@/site/assetUrl";

/** Official APTCODER logo (transparent PNG). Use this everywhere the logo appears. */
export const aptcoderLogo = {
  src: assetUrl("/images/brand/aptcoder_logo.png"),
  /**
   * The logo is shown at most about 142px wide (40px tall), so browsers pick the 440px copy
   * (28 KB, sharp up to 3x screens) instead of the 1463px original (88 KB). Regenerate it after
   * changing the logo: sips --resampleWidth 440 aptcoder_logo.png --out aptcoder_logo-440.png
   */
  srcSet: `${assetUrl("/images/brand/aptcoder_logo-440.png")} 440w, ${assetUrl("/images/brand/aptcoder_logo.png")} 1463w`,
  sizes: "142px",
  alt: "APTCODER – access the potential",
  /** Intrinsic size of the file; keeps the aspect ratio exact (about 3.5 : 1; includes the ® mark). */
  width: 1463,
  height: 413,
} as const;
