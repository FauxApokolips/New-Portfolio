import React, { useEffect, useRef } from "react";

export default function SpotlightCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = 0, y = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.background = `radial-gradient(280px 280px at ${x}px ${y}px, rgba(0,200,255,0.16), transparent 55%)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8,
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0.9,
      }}
    />
  );
}
