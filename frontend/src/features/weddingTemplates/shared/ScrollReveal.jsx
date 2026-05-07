import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  xOffset = 0,
  scale = 1,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: yOffset,
        x: xOffset,
        scale: scale < 1 ? scale : 1
      }}
      animate={isInView
        ? { opacity: 1, y: 0, x: 0, scale: 1 }
        : { opacity: 0, y: yOffset, x: xOffset, scale: scale < 1 ? scale : 1 }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
