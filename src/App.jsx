import { useEffect, useMemo, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import Section from "./components/Section";

// FX
import GlassNoise from "./components/GlassNoise";
import AmbientLight from "./components/AmbientLight";
import Particles from "./components/Particles";
import ShaderBackground from "./components/ShaderBackground";
import GlowParallax from "./components/GlowParallax";
import ParallaxGlow from "./components/ParallaxGlow";
import NebulaField from "./components/NebulaField";
import NebulaParticles from "./components/NebulaParticles";
import SpotlightCursor from "./components/SpotlightCursor";
import TrailCursor from "./components/TrailCursor";
import ScrollParallaxLayer from "./components/ScrollParallaxLayer";

// Hero
import Tilt3D from "./components/Tilt3D";
import Reveal from "./components/Reveal";
import FloatingText from "./components/FloatingText";
import Magnetic from "./components/Magnetic";
import HeroDepthLayers from "./components/HeroDepthLayers";
import AccentController from "./components/AccentController";
import GlassHero from "./components/GlassHero";

// Sections
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ContactSection from "./sections/ContactSection";

import { DATA } from "./data";

function pickInitialQuality() {
  try {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 8;

    if (prefersReduced) return "low";
    if (isMobile) return "low";
    if (mem <= 4) return "low";
    if (cores <= 4) return "mid";
    return "high";
  } catch {
    return "mid";
  }
}

const isMobile =
  window.matchMedia("(max-width: 768px)").matches ||
  navigator.maxTouchPoints > 0;

const QUALITY = isMobile ? "low" : "high";


export default function App() {
  const [quality, setQuality] = useState(() => pickInitialQuality());
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    );
  });

  useEffect(() => {
    const onResize = () => {
      setIsMobile(
        window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      );
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rafRef = useRef(0);
  useEffect(() => {
    let frames = 0;
    const start = performance.now();

    const tick = () => {
      frames += 1;
      const now = performance.now();
      const elapsed = now - start;

      if (elapsed >= 1600) {
        const fps = (frames * 1000) / elapsed;
        setQuality((q) => {
          if (q === "low") return "low";
          if (q === "high" && fps < 50) return "mid";
          if (q === "mid" && fps < 42) return "low";
          return q;
        });
        cancelAnimationFrame(rafRef.current);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    document.body.style.background = "#000";
    document.body.style.margin = "0";
  }, []);

  const isTouch = typeof window !== "undefined" && (
  "ontouchstart" in window || navigator.maxTouchPoints > 0
);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tuned = useMemo(() => {
    if (quality === "low") {
      return {
        nebulaStrength: 0.18,
        nebulaParticlesDensity: 0,
        ambientBlur: 40,
        particlesCount: 0,
        glowParallaxStrength: 0,
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
        nebulaParticlesDensity: 0,
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
    return {
      nebulaStrength: 0.38,
      nebulaParticlesDensity: 80,
      ambientBlur: 70,
      particlesCount: 18,
      glowParallaxStrength: 0.08,
      enableShader: true,
      enableNebulaField: true,
      enableNebulaParticles: true,
      enableNoise: true,
      enableCursorFX: true,
    };
  }, [quality]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Quality badge */}
      <div className="fixed top-20 left-4 z-[10001] pointer-events-none">
        <div className="px-3 py-1 rounded-full text-[11px] tracking-wider uppercase border border-white/10 bg-black/40 backdrop-blur-md">
          <span className="text-neutral-300">Quality:</span>{" "}
          <span className="text-cyan-300">{quality}</span>
        </div>
      </div>

      <AccentController />

      {/* Background stack */}
      {tuned.enableShader ? (
        <ShaderBackground quality={quality} />
      ) : (
        <div
          className="fixed inset-0 z-[0] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(0,255,255,.12), transparent 55%), radial-gradient(circle at 70% 70%, rgba(183,109,255,.10), transparent 55%), #000",
          }}
        />
      )}

      {QUALITY === "high" && <ShaderBackground />}
      <NebulaParticles quality={QUALITY} />
      <div className="quality-indicator">
      QUALITY: {QUALITY.toUpperCase()}
      </div>

      {tuned.enableNebulaField && (
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
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
      {tuned.glowParallaxStrength > 0 && (
        <ParallaxGlow speed={0.08} color="rgba(0,255,255,0.18)" />
      )}

      {tuned.enableNoise && <GlassNoise />}
      <AmbientLight blur={tuned.ambientBlur} />

      {tuned.particlesCount > 0 && (
        <ScrollParallaxLayer speed={0.02}>
          <Particles count={tuned.particlesCount} />
        </ScrollParallaxLayer>
      )}

      {/* Cursor FX (tier-aware) */}
      {!isMobile && <SpotlightCursor />}
            {!isMobile && <TrailCursor trailLength={10} />}
      <Navbar />

      {/* HERO (kept in App.jsx) */}
      <Section id="hero" data-accent="#3af2ff">
        <GlassHero>
          <HeroDepthLayers />
          <Reveal delay={0.1}>
            <div className="pt-20 grid md:grid-cols-2 gap-16 items-center">
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
                    I am an aspiring developer currently studying at S.R.M University. 
                    My strong foundation in computer science, combined with hands-on experience from my role in a developer club, positions me well for creating engaging user interfaces and efficient back-end solutions.
                    I am passionate about learning and implementing Artificial Intelligence into my projects. Available for internships and freelance.
                  </p>
                </FloatingText>

                <FloatingText speed={0.45}>
                  <div className="flex gap-4 mt-8">
                    <Magnetic strength={0.35}>
                      <a
                        href="#projects"
                        className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
                      >
                        View Projects
                      </a>
                    </Magnetic>

                    <Magnetic strength={0.35}>
                      <a
                        href="./Ekansh_s_Resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-black transition-colors"
                      >
                        Résumé
                      </a>
                    </Magnetic>
                  </div>
                </FloatingText>
              </div>

              <div className="relative flex justify-center">
                <Tilt3D maxTilt={14} glare={true} glareColor="cyan">
                  <img
                    src="/back.jpg"
                    className="w-72 h-72 md:w-80 md:h-80 rounded-2xl object-cover shadow-[0_0_40px_rgba(0,255,255,0.3)] border border-white/10 backdrop-blur-xl"
                    alt="Profile"
                  />
                </Tilt3D>
                <div className="absolute -z-10 w-80 h-80 bg-cyan-500/20 blur-[70px] rounded-full opacity-60" />
              </div>
            </div>
          </Reveal>
        </GlassHero>
      </Section>

      {/* Sections (render directly — no extra wrappers) */}
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
