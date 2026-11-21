export type SitePage = {
  path: string;
  indexable: boolean;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export function sitePages(): SitePage[];
export function siteUrl(): string;
