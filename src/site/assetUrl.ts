/**
 * Public-file URLs that respect the site's base path.
 *
 * - Project-site builds serve the site from a sub-path (e.g. "/archive-unpack-and-play/"), set
 *   through Vite's `base` (see vite.config.ts), so "/images/logo.png" becomes
 *   "/archive-unpack-and-play/images/logo.png" there.
 * - The custom domain (newweb.aptcoder.com) serves the site from the root. Its build uses an
 *   empty base (a base of "/" stops the home page being pre-rendered), and Vite reports that as
 *   the relative base "./". A relative "./images/logo.png" only works on the home page: on
 *   /school/ it asks for /school/images/logo.png, which does not exist, so the header logo (and
 *   every other image) went missing on pages opened directly. A relative base therefore means
 *   the domain root, and paths stay absolute ("/images/logo.png").
 */
export function siteBase(baseUrl: string): string {
  if (baseUrl === "" || baseUrl === "./" || baseUrl === "/") return "";
  return baseUrl.replace(/\/$/, "");
}

const BASE = siteBase(import.meta.env.BASE_URL ?? "/");

export function assetUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${BASE}${path}`;
}
