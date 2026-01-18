import { motion } from "framer-motion";

export default function GlowText({ text }) {
  return (
    <motion.h2
      initial={{ opacity: 0.4 }}
      whileInView={{ opacity: 1, textShadow: "0px 0px 20px var(--accent)" }}
      transition={{ duration: 0.7 }}
      className="text-3xl font-bold"
    >
      {text}
    </motion.h2>
  );
}
