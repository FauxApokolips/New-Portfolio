// LEVEL-11 UPGRADED APP.JSX
// Includes: GPU Shader Nebula, Depth Parallax, Glow Layer, Optimized FX Pipeline

import { useState, useEffect } from "react";

// Core components
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";

// Existing FX
import GlassNoise from "./components/GlassNoise";
import AmbientLight from "./components/AmbientLight";
import NebulaParticles from "./components/NebulaParticles";
import NebulaField from "./components/NebulaField";


// Level-11 NEW GPU FX
import ShaderBackground from "./components/ShaderBackground";
import GlowParallax from "./components/GlowParallax";

// Cursor FX
import SpotlightCursor from "./components/SpotlightCursor";
import TrailCursor from "./components/TrailCursor";

// Parallax
import ScrollParallaxLayer from "./components/ScrollParallaxLayer";

// Hero animations
import Tilt3D from "./components/Tilt3D";
import Reveal from "./components/Reveal";
import FloatingText from "./components/FloatingText";
import Magnetic from "./components/Magnetic";
import HeroDepthLayers from "./components/HeroDepthLayers";

// Level-10 UI
import AccentController from "./components/AccentController";
import GlassHero from "./components/GlassHero";
import MagneticSection from "./components/MagneticSection";
import GlowText from "./components/GlowText";
import ProjectLift from "./components/ProjectLift";
import ParallaxGlow from "./components/ParallaxGlow";

// Data
import { DATA } from "./data";

