"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutStats } from "@/lib/data";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto"
    >
      {/* Section Heading */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex items-center gap-4 mb-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap"
        >
          <span className="font-mono text-[#00ff88] mr-2 text-xl sm:text-2xl">
            01.
          </span>
          About Me
        </motion.h2>
        <motion.div
          variants={itemVariants}
          className="h-px flex-grow bg-gradient-to-r from-[#10b981]/40 to-transparent max-w-xs"
        />
      </motion.div>

      {/* Two-Column Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-start"
      >
        {/* Left Column — Bio */}
        <motion.div variants={itemVariants} className="space-y-5">
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            I&apos;m a Computer Science graduate from{" "}
            <span className="text-[#64ffda]">
              Memorial University of Newfoundland
            </span>{" "}
            with a passion for building accessible, pixel-perfect web
            experiences. I&apos;m most comfortable working with
            JavaScript/TypeScript, React, and Python.
          </p>
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            I&apos;ve spent time in real sprints and code reviews, and I
            understand how teams actually ship software. From debugging
            production issues through log analysis to building SaaS features
            with modern frameworks, I bring both technical skill and a growth
            mindset to every project.
          </p>
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            When I&apos;m not coding, you&apos;ll find me exploring new
            technologies, contributing to open-source, or helping others learn
            to code.
          </p>
        </motion.div>

        {/* Right Column — Photo Placeholder */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center md:justify-end"
        >
          <div className="relative group">
            {/* Green offset border behind */}
            <div className="absolute top-4 left-4 w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] rounded-lg border-2 border-[#00ff88]/50 transition-all duration-300 group-hover:top-2 group-hover:left-2" />

            {/* Main photo container */}
            <div className="gradient-border relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] rounded-lg overflow-hidden bg-[#0a192f] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 via-[#10b981]/5 to-[#0a192f] flex items-center justify-center">
                <span className="text-[#64ffda]/30 font-mono text-sm tracking-wider">
                  Photo
                </span>
              </div>
              {/* Green overlay on hover */}
              <div className="absolute inset-0 bg-[#00ff88]/10 opacity-100 transition-opacity duration-300 group-hover:opacity-0 mix-blend-multiply" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {aboutStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut" as const,
                  delay: 0.4 + index * 0.1,
                },
              },
            }}
            className="group relative rounded-xl p-6 text-center
              bg-white/[0.03] backdrop-blur-md border border-white/[0.06]
              hover:border-[#00ff88]/30 hover:bg-white/[0.06]
              transition-all duration-300 cursor-default"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00ff88]/[0.04] shadow-[0_0_30px_rgba(0,255,136,0.08)]" />

            <div className="relative z-10">
              <p className="text-3xl sm:text-4xl font-bold text-[#00ff88] mb-2 tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-slate-400 uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
