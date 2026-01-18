import React, { useEffect, useRef } from "react";

/**
 * Subtle trailing dot(s). No click blocking.
 */
export default function TrailCursor() {
  const dot = useRef(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;

    let raf = 0;
    let tx = 0, ty = 0;
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 10,
        height: 10,
        borderRadius: 999,
        zIndex: 9,
        pointerEvents: "none",
        background: "rgba(0,200,255,0.8)",
        boxShadow: "0 0 18px rgba(0,200,255,0.55)",
        transform: "translate3d(-100px,-100px,0)",
      }}
    />
  );
}
