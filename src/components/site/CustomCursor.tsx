import { useEffect, useRef } from "react";

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const wrap = wrapRef.current;
    const inner = innerRef.current;
    const labelEl = labelRef.current;
    if (!wrap || !inner || !labelEl) return;

    wrap.hidden = false;
    let label = "";

    const move = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        wrap.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
        const next = target?.dataset["cursor"] ?? "";
        if (next === label) return;
        label = next;
        if (next) {
          inner.style.width = "76px";
          inner.style.height = "32px";
          inner.style.background = "var(--signal)";
          inner.style.borderColor = "var(--ink)";
          labelEl.textContent = next;
          labelEl.hidden = false;
        } else {
          inner.style.width = "12px";
          inner.style.height = "12px";
          inner.style.background = "transparent";
          inner.style.borderColor = "var(--ink)";
          labelEl.textContent = "";
          labelEl.hidden = true;
        }
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      hidden
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
    >
      <div
        ref={innerRef}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-ink bg-transparent text-bone transition-[width,height,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: 12, height: 12 }}
      >
        <span ref={labelRef} hidden className="meta text-[0.6rem]" />
      </div>
    </div>
  );
}
