import React, { useRef } from "react";

export default function Magnetic({ children, strength = 10 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);

    const tx = (x / r.width) * strength;
    const ty = (y / r.height) * strength;

    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: "inline-block",
        willChange: "transform",
        transition: "transform 160ms ease",
      }}
    >
      {children}
    </div>
  );
}
