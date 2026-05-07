import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  yOffset = 50,
  xOffset = 0,
  scale = 1,
  skew = 0,
  blur = 0,
  once = true,
  variant = 'fade-up' // fade-up, fade-in, scale-up, mask-reveal
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });

  const getVariants = () => {
    switch (variant) {
      case 'fade-up':
        return {
          initial: { opacity: 0, y: yOffset, x: xOffset, scale, skewX: skew, filter: blur > 0 ? `blur(${blur}px)` : 'none' },
          animate: isInView ? { opacity: 1, y: 0, x: 0, scale: 1, skewX: 0, filter: 'blur(0px)' } : {}
        };
      case 'fade-in':
        return {
          initial: { opacity: 0, filter: blur > 0 ? `blur(${blur}px)` : 'none' },
          animate: isInView ? { opacity: 1, filter: 'blur(0px)' } : {}
        };
      case 'scale-up':
        return {
          initial: { opacity: 0, scale: 0.8, y: 20 },
          animate: isInView ? { opacity: 1, scale: 1, y: 0 } : {}
        };
      case 'mask-reveal':
        return {
          initial: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 30 },
          animate: isInView ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 } : {}
        };
      case 'blur-reveal':
        return {
          initial: { opacity: 0, filter: 'blur(20px)', y: 20 },
          animate: isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}
        };
      default:
        return {
          initial: { opacity: 0, y: yOffset },
          animate: isInView ? { opacity: 1, y: 0 } : {}
        };
    }
  };

  const { initial, animate } = getVariants();

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom quint ease for premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
