import React, { useEffect, useMemo, useRef } from "react";

export default function NebulaField({
  strength = 0.5,
  color = "#6b5cff",
}) {
  const ref = useRef(null);
  const id = useMemo(() => `nebula-${Math.random().toString(16).slice(2)}`, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let t = 0;

    const tick = () => {
      t += 0.006;

      // soft breathing opacity
      const pulse = 0.75 + Math.sin(t) * 0.15;
      el.style.opacity = String(Math.min(1, strength * pulse));

      // slow drift
      const x = Math.sin(t * 0.9) * 20;
      const y = Math.cos(t * 0.7) * 14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [strength]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: "-25%", // IMPORTANT: bigger coverage
        filter: `url(#${id})`,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    >
      <svg width="0" height="0">
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.004"
            numOctaves="4"
            seed="3"
          />
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 10 -4"
          />
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </svg>

      {/* Main fog */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(closest-side, ${color}55, transparent 70%)`,
        }}
      />

      {/* Secondary depth fog */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(closest-side at 65% 30%, ${color}33, transparent 65%)`,
        }}
      />
    </div>
  );
}
