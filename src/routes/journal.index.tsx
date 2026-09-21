import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { EditorialImage, Meta, Reveal } from "@/components/site/primitives";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const title = "Field Notes — Arabian Rangers Tourism";
const description =
  "Field Notes: desert, city and travel writing from Arabian Rangers Tourism across the United Arab Emirates.";

export const Route = createFileRoute("/journal/")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/journal",
      keywords:
        "UAE travel journal, desert writing, Dubai field notes, Arabian Rangers Tourism, packing for the UAE",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Journal", path: "/journal" },
      ]),
    }),
  component: JournalPage,
});

function JournalPage() {
  return (
    <>
      <PageHero
        label="Arabian Rangers / Journal"
        title="Field notes."
        intro="Short writing from the desert, the cities and the road between them."
        right={String(posts.length).padStart(2, "0")}
      />
      <section className="shell mt-16">
        {posts.map((p) => (
          <Reveal key={p.slug} as="article" className="group border-t-2 border-ink py-10">
            <Link
              to="/journal/$slug"
              params={{ slug: p.slug }}
              data-cursor="READ"
              className="grid gap-6 md:grid-cols-12 md:items-center"
            >
              <div className="flex gap-6 md:col-span-3 md:flex-col md:gap-2">
                <Meta>{p.date}</Meta>
                <Meta>{p.category}</Meta>
              </div>
              <div className="md:col-span-6">
                <h2 className="display-md text-[clamp(1.6rem,4vw,3rem)] transition-transform duration-500 group-hover:translate-x-2">
                  {p.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              </div>
              <div className="md:col-span-3">
                <EditorialImage
                  src={p.image}
                  alt={`${p.title} — ${p.excerpt}`}
                  ratio="aspect-[4/3]"
                  width={1600}
                  height={1100}
                />
              </div>
            </Link>
          </Reveal>
        ))}
        <div className="border-t-2 border-ink" />
      </section>
    </>
  );
}
