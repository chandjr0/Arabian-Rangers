import { Link } from "@tanstack/react-router";
import type { Experience } from "@/data/site";
import { EditorialImage, Meta, Reveal } from "./primitives";

export function ExperienceRow({ exp, index }: { exp: Experience; index: number }) {
  const full = exp.layout === "full";
  const flip = exp.layout === "right";

  return (
    <Reveal as="article" className="group border-t-2 border-ink py-10 transition-[background-color] duration-300 hover:bg-sand/25 md:py-14">
      <Link
        to="/experiences/$slug"
        params={{ slug: exp.slug }}
        data-cursor="EXPLORE"
        className="block"
        aria-label={`${exp.title} — ${exp.summary}`}
      >
        <div className={`grid gap-6 md:grid-cols-12 md:items-end ${full ? "" : ""}`}>
          <div
            className={`md:col-span-3 ${flip ? "md:order-3" : ""} flex flex-col gap-2`}
          >
            <Meta>{exp.kind}</Meta>
            <Meta>{exp.location}</Meta>
            <Meta>{exp.coords}</Meta>
          </div>

          <div className={`md:col-span-4 ${flip ? "md:order-1" : ""}`}>
            <h3 className="display-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
              {exp.title}
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {exp.summary}
            </p>
            <span className="meta mt-6 inline-flex items-center gap-2 text-ink">
              Explore
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </div>

          <div className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
            <EditorialImage
              src={exp.image}
              alt={`${exp.title} — ${exp.location}`}
              ratio={full ? "aspect-[16/9]" : index % 2 ? "aspect-[3/4] md:aspect-[4/5]" : "aspect-[4/3]"}
              width={1600}
              height={1100}
            />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
