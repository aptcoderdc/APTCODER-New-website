import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { pageHref, type Page, type SiteNavigate } from "../page";

/**
 * A link to a site page. It is a real <a href> (search engines follow it, and it can be opened
 * in a new tab), while a normal click still moves within the site without a full page load.
 */
export default function PageLink({
  page,
  section,
  navigate,
  onNavigate,
  children,
  ...rest
}: {
  page: Page;
  section?: string;
  navigate: SiteNavigate;
  /** Runs before navigating on a normal click (e.g. closes the mobile menu). */
  onNavigate?: () => void;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab/window) behave as normal links.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onNavigate?.();
    navigate(page, section);
  };
  return (
    <a href={pageHref(page, section)} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
