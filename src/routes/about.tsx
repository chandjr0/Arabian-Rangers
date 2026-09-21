import { createFileRoute } from "@tanstack/react-router";
import { brand, images } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { BrutalButton, EditorialImage, Meta, Reveal } from "@/components/site/primitives";
import { FounderBlock } from "@/components/site/FounderBlock";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const title = "About — Arabian Rangers Tourism";
const description =
  "Arabian Rangers Tourism provides customized UAE tourism experiences: desert safaris, city tours, buggy rides and travel arrangements.";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/about",
      keywords:
        "about Arabian Rangers Tourism, Nihad Ali, UAE tour operator, customized UAE experiences, desert safari company",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        label="Arabian Rangers / About"
        title={
          <>
            We show you
            <br />
            the UAE
            <br />
            differently.
          </>
        }
        intro="Arabian Rangers Tourism provides customized UAE tourism experiences — including desert safaris, city tours, buggy rides and other travel experiences."
        right={brand.category}
      />

      <section className="shell mt-20 grid gap-10 md:mt-24 md:grid-cols-12">
        <div className="group md:col-span-6">
          <EditorialImage
            src={images.camp}
            alt="Desert camp at blue hour in the UAE dunes"
            ratio="aspect-[4/5]"
            width={1600}
            height={1100}
          />
        </div>
        <div className="md:col-span-6 md:pt-20">
          {[
            ["Experience", "Every trip is arranged around what you actually want to see, not a fixed sheet."],
            ["Adventure", "Dune terrain, buggies and open desert — the physical side of the Emirates."],
            ["Hospitality", "Guests are looked after from the first message to the last drop-off."],
            ["Culture", "The UAE is a place, not a backdrop. We travel through it that way."],
          ].map(([h, b]) => (
            <Reveal key={h} className="border-t-2 border-ink py-7">
              <h2 className="display-md text-[clamp(1.3rem,2.6vw,2rem)]">{h}</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell mt-24 md:mt-28" aria-labelledby="about-founder">
        <FounderBlock headingId="about-founder" />
      </section>

      <section className="shell mt-20 pb-8">
        <BrutalButton to="/contact">Talk to us</BrutalButton>
      </section>
    </>
  );
}
