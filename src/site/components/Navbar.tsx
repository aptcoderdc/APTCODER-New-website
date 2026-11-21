import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useLocation } from "@tanstack/react-router";
import { sectionIds, type Page, type SiteNavigate } from "../page";
import { SIGN_IN_URL, SIGN_UP_URL } from "../data/contact";
import { useLanguage } from "./LanguageContext";
import AptcoderLogo from "./AptcoderLogo";
import { useKccJoin } from "./kcc/KccContext";
import { useFreeClass } from "./freeClass/FreeClassContext";

interface NavbarProps {
  currentPage: Page;
  navigate: SiteNavigate;
}

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, hash } = useLocation();
  // Close the mobile menu whenever the visitor goes to another page or section (from any link).
  useEffect(() => setMobileOpen(false), [pathname, hash]);
  const { language, setLanguage, t } = useLanguage();

  const links: { label: string; page: Page }[] = [
    { label: t("Courses", "कोर्स"), page: "courses" },
    { label: t("School", "स्कूल"), page: "school" },
    { label: t("About", "हमारे बारे में"), page: "about" },
    { label: t("Contact Us", "संपर्क"), page: "contact" },
    { label: t("Careers", "करियर"), page: "careers" },
  ];

  const openKccJoin = useKccJoin();
  const openFreeClass = useFreeClass();
  /** Menu choice: close the menu, then go. */
  const go = (page: Page, section?: string) => {
    setMobileOpen(false);
    navigate(page, section);
  };
  const pageItem = (label: string, page: Page) => ({
    label,
    current: currentPage === page,
    onSelect: () => go(page),
  });
  const menuGroups = [
    {
      title: t("Explore", "देखें"),
      items: [
        pageItem(t("Courses", "कोर्स"), "courses"),
        pageItem(t("Vernatics (Robotics)", "Vernatics (रोबोटिक्स)"), "vernatics"),
        pageItem(t("C-NAT Olympiad", "C-NAT ओलंपियाड"), "cnat"),
        {
          label: t("Kids Coding Community", "किड्स कोडिंग कम्युनिटी"),
          current: false,
          onSelect: () => {
            setMobileOpen(false);
            openKccJoin();
          },
        },
      ],
    },
    {
      title: t("Company", "कंपनी"),
      items: [
        pageItem(t("School", "स्कूल"), "school"),
        pageItem(t("About", "हमारे बारे में"), "about"),
        pageItem(t("Contact Us", "संपर्क"), "contact"),
        pageItem(t("Careers", "करियर"), "careers"),
      ],
    },
  ];

  // The menu version (below 1024px) has larger buttons for touch.
  const languageToggle = (touch: boolean) => (
    <div
      className="inline-flex items-center rounded-full bg-gray-100 p-1"
      aria-label="Website language"
    >
      {(["en", "hi"] as const).map((item) => (
        <button
          key={item}
          onClick={() => setLanguage(item)}
          className={`rounded-full text-xs font-bold transition-colors ${
            touch ? "min-h-10 min-w-12 px-3.5" : "px-2.5 py-1"
          } ${language === item ? "bg-white text-[#E8401C] shadow-sm" : "text-gray-500"}`}
          aria-pressed={language === item}
        >
          {item === "en" ? "EN" : "हिं"}
        </button>
      ))}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center shrink-0"
            aria-label="APTCODER home"
          >
            {/* The full menu shows from 1024px; narrower screens use the menu button. */}
            <AptcoderLogo className="h-9 lg:h-10" eager />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`nav-link text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? "text-[#E8401C] active"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {languageToggle(false)}
            {/* Search: the course catalogue's search box is the site's search. */}
            <button
              type="button"
              onClick={() => navigate("courses", sectionIds.courseSearch)}
              aria-label={t("Search courses", "कोर्स खोजें")}
              title={t("Search courses", "कोर्स खोजें")}
              className="p-2 text-gray-500 hover:text-gray-800"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            {/* Sign in and sign up happen on APTCODER's coding platform (opened in a new tab). */}
            <a
              href={SIGN_IN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-800 border border-gray-300 rounded-full px-4 py-2 hover:border-gray-500 transition-colors"
            >
              {t("Sign In", "साइन इन")}
            </a>
            <a
              href={SIGN_UP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white bg-[#E8401C] rounded-full px-5 py-2 hover:bg-[#C73516] transition-colors"
            >
              {t("Join for Free", "मुफ़्त जुड़ें")}
            </a>
          </div>

          {/* Mobile menu button (below 1024px) */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={t("Open menu", "मेनू खोलें")}
            aria-expanded={mobileOpen}
            aria-haspopup="dialog"
            className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center text-gray-600"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu: a full-height panel over the page (below 1024px). Radix keeps focus inside,
          stops the page behind from scrolling and closes on Escape or a tap on the backdrop. */}
      <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-gray-950/50 backdrop-blur-sm lg:hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed inset-y-0 right-0 z-[60] flex w-full flex-col bg-white shadow-2xl outline-none sm:max-w-sm lg:hidden data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
          >
            <DialogPrimitive.Title className="sr-only">{t("Menu", "मेनू")}</DialogPrimitive.Title>
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-4 sm:px-6">
              <button
                type="button"
                onClick={() => go("home")}
                className="flex items-center"
                aria-label="APTCODER home"
              >
                <AptcoderLogo className="h-9" />
              </button>
              <DialogPrimitive.Close
                aria-label={t("Close menu", "मेनू बंद करें")}
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </DialogPrimitive.Close>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openFreeClass();
                }}
                aria-haspopup="dialog"
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#E8401C] px-6 font-bold text-white hover:bg-[#C73516]"
              >
                {t("Book a Free Class", "मुफ़्त क्लास बुक करें")}{" "}
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </button>
              {/* Looks like a search box; opens the course catalogue's search, like the desktop icon. */}
              <button
                type="button"
                onClick={() => go("courses", sectionIds.courseSearch)}
                className="mt-3 flex min-h-12 w-full items-center gap-3 rounded-full border border-gray-200 px-4 text-left text-gray-400"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                {t("Search courses", "कोर्स खोजें")}
              </button>

              {menuGroups.map((group) => (
                <div key={group.title} className="mt-6">
                  <p className="px-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                    {group.title}
                  </p>
                  <ul className="mt-1">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={item.onSelect}
                          aria-current={item.current ? "page" : undefined}
                          className={`flex min-h-12 w-full items-center justify-between rounded-xl px-1 text-left text-base font-semibold ${
                            item.current ? "text-[#E8401C]" : "text-gray-800"
                          }`}
                        >
                          {item.label}
                          <span aria-hidden="true" className="text-gray-300">
                            ›
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                <span className="text-sm font-semibold text-gray-500">{t("Language", "भाषा")}</span>
                {languageToggle(true)}
              </div>
            </div>

            <div className="flex shrink-0 gap-3 border-t border-gray-100 px-4 py-4 sm:px-6">
              <a
                href={SIGN_IN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 flex-1 items-center justify-center text-center text-sm font-semibold text-gray-800 border border-gray-300 rounded-full px-4 py-2"
              >
                {t("Sign In", "साइन इन")}
              </a>
              <a
                href={SIGN_UP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 flex-1 items-center justify-center text-center text-sm font-semibold text-white bg-[#E8401C] rounded-full px-4 py-2"
              >
                {t("Join for Free", "मुफ़्त जुड़ें")}
              </a>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </nav>
  );
}
