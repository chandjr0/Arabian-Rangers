import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Meta({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("meta text-muted-foreground", className)}>{children}</span>;
}

export function Reveal({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "ul";
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.setAttribute("data-reveal", "in");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // @ts-expect-error dynamic tag
    <As ref={ref} data-reveal="" className={className}>
      {children}
    </As>
  );
}

type BtnProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  type?: "button" | "submit";
  variant?: "solid" | "outline" | "signal";
  className?: string;
  cursor?: string;
  disabled?: boolean;
};

const base =
  "group inline-flex min-h-12 items-center gap-3 border-2 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  solid:
    "border-ink bg-ink text-bone hover:bg-transparent hover:text-ink hover:shadow-[4px_4px_0_0_var(--ink)]",
  outline:
    "border-ink bg-transparent text-ink hover:bg-ink hover:text-bone hover:shadow-[4px_4px_0_0_var(--signal)]",
  signal:
    "border-signal bg-signal text-bone hover:bg-transparent hover:text-signal hover:shadow-[4px_4px_0_0_var(--signal)]",
};

export function BrutalButton({
  children,
  to,
  href,
  type = "button",
  variant = "solid",
  className,
  cursor = "GO",
  disabled,
}: BtnProps) {
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  const cls = cn(base, variants[variant], className);
  if (to)
    return (
      <Link to={to} data-cursor={cursor} className={cls}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} data-cursor={cursor} className={cls}>
        {inner}
      </a>
    );
  return (
    <button type={type} data-cursor={cursor} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

export function SectionHeading({
  label,
  title,
  className,
}: {
  label: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-t-2 border-ink pt-4", className)}>
      <Meta>{label}</Meta>
      <h2 className="display-md mt-6 max-w-[16ch]">{title}</h2>
    </div>
  );
}

export function EditorialImage({
  src,
  alt,
  className,
  ratio = "aspect-[4/3]",
  eager,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  eager?: boolean;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className={cn("grain", className)}>
      <div
        className={cn(
          "img-frame overflow-hidden border-2 border-ink bg-earth transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[6px_6px_0_0_var(--ink)]",
          ratio,
        )}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "low"}
          sizes="(max-width: 768px) 92vw, min(1500px, 92vw)"
          className={cn(
            "img-editorial h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]",
            eager && "img-lcp",
          )}
        />
      </div>
      {caption ? (
        <figcaption className="meta mt-3 text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
