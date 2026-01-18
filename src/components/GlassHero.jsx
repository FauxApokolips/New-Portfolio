import { motion } from "framer-motion";

export default function GlassHero({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative rounded-2xl p-10 backdrop-blur-xl
        bg-white/5 border border-white/10 shadow-xl overflow-hidden
      "
    >
      {/* Light sweep */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear",
        }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {children}
    </motion.div>
  );
}
