"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiFolder,
  FiGithub,
  FiExternalLink,
  FiStar,
  FiRefreshCw,
} from "react-icons/fi";
import type { PortfolioProject } from "@/lib/github";

interface ProjectsProps {
  projects: PortfolioProject[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export default function Projects({ projects }: ProjectsProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (repoName: string) => {
    setImgErrors((prev) => ({ ...prev, [repoName]: true }));
  };

  return (
    <section
      id="projects"
      className="relative py-24 px-6 sm:px-12 lg:px-24"
      style={{ backgroundColor: "#0a192f" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
            <span style={{ color: "#00ff88" }} className="font-mono text-lg sm:text-xl mr-2">
              04.
            </span>
            <span style={{ color: "#ccd6f6" }}>Things I&apos;ve Built</span>
          </h2>
          <div
            className="h-px flex-grow max-w-xs"
            style={{ backgroundColor: "#233554" }}
          />
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.repoName}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative flex flex-col rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-[5px]"
              style={{
                backgroundColor: "#112240",
                borderColor: "#233554",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#00ff88";
                el.style.boxShadow = "0 10px 30px -15px rgba(0, 255, 136, 0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#233554";
                el.style.boxShadow = "none";
              }}
            >
              {/* Image / Placeholder */}
              <div className="relative w-full h-[200px] overflow-hidden">
                {project.image && !imgErrors[project.repoName] ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(project.repoName)}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center p-6"
                    style={{
                      background:
                        "linear-gradient(135deg, #0a192f 0%, #112240 50%, #1a365d 100%)",
                    }}
                  >
                    <span
                      className="text-xl font-bold text-center opacity-40 select-none"
                      style={{ color: "#ccd6f6" }}
                    >
                      {project.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-grow p-6">
                {/* Top row: folder icon + external links */}
                <div className="flex items-center justify-between mb-4">
                  <FiFolder
                    className="w-10 h-10"
                    style={{ color: "#00ff88" }}
                    strokeWidth={1}
                  />
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.title}`}
                        className="transition-colors duration-200 hover:text-[#00ff88]"
                        style={{ color: "#a8b2d1" }}
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo for ${project.title}`}
                        className="transition-colors duration-200 hover:text-[#00ff88]"
                        style={{ color: "#a8b2d1" }}
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-2 transition-colors duration-200 group-hover:text-[#00ff88]"
                  style={{ color: "#ccd6f6" }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-4 flex-grow"
                  style={{
                    color: "#8892b0",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project.description}
                </p>

                {/* Stars */}
                {project.stars > 0 && (
                  <div
                    className="flex items-center gap-1 mb-3 text-sm"
                    style={{ color: "#00ff88" }}
                  >
                    <FiStar className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-full border"
                      style={{
                        color: "#64ffda",
                        borderColor: "rgba(100, 255, 218, 0.3)",
                        backgroundColor: "rgba(100, 255, 218, 0.05)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Auto-sync badge */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-12 text-sm font-mono"
          style={{ color: "rgba(16, 185, 129, 0.6)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <FiRefreshCw className="w-3.5 h-3.5" />
          <span>Projects auto-synced from GitHub</span>
        </motion.div>
      </div>
    </section>
  );
}
