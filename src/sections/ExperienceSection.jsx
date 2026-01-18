// src/sections/ExperienceSection.jsx
import { useMemo } from "react";
import MagneticSection from "../components/MagneticSection";
import SectionGlow from "../components/SectionGlow";
import GlowText from "../components/GlowText";
import { DATA } from "../data";

export default function ExperienceSection() {
  const items = useMemo(() => {
    if (Array.isArray(DATA?.experience) && DATA.experience.length) return DATA.experience;

    // Fallback so UI never looks empty
    return [
      {
        role: "DevOps / Platform Engineer (Projects)",
        company: "Personal Projects",
        period: "2024 – Present",
        responsibilities: [
          "Built CI/CD pipelines, containerized deployments, and environment automation.",
          "Implemented observability stacks (metrics + dashboards) and deployment hardening.",
          "Optimized performance and UX for a GPU-heavy portfolio frontend.",
        ],
      },
    ];
  }, []);

  return (
    <section id="experience" className="relative w-full px-6 md:px-24 py-32">
      <SectionGlow color="rgba(255,174,66,0.18)" />

      <MagneticSection>
        <div className="mb-10">
          <GlowText text="Experience" />
        </div>

        <div className="relative border-l border-white/10 pl-6 space-y-10">
          {items.map((exp, i) => (
            <div key={i} className="relative">
              <div
                className="absolute -left-4 top-1 h-3 w-3 rounded-full bg-purple-400 shadow-md"
              />

              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-neutral-400 text-sm mb-3">
                {exp.company} • {exp.period}
              </p>

              <ul className="text-neutral-300 text-sm space-y-1 list-disc ml-4">
                {(exp.responsibilities || []).map((r, j) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MagneticSection>
    </section>
  );
}
