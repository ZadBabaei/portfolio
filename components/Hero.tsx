"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiDownload,
  FiFilm,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const bentoStats = [
  { label: "Real Projects", value: "8+", icon: FiBarChart2 },
  { label: "Core Stacks", value: "3", icon: FiLayers },
  { label: "Available", value: "Open", icon: FiCheckCircle },
];

function FloatingParticles() {
  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        x: (index * 23 + 9) % 100,
        y: (index * 29 + 13) % 100,
        size: 2 + (index % 3),
        duration: 7 + (index % 4),
        delay: index * 0.2,
        opacity: 0.1 + (index % 3) * 0.05,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#2ECC71]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{ y: [0, -18, 0], x: [0, 6, 0] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MovieTrackerBoard() {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-2 gap-3 sm:gap-4"
      aria-label="Movie Tracker product preview"
    >
      <motion.div
        variants={fadeUp}
        className="glass-card green-glow col-span-2 overflow-hidden rounded-3xl p-5 sm:p-6"
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Featured Product</p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
              Movie Tracker
            </h2>
          </div>
          <span className="rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/10 px-3 py-1 font-mono text-xs text-[#A7F3C4]">
            Live build
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: FiUsers, label: "Groups", value: "Shared nights" },
            { icon: FiFilm, label: "Watchlists", value: "Team picks" },
            { icon: FiMessageCircle, label: "Chat", value: "Real-time" },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <Icon aria-hidden="true" className="mb-4 h-5 w-5 text-[#2ECC71]" />
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs text-slate-400">{item.value}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {bentoStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="glass-card rounded-3xl p-4 sm:p-5"
          >
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#2ECC71]/25 bg-[#0B3A5B]/35 text-[#2ECC71]">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </div>
            <p className="text-2xl font-black text-white sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        );
      })}

      <motion.div
        variants={fadeUp}
        className="glass-card col-span-2 rounded-3xl border-[#1E6F9F]/35 p-4 sm:p-5"
      >
        <div className="flex flex-wrap gap-2">
          {["React", "Node.js", "MongoDB", "Stream API", "JWT"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#2ECC71]/20 bg-[#2ECC71]/10 px-3 py-1 font-mono text-xs text-[#A7F3C4]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="portfolio-bg portfolio-grid-overlay relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-20 sm:px-12 lg:px-24"
    >
      {mounted && <FloatingParticles />}

      <div className="pointer-events-none absolute left-[6%] top-20 h-72 w-72 rounded-full bg-[#2ECC71]/12 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-8 right-[8%] h-96 w-96 rounded-full bg-[#0B3A5B]/24 blur-[130px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-5">
            Mehrzad Babaei / Full-stack Developer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="max-w-5xl text-5xl font-black leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-8xl"
          >
            Full-stack systems, designed like products.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            I build responsive web applications, API-backed tools, cloud
            workflows, and data-aware interfaces with strong attention to
            usability, architecture, and delivery.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a href="#projects" className="primary-button">
              View Work
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href="/MehrzadBabaeiResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button"
            >
              Download Resume
              <FiDownload aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#contact" className="secondary-button">
              Contact
              <FiMail aria-hidden="true" className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <MovieTrackerBoard />
        </motion.div>
      </div>
    </section>
  );
}
