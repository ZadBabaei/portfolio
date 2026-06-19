"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiRefreshCw,
  FiStar,
} from "react-icons/fi";
import type { PortfolioProject } from "@/lib/github";

interface ProjectsProps {
  projects: PortfolioProject[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.45,
      ease: "easeOut" as const,
    },
  }),
};

function isMovieTracker(project: PortfolioProject) {
  const target = `${project.title} ${project.repoName}`.toLowerCase();
  return target.includes("movie") && target.includes("tracker");
}

export default function Projects({ projects }: ProjectsProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (repoName: string) => {
    setImgErrors((prev) => ({ ...prev, [repoName]: true }));
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (isMovieTracker(a)) return -1;
    if (isMovieTracker(b)) return 1;
    return 0;
  });

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-[#2ECC71]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">04 / Projects</p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
              Feature-card projects synced from GitHub.
            </h2>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2ECC71]/25 bg-[#2ECC71]/10 px-4 py-2 font-mono text-xs text-[#A7F3C4]">
            <FiRefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
            GitHub auto-sync
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedProjects.map((project, index) => {
            const featured = isMovieTracker(project);

            return (
              <motion.article
                key={project.repoName}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative flex min-h-full flex-col overflow-hidden rounded-2xl border bg-[#0B2A1A] transition-all duration-300 hover:-translate-y-1 hover:border-[#2ECC71]/60 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35),0_0_36px_rgba(46,204,113,0.08)] ${
                  featured
                    ? "border-[#2ECC71]/45 md:col-span-2 xl:col-span-2"
                    : "border-white/10"
                }`}
              >
                {featured && (
                  <div className="absolute left-4 top-4 z-20 rounded-full border border-[#2ECC71]/35 bg-[#03140D]/90 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[#A7F3C4] backdrop-blur-md">
                    Featured
                  </div>
                )}

                <div
                  className={`relative overflow-hidden bg-[#020A08] ${
                    featured ? "h-72" : "h-52"
                  }`}
                >
                  {project.image && !imgErrors[project.repoName] ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(project.repoName)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_35%_20%,rgba(46,204,113,0.16),transparent_30rem),linear-gradient(135deg,#020A08,#03140D_55%,#0B2A1A)] p-6">
                      <span className="max-w-xs text-center text-2xl font-black text-white/35">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A1A] via-[#0B2A1A]/20 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-white transition-colors duration-200 group-hover:text-[#A7F3C4]">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-slate-500">
                        {project.repoName}
                      </p>
                    </div>

                    <div className="flex flex-none items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repository for ${project.title}`}
                          className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-colors duration-200 hover:border-[#2ECC71]/40 hover:text-[#2ECC71]"
                        >
                          <FiGithub aria-hidden="true" className="h-4 w-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${project.title}`}
                          className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-colors duration-200 hover:border-[#2ECC71]/40 hover:text-[#2ECC71]"
                        >
                          <FiExternalLink
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mb-5 line-clamp-4 flex-1 text-sm leading-7 text-slate-400">
                    {project.description}
                  </p>

                  {project.stars > 0 && (
                    <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#2ECC71]/20 bg-[#2ECC71]/10 px-3 py-1 text-sm text-[#A7F3C4]">
                      <FiStar aria-hidden="true" className="h-4 w-4" />
                      <span>{project.stars}</span>
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#2ECC71]/20 bg-[#2ECC71]/10 px-2.5 py-1 font-mono text-xs text-[#A7F3C4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
