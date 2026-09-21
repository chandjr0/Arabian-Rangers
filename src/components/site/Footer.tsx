import { Link } from "@tanstack/react-router";
import { brand, nav, social } from "@/data/site";
import { BrandLogo } from "./BrandLogo";
import { Meta } from "./primitives";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-bone md:mt-32">
      <div className="shell py-14 pb-20 md:py-16 md:pb-16">
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-x-10">
          <div className="min-w-0 md:col-span-5">
            <Link
              to="/"
              aria-label="Arabian Rangers Tourism home"
              className="group flex max-w-full items-start gap-3 transition-opacity duration-300 hover:opacity-90 sm:gap-4"
            >
              <BrandLogo className="mt-1 h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
              <h2 className="display-md min-w-0 text-bone">
                Arabian
                <br />
                Rangers
              </h2>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand">{brand.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex min-w-0 flex-col gap-3 md:col-span-3">
            <Meta className="text-sand/70">Index</Meta>
            {nav.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                className="link-rule meta w-fit text-bone transition-colors duration-300 hover:text-signal"
              >
                {i.label}
              </Link>
            ))}
            <Link
              to="/book"
              className="link-rule meta w-fit text-signal transition-transform duration-300 hover:translate-x-1"
            >
              Book
            </Link>
          </nav>

          <div className="flex min-w-0 flex-col gap-3 md:col-span-2">
            <Meta className="text-sand/70">Social</Meta>
            {social.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-rule meta w-fit text-bone transition-colors duration-300 hover:text-signal"
                >
                  {item.label}
                </a>
              ) : (
                <p key={item.label} className="meta text-sand/70">
                  {item.label} — add here
                </p>
              ),
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-3 md:col-span-2">
            <Meta className="text-sand/70">Registry</Meta>
            <span className="meta text-bone">{brand.category}</span>
            <span className="meta text-bone">United Arab Emirates</span>
            <span className="meta text-bone">24°28′N 54°22′E</span>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-bone/30 pt-6 md:flex-row md:items-center md:justify-between">
          <Meta className="text-sand/70">
            © {new Date().getFullYear()} {brand.name}
          </Meta>
          <Meta className="text-sand/70">
            {brand.founder} — {brand.founderRole}
          </Meta>
        </div>
      </div>
    </footer>
  );
}