export default function App() {
  const filters = ["All", "DevOps", "Backend", "Frontend", "AI"];
  const [filter, setFilter] = useState("All");

  const projects = DATA.projects.filter((p) =>
    filter === "All" ? true : p.category === filter
  );

  const isMobile = window.innerWidth < 768;

  // Smooth theme shift
  useEffect(() => {
    const handler = () => {
      document.body.style.background =
        window.scrollY > 600
          ? "radial-gradient(circle at top, #020203, #000000)"
          : "radial-gradient(circle at top, #050505, #000000)";
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* LEVEL-10 Accent Engine */}
      <AccentController />

      {/* Layer 1 – Nebula Field (deep fog) */}
      <ScrollParallaxLayer speed={0.015}>
        <NebulaField strength={0.55} color="#5f4daf" />
      </ScrollParallaxLayer>

      {/* Layer 2 – Thick fog closer to camera */}
      <ScrollParallaxLayer speed={0.03}>
        <NebulaField strength={0.25} color="#2dc7ff" />
      </ScrollParallaxLayer>

      {/* Layer 3 – Far particle field */}
      <ScrollParallaxLayer speed={0.05}>
        <NebulaParticles density={120} size={1.2} glow={0.35} />
      </ScrollParallaxLayer>

      {/* Layer 4 – Near particle field (slow scroll) */}
      <ScrollParallaxLayer speed={0.1}>
        <NebulaParticles density={50} size={2.0} glow={0.5} />
      </ScrollParallaxLayer>

      {/* Layer 5 – Glow edges / accent */}
      <GlowParallax />
      <GlassNoise opacity={0.06} />
      <AmbientLight />

      {/* Cursor FX */}
      {!isMobile && <SpotlightCursor />}
      {!isMobile && <TrailCursor trailLength={10} />}

      {/* NAVBAR */}
      <Navbar />
      <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide neon-text">MyPortfolio</h1>

          <nav className="flex gap-6 text-sm uppercase tracking-wider">
            <a href="#about" className="hover:text-cyan-300 transition">About</a>
            <a href="#projects" className="hover:text-cyan-300 transition">Projects</a>
            <a href="#experience" className="hover:text-cyan-300 transition">Experience</a>
            <a href="#contact" className="hover:text-cyan-300 transition">Contact</a>
          </nav>
        </div>
      </header>

      <Section id="hero" data-accent="#3af2ff">
        <GlassHero>
          <HeroDepthLayers />

          <Reveal delay={0.1}>
            <div className="pt-20 grid md:grid-cols-2 gap-16 items-center">

              {/* LEFT TEXT */}
              <div className="space-y-4">

                <FloatingText speed={0.15}>
                  <h1 className="text-5xl md:text-6xl font-extrabold neon-title">
                    {DATA.name}
                  </h1>
                </FloatingText>

                <FloatingText speed={0.25}>
                  <p className="text-neutral-400 text-lg">{DATA.location}</p>
                </FloatingText>

                <FloatingText speed={0.35}>
                  <p className="mt-4 text-neutral-300 text-lg max-w-md leading-relaxed">
                    Full-Stack & DevOps Engineer building scalable backend systems,
                    CI/CD pipelines, Kubernetes clusters, observability stacks,
                    and AI-assisted automation workflows.
                  </p>
                </FloatingText>

                <FloatingText speed={0.45}>
                  <div className="flex gap-4 mt-8">

                    {/* Magnetic CTA 1 */}
                    <Magnetic strength={0.35}>
                      <a
                        href="#projects"
                        className="px-6 py-3 bg-cyan-400 text-black font-semibold 
                                   rounded-lg shadow-lg hover:scale-105 transition-transform"
                      >
                        View Projects
                      </a>
                    </Magnetic>

                    {/* Magnetic CTA 2 */}
                    <Magnetic strength={0.35}>
                      <a
                        href={DATA.resumeUrl}
                        target="_blank"
                        className="px-6 py-3 border border-white/20 rounded-lg
                                   hover:bg-white hover:text-black transition-colors"
                      >
                        Résumé
                      </a>
                    </Magnetic>

                  </div>
                </FloatingText>

              </div>

              {/* RIGHT IMAGE — Tilt + Bloom */}
              <div className="relative flex justify-center">
                <Tilt3D maxTilt={14} glare={true} glareColor="cyan">
                  <img
                    src="/back.jpg"
                    className="w-72 h-72 md:w-80 md:h-80 rounded-2xl object-cover
                               shadow-[0_0_40px_rgba(0,255,255,0.3)]
                               border border-white/10 backdrop-blur-xl"
                  />
                </Tilt3D>

                {/* Bloom Glow */}
                <div className="absolute -z-10 w-80 h-80 bg-cyan-500/25 
                                blur-[110px] rounded-full opacity-70 animate-blob" />
              </div>

            </div>
          </Reveal>
        </GlassHero>
      </Section>

      {/* ABOUT SECTION */}
      <Section id="about" data-accent="#b76dff">
        <MagneticSection>
          <GlowText text="About Me" />

          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-16">

              <p className="text-neutral-300 text-lg leading-relaxed">
                I’m a full-stack & DevOps-oriented engineer focused on building reliable systems,
                scalable infrastructure, CI/CD automation, container orchestration, and AI-assisted tooling.
              </p>

              <div className="space-y-6 border-l border-white/10 pl-6">
                {DATA.timeline?.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-4 top-1 h-3 w-3 rounded-full 
                                    bg-cyan-400 shadow-md shadow-cyan-400/40" />
                    <h4 className="font-semibold text-sm">{item.year}</h4>
                    <p className="text-neutral-400 text-sm mt-1">{item.text}</p>
                  </div>
                ))}
              </div>

            </div>
          </Reveal>
        </MagneticSection>
      </Section>


      {/* PROJECTS */}
      <Section id="projects" data-accent="#3fff7c">
        <GlowText text="Projects" />
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs rounded-full ${
                  filter === f
                    ? "bg-cyan-400 text-black"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <ProjectLift>
                  <ProjectCard project={p} />
                </ProjectLift>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" data-accent="#ffae42">
        <GlowText text="Experience" />

        <Reveal delay={0.1}>
          <div className="relative border-l border-white/10 pl-6 space-y-10">
            {DATA.experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-4 top-1 h-3 w-3 rounded-full 
                                bg-purple-400 shadow-md" />
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-neutral-400 text-sm mb-3">
                  {exp.company} • {exp.period}
                </p>
                <ul className="text-neutral-300 text-sm space-y-1 list-disc ml-4">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>


      {/* CONTACT */}
      <Section id="contact" data-accent="#ff5e5e">
        <GlowText text="Contact" />

        <Reveal delay={0.1}>
          <p className="text-neutral-300 text-lg mb-6 max-w-xl">
            Interested in working together or discussing a project?
          </p>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="text-cyan-400 hover:underline text-xl"
          >
            {DATA.contact.email}
          </a>
        </Reveal>
      </Section>


    </div>
  );
}
