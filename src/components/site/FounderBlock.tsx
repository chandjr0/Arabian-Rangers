import { brand, images } from "@/data/site";
import { EditorialImage, Meta, Reveal } from "./primitives";

export function FounderBlock({ headingId }: { headingId: string }) {
  return (
    <Reveal className="group border-y-2 border-ink py-12 md:py-16">
      <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4 lg:col-span-3">
          <EditorialImage
            src={images.founder}
            alt={`${brand.founder}, ${brand.founderRole} of ${brand.name}`}
            ratio="aspect-square"
            width={200}
            height={200}
          />
        </div>
        <div className="md:col-span-8 lg:col-span-9">
          <Meta>Founder</Meta>
          <h2 id={headingId} className="display-xl mt-6 text-[clamp(2.4rem,8vw,7rem)]">
            {brand.founder}
          </h2>
          <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-ink pt-4">
            <Meta>{brand.founderRole}</Meta>
            <Meta>{brand.name}</Meta>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
