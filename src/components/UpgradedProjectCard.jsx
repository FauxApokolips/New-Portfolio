import { motion } from "framer-motion";

export default function UpgradedProjectCard({ project }) {
  if (!project) return null;

  const { title, description, tech = [], link } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl p-[2px] bg-gradient-to-br from-cyan-500/30 to-purple-500/30 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all cursor-pointer"
    >
      <div className="rounded-2xl p-6 backdrop-blur-xl bg-black/40 border border-white/10 hover:border-cyan-400/40 transition-all">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-white/70 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          className="text-cyan-300 hover:text-cyan-400 transition"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
}
