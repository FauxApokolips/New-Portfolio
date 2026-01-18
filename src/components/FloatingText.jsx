import { useEffect, useState } from "react";

export default function FloatingText({ children, speed = 0.3 }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  let ticking = false;

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      setOffset(window.scrollY * speed);
      ticking = false;
    });
    ticking = true;
  }
};


  return (
    <div
      style={{
         transform: `translate3d(0, ${offset}px, 0)`,
        transition: "transform 0.1s linear",
        willChange: "transform"
      }}
    >
      {children}
    </div>
  );
}
