import { useEffect, useState } from "react";

export default function ParallaxLayer({ children, strength = 20 }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / strength;
      const y = (window.innerHeight / 2 - e.clientY) / strength;
      setPos({ x, y });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [strength]);

  return (
    <div
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s linear",
        willChange: "transform",
      }}
      className="absolute inset-0 -z-30"
    >
      {children}
    </div>
  );
}
