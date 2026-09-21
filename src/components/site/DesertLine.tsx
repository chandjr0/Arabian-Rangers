import { useEffect, useState } from "react";

const WORDS = ["DESERT", "CITY", "ADVENTURE", "CULTURE", "MEMORY", "ARABIAN RANGERS"];

export function DesertLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const index = Math.min(WORDS.length - 1, Math.floor(progress * WORDS.length));
  const word = WORDS[index];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
      {/* horizontal travelling line — desktop */}
      <div className="hidden md:block">
        <div className="relative h-px w-full bg-ink/25">
          <div
            className="absolute left-0 top-0 h-px bg-signal transition-[width] duration-200 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="absolute -top-7 -translate-x-1/2 transition-[left] duration-200 ease-linear"
            style={{ left: `clamp(6rem, ${progress * 100}%, calc(100% - 6rem))` }}
          >
            <span
              key={word}
              className="meta block whitespace-nowrap border-2 border-ink bg-bone px-3 py-1 text-ink"
              style={{ animation: "ar-fade-up 400ms var(--ease) both" }}
            >
              {word}
            </span>
          </div>
        </div>
      </div>

      {/* vertical indicator — mobile */}
      <div className="md:hidden">
        <div className="fixed right-0 top-1/4 h-1/2 w-px bg-ink/25">
          <div
            className="w-px bg-signal transition-[height] duration-200 ease-linear"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <div className="fixed bottom-4 right-3 origin-bottom-right">
          <span className="meta border border-ink bg-bone px-2 py-1">{word}</span>
        </div>
      </div>
    </div>
  );
}
