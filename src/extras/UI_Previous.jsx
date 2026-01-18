import { useEffect, useMemo, useRef, useState } from "react";

// Core components
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";

// Existing FX
import GlassNoise from "./components/GlassNoise";
import AmbientLight from "./components/AmbientLight";
import Particles from "./components/Particles";

// Level-11 FX
import ShaderBackground from "./components/ShaderBackground";
import GlowParallax from "./components/GlowParallax";
import ParallaxGlow from "./components/ParallaxGlow";

// New nebula layers you uploaded
import NebulaField from "./components/NebulaField";
import NebulaParticles from "./components/NebulaParticles";

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

// Sections
import ContactSection from "./sections/ContactSection";
import ProjectsSection from "./sections/ProjectsSection/";

// Level-10 UI
import AccentController from "./components/AccentController";
import GlassHero from "./components/GlassHero";
import MagneticSection from "./components/MagneticSection";
import GlowText from "./components/GlowText";
import ProjectLift from "./components/ProjectLift";

// Data
import { DATA } from "./data";
function pickInitialQuality() {
  try {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

    const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
    // deviceMemory is not supported everywhere
    const mem = typeof navigator !== "undefined" ? navigator.deviceMemory || 8 : 8;

    if (prefersReduced) return "low";
    if (isMobile) return "low";
    if (mem <= 4) return "low";
    if (cores <= 4) return "mid";
    return "high";
  } catch {
    return "mid";
  }
}

