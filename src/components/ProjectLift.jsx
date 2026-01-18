import { motion } from "framer-motion";

export default function ProjectLift({ children }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        rotateX: 5,
        rotateY: -5,
        transition: { duration: 0.25 },
      }}
    >
      {children}
    </motion.div>
  );
}
