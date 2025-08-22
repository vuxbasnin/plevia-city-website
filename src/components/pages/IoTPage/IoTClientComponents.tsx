"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import components directly
import TouchOverlay from "./TouchOverlay";
import AutoplayVideo from "./AutoplayVideo";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Helper to render mesh gradient overlay
function MeshGradientOverlay() {
  return (
    <motion.div
      className="absolute inset-0 opacity-5"
      style={{
        background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
      }}
    />
  );
}

interface IoTClientComponentsProps {
  sections: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    video: string;
    gradient: string;
  }>;
}

// AutoplayVideoWrapper component với fallback image
function AutoplayVideoWrapper({
  src,
  poster,
  alt,
  sectionId,
}: {
  src: string;
  poster: string;
  alt: string;
  sectionId: number;
}) {
  return (
    <div className="relative">
      {/* Video component - chỉ load trên client */}
      <AutoplayVideo src={src} poster={poster} alt={alt} sectionId={sectionId} />
    </div>
  );
}

interface IoTClientComponentsProps {
  sections: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    video: string;
    gradient: string;
  }>;
}

export default function IoTClientComponents({ sections }: IoTClientComponentsProps) {
  return (
    <>
      <TouchOverlay />
      {/* IoT Sections */}
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              className={`min-h-screen flex items-center relative overflow-hidden ${
                index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              }`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 50,
                damping: 20,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Enhanced Background with Multiple Layers */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-10`}
                animate={{
                  opacity: [0.1, 0.15, 0.1],
                  background: [
                    `linear-gradient(135deg, ${section.gradient
                      .replace("from-", "")
                      .replace("to-", ", ")})`,
                    `linear-gradient(225deg, ${section.gradient
                      .replace("from-", "")
                      .replace("to-", ", ")})`,
                    `linear-gradient(135deg, ${section.gradient
                      .replace("from-", "")
                      .replace("to-", ", ")})`,
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Animated Mesh Gradient Overlay */}
              <MeshGradientOverlay />

              <div className="container mx-auto px-4 py-20">
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  {/* Content Side */}
                  <motion.div
                    className={`space-y-6 ${
                      index % 2 === 0 ? "lg:pr-12" : "lg:pl-12 lg:col-start-2"
                    }`}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.h2
                      className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white"
                      initial={{ y: 30, opacity: 0, scale: 0.9 }}
                      whileInView={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        type: "spring",
                        stiffness: 100,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {section.title}
                    </motion.h2>

                    <motion.p
                      className="text-lg md:text-xl text-gray-300 leading-relaxed"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {section.description.split(" ").map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          className="inline-block mr-1"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.6 + wordIndex * 0.03,
                          }}
                          viewport={{ once: true }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                  </motion.div>

                  {/* Image Side */}
                  <motion.div
                    className={`relative ${
                      index % 2 === 0 ? "" : "lg:col-start-1"
                    }`}
                    initial={{
                      x: index % 2 === 0 ? 100 : -100,
                      opacity: 0,
                    }}
                    whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.4,
                      type: "spring",
                      stiffness: 50,
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="relative group perspective-1000"
                      whileHover={{
                        scale: 1.05,
                        z: 50,
                      }}
                    >
                      {/* Enhanced Glow Effect */}
                      <motion.div
                        className={`absolute -inset-2 bg-gradient-to-r ${section.gradient} rounded-2xl blur-xl opacity-20`}
                        animate={{
                          opacity: [0.2, 0.4, 0.6, 0.4, 0.2],
                          scale: [1, 1.05, 1.1, 1.05, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="relative transform-gpu">
                        {section.video ? (
                          <AutoplayVideoWrapper
                            src={section.video}
                            poster={section.image}
                            alt={section.title}
                            sectionId={section.id}
                          />
                        ) : (
                          <motion.img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-[250px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                            whileHover={{
                              filter: "brightness(1.1) contrast(1.1)",
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
