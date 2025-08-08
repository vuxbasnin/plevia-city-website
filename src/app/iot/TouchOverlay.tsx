import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TouchOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleTouch = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer overflow-hidden"
          onClick={handleTouch}
          onTouchStart={handleTouch}
        >
          {/* Fingerprint Scanner Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer scanning circles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-cyan-400 rounded-full"
                style={{
                  width: `${200 + i * 80}px`,
                  height: `${200 + i * 80}px`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}

            {/* Central fingerprint pattern */}
            <motion.div
              className="relative w-32 h-32 border-2 border-cyan-400 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Fingerprint lines */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border border-cyan-300 rounded-full"
                  style={{
                    width: `${20 + i * 15}px`,
                    height: `${20 + i * 15}px`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.6 - i * 0.1,
                  }}
                />
              ))}
            </motion.div>

            {/* Center logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src={'https://pleviacity.com.vn/demo/bh.png'} alt="Logo" className="h-20 w-auto" />
            </div>

            {/* Scanning lines */}
            <motion.div
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={{
                y: [-200, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              animate={{
                x: [-200, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: 1,
              }}
            />
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center relative z-10 mt-64"
          >
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="text-cyan-400 text-2xl md:text-3xl font-light mb-2 tracking-wider"
            >
              CHẠM ĐỂ TRẢI NGHIỆM
            </motion.div>
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="text-cyan-300 text-sm opacity-60 tracking-widest"
            >
              [ TOUCH TO ACTIVATE ]
            </motion.div>
          </motion.div>

          {/* Logo at top center */}
          <div className="absolute top-8 left-0 right-0 flex justify-center z-20">
            <motion.img
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              src={'https://pleviacity.com.vn/demo/logo.png'}
              alt="Logo"
              className="h-32 w-auto filter brightness-0 invert opacity-90"
            />
          </div>

          {/* Corner brackets */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-cyan-400"></div>
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-cyan-400"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TouchOverlay;
