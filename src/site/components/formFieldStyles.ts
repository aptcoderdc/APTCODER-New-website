/**
 * Text size for every typed form field (input, select, textarea) on the site.
 *
 * Phones get 16px: iOS Safari zooms the whole page in when a field under 16px is focused, and
 * the visitor then has to zoom back out by hand. From 640px the fields keep the original 14px.
 * Use this instead of a plain `text-sm` on any new field.
 */
export const FIELD_TEXT = "text-base sm:text-sm";
