import { createFileRoute } from "@tanstack/react-router";
import { destinations } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { BrutalButton, EditorialImage, Meta, Reveal } from "@/components/site/primitives";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const title = "Destinations — Arabian Rangers Tourism";
const description =
  "Dubai, Abu Dhabi and the open desert: the three worlds Arabian Rangers Tourism travels across the UAE.";

const destinationAlts: Record<string, string> = {
  Dubai: "Dubai skyline at dusk, seen across desert dunes",
  "Abu Dhabi": "Angular contemporary architecture on the Abu Dhabi waterfront",
  "The Desert": "A 4x4 on a dune crest in the UAE desert at sunset",
};

export const Route = createFileRoute("/destinations")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/destinations",
      keywords:
        "UAE destinations, Dubai tourism, Abu Dhabi tourism, Dubai desert, Arabian Rangers Tourism",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Destinations", path: "/destinations" },
      ]),
    }),
  component: DestinationsPage,
});

function DestinationsPage() {
  return (
    <>
      <PageHero
        label="Arabian Rangers / Destinations"
        title={
          <>
            One UAE.
            <br />
            Many worlds.
          </>
        }
        intro="A short country with long distances between its moods."
        right="23°25′N 53°50′E"
      />

      <section className="shell mt-16" aria-label="Abstract map of destinations">
        <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-ink sm:aspect-[16/7]">
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-3">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="border-r border-b border-ink/15" />
            ))}
          </div>
          {[
            { name: "Abu Dhabi", left: "18%", top: "62%" },
            { name: "Dubai", left: "56%", top: "30%" },
            { name: "Desert", left: "72%", top: "72%" },
          ].map((p) => (
            <div key={p.name} className="absolute" style={{ left: p.left, top: p.top }}>
              <span className="block h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-signal" />
              <span className="meta absolute left-3 top-1 whitespace-nowrap">{p.name}</span>
            </div>
          ))}
          <span className="meta absolute bottom-3 right-4 text-muted-foreground">
            Schematic — not to scale
          </span>
        </div>
      </section>

      <section className="shell mt-20">
        {destinations.map((d) => (
          <Reveal key={d.name} className="group grid gap-6 border-t-2 border-ink py-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="display-md">{d.name}</h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{d.note}</p>
              <Meta className="mt-6 block">{d.coords}</Meta>
            </div>
            <div className="md:col-span-7">
              <EditorialImage
                src={d.image}
                alt={destinationAlts[d.name] ?? d.name}
                ratio="aspect-[16/9]"
                width={1600}
                height={1100}
              />
            </div>
          </Reveal>
        ))}
        <div className="border-t-2 border-ink py-16">
          <BrutalButton to="/experiences">See the experiences</BrutalButton>
        </div>
      </section>
    </>
  );
}
