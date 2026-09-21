import { createFileRoute, Link } from "@tanstack/react-router";
import { experiences, images, posts } from "@/data/site";
import { ExperienceRow } from "@/components/site/ExperienceRow";
import { BrutalButton, EditorialImage, Meta, Reveal } from "@/components/site/primitives";
import { FounderBlock } from "@/components/site/FounderBlock";
import { pageHead } from "@/lib/seo";

const title = "Arabian Rangers Tourism — Experience the Magic of the UAE";
const description =
  "Desert safaris, Dubai and Abu Dhabi city tours, buggy rides and UAE adventures arranged by Arabian Rangers Tourism.";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/",
      keywords:
        "Arabian Rangers Tourism, UAE tourism, desert safari, Dubai city tour, Abu Dhabi city tour, buggy rides, desert camp UAE",
    }),
  component: Home,
});

function Chapter({ word, line, image, alt }: { word: string; line: string; image: string; alt: string }) {
  return (
    <Reveal as="section" className="group shell mt-20 md:mt-24">
      <div className="grid gap-6 border-t-2 border-ink pt-8 md:grid-cols-12 md:items-end">
        <h2 className="display-lg md:col-span-5">{word}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:col-span-3">{line}</p>
        <div className="md:col-span-4">
          <EditorialImage src={image} alt={alt} ratio="aspect-[4/3]" width={1600} height={1100} />
        </div>
      </div>
    </Reveal>
  );
}

function Home() {
  return (
    <>
      <section className="shell relative pt-8">
        <div className="enter-stagger">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <Meta>Arabian Rangers Tourism</Meta>
            <Meta>UAE / 01</Meta>
          </div>

          <div className="grid gap-8 pt-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="display-xl md:text-[clamp(3rem,9.2vw,9rem)]">
                Experience
                <br />
                the UAE
                <br />
                <span className="text-signal">unfiltered.</span>
              </h1>
            </div>
            <div className="flex flex-col justify-end gap-4 md:col-span-4 md:items-end md:text-right">
              <Meta>
                Dubai
                <br />
                United Arab Emirates
              </Meta>
              <Meta>25°12′N 55°16′E</Meta>
            </div>
          </div>

          <div className="group mt-10">
            <EditorialImage
              src={images.heroDesert}
              alt="A lone 4x4 on a dune crest in the UAE desert at sunset"
              ratio="aspect-[16/10] md:aspect-[21/9]"
              eager
              width={1920}
              height={1280}
            />
          </div>

          <div className="mt-8 grid gap-8 border-t-2 border-ink pt-6 md:grid-cols-12">
            <p className="max-w-md text-base leading-relaxed md:col-span-5">
              Desert safaris, city discoveries and adventure experiences across the UAE.
            </p>
            <div className="flex flex-wrap gap-4 md:col-span-5">
              <BrutalButton to="/experiences">Explore experiences</BrutalButton>
              <BrutalButton to="/book" variant="outline">
                Book your adventure
              </BrutalButton>
            </div>
            <div className="flex gap-4 md:col-span-2 md:justify-end">
              <Meta>Desert / City / Adventure</Meta>
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" className="shell mt-24 md:mt-32">
        <p className="display-lg max-w-[16ch]">The UAE is more than a destination.</p>
        <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground">
          It is motion, landscape, culture, architecture and adrenaline — experienced differently every
          time.
        </p>
      </Reveal>

      <Chapter
        word="Desert"
        line="Open dunes, shifting light, and camps that appear only after the engines stop."
        image={images.sand}
        alt="Wind-rippled desert sand in raking light"
      />
      <Chapter
        word="City"
        line="Dubai and Abu Dhabi read as architecture, water and contrast — not checklists."
        image={images.dubai}
        alt="Dubai skyline silhouetted behind desert dunes at dusk"
      />
      <Chapter
        word="Adventure"
        line="Buggies, dune terrain and the loudest hour of your trip."
        image={images.buggy}
        alt="Dune buggy throwing a plume of sand across the desert"
      />
      <Chapter
        word="Culture"
        line="Cultural landmarks, desert hospitality and the details between the landmarks."
        image={images.camp}
        alt="Traditional desert camp lit by lanterns at blue hour"
      />

      <section className="shell mt-24 md:mt-32" aria-labelledby="experiences-heading">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
          <h2 id="experiences-heading" className="meta text-muted-foreground">
            Experiences
          </h2>
          <Meta>Choose your adventure</Meta>
        </div>
        {experiences.map((exp, i) => (
          <ExperienceRow key={exp.slug} exp={exp} index={i} />
        ))}
      </section>

      <section className="shell mt-24 md:mt-32">
        <Reveal className="grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-12">
          <h2 className="display-md md:col-span-5">
            Why Arabian
            <br />
            Rangers
          </h2>
          <ul className="md:col-span-7">
            {[
              ["Customized", "Experiences are arranged around your group, not a fixed departure sheet."],
              ["Across the UAE", "Desert, Dubai, Abu Dhabi and travel support in one place."],
              ["Direct", "One conversation from the first enquiry to the final drop-off."],
            ].map(([h, b]) => (
              <li key={h} className="border-t border-ink py-6">
                <h3 className="display-md text-[clamp(1.2rem,2.4vw,1.8rem)]">{h}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{b}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="shell mt-24 md:mt-32" aria-labelledby="founder-heading">
        <FounderBlock headingId="founder-heading" />
      </section>

      <section className="shell mt-24 md:mt-32" aria-labelledby="notes-heading">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
          <h2 id="notes-heading" className="meta text-muted-foreground">
            Field notes
          </h2>
          <Link to="/journal" className="meta link-rule">
            All notes
          </Link>
        </div>
        <ul className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((p) => (
            <Reveal as="li" key={p.slug} className="group">
              <Link to="/journal/$slug" params={{ slug: p.slug }} data-cursor="READ">
                <EditorialImage
                  src={p.image}
                  alt={`${p.title} — ${p.excerpt}`}
                  ratio="aspect-[4/3]"
                  width={1600}
                  height={1100}
                />
                <Meta className="mt-4 block">
                  {p.date} / {p.category}
                </Meta>
                <h3 className="display-md mt-3 text-[clamp(1.2rem,2.4vw,1.8rem)]">{p.title}</h3>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="shell mt-24 md:mt-32">
        <Reveal className="group">
          <EditorialImage
            src={images.heroDesert}
            alt="Desert dunes at last light"
            ratio="aspect-[21/9]"
            width={1920}
            height={1280}
          />
          <h2 className="display-xl mt-10">
            Where
            <br />
            will you
            <br />
            go next?
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t-2 border-ink pt-6">
            <p className="text-sm text-muted-foreground">Your UAE adventure starts here.</p>
            <BrutalButton to="/book" variant="signal">
              Plan the experience
            </BrutalButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
