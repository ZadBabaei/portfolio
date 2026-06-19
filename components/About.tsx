"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiCode, FiCpu, FiLayers } from "react-icons/fi";
import { aboutStats } from "@/lib/data";

const storyPoints = [
  {
    icon: FiCode,
    title: "Product-minded engineering",
    text: "I build interfaces with the full workflow in mind: clear interaction states, accessible structure, and implementation details that hold up in production.",
  },
  {
    icon: FiLayers,
    title: "Full-stack context",
    text: "My work spans React, Next.js, APIs, databases, and cloud-hosted services, which helps me connect UI decisions to system behavior.",
  },
  {
    icon: FiCpu,
    title: "Practical problem solving",
    text: "I am comfortable debugging production issues, reading logs, improving reliability, and turning ambiguous requirements into shipped features.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-[#2ECC71]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="eyebrow mb-4">01 / About</p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            A developer who connects interface polish with reliable systems.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            I&apos;m a full-stack software developer focused on building scalable,
            data-driven applications with Java, Python, React, and AWS. I care
            about clean code, automated testing, practical problem-solving, and
            clear communication with both technical and non-technical teams.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="glass-card rounded-2xl p-5 sm:p-6"
          >
            <div className="grid gap-4">
              {storyPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 transition-colors duration-200 hover:border-[#2ECC71]/35"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ECC71]/10 text-[#2ECC71]">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {point.title}
                      </h3>
                    </div>
                    <p className="leading-7 text-slate-400">{point.text}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="space-y-4"
          >
            <div className="glass-card green-glow relative overflow-hidden rounded-2xl p-4">
              <div className="pointer-events-none absolute -right-12 top-0 h-36 w-36 rounded-full bg-[#2ECC71]/20 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-[#0B2A1A]">
                <Image
                  src="/images/mehrzad.png"
                  alt="Mehrzad Babaei"
                  fill
                  className="object-cover object-top grayscale-[15%]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020A08] via-transparent to-[#2ECC71]/10" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-4">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
