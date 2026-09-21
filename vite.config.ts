// This helper already includes TanStack Start, React, Tailwind, path aliases,
// and Nitro. Do not add those plugins again or the app will fail with duplicates.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { buildSitemapXml } from "./src/lib/sitemap";

function sitemapOrigin(req: { headers: { host?: string; [key: string]: unknown } }) {
  const host = typeof req.headers.host === "string" ? req.headers.host : "localhost:3000";
  const protoHeader = req.headers["x-forwarded-proto"];
  const proto = typeof protoHeader === "string" ? protoHeader.split(",")[0] : "http";
  return `${proto}://${host}`;
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      {
        name: "sitemap-xml",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const path = req.url?.split("?")[0];
            if (path !== "/sitemap.xml") {
              next();
              return;
            }
            const xml = buildSitemapXml(sitemapOrigin(req));
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/xml; charset=utf-8");
            res.end(xml);
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            const path = req.url?.split("?")[0];
            if (path !== "/sitemap.xml") {
              next();
              return;
            }
            const xml = buildSitemapXml(sitemapOrigin(req));
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/xml; charset=utf-8");
            res.end(xml);
          });
        },
      },
    ],
  },
});
