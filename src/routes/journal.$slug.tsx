import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { brand, experiences, posts } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { BrutalButton, Meta, Reveal } from "@/components/site/primitives";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Unavailable — Arabian Rangers Tourism",
        description: "This field note is not available.",
        path: `/journal/${params.slug}`,
        noindex: true,
      });
    }
    const t = `${loaderData.post.title} — Field Notes`;
    return pageHead({
      title: t,
      description: loaderData.post.excerpt,
      path: `/journal/${params.slug}`,
      type: "article",
      keywords: `${loaderData.post.title}, ${loaderData.post.category}, UAE travel journal, Arabian Rangers Tourism`,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: loaderData.post.title, path: `/journal/${params.slug}` },
          ]),
          {
            "@type": "Article",
            headline: loaderData.post.title,
            description: loaderData.post.excerpt,
            datePublished: `${loaderData.post.date}-01-01`,
            author: { "@type": "Organization", name: brand.name },
            publisher: { "@type": "Organization", name: brand.name },
          },
        ],
      },
    });
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = experiences.find((e) => e.slug === post.related);

  return (
    <>
      <PageHero
        label={`Field notes / ${post.category}`}
        title={post.title}
        image={post.image}
        alt={`${post.title} — ${post.excerpt}`}
        right={post.date}
      />
      <article className="shell mt-16 grid gap-10 md:mt-20 md:grid-cols-12">
        <div className="md:col-span-3">
          <Meta>{post.category}</Meta>
        </div>
        <div className="md:col-span-8">
          {post.body.map((par, i) => (
            <Reveal key={i}>
              <p className="mb-8 text-lg leading-relaxed">{par}</p>
            </Reveal>
          ))}
          <Reveal className="my-14 border-y-2 border-ink py-10">
            <blockquote>
              <p className="display-md text-[clamp(1.4rem,3.4vw,2.6rem)]">“{post.quote}”</p>
            </blockquote>
          </Reveal>
          {related ? (
            <div className="border-t-2 border-ink pt-8">
              <Meta>Related experience</Meta>
              <h2 className="display-md mt-4 text-[clamp(1.4rem,3vw,2.2rem)]">{related.title}</h2>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/experiences/$slug"
                  params={{ slug: related.slug }}
                  data-cursor="VIEW"
                  className="meta inline-flex min-h-12 items-center gap-3 border-2 border-ink px-6 py-4 transition-[color,background-color,transform] duration-300 hover:-translate-y-px hover:bg-ink hover:text-bone"
                >
                  {`View ${related.title}`} <span aria-hidden>→</span>
                </Link>
                <BrutalButton to="/book" variant="signal">
                  Book an experience
                </BrutalButton>
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </>
  );
}
