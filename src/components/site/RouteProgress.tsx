import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function RouteProgress() {
  const status = useRouterState({ select: (s) => s.status });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const pending = ready && status === "pending";

  return (
    <div
      role="progressbar"
      aria-hidden={!pending}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pending ? 70 : 100}
      aria-label="Page loading"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[80] h-0.5 bg-transparent transition-opacity duration-300 ${
        pending ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full bg-signal transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: pending ? "72%" : "0%" }}
      />
    </div>
  );
}
