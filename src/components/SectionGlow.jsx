export default function SectionGlow({ color = "rgba(0,200,255,0.18)" }) {
  return (
    <div
      className="absolute inset-0 -z-10 blur-[120px] opacity-60 pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50% 20%, ${color}, transparent 70%)`,
      }}
    />
  );
}
