export const sitemapEntries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/experiences", changefreq: "weekly", priority: "0.9" },
  { path: "/experiences/desert-safari", changefreq: "monthly", priority: "0.8" },
  { path: "/experiences/dubai-city-tour", changefreq: "monthly", priority: "0.8" },
  { path: "/experiences/abu-dhabi-city-tour", changefreq: "monthly", priority: "0.8" },
  { path: "/experiences/buggy-rides", changefreq: "monthly", priority: "0.8" },
  { path: "/experiences/uae-adventures", changefreq: "monthly", priority: "0.8" },
  { path: "/experiences/hotel-bookings", changefreq: "monthly", priority: "0.8" },
  { path: "/destinations", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/journal", changefreq: "weekly", priority: "0.7" },
  { path: "/journal/reading-the-dunes", changefreq: "monthly", priority: "0.6" },
  { path: "/journal/the-city-and-the-sand", changefreq: "monthly", priority: "0.6" },
  { path: "/journal/packing-for-the-uae", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.7" },
  { path: "/book", changefreq: "yearly", priority: "0.8" },
] as const;

export function buildSitemapXml(origin: string): string {
  const lastmod = "2026-09-21";
  const base = origin.replace(/\/$/, "");
  const urls = sitemapEntries
    .map((entry) => {
      return `  <url>
    <loc>${base}${entry.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
