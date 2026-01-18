import { motion } from "framer-motion";

export default function PageTransition() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed inset-0 bg-black -z-50"
    />
  );
}