export default function App() {
  const filters = ["All", "DevOps", "Backend", "Frontend", "AI"];
  const [filter, setFilter] = useState("All");

  // Quality tier (visible + used to tune effects)
  const [quality, setQuality] = useState(() => pickInitialQuality());

  // Responsive “isMobile” without reading window at render time
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  });

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const rafRef = useRef(0);
  useEffect(() => {
    let frames = 0;
    let start = performance.now();
    let stopped = false;

    const tick = () => {
      frames += 1;
      const now = performance.now();
      const elapsed = now - start;

      // sample for ~1600ms
      if (elapsed >= 1600 && !stopped) {
        const fps = (frames * 1000) / elapsed;

        setQuality((q) => {
          if (q === "low") return "low";
          if (q === "high" && fps < 50) return "mid";
          if (q === "mid" && fps < 42) return "low";
          return q;
        });

        stopped = true;
        cancelAnimationFrame(rafRef.current);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    document.body.style.background = "#000000";
    document.body.style.margin = "0";
    return () => {
    };
  }, []);

  const projects = useMemo(() => {
    return DATA.projects.filter((p) => (filter === "All" ? true : p.category === filter));
  }, [filter]);

  // Timeline fallback so it is never empty (your current code renders nothing if missing):contentReference[oaicite:8]{index=8}
  const timeline = useMemo(() => {
    if (Array.isArray(DATA.timeline) && DATA.timeline.length) return DATA.timeline;
    return [
      { year: "2024", text: "Shipped production-grade DevOps + automation workflows and portfolio projects." },
      { year: "2023", text: "Built full-stack systems with CI/CD, observability, and container-first deployments." },
      { year: "2022", text: "Focused on fundamentals: backend design, performance, and clean UI engineering." },
    ];
  }, []);

  // Tune effect intensity by tier (cheap and predictable)
  const tuned = useMemo(() => {
  if (quality === "low") {
    return {
      nebulaStrength: 0.18,
      nebulaParticlesDensity: 0,   // off
      ambientBlur: 40,
      particlesCount: 0,           // off
      glowParallaxStrength: 0,     // off
      enableShader: false,
      enableNebulaField: true,
      enableNebulaParticles: false,
      enableNoise: false,
      enableCursorFX: false,
    };
  }
  
  if (quality === "mid") {
    return {
      nebulaStrength: 0.28,
      nebulaParticlesDensity: 0,   // off (huge win)
      ambientBlur: 60,
      particlesCount: 10,
      glowParallaxStrength: 0.06,
      enableShader: true,
      enableNebulaField: true,
      enableNebulaParticles: false,
      enableNoise: true,
      enableCursorFX: false,
    };
  }
  // high
  return {
    nebulaStrength: 0.38,
    nebulaParticlesDensity: 80,   // keep modest
    ambientBlur: 70,              // not 120
    particlesCount: 18,           // not 40
    glowParallaxStrength: 0.08,   // not 0.12
    enableShader: true,
    enableNebulaField: true,
    enableNebulaParticles: true,
    enableNoise: true,
    enableCursorFX: true,
  };
}, [quality]);



  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Quality badge (you asked to see which tier it is currently on) */}
      <div className="fixed top-20 left-4 z-[10001] pointer-events-none">
        <div className="px-3 py-1 rounded-full text-[11px] tracking-wider uppercase border border-white/10 bg-black/40 backdrop-blur-md">
          <span className="text-neutral-300">Quality:</span>{" "}
          <span className="text-cyan-300">{quality}</span>
        </div>
      </div>

      {/* Accent engine */}
      <AccentController />

      {/* BACKGROUND STACK (fixed + persistent) */}
{tuned.enableShader ? (
  <ShaderBackground quality={quality} />
) : (
  <div className="fixed inset-0 z-[0] pointer-events-none"
       style={{ background: "radial-gradient(circle at 30% 25%, rgba(0,255,255,.12), transparent 55%), radial-gradient(circle at 70% 70%, rgba(183,109,255,.10), transparent 55%), #000" }} />
)}

{tuned.enableNebulaField && (
  <div className="fixed inset-0 z-[1] pointer-events-none"
       style={{ transform: "translateZ(0)", willChange: "transform" }}>
    <NebulaField strength={tuned.nebulaStrength} color="#6b5cff" />
    {tuned.enableNebulaParticles && (
      <NebulaParticles
        density={tuned.nebulaParticlesDensity}
        size={1.25}
        glow={0.35}
        quality={quality}
      />
    )}
  </div>
)}

{tuned.glowParallaxStrength > 0 && <GlowParallax strength={tuned.glowParallaxStrength} />}
{tuned.glowParallaxStrength > 0 && <ParallaxGlow speed={0.08} color="rgba(0,255,255,0.18)" />}

{tuned.enableNoise && <GlassNoise />}
<AmbientLight blur={tuned.ambientBlur} />

{tuned.particlesCount > 0 && (
  <ScrollParallaxLayer speed={0.02}>
    <Particles count={tuned.particlesCount} />
  </ScrollParallaxLayer>
)}
{/* Cursor FX */}
      {!isMobile && <SpotlightCursor />}
      {!isMobile && <TrailCursor trailLength={10} />}


      {/* Navbar (keep your existing one; remove duplicate header to avoid stacking) */}
      <Navbar />

      {/* HERO */}
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
                    <Magnetic strength={0.35}>
                      <a
                        href="#projects"
                        className="px-6 py-3 bg-cyan-400 text-black font-semibold 
                                   rounded-lg shadow-lg hover:scale-105 transition-transform"
                      >
                        View Projects
                      </a>
                    </Magnetic>

                    <Magnetic strength={0.35}>
                      <a
                        href={DATA.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
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
                    alt="Profile"
                  />
                </Tilt3D>

                <div
                  className="absolute -z-10 w-80 h-80 bg-cyan-500/25 
                             blur-[110px] rounded-full opacity-70 animate-blob"
                />
              </div>
            </div>
          </Reveal>
        </GlassHero>
      </Section>

      {/* ABOUT */}
      <Section id="about" data-accent="#b76dff">
        <MagneticSection>
          <GlowText text="About Me" />

          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-16">
              <p className="text-neutral-300 text-lg leading-relaxed">
                I’m a full-stack & DevOps-oriented engineer focused on building reliable systems,
                scalable infrastructure, CI/CD automation, container orchestration, and AI-assisted tooling.
                <br />
                <br />
                I enjoy turning complex infra into clean, observable, and secure production deployments—
                then making them faster and cheaper.
              </p>

              {/* Timeline (now never empty) */}
              <div className="space-y-6 border-l border-white/10 pl-6">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div
                      className="absolute -left-4 top-1 h-3 w-3 rounded-full 
                                 bg-cyan-400 shadow-md shadow-cyan-400/40"
                    />
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
                <div
                  className="absolute -left-4 top-1 h-3 w-3 rounded-full 
                             bg-purple-400 shadow-md"
                />
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
      <Section id="contact" title="">
      <ContactSection />
      </Section>
    </div>
     
  );
}
