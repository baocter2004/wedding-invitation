import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf } from 'lucide-react';

const FloatingDecorativeElements = ({ count = 12, type = 'heart', color = '#7F1D1D' }) => {
  const elements = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 24 + 12,
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
          className="absolute flex items-center justify-center"
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
          style={{ 
            width: el.size, 
            height: el.size,
            color: color
          }}
        >
          {type === 'heart' ? (
            <Heart size={el.size} fill="currentColor" />
          ) : type === 'leaf' ? (
            <Leaf size={el.size} fill="currentColor" />
          ) : (
            <div
              className="w-full h-full rounded-full blur-[2px]"
              style={{ backgroundColor: 'currentColor' }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingDecorativeElements;

