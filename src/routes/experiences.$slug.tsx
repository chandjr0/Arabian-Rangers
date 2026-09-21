import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { experiences } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { BrutalButton, EditorialImage, Meta, Reveal } from "@/components/site/primitives";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/experiences/$slug")({
  loader: ({ params }) => {
    const exp = experiences.find((e) => e.slug === params.slug);
    if (!exp) throw notFound();
    return { exp };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Unavailable — Arabian Rangers Tourism",
        description: "This experience is not available.",
        path: `/experiences/${params.slug}`,
        noindex: true,
      });
    }
    const t = `${loaderData.exp.title} — Arabian Rangers Tourism`;
    return pageHead({
      title: t,
      description: loaderData.exp.summary,
      path: `/experiences/${params.slug}`,
      type: "article",
      keywords: `${loaderData.exp.title}, ${loaderData.exp.kind}, ${loaderData.exp.location}, Arabian Rangers Tourism, UAE tourism`,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Experiences", path: "/experiences" },
            { name: loaderData.exp.title, path: `/experiences/${params.slug}` },
          ]),
          {
            "@type": "TouristTrip",
            name: loaderData.exp.title,
            description: loaderData.exp.summary,
            touristType: loaderData.exp.kind,
            itinerary: {
              "@type": "Place",
              name: loaderData.exp.location,
            },
          },
        ],
      },
    });
  },
  component: ExperienceDetail,
});

function ExperienceDetail() {
  const { exp } = Route.useLoaderData();
  const others = experiences.filter((e) => e.slug !== exp.slug).slice(0, 3);

  return (
    <>
      <PageHero
        label={`Experience / ${exp.kind}`}
        title={exp.heroLine}
        intro={exp.intro}
        image={exp.image}
        alt={`${exp.title} in ${exp.location}`}
        right={exp.coords}
      />

      <section className="shell mt-20 grid gap-10 md:mt-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="meta text-muted-foreground">Highlights</h2>
        </div>
        <div className="md:col-span-8">
          {exp.highlights.map((h) => (
            <Reveal key={h.label} className="border-t-2 border-ink py-8">
              <h3 className="display-md text-[clamp(1.4rem,3vw,2.4rem)]">{h.label}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{h.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell mt-24">
        <Reveal className="border-y-2 border-ink py-16">
          <p className="display-md max-w-[18ch]">
            Tell us your dates.
            <br />
            We build the rest.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BrutalButton to="/book" variant="signal">
              Book this experience
            </BrutalButton>
            <BrutalButton to="/contact" variant="outline">
              Ask a question
            </BrutalButton>
          </div>
        </Reveal>
      </section>

      <section className="shell mt-24" aria-labelledby="more-experiences">
        <h2 id="more-experiences" className="meta text-muted-foreground">
          More experiences
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug} className="group">
              <Link to="/experiences/$slug" params={{ slug: o.slug }} data-cursor="VIEW">
                <EditorialImage
                  src={o.image}
                  alt={`${o.title} — ${o.location}`}
                  ratio="aspect-[4/3]"
                  width={1600}
                  height={1100}
                />
                <h3 className="display-md mt-4 text-[clamp(1.2rem,2.4vw,1.8rem)]">{o.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
