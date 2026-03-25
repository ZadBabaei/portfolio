"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

/* ------------------------------------------------------------------ */
/*  Floating background particles                                      */
/* ------------------------------------------------------------------ */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function FloatingParticles() {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#64ffda]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 10, -10, 5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Fake code-editor component                                         */
/* ------------------------------------------------------------------ */

const codeLines = [
  { text: "const ", cls: "text-[#c792ea]" },        // keyword purple
  { text: "mehrzad", cls: "text-[#82aaff]" },       // variable blue
  { text: " = {", cls: "text-white" },
  null, // line break marker
  { text: '  role: ', cls: "text-white" },
  { text: '"Full-Stack Dev"', cls: "text-[#00ff88]" },
  { text: ",", cls: "text-white" },
  null,
  { text: '  skills: ', cls: "text-white" },
  { text: '["React", "Next.js", "TypeScript"]', cls: "text-[#00ff88]" },
  { text: ",", cls: "text-white" },
  null,
  { text: '  passion: ', cls: "text-white" },
  { text: '"Building modern web apps"', cls: "text-[#00ff88]" },
  { text: ",", cls: "text-white" },
  null,
  { text: '  coffee: ', cls: "text-white" },
  { text: "true", cls: "text-[#ff7b72]" },
  { text: ",", cls: "text-white" },
  null,
  { text: "};", cls: "text-white" },
];

// Group tokens into lines
function groupLines() {
  const lines: { text: string; cls: string }[][] = [[]];
  codeLines.forEach((token) => {
    if (token === null) {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(token);
    }
  });
  return lines;
}

const editorLines = groupLines();

function CodeEditor() {
  const lineVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-[#011627] shadow-2xl shadow-[#00ff88]/5"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d2137] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-[#8892b0]">mehrzad.ts</span>
      </div>

      {/* Code area */}
      <div className="p-5 font-mono text-sm leading-relaxed">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.18, delayChildren: 1.0 }}
        >
          {editorLines.map((tokens, lineIdx) => (
            <motion.div
              key={lineIdx}
              variants={lineVariants}
              transition={{ duration: 0.35 }}
              className="flex"
            >
              <span className="mr-4 inline-block w-5 select-none text-right text-[#4e5a73]">
                {lineIdx + 1}
              </span>
              <span>
                {tokens.map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Blinking cursor */}
        <motion.span
          className="ml-9 mt-1 inline-block h-[1.15em] w-[2px] bg-[#64ffda]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: [0, 0, 1, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  /* Prevent hydration mismatch for particles (random values) */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a192f] px-6 py-20 sm:px-12 lg:px-24"
    >
      {/* Floating particles */}
      {mounted && <FloatingParticles />}

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff88]/[0.03] blur-[120px]" />

      {/* Main grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ---- Left: text content ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm tracking-wide text-[#64ffda] sm:text-base"
          >
            Hi, my name is
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-tight text-[#ccd6f6] sm:text-5xl lg:text-6xl"
          >
            Mehrzad Babaei.
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold leading-snug text-[#8892b0] sm:text-4xl lg:text-5xl"
          >
            I build things for the web.
          </motion.h2>

          {/* Typewriter */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 font-mono text-lg text-[#64ffda] sm:text-xl"
          >
            <span className="text-[#8892b0]">&gt;</span>
            <TypeAnimation
              sequence={[
                "React Developer",
                2000,
                "Next.js Engineer",
                2000,
                "TypeScript Enthusiast",
                2000,
                "Full-Stack Builder",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-base leading-relaxed text-[#8892b0] sm:text-lg"
          >
            I&apos;m a passionate full-stack developer who loves crafting
            performant, accessible, and visually polished web experiences.
            Currently focused on building modern applications with React,
            Next.js, and TypeScript.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="mt-2 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-md border border-[#64ffda] px-6 py-3 font-mono text-sm text-[#64ffda] transition-all duration-300 hover:bg-[#64ffda]/10"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                View My Work
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md bg-[#10b981] px-6 py-3 font-mono text-sm text-[#0a192f] font-semibold transition-all duration-300 hover:bg-[#00ff88] hover:shadow-lg hover:shadow-[#00ff88]/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                />
              </svg>
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* ---- Right: code editor ---- */}
        <div className="flex justify-center lg:justify-end">
          <CodeEditor />
        </div>
      </div>
    </section>
  );
}
