// src/App.jsx
import { useEffect } from "react";

// Level-11 Background Systems
import CinematicFog from "./components/CinematicFog";
import NebulaField from "./components/NebulaField";
import ScrollParallaxLayer from "./components/ScrollParallaxLayer";

// Interaction Effects
import SpotlightCursor from "./components/SpotlightCursor";
import TrailCursor from "./components/TrailCursor";
import MagneticSection from "./components/MagneticSection";

// Sections
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";

// Hero Bonus
import Tilt3D from "./components/Tilt3D";

export default function App() {
  useEffect(() => {
    // avoid scroll restore pulling hero off
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <div className="relative w-full min-h-screen text-white bg-black overflow-x-hidden">
      
      {/* ================================================================ */}
      {/* LEVEL-11 BACKGROUND LAYERS                                       */}
      {/* ================================================================ */}

      {/* Cinematic Fog Shader */}
      <CinematicFog />

      {/* Floating Nebula */}
      <NebulaField />

      {/* Soft Parallax Glow */}
      <ScrollParallaxLayer strength={0.08} />


      {/* ================================================================ */}
      {/* INTERACTION LAYERS (cursor, spotlight, particles)                */}
      {/* ================================================================ */}
      <SpotlightCursor />
      <TrailCursor />


      {/* ================================================================ */}
      {/* NAVIGATION BAR                                                   */}
      {/* ================================================================ */}

      <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-xl bg-black/20 border-b border-white/10">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          
          <span className="font-bold text-xl tracking-widest neon-title">
            EP
          </span>

          <div className="flex gap-8 text-sm uppercase font-medium">
            <a href="#hero" className="hover:text-cyan-300 transition">Home</a>
            <a href="#about" className="hover:text-cyan-300 transition">About</a>
            <a href="#projects" className="hover:text-cyan-300 transition">Projects</a>
            <a href="#contact" className="hover:text-cyan-300 transition">Contact</a>
          </div>

        </nav>
      </header>


      {/* ================================================================ */}
      {/* HERO SECTION                                                     */}
      {/* ================================================================ */}
      <section
        id="hero"
        className="
          relative min-h-screen flex items-center justify-center
          px-6 md:px-20 pt-32
        "
      > 
        {/* Magnetic Container */}
        <MagneticSection>

          <div className="grid md:grid-cols-2 gap-16 items-center w-full max-w-6xl">
            
            {/* Left Text */}
            <div className="z-10">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 neon-title">
                Ekansh Pandey
              </h1>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                Full-Stack & DevOps Engineer.  
                Building modern backends, CI/CD pipelines, Kubernetes systems,  
                observability stacks, cloud deployments and AI-powered automation tools.
              </p>

              <div className="flex gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-semibold shadow-xl transition"
                >
                  View Projects
                </a>

                <a
                  href="/resume.pdf"
                  className="px-6 py-3 border border-white/20 hover:border-cyan-400 transition rounded-xl"
                >
                  Résumé
                </a>
              </div>
            </div>

            {/* Right Image (Tilt 3D) */}
            <div className="flex justify-center md:justify-end">
              <Tilt3D>
                <img
                  src="/back.jpg"
                  className="w-[360px] h-[440px] object-cover rounded-2xl
                  shadow-[0_0_40px_rgba(0,255,255,0.3)] border border-white/10"
                  alt="Ekansh"
                />
              </Tilt3D>
            </div>

          </div>

        </MagneticSection>
      </section>


      {/* ================================================================ */}
      {/* ABOUT SECTION (Already Level-10 ready)                            */}
      {/* ================================================================ */}
      <AboutSection />


      {/* ================================================================ */}
      {/* PROJECTS SECTION                                                 */}
      {/* ================================================================ */}
      <ProjectsSection />


      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="py-20 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} Ekansh Pandey — Crafted with passion, TypeScript & GPUs.
      </footer>

      
    </div>
  );
}
