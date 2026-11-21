export type Stat = { icon: string; num: string; label: string };

/**
 * Impact numbers ("500+ Partner Schools"), shared by the School and About pages.
 *
 * - "cards" (School): white cards. Phones show one card per row with the icon beside the
 *   number, so long numbers such as "2,00,000+" always fit; from 640px it is the original
 *   two/four-column grid of centred cards.
 * - "plain" (About): centred icon, number and label with no card. On phones (two columns) an
 *   odd last stat spans both columns instead of sitting alone on the left.
 *
 * min-w-0 and break-words keep a long number from ever widening the page.
 */
export default function StatGrid({
  stats,
  variant,
}: {
  stats: readonly Stat[];
  variant: "cards" | "plain";
}) {
  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex min-w-0 items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-sm sm:block sm:p-7 sm:text-center"
          >
            <div className="shrink-0 text-3xl sm:mb-3" aria-hidden="true">
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="break-words text-3xl font-black text-[#E8401C] sm:mb-1 sm:text-4xl">
                {s.num}
              </p>
              <p className="text-sm font-medium text-gray-600">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const oddLast = stats.length % 2 === 1;
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s, index) => (
        <div
          key={s.label}
          className={`min-w-0 text-center ${oddLast && index === stats.length - 1 ? "max-sm:col-span-2" : ""}`}
        >
          <div
            className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF5F2] text-2xl"
            aria-hidden="true"
          >
            {s.icon}
          </div>
          <p className="break-words text-3xl font-black text-gray-900">{s.num}</p>
          <p className="mt-1 text-sm text-gray-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
