import { useRef, useState, type ReactNode } from "react";

/**
 * A list of cards that is a swipeable row on phones and a normal grid from 640px.
 *
 * Phones (below 640px): one card at a time at 85% of the width, so the next card peeks in and
 * shows there is more; cards snap into place and dots under the row show the position.
 * From 640px: the page's own grid (`gridClassName`, e.g. "grid gap-5 sm:grid-cols-2"), unchanged.
 */
export default function SwipeRow({
  items,
  gridClassName,
  label,
}: {
  items: { key: string; node: ReactNode }[];
  gridClassName: string;
  label: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const list = listRef.current;
    const first = list?.firstElementChild as HTMLElement | null;
    if (!list || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0");
    if (step > 0) setActive(Math.min(items.length - 1, Math.round(list.scrollLeft / step)));
  };

  return (
    <div>
      <ul
        ref={listRef}
        aria-label={label}
        onScroll={onScroll}
        className={`${gridClassName} max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:gap-3 max-sm:overflow-x-auto max-sm:overscroll-x-contain max-sm:scroll-px-4 max-sm:px-4 max-sm:pb-1 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden`}
      >
        {items.map((item) => (
          <li key={item.key} className="max-sm:w-[85%] max-sm:shrink-0 max-sm:snap-start">
            {item.node}
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5 sm:hidden" aria-hidden="true">
          {items.map((item, i) => (
            <span
              key={item.key}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-[#E8401C]" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
