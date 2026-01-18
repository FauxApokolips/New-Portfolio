import { useEffect } from "react";

export default function TrailCursor() {
  useEffect(() => {
    const particles = [];

    function createParticle(x, y) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      document.body.appendChild(particle);

      particles.push(particle);

      setTimeout(() => {
        particle.style.opacity = 0;
        particle.style.transform = "scale(0)";
      }, 10);

      setTimeout(() => {
        particle.remove();
      }, 800);
    }

    const handler = (e) => {
      for (let i = 0; i < 3; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", handler);

    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return null;
}
