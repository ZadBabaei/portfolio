import { getProjectConfig } from "./project-config";

export interface PortfolioProject {
  title: string;
  description: string;
  tags: string[];
  live: string;
  image: string;
  github: string;
  stars: number;
  repoName: string;
  isManual?: boolean;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  default_branch: string;
}

function parsePortfolioMarker(readmeContent: string, repo: GitHubRepo): PortfolioProject | null {
  const markerRegex = /<!--\s*add-to-portfolio\s*([\s\S]*?)-->/;
  const match = readmeContent.match(markerRegex);

  if (!match) return null;

  const content = match[1];

  const getValue = (key: string): string => {
    const regex = new RegExp(`${key}:\\s*"([^"]*)"`, "i");
    const m = content.match(regex);
    return m ? m[1] : "";
  };

  const getArrayValue = (key: string): string[] => {
    const regex = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`, "i");
    const m = content.match(regex);
    if (!m) return [];
    return m[1]
      .split(",")
      .map((s) => s.trim().replace(/"/g, ""))
      .filter(Boolean);
  };

  const title = getValue("title") || repo.name;
  const description = getValue("description") || "";
  const tags = getArrayValue("tags");
  const live = getValue("live") || "";
  const imagePath = getValue("image") || "";

  // Use a daily cache-bust key so OG images refresh at least once per day
  const cacheBust = new Date().toISOString().split("T")[0];
  const image = imagePath
    ? `https://raw.githubusercontent.com/ZadBabaei/${repo.name}/${repo.default_branch}/${imagePath}`
    : `https://opengraph.githubassets.com/${cacheBust}/ZadBabaei/${repo.name}`;

  return {
    title,
    description,
    tags,
    live,
    image,
    github: repo.html_url,
    stars: repo.stargazers_count,
    repoName: repo.name,
  };
}

export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const reposResponse = await fetch(
      "https://api.github.com/users/ZadBabaei/repos?per_page=100&sort=updated",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!reposResponse.ok) return getFallbackProjects();

    const repos: GitHubRepo[] = await reposResponse.json();
    const projects: PortfolioProject[] = [];

    const readmePromises = repos.map(async (repo) => {
      try {
        const readmeResponse = await fetch(
          `https://api.github.com/repos/ZadBabaei/${repo.name}/readme`,
          {
            headers: {
              Accept: "application/vnd.github.v3.raw",
            },
            next: { revalidate: 3600 },
          }
        );

        if (!readmeResponse.ok) return null;

        const readmeContent = await readmeResponse.text();
        return parsePortfolioMarker(readmeContent, repo);
      } catch {
        return null;
      }
    });

    const results = await Promise.all(readmePromises);
    results.forEach((project) => {
      if (project) projects.push(project);
    });

    return projects.length > 0 ? projects : getFallbackProjects();
  } catch {
    return getFallbackProjects();
  }
}

export async function fetchMergedProjects(): Promise<PortfolioProject[]> {
  const [githubProjects, config] = await Promise.all([
    fetchPortfolioProjects(),
    getProjectConfig(),
  ]);

  const visible = githubProjects.filter(
    (p) => !config.hiddenRepos.includes(p.repoName)
  );

  const manual: PortfolioProject[] = config.manualProjects.map((m) => ({
    ...m,
    repoName: m.id,
    stars: 0,
    isManual: true,
  }));

  const all = [...visible, ...manual];

  if (config.displayOrder.length === 0) return all;

  const orderMap = new Map(config.displayOrder.map((id, idx) => [id, idx]));
  return all.sort((a, b) => {
    const aIdx = orderMap.get(a.repoName) ?? Infinity;
    const bIdx = orderMap.get(b.repoName) ?? Infinity;
    return aIdx - bIdx;
  });
}

function getFallbackProjects(): PortfolioProject[] {
  return [
    {
      title: "AI Meeting Assistant",
      description:
        "AI-powered meeting assistant that transcribes calls, extracts action items, detects CRM field changes, and drafts follow-up emails. Features a Kanban pipeline board and contact management system.",
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI", "Docker"],
      live: "",
      image: "https://opengraph.githubassets.com/1/ZadBabaei/ai-meeting-assistant",
      github: "https://github.com/ZadBabaei/ai-meeting-assistant",
      stars: 0,
      repoName: "ai-meeting-assistant",
    },
    {
      title: "Movie Tracker",
      description:
        "Full-stack collaborative movie night app with group management, real-time chat via Stream API, movie polls with tie-breaking logic, shared watchlists, and role-based permissions.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Stream API", "JWT"],
      live: "",
      image: "https://opengraph.githubassets.com/1/ZadBabaei/movie-tracker",
      github: "https://github.com/ZadBabaei/movie-tracker",
      stars: 0,
      repoName: "movie-tracker",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, auto-updating developer portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Projects auto-sync from GitHub READMEs via ISR and webhook revalidation.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
      live: "https://portfolio.zadprogramming.com",
      image: "",
      github: "https://github.com/ZadBabaei/portfolio",
      stars: 0,
      repoName: "portfolio",
    },
    {
      title: "Intervals",
      description:
        "A training interval timer application for managing workout sessions with customizable intervals, rest periods, and round tracking.",
      tags: ["JavaScript", "CSS", "HTML"],
      live: "",
      image: "https://opengraph.githubassets.com/1/ZadBabaei/Intervals",
      github: "https://github.com/ZadBabaei/Intervals",
      stars: 0,
      repoName: "Intervals",
    },
  ];
}
