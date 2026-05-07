import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingDecorativeElements = ({ count = 12, type = 'heart', color = '#7F1D1D' }) => {
  const elements = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          initial={{
            x: el.left,
            y: '110%',
            rotate: el.rotation,
            opacity: 0
          }}
          animate={{
            y: '-10%',
            rotate: el.rotation + 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          style={{ width: el.size, height: el.size }}
        >
          {type === 'heart' ? (
            <svg viewBox="0 0 24 24" fill={color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: color,
                borderRadius: '50%',
                filter: 'blur(2px)'
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingDecorativeElements;
