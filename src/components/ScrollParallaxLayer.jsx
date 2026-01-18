import React, { useEffect, useRef, useState } from "react";

export default function ScrollParallaxLayer({
  children,
  speed = 0.05,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const latestY = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    const onScroll = () => {
      latestY.current = window.scrollY || 0;
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        const el = ref.current;
        if (!el) return;
        const y = latestY.current * speed;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        willChange: ready ? "transform" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
