"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-6 sm:px-12 lg:px-24"
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff88]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 whitespace-nowrap">
            <span className="font-mono text-[#00ff88] text-lg sm:text-xl mr-2">
              02.
            </span>
            Skills &amp; Technologies
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[#00ff88]/40 to-transparent" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-14"
        >
          {skills.map((group) => (
            <motion.div key={group.category} variants={categoryVariants}>
              {/* Category Label */}
              <h3 className="text-sm font-mono uppercase tracking-widest text-[#64ffda] mb-6">
                {group.category}
              </h3>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {group.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    variants={cardVariants}
                    className="group relative"
                  >
                    {/* Floating animation wrapper */}
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: itemIndex * 0.2,
                      }}
                    >
                      <div
                        className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl
                          bg-[#112240]/50 backdrop-blur-sm
                          border border-white/[0.06]
                          transition-all duration-300 ease-out
                          hover:scale-105
                          hover:border-white/[0.15]
                          cursor-default"
                        style={
                          {
                            "--glow-color": item.color,
                          } as React.CSSProperties
                        }
                      >
                        {/* Hover glow effect */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            boxShadow: `0 0 25px ${item.color}20, inset 0 0 25px ${item.color}08`,
                            border: `1px solid ${item.color}30`,
                          }}
                        />

                        {/* Icon */}
                        <item.icon
                          className="text-3xl sm:text-4xl transition-all duration-300 group-hover:drop-shadow-lg"
                          style={{ color: item.color }}
                        />

                        {/* Skill Name */}
                        <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300 text-center font-medium">
                          {item.name}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
