import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { sectionIds, type Page, type SiteNavigate } from "../page";
import { SIGN_IN_URL, SIGN_UP_URL } from "../data/contact";
import { useLanguage } from "./LanguageContext";
import AptcoderLogo from "./AptcoderLogo";

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

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={
              mobileOpen ? t("Close menu", "मेनू बंद करें") : t("Open menu", "मेनू खोलें")
            }
            aria-expanded={mobileOpen}
            className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center text-gray-600"
          >
            {mobileOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex items-center justify-between px-2 pb-3 mb-1 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500">{t("Language", "भाषा")}</span>
              {languageToggle(true)}
            </div>
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  navigate(link.page);
                  setMobileOpen(false);
                }}
                className={`block w-full text-left px-2 py-3 text-sm font-medium ${
                  currentPage === link.page ? "text-[#E8401C]" : "text-gray-700"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
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
          </div>
        )}
      </div>
    </nav>
  );
}
