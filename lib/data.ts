import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithubactions,
  SiJest,
  SiAngular,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiOpenai,
} from "react-icons/si";
import {
  FaAws,
  FaServer,
  FaCloud,
  FaLock,
  FaDatabase,
} from "react-icons/fa";

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
] as const;

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ],
  },
  {
    category: "AWS Cloud",
    items: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "EC2", icon: FaServer, color: "#FF9900" },
      { name: "S3", icon: FaDatabase, color: "#569A31" },
      { name: "Lambda", icon: FaCloud, color: "#FF9900" },
      { name: "IAM", icon: FaLock, color: "#DD344C" },
      { name: "CloudWatch", icon: FaCloud, color: "#FF4F8B" },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Jest", icon: SiJest, color: "#C21325" },
      { name: "OpenAI API", icon: SiOpenai, color: "#412991" },
    ],
  },
] as const;

export const experiences = [
  {
    title: "Volunteer Front-End Developer",
    company: "Collective Interchange",
    location: "St. John's, NL",
    period: "November 2025 – Present",
    points: [
      "Developed and enhanced responsive SaaS features using JavaScript and Next.js, collaborating with backend services built in Python and MongoDB.",
      "Investigated and resolved production issues by analyzing logs and application behavior, improving reliability and user experience.",
      "Contributed feedback and suggestions when identifying areas for technical or process improvement.",
    ],
    type: "work" as const,
  },
  {
    title: "Freelance Software Developer (AI Trainer)",
    company: "Outlier AI",
    location: "Remote",
    period: "October 2024 – Present",
    points: [
      "Evaluated AI-generated code and technical responses for correctness, efficiency, and clarity.",
      "Identified edge cases, logical errors, and data issues, contributing feedback to improve system accuracy and robustness.",
    ],
    type: "work" as const,
  },
  {
    title: "Bachelor of Computer Science",
    company: "Memorial University of Newfoundland",
    location: "St. John's, NL",
    period: "April 2019 – February 2024",
    points: [],
    type: "education" as const,
  },
  {
    title: "Software Developer Courses",
    company: "Get-Coding Software Training Institute",
    location: "St. John's, NL",
    period: "January 2020 – January 2021",
    points: [],
    type: "education" as const,
  },
] as const;

export const aboutStats = [
  { label: "Years Experience", value: "2+" },
  { label: "Technologies", value: "15+" },
  { label: "Degree", value: "B.Sc CS" },
] as const;
