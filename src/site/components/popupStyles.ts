/**
 * Shared look and behaviour for the site's form popups (Book a Free Class, Join KCC, School
 * Sales Kit, Free Recorded Class). All four are Radix dialogs, so each one keeps focus inside,
 * stops the page behind from scrolling and closes on Escape or a tap on the backdrop.
 *
 * Phones (below 640px): a full-screen sheet that slides up. The close button stays in view
 * while the form scrolls, and the submit button is pinned to the bottom edge.
 * From 640px: a centred card, as before. Each popup adds its own width (e.g. sm:max-w-2xl).
 */

export const POPUP_OVERLAY =
  "fixed inset-0 z-[70] bg-gray-950/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0";

export const POPUP_CONTENT =
  "fixed inset-0 z-[70] h-[100dvh] w-full overflow-y-auto overscroll-contain bg-white outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 max-sm:data-[state=open]:slide-in-from-bottom-10 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[calc(100dvh-1.5rem)] sm:w-[calc(100vw-1.5rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:shadow-[0_30px_80px_-20px_rgba(17,24,39,0.5)] sm:data-[state=open]:zoom-in-95";

/**
 * Wrapper for the close button. Phones: a zero-height bar stuck to the top of the scrolling
 * sheet, so the button never scrolls away. From 640px: the button sits in the card's corner.
 * `order-first` keeps it first in popups that reorder their sections on phones.
 */
export const POPUP_CLOSE_WRAP =
  "sticky top-0 z-20 order-first flex h-0 justify-end sm:absolute sm:right-3 sm:top-3 sm:h-auto";

export const POPUP_CLOSE =
  "mr-3 mt-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm ring-1 ring-black/5 transition-colors hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:m-0 sm:h-9 sm:w-9";

/**
 * Wrapper for a form's submit button. Phones: pinned to the bottom of the sheet with a white
 * bar behind it (pass the form's own horizontal padding as the negative margin, e.g. -mx-6).
 * From 640px: an ordinary block in the form.
 */
export const POPUP_ACTIONS =
  "sticky bottom-0 z-10 border-t border-gray-100 bg-white px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0";
