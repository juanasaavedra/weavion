import React from 'react';
import { motion } from 'framer-motion';
import moonImg from './assets/moon.png';

const Moon = ({ 
  position = { x: "5vw", y: "50vh" }, 
  size = "150px", 
  opacity = 1,
  zIndex = 20,
  transition = { duration: 1.5, ease: "easeInOut" } 
}) => {
  return (
    <motion.div
      className="fixed pointer-events-none" 
      initial={{ opacity: opacity }}
      animate={{ 
        x: position.x,
        y: position.y,
        width: size,
        height: size,
        opacity: opacity
      }}
      transition={transition}
      style={{
        filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
        zIndex: zIndex
      }}
    >
      <img 
        src={moonImg} 
        alt="Luna" 
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default Moon;
