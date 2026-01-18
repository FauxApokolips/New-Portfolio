import { useMemo, useState } from "react";
import MagneticSection from "../components/MagneticSection";
import SectionGlow from "../components/SectionGlow";
import UpgradedProjectCard from "../components/UpgradedProjectCard";

/**
 * Edit projects HERE.
 * Keep: title, description, tech[], category, link
 * category must match FILTERS
 */
const PROJECTS = [
  {
    title: "HR Workflow Designer",
    description:
      "Drag-and-drop workflow builder for HR approval pipelines with predictable state management and reusable UI components.",
    tech: ["TypeScript", "React", "UI/UX"],
    category: "Frontend",
    link: "#",
  },
  {
    title: "Epileptic Seizure Detection",
    description:
      "ML-driven seizure detection system focused on signal processing, feature extraction, and reproducible evaluation workflows.",
    tech: ["TypeScript", "Machine Learning", "Data"],
    category: "AI",
    link: "https://github.com/FauxApokolips/Epileptic-Seizure-Detection",
  },
  {
    title: "Smart Network Monitor",
    description:
      "Real-time network traffic monitoring with anomaly detection and geo/IP intelligence for faster incident triage.",
    tech: ["Python", "Streamlit", "Isolation Forest"],
    category: "Backend",
    link: "https://github.com/FauxApokolips/smart-network-monitor",
  },
  {
    title: "K8s Observability Project",
    description:
      "Cloud-native observability stack using Prometheus and Grafana, deployed via CI/CD to ensure consistent, production-ready monitoring.",
    tech: ["Kubernetes", "Prometheus", "Grafana", "CI/CD"],
    category: "DevOps",
    link: "https://github.com/FauxApokolips/k8s-observability-project",
  },
  {
    title: "InfraGuard",
    description:
      "Infrastructure monitoring and automation utilities focused on system visibility, reliability, and faster root-cause analysis.",
    tech: ["JavaScript", "DevOps", "Automation"],
    category: "DevOps", 
    link: "https://github.com/FauxApokolips/InfraGuard",
  },
  {
    title: "Doctor Listing API Testing",
    description:
      "API-driven doctor discovery interface with efficient client-side filtering, search, and clean UX patterns.",
    tech: ["JavaScript", "REST APIs", "Frontend"],
    category: "Frontend",
    link: "https://github.com/FauxApokolips/Doctor-Listing-API-Testing",
  },
  {
    title: "Quantum Galaxy Detection",
    description:
      "Astrophysical image analysis pipeline for galaxy detection using Python-based data processing and model-driven inference.",
    tech: ["Python", "Computer Vision", "Data Science"],
    category: "AI",
    link: "https://github.com/FauxApokolips/Quantum-Galaxy-Detection",
  },
  {
    title: "Ragnex",
    description:
      "Real-time chat application supporting 50+ concurrent users with Firebase Authentication and Firestore live listeners, reducing message latency by 40%.",
    tech: ["React", "Firebase", "Firestore"],
    category: "Backend",
    link: "https://github.com/FauxApokolips/Ragnex",
  },
];

const FILTERS = ["All", "Frontend", "Backend", "DevOps", "AI"];

export default function ProjectsSection() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <section id="projects" className="relative w-full px-6 md:px-24 py-32">
      <SectionGlow color="rgba(120,70,255,0.25)" />

      <MagneticSection>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 neon-title">
          Projects
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`px-4 py-2 rounded-full border transition-all
                ${
                  active === f
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                }`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {filtered.map((project, i) => (
            <UpgradedProjectCard
              key={`${project.title}-${i}`}
              project={project}
            />
          ))}
        </div>
      </MagneticSection>
    </section>
  );
}
