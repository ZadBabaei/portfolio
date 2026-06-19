"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiAcademicCap, HiBriefcase } from "react-icons/hi";
import { experiences } from "@/lib/data";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#2ECC71]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="eyebrow mb-4">03 / Experience</p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Production experience across teams, clients, and code review.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-gradient-to-b from-[#2ECC71]/60 via-white/10 to-transparent sm:block" />

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-5"
          >
            {experiences.map((experience) => {
              const Icon =
                experience.type === "work" ? HiBriefcase : HiAcademicCap;

              return (
                <motion.article
                  key={`${experience.company}-${experience.title}`}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: "easeOut" },
                    },
                  }}
                  className="relative sm:pl-14"
                >
                  <span className="absolute left-0 top-6 hidden h-10 w-10 items-center justify-center rounded-xl border border-[#2ECC71]/35 bg-[#03140D] text-[#2ECC71] shadow-[0_0_26px_rgba(46,204,113,0.18)] sm:flex">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>

                  <div className="glass-card rounded-2xl p-5 transition-colors duration-200 hover:border-[#2ECC71]/35 sm:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2ECC71]/25 bg-[#2ECC71]/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[#A7F3C4]">
                          <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                          {experience.type}
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {experience.title}
                        </h3>
                        <p className="mt-1 font-medium text-[#2ECC71]">
                          {experience.company}
                        </p>
                      </div>
                      <p className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-400">
                        {experience.period}
                      </p>
                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                      {experience.location}
                    </p>

                    {experience.points.length > 0 && (
                      <ul className="mt-5 space-y-3">
                        {experience.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-7 text-slate-300"
                          >
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#2ECC71]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
