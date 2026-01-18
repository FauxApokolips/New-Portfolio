import React, { useEffect, useRef } from "react";

/**
 * Parallax glow layer that reacts to scroll (not mouse).
 * pointer-events: none to keep navbar clickable.
 */
export default function GlowParallax() {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const latest = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      latest.current = window.scrollY || 0;
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const el = ref.current;
        if (!el) return;
        const y = latest.current * 0.04;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background:
          "radial-gradient(900px 500px at 20% 20%, rgba(0,200,255,0.12), transparent 60%)," +
          "radial-gradient(800px 500px at 80% 70%, rgba(140,80,255,0.10), transparent 60%)",
        filter: "blur(18px)",
        opacity: 0.9,
      }}
    />
  );
}
