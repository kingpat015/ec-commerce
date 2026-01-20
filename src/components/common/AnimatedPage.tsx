import React from "react";
import { motion } from "framer-motion";

interface AnimatedPageProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 40,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const, // Custom smooth easing
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -40,
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
