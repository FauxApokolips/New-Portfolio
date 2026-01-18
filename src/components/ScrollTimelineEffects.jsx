import { useEffect } from "react";
import gsap from "gsap";

export default function ScrollTimelineEffects() {
  useEffect(() => {
    gsap.utils.toArray(".section-reveal").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: true
          },
        }
      );
    });
  }, []);

  return null;
}
