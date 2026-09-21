import type { ReactNode } from "react";
import { EditorialImage, Meta } from "./primitives";

export function PageHero({
  label,
  title,
  intro,
  image,
  alt,
  right,
}: {
  label: string;
  title: ReactNode;
  intro?: string;
  image?: string;
  alt?: string;
  right?: string;
}) {
  return (
    <section className="shell pt-10 md:pt-20">
      <div className="enter-stagger">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
          <Meta>{label}</Meta>
          {right ? <Meta className="text-right">{right}</Meta> : null}
        </div>
        <h1 className="display-lg mt-8 max-w-[14ch]">{title}</h1>
        {intro ? (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        ) : null}
        {image ? (
          <div className="group mt-12">
            <EditorialImage
              src={image}
              alt={alt || (typeof title === "string" ? title : label)}
              ratio="aspect-[16/9] md:aspect-[21/9]"
              eager
              width={1920}
              height={1080}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
