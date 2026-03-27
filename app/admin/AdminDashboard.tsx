"use client";

import { useState, useEffect, useCallback } from "react";
import { HiArrowUp, HiArrowDown, HiEye, HiEyeOff, HiTrash, HiPlus } from "react-icons/hi";

interface PortfolioProject {
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

interface ManualProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live: string;
  image: string;
  github: string;
}

interface ProjectConfig {
  manualProjects: ManualProject[];
  hiddenRepos: string[];
  displayOrder: string[];
}

interface MergedProject extends PortfolioProject {
  hidden: boolean;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<MergedProject[]>([]);
  const [config, setConfig] = useState<ProjectConfig>({
    manualProjects: [],
    hiddenRepos: [],
    displayOrder: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
    live: "",
    image: "",
    github: "",
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    if (!res.ok) return;
    const data = await res.json();

    const githubProjects: PortfolioProject[] = data.githubProjects;
    const cfg: ProjectConfig = data.config;
    setConfig(cfg);

    const manual: PortfolioProject[] = cfg.manualProjects.map((m: ManualProject) => ({
      ...m,
      repoName: m.id,
      stars: 0,
      isManual: true,
    }));

    const all = [...githubProjects, ...manual];

    const merged: MergedProject[] = all.map((p) => ({
      ...p,
      hidden: cfg.hiddenRepos.includes(p.repoName),
    }));

    // Apply display order
    if (cfg.displayOrder.length > 0) {
      const orderMap = new Map(cfg.displayOrder.map((id: string, idx: number) => [id, idx]));
      merged.sort((a, b) => {
        const aIdx = orderMap.get(a.repoName) ?? Infinity;
        const bIdx = orderMap.get(b.repoName) ?? Infinity;
        return aIdx - bIdx;
      });
    }

    setProjects(merged);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const moveProject = (index: number, direction: -1 | 1) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= projects.length) return;
    const updated = [...projects];
    [updated[index], updated[newIdx]] = [updated[newIdx], updated[index]];
    setProjects(updated);
  };

  const toggleHidden = (repoName: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.repoName === repoName ? { ...p, hidden: !p.hidden } : p
      )
    );
  };

  const removeManualProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.repoName !== id));
    setConfig((prev) => ({
      ...prev,
      manualProjects: prev.manualProjects.filter((m) => m.id !== id),
    }));
  };

  const addManualProject = () => {
    if (!newProject.title.trim()) return;

    const id = `manual-${Date.now()}`;
    const manual: ManualProject = {
      id,
      title: newProject.title,
      description: newProject.description,
      tags: newProject.tags.split(",").map((t) => t.trim()).filter(Boolean),
      live: newProject.live,
      image: newProject.image,
      github: newProject.github,
    };

    setConfig((prev) => ({
      ...prev,
      manualProjects: [...prev.manualProjects, manual],
    }));

    setProjects((prev) => [
      ...prev,
      {
        ...manual,
        repoName: id,
        stars: 0,
        isManual: true,
        hidden: false,
      },
    ]);

    setNewProject({ title: "", description: "", tags: "", live: "", image: "", github: "" });
    setShowAddForm(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus("");

    const updatedConfig: ProjectConfig = {
      manualProjects: config.manualProjects.filter((m) =>
        projects.some((p) => p.repoName === m.id)
      ),
      hiddenRepos: projects.filter((p) => p.hidden).map((p) => p.repoName),
      displayOrder: projects.map((p) => p.repoName),
    };

    // Include newly added manual projects
    for (const p of projects) {
      if (p.isManual && !updatedConfig.manualProjects.some((m) => m.id === p.repoName)) {
        updatedConfig.manualProjects.push({
          id: p.repoName,
          title: p.title,
          description: p.description,
          tags: p.tags,
          live: p.live,
          image: p.image,
          github: p.github,
        });
      }
    }

    const res = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedConfig),
    });

    if (res.ok) {
      setStatus("Saved! Site will update momentarily.");
      setConfig(updatedConfig);
    } else {
      const data = await res.json().catch(() => ({ error: "Unknown error" }));
      setStatus(`Error: ${data.error || "Failed to save"}`);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <p className="text-[#00ff88] font-mono">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">
            Project Manager
          </h1>
          <div className="flex items-center gap-3">
            {status && (
              <span className={`text-sm font-mono ${status.includes("Error") ? "text-red-400" : "text-[#00ff88]"}`}>
                {status}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-[#00ff88] text-[#0a192f] font-semibold hover:bg-[#00ff88]/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Add Project Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 transition-colors"
        >
          <HiPlus /> Add Manual Project
        </button>

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-6 p-6 rounded-xl bg-[#112240] border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white">New Project</h2>
            <input
              type="text"
              placeholder="Title *"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0a192f] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00ff88]"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-[#0a192f] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00ff88] resize-none"
            />
            <input
              type="text"
              placeholder="Tags (comma separated, e.g. React, Node.js)"
              value={newProject.tags}
              onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0a192f] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00ff88]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Live URL"
                value={newProject.live}
                onChange={(e) => setNewProject({ ...newProject, live: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-[#0a192f] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00ff88]"
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={newProject.github}
                onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-[#0a192f] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00ff88]"
              />
            </div>
            <input
              type="text"
              placeholder="Image URL"
              value={newProject.image}
              onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0a192f] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00ff88]"
            />
            <div className="flex gap-3">
              <button
                onClick={addManualProject}
                className="px-6 py-2 rounded-lg bg-[#00ff88] text-[#0a192f] font-semibold hover:bg-[#00ff88]/90 transition-colors"
              >
                Add Project
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="space-y-2">
          {projects.map((project, index) => (
            <div
              key={project.repoName}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                project.hidden
                  ? "bg-[#112240]/30 border-white/5 opacity-50"
                  : "bg-[#112240] border-white/10"
              }`}
            >
              {/* Order controls */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveProject(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded text-slate-400 hover:text-[#00ff88] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  <HiArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveProject(index, 1)}
                  disabled={index === projects.length - 1}
                  className="p-1 rounded text-slate-400 hover:text-[#00ff88] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  <HiArrowDown size={16} />
                </button>
              </div>

              {/* Position number */}
              <span className="text-slate-500 font-mono text-sm w-6 text-center">
                {index + 1}
              </span>

              {/* Project info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium truncate">
                    {project.title}
                  </h3>
                  {project.isManual && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
                      manual
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm truncate">
                  {project.description}
                </p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded bg-[#0a192f] text-[#64ffda]"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-xs text-slate-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleHidden(project.repoName)}
                  className={`p-2 rounded-lg transition-colors ${
                    project.hidden
                      ? "text-slate-500 hover:text-white"
                      : "text-[#00ff88] hover:text-[#00ff88]/80"
                  }`}
                  title={project.hidden ? "Show project" : "Hide project"}
                >
                  {project.hidden ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
                {project.isManual && (
                  <button
                    onClick={() => removeManualProject(project.repoName)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                    title="Remove project"
                  >
                    <HiTrash size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-slate-500 text-center py-12">
            No projects found. Add a manual project or check your GitHub repos.
          </p>
        )}
      </div>
    </div>
  );
}
