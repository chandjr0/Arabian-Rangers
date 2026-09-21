import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DesertLine } from "@/components/site/DesertLine";
import { CustomCursor } from "@/components/site/CustomCursor";
import { BrutalButton, Meta } from "@/components/site/primitives";
import { SkipLink } from "@/components/site/SkipLink";
import { RouteProgress } from "@/components/site/RouteProgress";
import { brand } from "@/data/site";
import { organizationJsonLd } from "@/lib/seo";

function NotFoundComponent() {
  useEffect(() => {
    document.title = `Page not found — ${brand.name}`;
  }, []);

  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-20">
      <Meta>Error / 404</Meta>
      <h1 className="display-xl mt-6">
        Lost in
        <br />
        the dunes.
      </h1>
      <p className="mt-8 max-w-md text-sm text-muted-foreground">
        The page you're looking for isn't here.
      </p>
      <div className="mt-10">
        <BrutalButton to="/">Back to base</BrutalButton>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-20">
      <Meta>Error</Meta>
      <h1 className="display-lg mt-6">This page didn't load.</h1>
      <p className="mt-6 max-w-md text-sm text-muted-foreground">
        Something went wrong. Try again or head back to base.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="meta min-h-12 border-2 border-ink bg-ink px-6 py-4 text-bone transition-colors duration-300 hover:bg-signal hover:border-signal"
        >
          Try again
        </button>
        <Link
          to="/"
          className="meta min-h-12 border-2 border-ink px-6 py-4 transition-colors duration-300 hover:bg-ink hover:text-bone"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arabian Rangers Tourism — Experience the Magic of the UAE" },
      {
        name: "description",
        content:
          "Desert safaris, city tours, buggy rides and UAE adventures with Arabian Rangers Tourism.",
      },
      {
        name: "keywords",
        content:
          "Arabian Rangers Tourism, UAE tourism, desert safari Dubai, Abu Dhabi city tour, Dubai city tour, dune buggy UAE",
      },
      { name: "author", content: brand.name },
      { name: "theme-color", content: "#1c1810" },
      { name: "color-scheme", content: "light" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: brand.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_AE" },
      { property: "og:image", content: "/og.jpg" },
      { property: "og:image:alt", content: `${brand.name} — UAE desert safari` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <SkipLink />
      <RouteProgress />
      <CustomCursor />
      <Nav />
      <main id="main-content" key={pathname} className="page-enter min-h-[60vh] pb-24" tabIndex={-1}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <DesertLine />
      <Toaster />
    </QueryClientProvider>
  );
}
