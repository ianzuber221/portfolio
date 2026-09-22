export const DEFAULT_SITE_URL =
  "https://portfolio-ianzuber221s-projects.vercel.app";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}
