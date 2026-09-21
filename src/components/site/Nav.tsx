import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { brand, nav } from "@/data/site";
import { BrandLogo } from "./BrandLogo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-ink bg-bone/95 backdrop-blur-md transition-shadow duration-300 ${
        compact ? "shadow-[0_8px_24px_-16px_rgba(28,24,16,0.45)]" : ""
      }`}
    >
      <div
        className={`shell flex items-center justify-between transition-[padding] duration-300 ${
          compact ? "py-3" : "py-5"
        }`}
      >
        <Link
          to="/"
          data-cursor="HOME"
          aria-label="Arabian Rangers Tourism home"
          className="flex items-center gap-2.5 font-display text-lg uppercase leading-none tracking-tight transition-transform duration-300 hover:-translate-y-px sm:gap-3 sm:text-xl"
        >
          <BrandLogo className="h-8 w-8 sm:h-9 sm:w-9" />
          <span>
            Arabian<span className="text-signal">/</span>Rangers
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const current = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={current ? "page" : undefined}
                data-active={current}
                className="link-rule meta text-ink transition-transform duration-300 hover:-translate-y-px"
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/book"
            data-cursor="GO"
            aria-current={pathname === "/book" ? "page" : undefined}
            className="meta min-h-11 border-2 border-ink bg-ink px-5 py-3 text-bone transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-px hover:border-signal hover:bg-signal active:translate-y-0"
          >
            Book an experience
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="meta min-h-11 min-w-11 border-2 border-ink px-4 py-2 transition-colors duration-300 hover:bg-ink hover:text-bone lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 flex min-h-[calc(100dvh-4.75rem)] flex-col justify-between border-t-2 border-ink bg-bone px-[4vw] py-8 lg:hidden"
        >
          <nav aria-label="Mobile" className="enter-stagger flex flex-col">
            {nav.map((item) => {
              const current = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={current ? "page" : undefined}
                  className="display-md min-h-12 border-b-2 border-ink py-4 transition-colors duration-300 hover:text-signal"
                >
                  {item.label}
                </Link>
              );
            })}
            <Link to="/book" className="display-md min-h-12 py-4 text-signal">
              Book
            </Link>
          </nav>
          <p className="meta text-muted-foreground">{brand.tagline}</p>
        </div>
      ) : null}
    </header>
  );
}
