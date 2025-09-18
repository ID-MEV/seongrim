import React from 'react';
import { motion } from 'framer-motion';
import useVisibility from '../hooks/useVisibility'; // Adjust path as needed

const FadeIn = ({ children, ...props }) => {
  const { ref, isInView } = useVisibility();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }} // Corresponds to .fade-in-hidden
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Corresponds to .fade-in-visible
      transition={{ duration: 0.6, ease: "easeOut" }} // Corresponds to transition in CSS
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
