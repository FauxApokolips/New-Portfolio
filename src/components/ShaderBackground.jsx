import React, { useEffect, useMemo, useRef } from "react";

export default function ShaderBackground({ quality = "high" }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  const tuned = useMemo(() => {
    if (quality === "low") return { dprCap: 1.25, fpsDiv: 2, blobCount: 3 };
    if (quality === "mid") return { dprCap: 1.6, fpsDiv: 1, blobCount: 4 };
    return { dprCap: 2, fpsDiv: 1, blobCount: 5 };
  }, [quality]);

  const isMobile =
  window.matchMedia("(max-width: 768px)").matches ||
  navigator.maxTouchPoints > 0;

if (isMobile) return null;

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
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const draw = () => {
      frame += 1;
      if (tuned.fpsDiv > 1 && frame % tuned.fpsDiv !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createRadialGradient(
        w * (0.35 + 0.05 * Math.sin(t)),
        h * (0.35 + 0.05 * Math.cos(t * 0.9)),
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      g.addColorStop(0, "rgba(40, 190, 255, 0.14)");
      g.addColorStop(0.4, "rgba(120, 70, 220, 0.10)");
      g.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < tuned.blobCount; i++) {
        const px = w * (0.2 + 0.6 * ((i + 1) / (tuned.blobCount + 1))) + Math.sin(t + i) * w * 0.04;
        const py = h * (0.25 + 0.5 * ((i + 1) / (tuned.blobCount + 1))) + Math.cos(t * 1.1 + i) * h * 0.05;
        const r = Math.max(w, h) * (0.18 + 0.03 * i);

        const gg = ctx.createRadialGradient(px, py, 0, px, py, r);
        gg.addColorStop(0, `rgba(60, 220, 255, ${0.06 - i * 0.008})`);
        gg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gg;
        ctx.fillRect(0, 0, w, h);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tuned]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "black" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
