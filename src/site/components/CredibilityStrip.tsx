import { partners } from "@/site/data/partners";

/** One full set of logos. Rendered twice so the loop point is never visible. */
function LogoGroup({ copy }: { copy: boolean }) {
  return (
    <ul
      className={`partner-marquee-group flex shrink-0 items-center ${copy ? "partner-marquee-copy" : ""}`}
      aria-hidden={copy || undefined}
    >
      {partners.map((partner) => (
        <li key={partner.name} className="flex shrink-0 items-center px-5 sm:px-7">
          <img
            src={partner.src}
            alt={copy ? "" : partner.fullName}
            width={partner.width}
            height={partner.height}
            // Load up front (lazy loading would make logos pop in mid-scroll), but after the
            // page's main content.
            loading="eager"
            fetchPriority="low"
            decoding="async"
            draggable={false}
            // One shared height; width follows each logo's own proportions. The max widths sit
            // above the widest logo (Kotak BizLabs, about 5.4 : 1) so none is ever clipped.
            className="h-6 w-auto max-w-[9rem] object-contain sm:h-7 sm:max-w-[10rem]"
          />
        </li>
      ))}
    </ul>
  );
}

export default function CredibilityStrip() {
  return (
    <section
      className="border-y border-gray-100 bg-white"
      aria-labelledby="credibility-strip-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
          <h2
            id="credibility-strip-heading"
            className="shrink-0 text-[11px] sm:text-xs font-bold tracking-widest text-gray-500"
          >
            OUR ECOSYSTEM PARTNERS
          </h2>
          <div className="partner-marquee min-w-0 flex-1 overflow-hidden">
            <div className="partner-marquee-track">
              <LogoGroup copy={false} />
              <LogoGroup copy />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
