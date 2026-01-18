import { useEffect } from "react";

export default function AccentController() {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-accent]");
    const root = document.documentElement;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute("data-accent");
            root.style.setProperty("--accent", color);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((sec) => obs.observe(sec));
  }, []);

  return null;
}
