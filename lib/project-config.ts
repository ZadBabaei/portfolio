import { put, list } from "@vercel/blob";

export interface ManualProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live: string;
  image: string;
  github: string;
}

export interface ProjectConfig {
  manualProjects: ManualProject[];
  hiddenRepos: string[];
  displayOrder: string[];
}

const CONFIG_BLOB_NAME = "portfolio-config.json";

const DEFAULT_CONFIG: ProjectConfig = {
  manualProjects: [],
  hiddenRepos: [],
  displayOrder: [],
};

export async function getProjectConfig(): Promise<ProjectConfig> {
  try {
    const { blobs } = await list({ prefix: CONFIG_BLOB_NAME });
    if (blobs.length === 0) return DEFAULT_CONFIG;
    const response = await fetch(blobs[0].url, { cache: "no-store" });
    return await response.json();
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function saveProjectConfig(
  config: ProjectConfig
): Promise<void> {
  await put(CONFIG_BLOB_NAME, JSON.stringify(config), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
