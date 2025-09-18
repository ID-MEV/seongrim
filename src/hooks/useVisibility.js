import { useInView } from 'framer-motion';
import { useRef } from 'react';

const useVisibility = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, ...options });

  return { ref, isInView };
};

export default useVisibility;
