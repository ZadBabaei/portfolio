"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi";
import { experiences } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Single timeline card                                                */
/* ------------------------------------------------------------------ */

function TimelineCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0; // odd items (0-indexed even) on left

  const Icon =
    experience.type === "work" ? HiBriefcase : HiAcademicCap;

  return (
    <div
      ref={ref}
      className={`
        relative flex w-full items-center
        md:justify-${isLeft ? "start" : "end"}
        justify-start
      `}
    >
      {/* ---- Desktop: spacer on opposite side ---- */}
      {isLeft ? null : (
        <div className="hidden md:block md:w-1/2" />
      )}

      {/* ---- Card ---- */}
      <motion.div
        initial={{
          opacity: 0,
          x: isLeft ? -80 : 80,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: isLeft ? -80 : 80 }
        }
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`
          relative z-10 w-full md:w-[calc(50%-2rem)]
          ml-10 md:ml-0
          ${isLeft ? "md:mr-8" : "md:ml-8"}
        `}
      >
        <div
          className="
            group rounded-xl border border-white/[0.08]
            bg-[#112240]/60 p-5 shadow-lg
            backdrop-blur-md transition-all duration-300
            hover:border-[#64ffda]/20 hover:shadow-[0_0_30px_rgba(100,255,218,0.06)]
          "
        >
          {/* Type badge */}
          <span
            className="
              mb-3 inline-flex items-center gap-1.5 rounded-full
              bg-[#64ffda]/10 px-3 py-1 text-xs font-medium
              uppercase tracking-wider text-[#64ffda]
            "
          >
            <Icon className="h-3.5 w-3.5" />
            {experience.type === "work" ? "Work" : "Education"}
          </span>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[#ccd6f6]">
            {experience.title}
          </h3>

          {/* Company */}
          <p className="mt-1 text-[#64ffda]">{experience.company}</p>

          {/* Period & Location */}
          <p className="mt-1 text-sm text-[#8892b0]">
            {experience.period} &middot; {experience.location}
          </p>

          {/* Bullet points */}
          {experience.points.length > 0 && (
            <ul className="mt-4 space-y-2">
              {experience.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#a8b2d1]">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#64ffda]" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>

      {/* ---- Desktop: spacer on opposite side ---- */}
      {isLeft ? (
        <div className="hidden md:block md:w-1/2" />
      ) : null}

      {/* ---- Timeline dot (centered on the line) ---- */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="
          absolute left-0 md:left-1/2
          -translate-x-1/2 z-20
          flex h-10 w-10 items-center justify-center
          rounded-full border-2 border-[#64ffda]
          bg-[#0a192f] shadow-[0_0_15px_rgba(100,255,218,0.3)]
        "
      >
        <Icon className="h-4 w-4 text-[#64ffda]" />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Experience section                                             */
/* ------------------------------------------------------------------ */

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#0a192f] py-24 md:py-32"
    >
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,255,218,0.04)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* ---- Section heading ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <h2 className="whitespace-nowrap text-2xl font-bold text-[#ccd6f6] sm:text-3xl">
            <span className="mr-2 font-mono text-lg text-[#64ffda] sm:text-xl">
              03.
            </span>
            Where I&rsquo;ve Been
          </h2>
          <span className="h-px w-full max-w-xs bg-[#233554]" />
        </motion.div>

        {/* ---- Timeline ---- */}
        <div ref={containerRef} className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-0 top-0 h-full md:left-1/2 md:-translate-x-1/2">
            {/* Track (faint) */}
            <div className="h-full w-0.5 bg-[#233554]" />
            {/* Filled portion */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: "top" }}
              className="absolute inset-0 w-0.5 bg-gradient-to-b from-[#64ffda] to-[#00ff88]"
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <TimelineCard key={i} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
