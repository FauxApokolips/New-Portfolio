import React, { useRef } from "react";
export default function Tilt3D({ children, max = 10, className = "", style = {} }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;

    // avoid tilt on touch
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    const rx = (0.5 - y) * max;
    const ry = (x - 0.5) * max;

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        willChange: "transform",
        transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)",
        transition: "transform 220ms ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
