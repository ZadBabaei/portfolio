"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { FiCloud, FiCode, FiCpu, FiDatabase } from "react-icons/fi";
import { skills } from "@/lib/data";

const categoryIcons = {
  Frontend: FiCode,
  Backend: FiCpu,
  "Cloud/DevOps": FiCloud,
  "Data/AI": FiDatabase,
} as const;

type SkillCategory = keyof typeof categoryIcons;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const groupedSkills = useMemo(() => {
    const groups: Record<SkillCategory, (typeof skills)[number]["items"][number][]> = {
      Frontend: [],
      Backend: [],
      "Cloud/DevOps": [],
      "Data/AI": [],
    };

    skills.forEach((group) => {
      if (group.category === "Frontend") {
        groups.Frontend.push(...group.items);
      } else if (group.category === "Backend") {
        groups.Backend.push(...group.items);
      } else if (
        group.category === "AWS Cloud" ||
        group.category === "DevOps & Tools"
      ) {
        groups["Cloud/DevOps"].push(
          ...group.items.filter((item) => item.name !== "OpenAI API")
        );
      } else if (group.category === "Database") {
        groups["Data/AI"].push(...group.items);
      }
    });

    const aiTool = skills
      .find((group) => group.category === "DevOps & Tools")
      ?.items.find((item) => item.name === "OpenAI API");

    if (aiTool) groups["Data/AI"].push(aiTool);

    return groups;
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#0B2A1A]/55 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">02 / Skills</p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
              A practical stack for building, shipping, and debugging products.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">
            Organized by how I use the tools in real product work: interface,
            service layer, deployment, and data workflows.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-5 md:grid-cols-2"
        >
          {(Object.keys(groupedSkills) as SkillCategory[]).map((category) => {
            const Icon = categoryIcons[category];

            return (
              <motion.div
                key={category}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: "easeOut" },
                  },
                }}
                className="glass-card rounded-2xl p-5 transition-colors duration-200 hover:border-[#2ECC71]/35"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2ECC71]/10 text-[#2ECC71]">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {category}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {groupedSkills[category].length} tools
                      </p>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-[#2ECC71] shadow-[0_0_18px_rgba(46,204,113,0.7)]" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {groupedSkills[category].map((item) => {
                    const SkillIcon = item.icon;

                    return (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-200"
                      >
                        <SkillIcon
                          aria-hidden="true"
                          className="h-4 w-4"
                          style={{ color: item.color }}
                        />
                        {item.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
