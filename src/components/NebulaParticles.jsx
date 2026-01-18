import React, { useEffect, useMemo, useRef } from "react";

export default function NebulaParticles({
  density = 160,
  size = 1.6,
  glow = 0.5,
  quality = "high", // "high" | "mid" | "low"
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particleCount = quality === "low" ? 20 : 100;
  let lastFrame = 0;
const FPS = quality === "low" ? 30 : 60;

function animate(time) {
  if (time - lastFrame < 1000 / FPS) return;
  lastFrame = time;
}
  const tuned = useMemo(() => {
    if (quality === "low") {
      return {
        density: Math.max(45, Math.round(density * 0.35)),
        size: size * 0.85,
        glow: glow * 0.75,
        dprCap: 1.25,
        fpsDiv: 2, // render every 2nd frame
      };
    }
    if (quality === "mid") {
      return {
        density: Math.max(80, Math.round(density * 0.6)),
        size: size * 0.92,
        glow: glow * 0.9,
        dprCap: 1.6,
        fpsDiv: 1,
      };
    }
    return {
      density,
      size,
      glow,
      dprCap: 2,
      fpsDiv: 1,
    };
  }, [quality, density, size, glow]);

  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < tuned.density; i++) {
      arr.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.00025,
        vy: (Math.random() - 0.5) * 0.00025,
      });
    }
    return arr;
  }, [tuned.density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let t = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, tuned.dprCap);
      w = Math.floor(window.innerWidth * dpr);
      h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    const draw = () => {
      frame += 1;
      if (tuned.fpsDiv > 1 && frame % tuned.fpsDiv !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      t += 1;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x += 1;
        if (p.x > 1) p.x -= 1;
        if (p.y < 0) p.y += 1;
        if (p.y > 1) p.y -= 1;

        const depth = 0.4 + p.z * 0.9;
        const px = p.x * w;
        const py = p.y * h;

        const r =
          tuned.size *
          depth *
          (0.9 + 0.3 * Math.sin((t + p.z * 1200) * 0.008));

        const a = (0.22 + tuned.glow * 0.35) * depth;

        ctx.fillStyle = `rgba(80, 220, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [points, tuned]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
