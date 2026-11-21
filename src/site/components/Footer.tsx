import { pageHref, sectionIds, type Page, type SiteNavigate } from "../page";
import { useFreeClass } from "./freeClass/FreeClassContext";
import { useKccJoin } from "./kcc/KccContext";
import { CODELY_PORTAL_URL } from "../data/contact";
import { useLanguage } from "./LanguageContext";
import AptcoderLogo from "./AptcoderLogo";
import SocialLinks from "./SocialLinks";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  OFFICE_ADDRESS_LINES,
  OFFICE_MAPS_URL,
} from "../data/contact";

interface FooterProps {
  navigate: SiteNavigate;
}

type FooterLinkTarget =
  | { label: string; page: Page; section?: string; newTab?: boolean }
  | { label: string; external: string }
  | { label: string; action: "kcc" };

const offeringLinks: FooterLinkTarget[] = [
  { label: "Our Courses", page: "courses" },
  { label: "Vernatics (Robotics)", page: "vernatics" },
  { label: "C-NAT Olympiad", page: "cnat" },
  { label: "Kids Coding Community", action: "kcc" },
  { label: "School Partnership", page: "school" },
  { label: "Codely Platform", external: CODELY_PORTAL_URL },
];

const companyLinks: FooterLinkTarget[] = [
  { label: "About Us", page: "about" },
  { label: "Our Team", page: "about", section: sectionIds.meetOurTeam },
  { label: "Careers", page: "careers" },
  { label: "Partner With Us", page: "contact", section: sectionIds.contactForm },
  { label: "Contact Us", page: "contact" },
  // Legal documents open as standalone pages in a new tab.
  { label: "Privacy Policy", page: "privacy", newTab: true },
  { label: "Terms & Conditions", page: "terms", newTab: true },
];

const linkClass = "text-gray-400 text-sm hover:text-white transition-colors text-left";

/** One footer link: a real address, in-site navigation without a full reload, or the KCC popup. */
function FooterLink({
  link,
  navigate,
  openKccJoin,
}: {
  link: FooterLinkTarget;
  navigate: SiteNavigate;
  openKccJoin: () => void;
}) {
  if ("action" in link) {
    return (
      <button type="button" onClick={openKccJoin} aria-haspopup="dialog" className={linkClass}>
        {link.label}
      </button>
    );
  }
  if ("external" in link) {
    return (
      <a
        href={link.external}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.label} (opens in a new tab)`}
        className={linkClass}
      >
        {link.label}
      </a>
    );
  }
  if (link.newTab) {
    return (
      <a href={pageHref(link.page)} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {link.label}
      </a>
    );
  }
  return (
    <a
      href={pageHref(link.page, link.section)}
      onClick={(event) => {
        // Let modified clicks (new tab/window) behave normally.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        navigate(link.page, link.section);
      }}
      className={linkClass}
    >
      {link.label}
    </a>
  );
}

export default function Footer({ navigate }: FooterProps) {
  const { t } = useLanguage();
  const openKccJoin = useKccJoin();
  const openFreeClass = useFreeClass();

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* The logo's lettering is dark grey, so it sits on a white panel on the dark footer. */}
            <button
              onClick={() => navigate("home")}
              className="mb-5 inline-flex items-center rounded-xl bg-white px-3 py-2"
              aria-label="APTCODER home"
            >
              <AptcoderLogo className="h-9" />
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t(
                "Helping children across India explore AI, robotics and coding in a language they understand best.",
                "भारत भर के बच्चों को उनकी सबसे अच्छी समझ वाली भाषा में एआई, रोबोटिक्स और कोडिंग सीखने में मदद करना।",
              )}
            </p>
            <SocialLinks variant="dark" />
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-gray-300 mb-5">
              {t("Our Offerings", "हमारी पेशकश")}
            </h3>
            <ul className="space-y-3">
              {offeringLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} navigate={navigate} openKccJoin={openKccJoin} />
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-gray-300 mb-5">
              {t("Company", "कंपनी")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} navigate={navigate} openKccJoin={openKccJoin} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-gray-300 mb-5">
              {t("Get In Touch", "संपर्क करें")}
            </h3>
            <div className="space-y-4">
              <div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center text-gray-400 text-sm hover:text-white transition-colors max-lg:min-h-11"
                >
                  {CONTACT_EMAIL}
                </a>
                <br />
                <a
                  href={CONTACT_PHONE_HREF}
                  className="inline-flex items-center text-gray-400 text-sm hover:text-white transition-colors lg:mt-1 max-lg:min-h-11"
                >
                  {CONTACT_PHONE}
                </a>
              </div>
              <div>
                <a
                  href={OFFICE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${OFFICE_ADDRESS_LINES.join(", ")} (opens Google Maps in a new tab)`}
                  className="block text-gray-400 text-sm leading-relaxed hover:text-white transition-colors"
                >
                  {OFFICE_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </div>
              {/* Same "Book a Free Class" popup as the homepage buttons (not the Courses page). */}
              <button
                type="button"
                onClick={openFreeClass}
                aria-haspopup="dialog"
                className="inline-block bg-[#E8401C] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#C73516] transition-colors max-lg:min-h-11"
              >
                {t("Book a Free Class →", "मुफ़्त क्लास बुक करें →")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} APTCODER. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
