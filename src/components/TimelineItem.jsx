export default function TimelineItem({ year, text }) {
  return (
    <div className="relative pl-8 mb-8 group">
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(0,255,255,0.5)]"></div>

      <h4 className="text-lg font-semibold group-hover:text-cyan-300 transition-colors">
        {year}
      </h4>
      <p className="text-white/70">{text}</p>
    </div>
  );
}
