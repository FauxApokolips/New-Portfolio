import { useEffect, useMemo, useState } from "react";

export function usePerfTier() {
  const [tier, setTier] = useState("high");

  const base = useMemo(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)")?.matches;

    const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
    // deviceMemory is not supported everywhere; treat missing as "unknown"
    const mem = typeof navigator !== "undefined" ? navigator.deviceMemory : undefined;

    // Simple scoring
    let score = 0;
    if (reducedMotion) score -= 3;
    if (coarse) score -= 2;
    if (cores <= 4) score -= 2;
    if (cores <= 2) score -= 3;
    if (typeof mem === "number" && mem <= 4) score -= 2;
    if (typeof mem === "number" && mem <= 2) score -= 3;

    return { reducedMotion, coarse, cores, mem, score };
  }, []);

  useEffect(() => {
    // Map score to tiers
    if (base.score <= -5) setTier("low");
    else if (base.score <= -2) setTier("mid");
    else setTier("high");
  }, [base.score]);

  return tier;
}
