import { createFileRoute } from "@tanstack/react-router";
import { experiences } from "@/data/site";
import { ExperienceRow } from "@/components/site/ExperienceRow";
import { PageHero } from "@/components/site/PageHero";
import { BrutalButton } from "@/components/site/primitives";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const title = "Experiences — Arabian Rangers Tourism";
const description =
  "Desert safaris, Dubai and Abu Dhabi city tours, buggy rides, UAE adventures and hotel bookings arranged by Arabian Rangers Tourism.";

export const Route = createFileRoute("/experiences/")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/experiences",
      keywords:
        "UAE experiences, desert safari Dubai, Dubai city tour, Abu Dhabi city tour, buggy rides, hotel bookings UAE, Arabian Rangers",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Experiences", path: "/experiences" },
      ]),
    }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  return (
    <>
      <PageHero
        label="Arabian Rangers / Experiences"
        title={
          <>
            Choose your
            <br />
            adventure.
          </>
        }
        intro="Six ways into the UAE — desert, city, adventure and the travel support around them."
        right="UAE"
      />
      <div className="shell mt-16">
        <h2 className="sr-only">All experiences</h2>
        {experiences.map((exp, i) => (
          <ExperienceRow key={exp.slug} exp={exp} index={i} />
        ))}
        <div className="border-t-2 border-ink py-16">
          <BrutalButton to="/book">Request an experience</BrutalButton>
        </div>
      </div>
    </>
  );
}
