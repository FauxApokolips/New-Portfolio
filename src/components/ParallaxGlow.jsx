import { useRef, useEffect } from "react";

export default function ParallaxGlow({
  speed = 0.12,
  color = "rgba(0,255,255,0.25)",
}) {
  const ref = useRef();

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY * speed;
      if (ref.current) ref.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50% 20%, ${color}, transparent 70%)`,
        filter: "blur(90px)",
        opacity: 0.45,
      }}
    />
  );
}
