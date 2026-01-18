import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ duration: 0.3 }}
      className="gradient-border p-6 rounded-2xl bg-white/5 backdrop-blur-xl 
                 shadow-xl shadow-black/30 hover:shadow-cyan-500/20"
    >
      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>

      <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="text-[11px] px-3 py-1 bg-white/10 rounded-full">
            {t}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        className="text-cyan-400 text-sm hover:underline"
        target="_blank"
      >
        View Project →
      </a>
    </motion.div>
  );
}
