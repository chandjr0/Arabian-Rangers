import { brand, social } from "@/data/site";

export const DEFAULT_KEYWORDS =
  "Arabian Rangers Tourism, UAE tourism, desert safari Dubai, Abu Dhabi city tour, Dubai city tour, dune buggy UAE, desert camp, UAE adventures, travel arrangements UAE";

export const OG_IMAGE = "/og.jpg";
export const OG_IMAGE_ALT = `${brand.name} — a 4x4 on a dune crest in the UAE desert at sunset`;

export function getSiteOrigin(requestUrl?: string): string {
  const envUrl = import.meta.env["VITE_SITE_URL"];
  if (typeof envUrl === "string" && envUrl.trim()) {
    return envUrl.replace(/\/$/, "");
  }
  if (requestUrl) {
    try {
      return new URL(requestUrl).origin;
    } catch {
      /* ignore malformed */
    }
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

export function absoluteUrl(path: string, origin = getSiteOrigin()): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return origin ? `${origin}${normalized}` : normalized;
}

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: unknown;
};

export function pageHead(seo: PageSeoInput) {
  const canonical = absoluteUrl(seo.path);
  const image = absoluteUrl(seo.image ?? OG_IMAGE);
  const keywords = seo.keywords ?? DEFAULT_KEYWORDS;
  const robots = seo.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "keywords", content: keywords },
      { name: "author", content: brand.name },
      { name: "robots", content: robots },
      { name: "googlebot", content: robots },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: seo.type ?? "website" },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: brand.name },
      { property: "og:locale", content: "en_AE" },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: seo.jsonLd
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify(seo.jsonLd),
          },
        ]
      : [],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${absoluteUrl("/")}#organization`,
        name: brand.name,
        alternateName: brand.short,
        slogan: brand.tagline,
        url: absoluteUrl("/") || "/",
        image: absoluteUrl(OG_IMAGE),
        logo: absoluteUrl("/logo.png"),
        sameAs: social
          .map((item) => item.href)
          .filter((href): href is string => typeof href === "string" && href.length > 0),
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
        founder: { "@type": "Person", name: brand.founder, jobTitle: brand.founderRole },
        address: { "@type": "PostalAddress", addressCountry: "AE" },
        knowsAbout: [
          "Desert safari",
          "Dubai city tours",
          "Abu Dhabi city tours",
          "Dune buggy rides",
          "UAE travel arrangements",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        name: brand.name,
        url: absoluteUrl("/") || "/",
        inLanguage: "en",
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
      },
    ],
  };
}
