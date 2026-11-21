/*
 * Mobile layout check: loads every page of the site at phone, tablet and small-desktop widths
 * and reports what breaks the mobile layout.
 *
 * How to run: start the dev server (`npm run dev`, http://localhost:8080), open any page of it in
 * a browser, and paste this whole file into the developer console (or have Claude run it in the
 * preview browser). It loads each page in a hidden frame of each width, so the real CSS
 * breakpoints apply. It takes about a minute; the result is printed as a table and kept in
 * `window.__layoutCheck`.
 *
 * Fails (must be fixed before a commit):
 *   - overflow: the page is wider than the screen, so it scrolls sideways (and phones zoom out).
 *   - tiny text: visible text under 11px on screens below 1024px (desktop keeps its own design).
 * Warnings (worth a look; some are known and accepted):
 *   - small targets: buttons, links and fields under 44px in either direction on screens below
 *     1024px. Links inside sentences and the footer's text links are not counted.
 */
(async () => {
  const PAGES = [
    "/",
    "/courses",
    "/courses/coding-fundamentals-crs-001",
    "/vernatics",
    "/school",
    "/about",
    "/careers",
    "/contact",
    "/c-nat",
    "/privacy-policy",
  ];
  const WIDTHS = [320, 360, 375, 390, 430, 768, 1024];
  const MIN_TEXT_PX = 11;
  const MIN_TARGET_PX = 44;

  const describe = (el) => {
    const text = (el.innerText || el.getAttribute("aria-label") || el.alt || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 40);
    return `${el.tagName.toLowerCase()}${text ? ` "${text}"` : ""}`;
  };

  const loadFrame = (path, width) =>
    new Promise((resolve) => {
      const frame = document.createElement("iframe");
      frame.style.cssText = `position:fixed;left:0;top:0;width:${width}px;height:800px;border:0;opacity:0.01;z-index:99999;pointer-events:none`;
      frame.onload = () => setTimeout(() => resolve(frame), 1200);
      frame.src = path;
      document.body.appendChild(frame);
    });

  const rows = [];
  for (const width of WIDTHS) {
    for (const path of PAGES) {
      const frame = await loadFrame(path, width);
      const doc = frame.contentDocument;
      const win = frame.contentWindow;
      const visible = (el) => {
        const style = win.getComputedStyle(el);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          el.getClientRects().length > 0 &&
          !el.closest('[aria-hidden="true"]')
        );
      };

      const overflow = doc.documentElement.scrollWidth - doc.documentElement.clientWidth;

      const tinyText = [];
      for (const el of width < 1024 ? doc.body.querySelectorAll("*") : []) {
        const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (!ownText || !visible(el)) continue;
        const size = parseFloat(win.getComputedStyle(el).fontSize);
        if (size < MIN_TEXT_PX) tinyText.push(`${size}px ${describe(el)}`);
      }

      const smallTargets = [];
      if (width < 1024) {
        for (const el of doc.querySelectorAll("a, button, input, select, textarea, summary")) {
          if (!visible(el) || el.name === "website" || el.type === "hidden") continue;
          if (el.closest("p, footer li, footer p")) continue; // links inside text
          const box = el.getBoundingClientRect();
          if (box.width === 0) continue;
          if (box.width < MIN_TARGET_PX || box.height < MIN_TARGET_PX) {
            smallTargets.push(`${Math.round(box.width)}x${Math.round(box.height)} ${describe(el)}`);
          }
        }
      }

      rows.push({
        width,
        page: path,
        overflow: overflow > 0 ? `+${overflow}px` : "",
        tinyText: tinyText.length,
        smallTargets: smallTargets.length,
        screens: +(doc.documentElement.scrollHeight / 800).toFixed(1),
        details: { tinyText: [...new Set(tinyText)].slice(0, 8), smallTargets: smallTargets.slice(0, 8) },
      });
      frame.remove();
    }
  }

  const failures = rows.filter((r) => r.overflow || r.tinyText);
  window.__layoutCheck = { rows, failures };
  console.table(rows.map(({ details, ...row }) => row));
  console.log(
    failures.length
      ? `Layout check: ${failures.length} failing page/width combinations (see window.__layoutCheck.failures).`
      : "Layout check passed: no sideways scrolling at any width and no text under 11px below 1024px.",
  );
  return window.__layoutCheck;
})();
